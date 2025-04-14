package db

import (
	"database/sql"
	"time"

	"github.com/lucsky/cuid"
)

type Einkauf struct {
	Id            string
	Paypal        bool
	Abonniert     bool
	Geld          sql.NullString
	Pfand         sql.NullString
	Dinge         sql.NullString
	MitarbeiterId string
	Abgeschickt   time.Time
	Bild1         sql.NullString
	Bild2         sql.NullString
	Bild3         sql.NullString
	Bild1Date     sql.NullTime
	Bild2Date     sql.NullTime
	Bild3Date     sql.NullTime
	Mitarbeiter   Mitarbeiter
}

func (d Database) GetEinkaufsliste() ([]Einkauf, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	rows, err := conn.Query(
		"SELECT id, Paypal, Abonniert, Geld, Dinge, mitarbeiterId, Abgeschickt, Bild1, Bild2, Bild3, Bild1Date, Bild2Date, Bild3Date FROM Einkauf WHERE DATE(Abgeschickt) = curdate() OR Abonniert = 1 ORDER BY Abgeschickt ASC;",
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []Einkauf
	for rows.Next() {
		var x Einkauf
		if err := rows.Scan(
			&x.Id,
			&x.Paypal,
			&x.Abonniert,
			&x.Geld,
			&x.Dinge,
			&x.MitarbeiterId,
			&x.Abgeschickt,
			&x.Bild1,
			&x.Bild2,
			&x.Bild3,
			&x.Bild1Date,
			&x.Bild2Date,
			&x.Bild3Date,
		); err != nil {
			return nil, err
		}
		res = append(res, x)
	}

	for idx, x := range res {
		ma, err := d.GetMitarbeiter(x.MitarbeiterId)
		if err != nil {
			continue
		}
		res[idx].Mitarbeiter = *ma
	}

	return res, nil
}

type UpsertEinkaufParams struct {
	Paypal        *bool
	Abonniert     *bool
	Geld          *string
	Pfand         *string
	Dinge         *string
	Bild1         *string
	Bild2         *string
	Bild3         *string
	MitarbeiterId string
}

func (d Database) UpsertEinkauf(params UpsertEinkaufParams, id *string) (sql.Result, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	var Paypal bool
	var Abonniert bool

	if *params.Abonniert {
		Abonniert = true
	} else {
		Abonniert = false
	}
	if *params.Paypal {
		Paypal = true
	} else {
		Paypal = false
	}

	var Geld sql.NullString
	if len(*params.Geld) > 0 {
		Geld.Valid = true
		Geld.String = *params.Geld
	} else {
		Geld.Valid = false
	}

	var Pfand sql.NullString
	if len(*params.Pfand) > 0 {
		Pfand.Valid = true
		Pfand.String = *params.Pfand
	} else {
		Pfand.Valid = false
	}

	var Dinge string
	if len(*params.Dinge) > 0 {
		Dinge = *params.Dinge
	} else {
		Dinge = ""
	}
	var Bild1 sql.NullString
	if len(*params.Bild1) > 0 {
		Bild1.Valid = true
		Bild1.String = *params.Bild1
	} else {
		Bild1.Valid = false
	}
	var Bild2 sql.NullString
	if len(*params.Bild2) > 0 {
		Bild2.Valid = true
		Bild2.String = *params.Bild2
	} else {
		Bild2.Valid = false
	}
	var Bild3 sql.NullString
	if len(*params.Bild3) > 0 {
		Bild3.Valid = true
		Bild3.String = *params.Bild3
	} else {
		Bild3.Valid = false
	}
	var Bild1Date sql.NullTime
	if Bild1.Valid {
		Bild1Date.Valid = true
		Bild1Date.Time = time.Now()
	} else {
		Bild1Date.Valid = false
	}
	var Bild2Date sql.NullTime
	if Bild2.Valid {
		Bild2Date.Valid = true
		Bild2Date.Time = time.Now()
	} else {
		Bild2Date.Valid = false
	}
	var Bild3Date sql.NullTime
	if Bild3.Valid {
		Bild3Date.Valid = true
		Bild3Date.Time = time.Now()
	} else {
		Bild3Date.Valid = false
	}

	if len(*id) > 0 {
		// Update
		return conn.Exec(
			"UPDATE Einkauf SET Paypal = :paypal, Abonniert = :abonniert, Geld = :geld, Pfand = :pfand, Dinge = :dinge, Abgeschickt = NOW(), Bild1 = :bild1, Bild2 = :bild2, Bild3 = :bild3, Bild1Date = :bild1date, Bild2Date = :bild2date, Bild3Date = :bild3date WHERE id = :mitarbeiterid;",
			sql.Named("paypal", Paypal),
			sql.Named("abonniert", Abonniert),
			sql.Named("geld", Geld),
			sql.Named("pfand", Pfand),
			sql.Named("dinge", Dinge),
			sql.Named("bild1", Bild1),
			sql.Named("bild2", Bild2),
			sql.Named("bild3", Bild3),
			sql.Named("bild1date", Bild1Date),
			sql.Named("bild2date", Bild2Date),
			sql.Named("bild3date", Bild3Date),
			sql.Named("id", *id),
		)
	} else {
		// Create
		return conn.Exec(
			"INSERT INTO Einkauf ( id, Paypal, Abonniert, Geld, Pfand, Dinge, mitarbeiterId, Abgeschickt, Bild1, Bild2, Bild3, Bild1Date, Bild2Date, Bild3Date) VALUES (:id, :Paypal, :Abonniert, :Geld, :Pfand, :Dinge, :mitarbeiterId, NOW(), :Bild1, :Bild2, :Bild3, :Bild1Date, :Bild2Date, :Bild3Date);",
			sql.Named("id", cuid.New()),
			sql.Named("Paypal", Paypal),
			sql.Named("Abonniert", Abonniert),
			sql.Named("Geld", Geld),
			sql.Named("Pfand", Pfand),
			sql.Named("Dinge", Dinge),
			sql.Named("mitarbeiterId", params.MitarbeiterId),
			sql.Named("Bild1", Bild1),
			sql.Named("Bild2", Bild2),
			sql.Named("Bild3", Bild3),
			sql.Named("Bild1Date", Bild1Date),
			sql.Named("Bild2Date", Bild2Date),
			sql.Named("Bild3Date", Bild3Date),
		)

	}
}

func (d Database) GetEinkauf(id string) (*Einkauf, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	rows, err := conn.Query(
		"SELECT id, Paypal, Abonniert, Geld, Dinge, mitarbeiterId, Abgeschickt, Bild1, Bild2, Bild3, Bild1Date, Bild2Date, Bild3Date FROM Einkauf WHERE mitarbeiterid = :mitarbeiterId;",
		sql.Named("mitarbeiterId", id),
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var x Einkauf
	for rows.Next() {
		if err := rows.Scan(
			&x.Id,
			&x.Paypal,
			&x.Abonniert,
			&x.Geld,
			&x.Dinge,
			&x.MitarbeiterId,
			&x.Abgeschickt,
			&x.Bild1,
			&x.Bild2,
			&x.Bild3,
			&x.Bild1Date,
			&x.Bild2Date,
			&x.Bild3Date,
		); err != nil {
			return nil, err
		}
	}
	ma, err := d.GetMitarbeiter(x.MitarbeiterId)
	if err == nil {
		x.Mitarbeiter = *ma
	}
	return &x, nil
}

func (d Database) SkipEinkauf(id string) (sql.Result, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()
	return conn.Exec(
		"UPDATE Einkauf SET Abgeschickt = DATE_ADD(NOW(), INTERVAL 1 DAY) WHERE mitarbeiterId = :mitarbeiterId;",
		sql.Named("mitarbeiterId", id),
	)
}

func (d Database) DeleteEinkauf(id string) (sql.Result, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()
	return conn.Exec(
		"DELETE FROM Einkauf WHERE mitarbeiterId = :mitarbeiterId;",
		sql.Named("mitarbeiterId", id),
	)
}
