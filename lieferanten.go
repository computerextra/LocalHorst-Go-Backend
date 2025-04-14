package main

import (
	"golang-backend/db"
)

func (a *App) GetLieferanten() []db.Lieferant {
	database := db.New(a.config.DATABASE_URL)
	res, err := database.GetLieferanten()

	if err != nil {
		return nil
	}
	return res
}

func (a *App) GetLieferant(id string) *db.Lieferant {
	database := db.New(a.config.DATABASE_URL)
	res, err := database.GetLieferant(id)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) UpsertLieferant(params db.LieferantenParams, id *string) bool {
	database := db.New(a.config.DATABASE_URL)
	_, err := database.UpsertLieferant(params, id)

	return err == nil

}

func (a *App) DeleteLieferant(id string) bool {
	database := db.New(a.config.DATABASE_URL)
	_, err := database.DeleteLieferant(id)
	return err == nil
}

func (a *App) GetAnsprechpartner(id string) *db.Ansprechpartner {
	database := db.New(a.config.DATABASE_URL)
	res, err := database.GetAnsprechpartner(id)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) UpsertAnsprechpartner(id *string, params db.AnsprechpartnerParams) bool {
	database := db.New(a.config.DATABASE_URL)
	_, err := database.UpsertAnsprechpartner(params, id)
	return err == nil
}

func (a *App) DeleteAnsprechpartner(id string) bool {
	database := db.New(a.config.DATABASE_URL)
	_, err := database.DeleteAnsprechpartner(id)
	return err == nil
}
