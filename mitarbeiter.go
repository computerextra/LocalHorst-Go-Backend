package main

import (
	"fmt"
	"golang-backend/db"
	"time"
)

func (a *App) GetAllMitarbeiter() []db.MitarbeiterModel {
	ma, err := a.database.Mitarbeiter.
		FindMany().
		OrderBy(
			db.Mitarbeiter.Name.Order(
				db.SortOrderAsc,
			),
		).
		With(db.Mitarbeiter.Einkauf.Fetch()).Exec(a.ctx)
	if err != nil {
		return nil
	}
	return ma
}

func (a *App) GetMitarbeiter(id string) *db.MitarbeiterModel {
	ma, err := a.database.Mitarbeiter.FindUnique(
		db.Mitarbeiter.ID.Equals(id),
	).With(db.Mitarbeiter.Einkauf.Fetch()).Exec(a.ctx)
	if err != nil {
		return nil
	}
	return ma
}

type MitarbeiterParams struct {
	Name               string
	Short              *string
	Gruppenwahl        *string
	InternTelefon1     *string
	InternTelefon2     *string
	FestnetzAlternativ *string
	FestnetzPrivat     *string
	HomeOffice         *string
	MobilBusiness      *string
	MobilPrivat        *string
	Email              *string
	Azubi              *bool
	Geburtstag         *string
}

func (a *App) UpsertMitarbeiter(params MitarbeiterParams, id *string) bool {
	var geb *time.Time
	if len(*params.Geburtstag) > 1 {
		tmp, _ := time.Parse(time.RFC3339, fmt.Sprintf("%sT00:00:00Z", *params.Geburtstag))
		geb = &tmp
	}
	_, err := a.database.Mitarbeiter.UpsertOne(
		db.Mitarbeiter.ID.EqualsIfPresent(id),
	).Create(
		db.Mitarbeiter.Name.Set(params.Name),
		db.Mitarbeiter.Short.SetIfPresent(params.Short),
		db.Mitarbeiter.Gruppenwahl.SetIfPresent(params.Gruppenwahl),
		db.Mitarbeiter.InternTelefon1.SetIfPresent(params.InternTelefon1),
		db.Mitarbeiter.InternTelefon2.SetIfPresent(params.InternTelefon2),
		db.Mitarbeiter.FestnetzAlternativ.SetIfPresent(params.FestnetzAlternativ),
		db.Mitarbeiter.FestnetzPrivat.SetIfPresent(params.FestnetzPrivat),
		db.Mitarbeiter.HomeOffice.SetIfPresent(params.HomeOffice),
		db.Mitarbeiter.MobilBusiness.SetIfPresent(params.MobilBusiness),
		db.Mitarbeiter.MobilPrivat.SetIfPresent(params.MobilPrivat),
		db.Mitarbeiter.Email.SetIfPresent(params.Email),
		db.Mitarbeiter.Azubi.SetIfPresent(params.Azubi),
		db.Mitarbeiter.Geburtstag.SetIfPresent(geb),
	).Update(
		db.Mitarbeiter.Name.Set(params.Name),
		db.Mitarbeiter.Short.SetIfPresent(params.Short),
		db.Mitarbeiter.Gruppenwahl.SetIfPresent(params.Gruppenwahl),
		db.Mitarbeiter.InternTelefon1.SetIfPresent(params.InternTelefon1),
		db.Mitarbeiter.InternTelefon2.SetIfPresent(params.InternTelefon2),
		db.Mitarbeiter.FestnetzAlternativ.SetIfPresent(params.FestnetzAlternativ),
		db.Mitarbeiter.FestnetzPrivat.SetIfPresent(params.FestnetzPrivat),
		db.Mitarbeiter.HomeOffice.SetIfPresent(params.HomeOffice),
		db.Mitarbeiter.MobilBusiness.SetIfPresent(params.MobilBusiness),
		db.Mitarbeiter.MobilPrivat.SetIfPresent(params.MobilPrivat),
		db.Mitarbeiter.Email.SetIfPresent(params.Email),
		db.Mitarbeiter.Azubi.SetIfPresent(params.Azubi),
		db.Mitarbeiter.Geburtstag.SetIfPresent(geb),
	).Exec(a.ctx)
	return err == nil
}

func (a *App) DeleteMitarbeiter(id string) bool {
	_, err := a.database.Mitarbeiter.FindUnique(
		db.Mitarbeiter.ID.Equals(id),
	).Delete().Exec(a.ctx)
	return err == nil
}
