package db

import (
	"database/sql"

	"github.com/lucsky/cuid"
)

type Lieferant struct {
	Id              string
	Firma           string
	Kundennummer    sql.NullString
	Webseite        sql.NullString
	Ansprechpartner []Ansprechpartner
}

func (d Database) GetLieferanten() ([]Lieferant, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	rows, err := conn.Query(
		"SELECT id, Firma, Kundennummer, Webseite FROM Lieferanten ORDER BY Firma ASC;",
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []Lieferant
	for rows.Next() {
		var x Lieferant
		if err := rows.Scan(
			&x.Id,
			&x.Firma,
			&x.Kundennummer,
			&x.Webseite,
		); err != nil {
			return nil, err
		}
		res = append(res, x)
	}
	for idx, lieferant := range res {
		ap, err := d.GetAnsprechpartnerFromLieferant(lieferant.Id)
		if err != nil {
			continue
		}
		res[idx].Ansprechpartner = ap
	}
	return res, nil
}

func (d Database) GetLieferant(id string) (*Lieferant, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	rows, err := conn.Query(
		"SELECT id, Firma, Kundennummer, Webseite FROM Lieferanten WHERE id = :id;", sql.Named("id", id),
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res Lieferant
	for rows.Next() {
		if err := rows.Scan(
			&res.Id,
			&res.Firma,
			&res.Kundennummer,
			&res.Webseite,
		); err != nil {
			return nil, err
		}
	}
	res.Ansprechpartner, err = d.GetAnsprechpartnerFromLieferant(res.Id)
	if err != nil {
		return &res, err
	}

	return &res, nil
}

type LieferantenParams struct {
	Firma        string
	Kundennummer *string
	Webseite     *string
}

func (d Database) UpsertLieferant(params LieferantenParams, id *string) (sql.Result, error) {
	if len(*id) > 0 {
		return d.createLieferant(params)
	} else {
		return d.updateLieferant(params, *id)
	}
}

func (d Database) updateLieferant(params LieferantenParams, id string) (sql.Result, error) {
	var Kundennummer sql.NullString
	var Webseite sql.NullString
	if len(*params.Kundennummer) > 0 {
		Kundennummer.Valid = true
		Kundennummer.String = *params.Kundennummer
	} else {
		Kundennummer.Valid = false
	}
	if len(*params.Webseite) > 0 {
		Webseite.Valid = true
		Webseite.String = *params.Webseite
	} else {
		Webseite.Valid = false
	}
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()
	return conn.Exec(
		"UPDATE Lieferanten SET Firma = :firma, Kundennummer = :kundennummer, Webseite = :webseite WHERE id = :id;",
		sql.Named("firma", params.Firma),
		sql.Named("kundennummer", Kundennummer),
		sql.Named("webseite", Webseite),
		sql.Named("id", id),
	)
}

func (d Database) createLieferant(params LieferantenParams) (sql.Result, error) {
	var Kundennummer sql.NullString
	var Webseite sql.NullString
	if len(*params.Kundennummer) > 0 {
		Kundennummer.Valid = true
		Kundennummer.String = *params.Kundennummer
	} else {
		Kundennummer.Valid = false
	}
	if len(*params.Webseite) > 0 {
		Webseite.Valid = true
		Webseite.String = *params.Webseite
	} else {
		Webseite.Valid = false
	}
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()
	return conn.Exec(
		"INSERT INTO Lieferanten (id, Firma, Kundennummer, Webseite) VALUES (:id, :firma, :kundennummer, :website);",
		sql.Named("id", cuid.New()),
		sql.Named("firma", params.Firma),
		sql.Named("kundennummer", Kundennummer),
		sql.Named("webseite", Webseite),
	)
}

func (d Database) DeleteLieferant(id string) (sql.Result, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	return conn.Exec("DELETE FROM Lieferanten WHERE id = :id", sql.Named("id", id))
}
