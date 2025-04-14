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

	stmt, err := conn.Prepare("SELECT id, Firma, Kundennummer, Webseite FROM Lieferanten ORDER BY Firma ASC;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query()
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

	stmt, err := conn.Prepare("SELECT id, Firma, Kundennummer, Webseite FROM Lieferanten WHERE id = ?;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var res Lieferant
	err = stmt.QueryRow(id).Scan(&res.Id,
		&res.Firma,
		&res.Kundennummer,
		&res.Webseite)
	if err != nil {
		return nil, err
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

	stmt, err := conn.Prepare("UPDATE Lieferanten SET Firma = ?, Kundennummer = ?, Webseite = ? WHERE id = ?;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return stmt.Exec(
		params.Firma,
		Kundennummer,
		Webseite,
		id,
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

	stmt, err := conn.Prepare("INSERT INTO Lieferanten (id, Firma, Kundennummer, Webseite) VALUES (?, ?, ?, ?);")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return stmt.Exec(
		cuid.New(),
		params.Firma,
		Kundennummer,
		Webseite,
	)
}

func (d Database) DeleteLieferant(id string) (sql.Result, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("DELETE FROM Lieferanten WHERE id = ?;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return stmt.Exec(id)
}
