package main

import (
	"golang-backend/db"
)

func (a *App) GetLieferanten() []db.LieferantenModel {
	res, err := a.database.Lieferanten.FindMany().With(
		db.Lieferanten.Anschprechpartner.Fetch(),
	).OrderBy(
		db.Lieferanten.Firma.Order(db.SortOrderAsc),
	).Exec(a.ctx)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) GetLieferant(id string) *db.LieferantenModel {
	res, err := a.database.Lieferanten.FindUnique(
		db.Lieferanten.ID.Equals(id),
	).With(
		db.Lieferanten.Anschprechpartner.Fetch(),
	).Exec(a.ctx)
	if err != nil {
		return nil
	}
	return res
}

type LieferantenParams struct {
	Firma        string
	Kundennummer *string
	Webseite     *string
}

func (a *App) UpsertLieferant(params LieferantenParams, id *string) bool {
	_, err := a.database.Lieferanten.UpsertOne(
		db.Lieferanten.ID.EqualsIfPresent(id),
	).Create(
		db.Lieferanten.Firma.Set(params.Firma),
		db.Lieferanten.Kundennummer.SetIfPresent(params.Kundennummer),
		db.Lieferanten.Webseite.SetIfPresent(params.Webseite),
	).Update(
		db.Lieferanten.Firma.Set(params.Firma),
		db.Lieferanten.Kundennummer.SetIfPresent(params.Kundennummer),
		db.Lieferanten.Webseite.SetIfPresent(params.Webseite),
	).Exec(a.ctx)

	return err == nil
}

func (a *App) DeleteLieferant(id string) bool {
	_, err := a.database.Lieferanten.FindUnique(
		db.Lieferanten.ID.Equals(id),
	).Delete().Exec(a.ctx)
	return err == nil
}

func (a *App) GetAnsprechpartner(id string) *db.AnschprechpartnerModel {
	res, err := a.database.Anschprechpartner.FindUnique(
		db.Anschprechpartner.ID.Equals(id),
	).Exec(a.ctx)
	if err != nil {
		return nil
	}
	return res
}

type AnsprechpartnerParams struct {
	Name    string
	Telefon *string
	Mobil   *string
	Mail    *string
}

func (a *App) UpsertAnsprechpartner(lieferantenId string, id *string, params AnsprechpartnerParams) bool {
	_, err := a.database.Anschprechpartner.UpsertOne(
		db.Anschprechpartner.ID.EqualsIfPresent(id),
	).Create(
		db.Anschprechpartner.Name.Set(params.Name),
		db.Anschprechpartner.Telefon.SetIfPresent(params.Telefon),
		db.Anschprechpartner.Mobil.SetIfPresent(params.Mobil),
		db.Anschprechpartner.Mail.SetIfPresent(params.Mail),
		db.Anschprechpartner.Lieferanten.Link(
			db.Lieferanten.ID.Equals(lieferantenId),
		),
	).Update(
		db.Anschprechpartner.Name.Set(params.Name),
		db.Anschprechpartner.Telefon.SetIfPresent(params.Telefon),
		db.Anschprechpartner.Mobil.SetIfPresent(params.Mobil),
		db.Anschprechpartner.Mail.SetIfPresent(params.Mail),
		db.Anschprechpartner.Lieferanten.Link(
			db.Lieferanten.ID.Equals(lieferantenId),
		),
	).Exec(a.ctx)

	return err == nil
}

func (a *App) DeleteAnsprechpartner(id string) bool {
	_, err := a.database.Anschprechpartner.FindUnique(
		db.Anschprechpartner.ID.Equals(id),
	).Delete().Exec(a.ctx)
	return err == nil
}
