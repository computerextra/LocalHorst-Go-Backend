package main

import (
	"golang-backend/ent"
	"golang-backend/ent/inventur"
	"golang-backend/ent/team"
	"path/filepath"
)

var (
	RootPath = filepath.Join("inventur", "Data")
)

func (a *App) GetInventurYears() []*ent.Inventur {
	res, err := a.db.Inventur.Query().All(a.ctx)

	// res, err := a.db.GetInventurYears()
	if err != nil {
		return nil
	}
	return res
}

func (a *App) GetDataFromYear(year int) []*ent.Team {
	found, err := a.db.Inventur.Query().Where(inventur.JahrEQ(year)).Only(a.ctx)
	if err != nil {
		return nil
	}
	res, err := found.QueryTeams().All(a.ctx)
	// res, err := a.db.GetDataFromYear(year)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) GetEntriesFromTeam(teamId int) []*ent.Artikel {
	t, err := a.db.Team.Query().Where(team.TeamEQ(teamId)).Only(a.ctx)
	if err != nil {
		return nil
	}
	res, err := t.QueryArtikel().All(a.ctx)

	if err != nil {
		return nil
	}
	return res
}
