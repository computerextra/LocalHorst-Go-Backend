package main

import (
	"golang-backend/db"
)

func (a *App) GetAllMitarbeiter() []db.Mitarbeiter {
	database := db.New(a.config.DATABASE_URL)
	ma, err := database.GetAllMitarbeiter()
	if err != nil {
		return nil
	}
	return ma
}

func (a *App) GetMitarbeiter(id string) *db.Mitarbeiter {
	database := db.New(a.config.DATABASE_URL)
	ma, err := database.GetMitarbeiter(id)
	if err != nil {
		return nil
	}
	return ma
}

func (a *App) UpsertMitarbeiter(params db.MitarbeiterParams, id *string) bool {
	database := db.New(a.config.DATABASE_URL)
	_, err := database.UpsertMitarbeiter(params, id)
	return err == nil
}

func (a *App) DeleteMitarbeiter(id string) bool {
	database := db.New(a.config.DATABASE_URL)
	_, err := database.DeleteMitarbeiter(id)
	return err == nil
}

func (a *App) GetMitarbeiterIdByName(name string) string {
	databas := db.New(a.config.DATABASE_URL)
	ma, err := databas.GetMitarbeiterIdByName(name)
	if err != nil {
		return ""
	}
	return ma
}
