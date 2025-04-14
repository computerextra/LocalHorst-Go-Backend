package db

import (
	"database/sql"

	"github.com/lucsky/cuid"
)

type Ansprechpartner struct {
	Id            string
	Name          string
	Telefon       sql.NullString
	Mobil         sql.NullString
	Mail          sql.NullString
	LieferantenId sql.NullString
}

func (d Database) GetAnsprechpartnerFromLieferant(id string) ([]Ansprechpartner, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("SELECT id, Name, Telefon, Mobil, Mail, lieferantenId FROM Anschprechpartner WHERE lieferantenId = ? ORDER BY Name ASC;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []Ansprechpartner
	for rows.Next() {
		var x Ansprechpartner
		if err := rows.Scan(
			&x.Id,
			&x.Name,
			&x.Telefon,
			&x.Mobil,
			&x.Mail,
			&x.LieferantenId,
		); err != nil {
			return nil, err
		}
		res = append(res, x)
	}
	return res, nil
}

func (d Database) GetAnsprechpartner(id string) (*Ansprechpartner, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("SELECT id, Name, Telefon, Mobil, Mail, lieferantenId FROM Anschprechpartner WHERE id = ? ORDER BY Name ASC;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var x Ansprechpartner
	err = stmt.QueryRow(id).Scan(&x.Id,
		&x.Name,
		&x.Telefon,
		&x.Mobil,
		&x.Mail,
		&x.LieferantenId)

	if err != nil {
		return nil, err
	}

	return &x, nil
}

type AnsprechpartnerParams struct {
	Name          string
	Telefon       *string
	Mobil         *string
	Mail          *string
	LieferantenId string
}

func (d Database) UpsertAnsprechpartner(params AnsprechpartnerParams, id *string) (sql.Result, error) {
	if len(*id) > 0 {
		return d.updateAnsprechpartner(params, *id)
	} else {
		return d.createAnsprechpartner(params)
	}
}

func (d Database) createAnsprechpartner(params AnsprechpartnerParams) (sql.Result, error) {
	var Telefon sql.NullString
	var Mobil sql.NullString
	var Mail sql.NullString

	if len(*params.Telefon) > 0 {
		Telefon.Valid = true
		Telefon.String = *params.Telefon
	} else {
		Telefon.Valid = false
	}
	if len(*params.Mobil) > 0 {
		Mobil.Valid = true
		Mobil.String = *params.Mobil
	} else {
		Mobil.Valid = false
	}
	if len(*params.Mail) > 0 {
		Mail.Valid = true
		Mail.String = *params.Mail
	} else {
		Mail.Valid = false
	}

	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("INSERT INTO Anschprechpartner (id, Name, Telefon, Mobil, Mail, lieferantenId) VALUES (?, ?, ?, ?, ?, ?)")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return stmt.Exec(
		cuid.New(),
		params.Name,
		Telefon,
		Mobil,
		Mail,
		params.LieferantenId,
	)

}
func (d Database) updateAnsprechpartner(params AnsprechpartnerParams, id string) (sql.Result, error) {
	var Telefon sql.NullString
	var Mobil sql.NullString
	var Mail sql.NullString

	if len(*params.Telefon) > 0 {
		Telefon.Valid = true
		Telefon.String = *params.Telefon
	} else {
		Telefon.Valid = false
	}
	if len(*params.Mobil) > 0 {
		Mobil.Valid = true
		Mobil.String = *params.Mobil
	} else {
		Mobil.Valid = false
	}
	if len(*params.Mail) > 0 {
		Mail.Valid = true
		Mail.String = *params.Mail
	} else {
		Mail.Valid = false
	}

	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("UPDATE Anschprechpartner SET Name = ?, Telefon = ?, Mobil = ?, Mail = ?, lieferantenId = ? WHERE id = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return stmt.Exec(
		params.Name,
		Telefon,
		Mobil,
		Mail,
		params.LieferantenId,
		id,
	)
}

func (d Database) DeleteAnsprechpartner(id string) (sql.Result, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("DELETE FROM Anschprechpartner WHERE id = ?;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return stmt.Exec(id)
}
