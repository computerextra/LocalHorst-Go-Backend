package main

import (
	"golang-backend/ent"
	"golang-backend/ent/ansprechpartner"
	"golang-backend/ent/lieferant"
)

type Lieferant struct {
	*ent.Lieferant
	Ansprechpartner []*ent.Ansprechpartner
}

func (a *App) GetLieferanten() []Lieferant {
	res, err := a.db.Lieferant.Query().All(a.ctx)

	var Lieferanten []Lieferant

	for _, x := range res {
		ap, err := x.QueryAnsprechpartner().All(a.ctx)
		if err != nil {
			continue
		}
		Lieferanten = append(Lieferanten, Lieferant{
			x,
			ap,
		})
	}

	if err != nil {
		return nil
	}
	return Lieferanten
}

func (a *App) GetLieferant(id int) *Lieferant {

	res, err := a.db.Lieferant.Query().Where(lieferant.ID(id)).Only(a.ctx)
	if err != nil {
		return nil
	}
	ap, err := res.QueryAnsprechpartner().All(a.ctx)
	if err != nil {
		return nil
	}
	return &Lieferant{
		res,
		ap,
	}
}

type LieferantenParams struct {
	Firma        string
	Kundennummer string
	Webseite     string
}

func (a *App) UpsertLieferant(params LieferantenParams) bool {
	err := a.db.Lieferant.
		Create().
		SetFirma(params.Firma).
		SetKundennummer(params.Kundennummer).
		SetWebseite(params.Webseite).
		OnConflict().
		UpdateNewValues().
		Exec(a.ctx)

	// _, err := a.db.UpsertLieferant(params, id)

	return err == nil

}

func (a *App) DeleteLieferant(id int) bool {
	err := a.db.Lieferant.DeleteOneID(id).Exec(a.ctx)

	// _, err := a.db.DeleteLieferant(id)
	return err == nil
}

func (a *App) GetAnsprechpartner(id int) *ent.Ansprechpartner {
	res, err := a.db.Ansprechpartner.Query().Where(ansprechpartner.ID(id)).Only(a.ctx)
	// res, err := a.db.GetAnsprechpartner(id)
	if err != nil {
		return nil
	}
	return res
}

type AnsprechpartnerParams struct {
	Mail          string
	Mobil         string
	Telefon       string
	Name          string
	LieferantenId int
}

func (a *App) UpsertAnsprechpartner(params AnsprechpartnerParams) bool {
	err := a.db.Ansprechpartner.
		Create().
		SetMail(params.Mail).
		SetMobil(params.Mobil).
		SetTelefon(params.Telefon).
		SetName(params.Name).
		SetLieferantID(params.LieferantenId).
		OnConflict().
		UpdateNewValues().
		Exec(a.ctx)

	// _, err := a.db.UpsertAnsprechpartner(params, id)
	return err == nil
}

func (a *App) DeleteAnsprechpartner(id int) bool {
	err := a.db.Ansprechpartner.DeleteOneID(id).Exec(a.ctx)

	// _, err := a.db.DeleteAnsprechpartner(id)
	return err == nil
}
