package db

import (
	"database/sql"

	"github.com/lucsky/cuid"
)

type Ansprechpartner struct {
	Id            string         `db:"id"`
	Name          string         `db:"Name"`
	Telefon       sql.NullString `db:"Telefon"`
	Mobil         sql.NullString `db:"Mobil"`
	Mail          sql.NullString `db:"Mail"`
	LieferantenId sql.NullString `db:"lieferantenId"`
}

func (d Database) GetAnsprechpartnerFromLieferant(id string) ([]Ansprechpartner, error) {
	aps := []Ansprechpartner{}
	err := d.conn.Select(&aps, "SELECT * FROM Anschprechpartner WHERE lieferantenId = ? ORDER BY Name ASC;", id)
	if err != nil {
		return nil, err
	}

	return aps, nil
}

func (d Database) GetAnsprechpartner(id string) (*Ansprechpartner, error) {
	ap := Ansprechpartner{}
	err := d.conn.Get(&ap, "SELECT * FROM Anschprechpartner WHERE id = ? LIMIT 1;", id)
	if err != nil {
		return nil, err
	}

	return &ap, nil
}

type AnsprechpartnerParams struct {
	Name          string
	Telefon       string
	Mobil         string
	Mail          string
	LieferantenId string
}

func (d Database) UpsertAnsprechpartner(params AnsprechpartnerParams, id string) (sql.Result, error) {
	// TODO: Muss getestet werden!
	if len(id) > 0 {
		return d.updateAnsprechpartner(params, id)
	} else {
		return d.createAnsprechpartner(params)
	}
}

func (d Database) createAnsprechpartner(params AnsprechpartnerParams) (sql.Result, error) {
	var Telefon sql.NullString
	var Mobil sql.NullString
	var Mail sql.NullString

	if len(params.Telefon) > 0 {
		Telefon.Valid = true
		Telefon.String = params.Telefon
	} else {
		Telefon.Valid = false
		Telefon.String = ""
	}
	if len(params.Mobil) > 0 {
		Mobil.Valid = true
		Mobil.String = params.Mobil
	} else {
		Mobil.Valid = false
		Mobil.String = ""
	}
	if len(params.Mail) > 0 {
		Mail.Valid = true
		Mail.String = params.Mail
	} else {
		Mail.Valid = false
		Mail.String = ""
	}

	return d.conn.NamedExec("INSERT INTO Anschprechpartner (id, Name, Telefon, Mobil, Mail, lieferantenId) VALUES (?, ?, ?, ?, ?, ?)",
		map[string]any{
			"id":            cuid.New(),
			"Name":          params.Name,
			"Telefon":       Telefon,
			"Mobil":         Mobil,
			"Mail":          Mail,
			"lieferantenId": params.LieferantenId,
		})

	// stmt, err := conn.Prepare("INSERT INTO Anschprechpartner (id, Name, Telefon, Mobil, Mail, lieferantenId) VALUES (?, ?, ?, ?, ?, ?)")
	// if err != nil {
	// 	return nil, err
	// }
	// defer stmt.Close()

	// return stmt.Exec(
	// 	cuid.New(),
	// 	params.Name,
	// 	Telefon,
	// 	Mobil,
	// 	Mail,
	// 	params.LieferantenId,
	// )

}
func (d Database) updateAnsprechpartner(params AnsprechpartnerParams, id string) (sql.Result, error) {
	var Telefon sql.NullString
	var Mobil sql.NullString
	var Mail sql.NullString

	if len(params.Telefon) > 0 {
		Telefon.Valid = true
		Telefon.String = params.Telefon
	} else {
		Telefon.Valid = false
		Telefon.String = ""
	}
	if len(params.Mobil) > 0 {
		Mobil.Valid = true
		Mobil.String = params.Mobil
	} else {
		Mobil.Valid = false
		Mobil.String = ""
	}
	if len(params.Mail) > 0 {
		Mail.Valid = true
		Mail.String = params.Mail
	} else {
		Mail.Valid = false
		Mail.String = ""
	}

	return d.conn.NamedExec("UPDATE Anschprechpartner SET Name = ?, Telefon = ?, Mobil = ?, Mail = ?, lieferantenId = ? WHERE id = ?",
		map[string]any{
			"Name":          params.Name,
			"Telefon":       Telefon,
			"Mobil":         Mobil,
			"Mail":          Mail,
			"lieferantenId": params.LieferantenId,
			"id":            id,
		})

	// stmt, err := conn.Prepare("UPDATE Anschprechpartner SET Name = ?, Telefon = ?, Mobil = ?, Mail = ?, lieferantenId = ? WHERE id = ?")
	// if err != nil {
	// 	return nil, err
	// }
	// defer stmt.Close()

	// return stmt.Exec(
	// 	params.Name,
	// 	Telefon,
	// 	Mobil,
	// 	Mail,
	// 	params.LieferantenId,
	// 	id,
	// )
}

func (d Database) DeleteAnsprechpartner(id string) (sql.Result, error) {

	return d.conn.NamedExec("DELETE FROM Anschprechpartner WHERE id = ?;", id)

	// stmt, err := conn.Prepare("DELETE FROM Anschprechpartner WHERE id = ?;")
	// if err != nil {
	// 	return nil, err
	// }
	// defer stmt.Close()

	// return stmt.Exec(id)
}
