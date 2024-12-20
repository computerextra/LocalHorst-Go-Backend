package sage

import (
	"context"
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/env"
)

type AusstellerArtikel struct {
	Id            int
	Artikelnummer string
	Artikelname   string
	Specs         string
	Preis         float64
}

func SyncAussteller(ctx context.Context) error {
	env := env.GetEnv()

	conn, err := sql.Open("sqlserver", getConnectionString())
	if err != nil {
		return err
	}
	defer conn.Close()
	sage_query := "select sg_auf_artikel.SG_AUF_ARTIKEL_PK, sg_auf_artikel.ARTNR, sg_auf_artikel.SUCHBEGRIFF, sg_auf_artikel.ZUSTEXT1, sg_auf_vkpreis.PR01 FROM sg_auf_artikel INNER JOIN sg_auf_vkpreis ON sg_auf_artikel.SG_AUF_ARTIKEL_PK = sg_auf_vkpreis.SG_AUF_ARTIKEL_FK"
	rows, err := conn.Query(sage_query)
	if err != nil {
		return err
	}
	defer rows.Close()

	var Sage []AusstellerArtikel
	for rows.Next() {
		var Id sql.NullInt64
		var Artikelnummer sql.NullString
		var Artikelname sql.NullString
		var Specs sql.NullString
		var Preis sql.NullFloat64

		if err := rows.Scan(&Id, &Artikelnummer, &Artikelname, &Specs, &Preis); err != nil {
			return err
		}
		if Id.Valid && Artikelnummer.Valid && Artikelname.Valid && Specs.Valid && Preis.Valid {
			var tmp AusstellerArtikel
			tmp.Id = int(Id.Int64)
			tmp.Artikelnummer = Artikelnummer.String
			tmp.Artikelname = Artikelname.String
			tmp.Preis = Preis.Float64
			tmp.Specs = Specs.String
			Sage = append(Sage, tmp)
		}
	}

	datebase, err := sql.Open("mysql", env.DATABASE_URL)
	if err != nil {
		return err
	}
	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := db.New(datebase)

	if len(Sage) > 0 {
		for i := range Sage {
			id := Sage[i].Id
			nummer := Sage[i].Artikelnummer
			name := strings.ReplaceAll(Sage[i].Artikelname, "'", "\"")
			spec := strings.ReplaceAll(Sage[i].Specs, "'", "\"")
			price := Sage[i].Preis
			_, err := queries.InsertAussteller(ctx, db.InsertAusstellerParams{
				ID:            int32(id),
				Artikelnummer: nummer,
				Artikelname:   name,
				Specs:         spec,
				Preis:         fmt.Sprintf("%.2f", price),
				Artikelname_2: name,
				Specs_2:       spec,
				Preis_2:       fmt.Sprintf("%.2f", price),
			})
			if err != nil {
				return err
			}
		}
	}
	return nil
}
