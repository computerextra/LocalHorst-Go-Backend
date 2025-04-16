package main

import (
	"golang-backend/db"
)

func (a *App) GetAllMitarbeiter() []db.Mitarbeiter {

	ma, err := a.db.GetAllMitarbeiter()
	if err != nil {
		return nil
	}
	return ma
}

func (a *App) GetMitarbeiter(id string) *db.Mitarbeiter {

	ma, err := a.db.GetMitarbeiter(id)
	if err != nil {
		return nil
	}
	return ma
}

func (a *App) UpsertMitarbeiter(params db.MitarbeiterParams, id *string) bool {

	_, err := a.db.UpsertMitarbeiter(params, id)
	return err == nil
}

func (a *App) DeleteMitarbeiter(id string) bool {

	_, err := a.db.DeleteMitarbeiter(id)
	return err == nil
}

func (a *App) GetMitarbeiterIdByName(name string) string {

	ma, err := a.db.GetMitarbeiterIdByName(name)
	if err != nil {
		return ""
	}
	return ma
}
