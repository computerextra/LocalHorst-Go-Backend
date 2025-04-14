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

	rows, err := conn.Query(
		"SELECT id, Name, Telefon, Mobil, Mail, lieferantenId FROM Anschprechpartner WHERE lieferantenId = :id ORDER BY Name ASC;", sql.Named("id", id),
	)
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

	rows, err := conn.Query(
		"SELECT id, Name, Telefon, Mobil, Mail, lieferantenId FROM Anschprechpartner WHERE id = :id ORDER BY Name ASC;", sql.Named("id", id),
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var x Ansprechpartner
	for rows.Next() {
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

	return conn.Exec(
		"INSERT INTO Anschprechpartner (id, Name, Telefon, Mobil, Mail, lieferantenId) VALUES (:id, :Name, :Telefon, :Mobil, :Mail, :lieferantenID)",
		sql.Named("id", cuid.New()),
		sql.Named("Name", params.Name),
		sql.Named("Telefon", Telefon),
		sql.Named("Mobil", Mobil),
		sql.Named("Mail", Mail),
		sql.Named("lieferantenId", params.LieferantenId),
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

	return conn.Exec(
		"UPDATE Anschprechpartner SET Name = :name, Telefon = :Telefon, Mobil = :Mobil, Mail = :Mail, lieferantenId = :lieferantenId WHERE id = :id",
		sql.Named("Name", params.Name),
		sql.Named("Telefon", Telefon),
		sql.Named("Mobil", Mobil),
		sql.Named("Mail", Mail),
		sql.Named("lieferantenId", params.LieferantenId),
		sql.Named("id", id),
	)
}

func (d Database) DeleteAnsprechpartner(id string) (sql.Result, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	return conn.Exec(
		"DELETE FROM Anschprechpartner WHERE id = :id;",
		sql.Named("id", id),
	)
}
