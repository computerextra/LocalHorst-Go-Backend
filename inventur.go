package main

import (
	"path/filepath"
)

var (
	RootPath = filepath.Join("inventur", "Data")
)

func (a *App) GetInventurYears() []string {

	res, err := a.db.GetInventurYears()
	if err != nil {
		return nil
	}
	return res
}

func (a *App) GetDataFromYear(year string) []db.Team {

	res, err := a.db.GetDataFromYear(year)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) GetEntriesFromTeam(team int) []db.Artikel {

	res, err := a.db.GetEntriesFromTeam(int32(team))
	if err != nil {
		return nil
	}
	return res
}
