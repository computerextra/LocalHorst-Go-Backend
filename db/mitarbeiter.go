package db

import (
	"database/sql"
	"time"

	"github.com/lucsky/cuid"
)

type Mitarbeiter struct {
	Id                 string
	Name               string
	Short              sql.NullString
	Gruppenwahl        sql.NullString
	InternTelefon1     sql.NullString
	InternTelefon2     sql.NullString
	FestnetzAlternativ sql.NullString
	FestnetzPrivat     sql.NullString
	HomeOffice         sql.NullString
	MobilBusiness      sql.NullString
	MobilPrivat        sql.NullString
	Email              sql.NullString
	Azubi              sql.NullBool
	Geburtstag         sql.NullTime
}

func (d Database) GetMitarbeiter(id string) (*Mitarbeiter, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("SELECT id, Name, Short, Gruppenwahl, InternTelefon1, InternTelefon2, FestnetzAlternativ, FestnetzPrivat, HomeOffice, MobilBusiness, MobilPrivat, Email, Azubi, Geburtstag FROM Mitarbeiter WHERE id = ?;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var x Mitarbeiter
	err = stmt.QueryRow(id).Scan(&x.Id,
		&x.Name,
		&x.Short,
		&x.Gruppenwahl,
		&x.InternTelefon1,
		&x.InternTelefon2,
		&x.FestnetzAlternativ,
		&x.FestnetzPrivat,
		&x.HomeOffice,
		&x.MobilBusiness,
		&x.MobilPrivat,
		&x.Email,
		&x.Azubi,
		&x.Geburtstag)
	if err != nil {
		return nil, err
	}

	return &x, nil
}

func (d Database) GetMitarbeiterIdByName(name string) (string, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return "", err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("SELECT id FROM Mitarbeiter WHERE Name LIKE ?;")
	if err != nil {
		return "", err
	}
	defer stmt.Close()

	var id string

	err = stmt.QueryRow(name).Scan(&id)
	if err != nil {
		return "", err
	}
	return id, nil
}

func (d Database) GetAllMitarbeiter() ([]Mitarbeiter, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("SELECT id, Name, Short, Gruppenwahl, InternTelefon1, InternTelefon2, FestnetzAlternativ, FestnetzPrivat, HomeOffice, MobilBusiness, MobilPrivat, Email, Azubi, Geburtstag FROM Mitarbeiter ORDER BY Name ASC;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query()
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []Mitarbeiter
	for rows.Next() {
		var x Mitarbeiter
		if err := rows.Scan(
			&x.Id,
			&x.Name,
			&x.Short,
			&x.Gruppenwahl,
			&x.InternTelefon1,
			&x.InternTelefon2,
			&x.FestnetzAlternativ,
			&x.FestnetzPrivat,
			&x.HomeOffice,
			&x.MobilBusiness,
			&x.MobilPrivat,
			&x.Email,
			&x.Azubi,
			&x.Geburtstag,
		); err != nil {
			return nil, err
		}
		res = append(res, x)
	}

	return res, nil
}

type MitarbeiterParams struct {
	Name               string
	Short              *string
	Gruppenwahl        *string
	InternTelefon1     *string
	InternTelefon2     *string
	FestnetzAlternativ *string
	FestnetzPrivat     *string
	HomeOffice         *string
	MobilBusiness      *string
	MobilPrivat        *string
	Email              *string
	Azubi              bool
	Geburtstag         *string
}

func (d Database) UpsertMitarbeiter(params MitarbeiterParams, id *string) (sql.Result, error) {
	if len(*id) > 0 {
		return d.updateMitarbeiter(params, *id)
	} else {
		return d.createMitarbeiter(params)
	}
}

func (d Database) createMitarbeiter(params MitarbeiterParams) (sql.Result, error) {
	var Short sql.NullString
	var Gruppenwahl sql.NullString
	var InternTelefon1 sql.NullString
	var InternTelefon2 sql.NullString
	var FestnetzAlternativ sql.NullString
	var FestnetzPrivat sql.NullString
	var HomeOffice sql.NullString
	var MobilBusiness sql.NullString
	var MobilPrivat sql.NullString
	var Email sql.NullString
	var Geburtstag sql.NullTime

	if len(*params.Short) > 0 {
		Short.Valid = true
		Short.String = *params.Short
	} else {
		Short.Valid = false
	}
	if len(*params.Gruppenwahl) > 0 {
		Gruppenwahl.Valid = true
		Gruppenwahl.String = *params.Gruppenwahl
	} else {
		Gruppenwahl.Valid = false
	}
	if len(*params.InternTelefon1) > 0 {
		InternTelefon1.Valid = true
		InternTelefon1.String = *params.InternTelefon1
	} else {
		InternTelefon1.Valid = false
	}
	if len(*params.InternTelefon2) > 0 {
		InternTelefon2.Valid = true
		InternTelefon2.String = *params.InternTelefon2
	} else {
		InternTelefon2.Valid = false
	}
	if len(*params.FestnetzAlternativ) > 0 {
		FestnetzAlternativ.Valid = true
		FestnetzAlternativ.String = *params.FestnetzAlternativ
	} else {
		FestnetzAlternativ.Valid = false
	}
	if len(*params.FestnetzPrivat) > 0 {
		FestnetzPrivat.Valid = true
		FestnetzPrivat.String = *params.FestnetzPrivat
	} else {
		FestnetzPrivat.Valid = false
	}
	if len(*params.HomeOffice) > 0 {
		HomeOffice.Valid = true
		HomeOffice.String = *params.HomeOffice
	} else {
		HomeOffice.Valid = false
	}
	if len(*params.MobilBusiness) > 0 {
		MobilBusiness.Valid = true
		MobilBusiness.String = *params.MobilBusiness
	} else {
		MobilBusiness.Valid = false
	}
	if len(*params.MobilPrivat) > 0 {
		MobilPrivat.Valid = true
		MobilPrivat.String = *params.MobilPrivat
	} else {
		MobilPrivat.Valid = false
	}
	if len(*params.Email) > 0 {
		Email.Valid = true
		Email.String = *params.Email
	} else {
		Email.Valid = false
	}
	if len(*params.Geburtstag) > 0 {
		t, err := time.Parse("2006-01-02", *params.Geburtstag)
		if err != nil {
			Geburtstag.Valid = true
			Geburtstag.Time = t
		} else {
			Geburtstag.Valid = false
		}
	} else {
		Geburtstag.Valid = false
	}

	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("INSERT INTO Mitarbeiter ( id, Name, Short, Gruppenwahl, InternTelefon1, InternTelefon2, FestnetzAlternativ, FestnetzPrivat, HomeOffice, MobilBusiness, MobilPrivat, Email, Azubi, Geburtstag) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return stmt.Exec(
		cuid.New(),
		params.Name,
		Short,
		Gruppenwahl,
		InternTelefon1,
		InternTelefon2,
		FestnetzAlternativ,
		FestnetzPrivat,
		HomeOffice,
		MobilBusiness,
		MobilPrivat,
		Email,
		params.Azubi,
		Geburtstag,
	)
}
func (d Database) updateMitarbeiter(params MitarbeiterParams, id string) (sql.Result, error) {
	var Short sql.NullString
	var Gruppenwahl sql.NullString
	var InternTelefon1 sql.NullString
	var InternTelefon2 sql.NullString
	var FestnetzAlternativ sql.NullString
	var FestnetzPrivat sql.NullString
	var HomeOffice sql.NullString
	var MobilBusiness sql.NullString
	var MobilPrivat sql.NullString
	var Email sql.NullString
	var Geburtstag sql.NullTime

	if len(*params.Short) > 0 {
		Short.Valid = true
		Short.String = *params.Short
	} else {
		Short.Valid = false
	}
	if len(*params.Gruppenwahl) > 0 {
		Gruppenwahl.Valid = true
		Gruppenwahl.String = *params.Gruppenwahl
	} else {
		Gruppenwahl.Valid = false
	}
	if len(*params.InternTelefon1) > 0 {
		InternTelefon1.Valid = true
		InternTelefon1.String = *params.InternTelefon1
	} else {
		InternTelefon1.Valid = false
	}
	if len(*params.InternTelefon2) > 0 {
		InternTelefon2.Valid = true
		InternTelefon2.String = *params.InternTelefon2
	} else {
		InternTelefon2.Valid = false
	}
	if len(*params.FestnetzAlternativ) > 0 {
		FestnetzAlternativ.Valid = true
		FestnetzAlternativ.String = *params.FestnetzAlternativ
	} else {
		FestnetzAlternativ.Valid = false
	}
	if len(*params.FestnetzPrivat) > 0 {
		FestnetzPrivat.Valid = true
		FestnetzPrivat.String = *params.FestnetzPrivat
	} else {
		FestnetzPrivat.Valid = false
	}
	if len(*params.HomeOffice) > 0 {
		HomeOffice.Valid = true
		HomeOffice.String = *params.HomeOffice
	} else {
		HomeOffice.Valid = false
	}
	if len(*params.MobilBusiness) > 0 {
		MobilBusiness.Valid = true
		MobilBusiness.String = *params.MobilBusiness
	} else {
		MobilBusiness.Valid = false
	}
	if len(*params.MobilPrivat) > 0 {
		MobilPrivat.Valid = true
		MobilPrivat.String = *params.MobilPrivat
	} else {
		MobilPrivat.Valid = false
	}
	if len(*params.Email) > 0 {
		Email.Valid = true
		Email.String = *params.Email
	} else {
		Email.Valid = false
	}
	if len(*params.Geburtstag) > 0 {
		t, err := time.Parse("2006-01-02", *params.Geburtstag)
		if err != nil {
			Geburtstag.Valid = true
			Geburtstag.Time = t
		} else {
			Geburtstag.Valid = false
		}
	} else {
		Geburtstag.Valid = false
	}

	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("UPDATE Mitarbeiter SET Name = ?, Short = ?, Gruppenwahl = ?, InternTelefon1 = ?, InternTelefon2 = ?, FestnetzAlternativ = ?, FestnetzPrivat = ?, HomeOffice = ?, MobilBusiness = ?, MobilPrivat = ?, Email = ?, Azubi = ?, Geburtstag = ? WHERE id = ?;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return stmt.Exec(
		params.Name,
		Short,
		Gruppenwahl,
		InternTelefon1,
		InternTelefon2,
		FestnetzAlternativ,
		FestnetzPrivat,
		HomeOffice,
		MobilBusiness,
		MobilPrivat,
		Email,
		params.Azubi,
		Geburtstag,
		id,
	)
}

func (d Database) DeleteMitarbeiter(id string) (sql.Result, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	stmt, err := conn.Prepare("DELETE FROM Mitarbeiter WHERE id = ?;")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return stmt.Exec(id)
}
