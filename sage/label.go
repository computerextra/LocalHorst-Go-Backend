package sage

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/computerextra/golang-backend/env"
	_ "github.com/denisenkom/go-mssqldb"
	_ "github.com/mattn/go-adodb"
)

type SageArtikel struct {
	Id            int
	Artikelnummer string
	Suchbegriff   string
	Preis         float64
}

type AccessArtikel struct {
	Id            int
	Artikelnummer string
	Artikeltext   string
	Preis         float64
}

func SyncDb(sage []SageArtikel, label []AccessArtikel) error {
	var updates []AccessArtikel
	var create []AccessArtikel

	for i := range sage {
		var found bool
		found = false
		for x := range label {
			if sage[i].Id == label[x].Id {
				found = true
				break
			}
		}
		var art AccessArtikel
		art.Id = sage[i].Id
		art.Artikelnummer = sage[i].Artikelnummer
		art.Preis = sage[i].Preis
		art.Artikeltext = sage[i].Suchbegriff
		if found {
			updates = append(updates, art)
		} else {
			create = append(create, art)
		}
	}

	err := insert(create)
	if err != nil {
		return err
	}
	err = update(updates)
	if err != nil {
		return err
	}
	return nil
}

func update(update []AccessArtikel) error {
	env := env.GetEnv()

	conn, err := sql.Open("adodb", fmt.Sprintf("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=%s;", env.ACCESS_DB))
	if err != nil {
		return err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("UPDATE Artikel SET Artikelnummer=?, Artikeltext=?, Preis=? where ID=?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	for x := range update {
		if _, err := stmt.Exec(update[x].Artikelnummer, strings.ReplaceAll(update[x].Artikeltext, "'", "\""), update[x].Preis, update[x].Id); err != nil {
			return err
		}
	}
	return nil
}

func insert(create []AccessArtikel) error {
	env := env.GetEnv()

	conn, err := sql.Open("adodb", fmt.Sprintf("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=%s;", env.ACCESS_DB))
	if err != nil {
		return err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("INSERT INTO Artikel (ID, Artikelnummer, Artikeltext, Preis) VALUES (?,?,?,?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	for x := range create {
		if _, err := stmt.Exec(create[x].Id, create[x].Artikelnummer, strings.ReplaceAll(create[x].Artikeltext, "'", "\""), create[x].Preis); err != nil {
			return err
		}
	}
	return nil
}

func ReadAccessDb() ([]AccessArtikel, error) {
	env := env.GetEnv()

	conn, err := sql.Open("adodb", fmt.Sprintf("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=%s;", env.ACCESS_DB))
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	rows, err := conn.Query("SELECT ID, Artikelnummer, Artikeltext, Preis FROM Artikel")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var artikel []AccessArtikel

	for rows.Next() {
		var art AccessArtikel
		if err := rows.Scan(&art.Id, &art.Artikelnummer, &art.Artikeltext, &art.Preis); err != nil {
			return nil, err
		}
		artikel = append(artikel, art)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return artikel, nil
}

func ReadSage() ([]SageArtikel, error) {
	env := env.GetEnv()

	connString := fmt.Sprintf("server=%s;database=%s;user id=%s;password=%s;port=%d", env.SAGE_SERVER, env.SAGE_DB, env.SAGE_USER, env.SAGE_PASS, env.SAGE_PORT)

	conn, err := sql.Open("sqlserver", connString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	rows, err := conn.Query("SELECT sg_auf_artikel.SG_AUF_ARTIKEL_PK, sg_auf_artikel.ARTNR, sg_auf_artikel.SUCHBEGRIFF, sg_auf_vkpreis.PR01 FROM sg_auf_artikel INNER JOIN sg_auf_vkpreis ON (sg_auf_artikel.SG_AUF_ARTIKEL_PK = sg_auf_vkpreis.SG_AUF_ARTIKEL_FK)")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var artikel []SageArtikel

	for rows.Next() {
		var art SageArtikel
		var Artikelnummer sql.NullString
		var Suchbegriff sql.NullString
		var Price sql.NullFloat64

		if err := rows.Scan(&art.Id, &Artikelnummer, &Suchbegriff, &Price); err != nil {
			return nil, err
		}
		if Artikelnummer.Valid && Suchbegriff.Valid && Price.Valid {
			art.Artikelnummer = Artikelnummer.String
			art.Suchbegriff = Suchbegriff.String
			art.Preis = Price.Float64
			artikel = append(artikel, art)
		}
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}
	return artikel, nil
}
