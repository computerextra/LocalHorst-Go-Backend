package main

import (
	"golang-backend/db"
	"path/filepath"
)

var (
	RootPath = filepath.Join("inventur", "Data")
)

func (a *App) GetInventurYears() []db.InventurModel {
	res, err := a.database.Inventur.FindMany().Exec(a.ctx)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) GetDataFromYear(year string) []db.TeamModel {
	res, err := a.database.Team.FindMany(
		db.Team.InventurJahr.Equals(year),
	).With(
		db.Team.Artikel.Fetch(),
	).Exec(a.ctx)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) GetEntriesFromTeam(team int) []db.ArtikelModel {
	res, err := a.database.Artikel.FindMany(
		db.Artikel.TeamID.Equals(team),
	).Exec(a.ctx)
	if err != nil {
		return nil
	}
	return res
}
