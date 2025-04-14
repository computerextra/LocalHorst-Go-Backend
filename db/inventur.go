package db

import "database/sql"

func (d Database) GetInventurYears() ([]string, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	rows, err := conn.Query(
		"SELECT Jahr FROM Inventur ORDER BY Jahr ASC;",
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []string
	for rows.Next() {
		var x string
		if err := rows.Scan(
			&x,
		); err != nil {
			return nil, err
		}
		res = append(res, x)
	}
	return res, nil
}

type Team struct {
	Id           int32
	Mitarbeiter  string
	Farbe        string
	Ort          string
	InventurJahr string
	Artikel      []Artikel
}
type Artikel struct {
	Id            int32
	Artikelnummer string
	Suchbegriff   string
	Anzahl        int32
	TeamId        int32
}

func (d Database) GetDataFromYear(year string) ([]Team, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	rows, err := conn.Query(
		"SELECT id, Mitarbeiter, Farbe, Ort, inventurJahr FROM Team WHERE inventurJahr = :jahr;",
		sql.Named("jahr", year),
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []Team
	for rows.Next() {
		var x Team
		if err := rows.Scan(
			&x.Id,
			&x.Mitarbeiter,
			&x.Farbe,
			&x.Ort,
			&x.InventurJahr,
		); err != nil {
			return nil, err
		}
		res = append(res, x)
	}

	for idx, team := range res {
		rowsArtikel, err := d.GetEntriesFromTeam(team.Id)
		if err != nil {
			continue
		}
		res[idx].Artikel = rowsArtikel
	}

	return res, nil
}

func (d Database) GetEntriesFromTeam(id int32) ([]Artikel, error) {
	conn, err := getConnection(d.connectionString)
	if err != nil {
		return nil, err
	}
	defer conn.Close()

	rows, err := conn.Query(
		"SELECT id, Artikelnummer, Suchbegriff, Anzahl, teamId FROM Artikel WHERE teamId = :teamID;",
		sql.Named("teamID", id),
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var res []Artikel
	for rows.Next() {
		var x Artikel
		if err := rows.Scan(
			&x.Id,
			&x.Artikelnummer,
			&x.Suchbegriff,
			&x.Anzahl,
			&x.TeamId,
		); err != nil {
			return nil, err
		}
		res = append(res, x)
	}
	return res, nil
}
