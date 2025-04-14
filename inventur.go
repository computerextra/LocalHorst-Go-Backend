package main

import (
	"golang-backend/db"
	"path/filepath"
)

var (
	RootPath = filepath.Join("inventur", "Data")
)

func (a *App) GetInventurYears() []string {
	database := db.New(a.config.DATABASE_URL)
	res, err := database.GetInventurYears()
	if err != nil {
		return nil
	}
	return res
}

func (a *App) GetDataFromYear(year string) []db.Team {
	database := db.New(a.config.DATABASE_URL)
	res, err := database.GetDataFromYear(year)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) GetEntriesFromTeam(team int) []db.Artikel {
	database := db.New(a.config.DATABASE_URL)
	res, err := database.GetEntriesFromTeam(int32(team))
	if err != nil {
		return nil
	}
	return res
}
