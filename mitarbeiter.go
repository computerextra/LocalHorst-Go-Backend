package main

import (
	"golang-backend/ent"
	"golang-backend/ent/mitarbeiter"
	"log"
	"strconv"
	"strings"
	"time"
)

func (a *App) GetAllMitarbeiter() []*ent.Mitarbeiter {
	ma, err := a.db.Mitarbeiter.Query().All(a.ctx)

	// ma, err := a.db.GetAllMitarbeiter()
	if err != nil {
		return nil
	}
	return ma
}

func (a *App) GetMitarbeiter(id int) *ent.Mitarbeiter {
	ma, err := a.db.Mitarbeiter.Query().Where(mitarbeiter.ID(id)).Only(a.ctx)
	// ma, err := a.db.GetMitarbeiter(id)
	if err != nil {
		return nil
	}
	return ma
}

type MitarbeiterParams struct {
	Name               string
	Short              string
	Gruppenwahl        string
	InternTelefon1     string
	InternTelefon2     string
	FestnetzPrivat     string
	FestnetzAlternativ string
	HomeOffice         string
	MobilBusiness      string
	MobilPrivat        string
	Email              string
	Azubi              bool
	Geburtstag         string
}

func (a *App) UpsertMitarbeiter(params MitarbeiterParams) bool {
	var Geburtstag time.Time

	if len(params.Geburtstag) > 0 {
		splitted := strings.Split(params.Geburtstag, "-")
		year, err := strconv.Atoi(splitted[0])
		if err != nil {
			return false
		}
		month, err := strconv.Atoi(splitted[1])
		if err != nil {
			return false
		}
		day, err := strconv.Atoi(splitted[2])
		if err != nil {
			return false
		}
		Geburtstag = time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.Local)
	}

	err := a.db.Mitarbeiter.
		Create().
		SetName(params.Name).
		SetShort(params.Short).
		SetGruppenwahl(params.Gruppenwahl).
		SetInternTelefon1(params.InternTelefon1).
		SetInternTelefon2(params.InternTelefon2).
		SetFestnetzPrivat(params.FestnetzPrivat).
		SetFestnetzAlternativ(params.FestnetzAlternativ).
		SetHomeOffice(params.HomeOffice).
		SetMobilBusiness(params.MobilBusiness).
		SetMobilPrivat(params.MobilPrivat).
		SetAzubi(params.Azubi).
		SetGeburtstag(Geburtstag).
		SetEmail(params.Email).
		OnConflict().
		UpdateNewValues().
		Exec(a.ctx)

	if err != nil {
		log.Fatal(err)
	}

	// _, err := a.db.UpsertMitarbeiter(params, id)
	return err == nil
}

func (a *App) DeleteMitarbeiter(id int) bool {
	err := a.db.Mitarbeiter.DeleteOneID(id).Exec(a.ctx)

	// _, err := a.db.DeleteMitarbeiter(id)
	return err == nil
}

func (a *App) GetMitarbeiterIdByName(name string) int {
	ma, err := a.db.Mitarbeiter.Query().Where(mitarbeiter.Name(name)).Only(a.ctx)

	// ma, err := a.db.GetMitarbeiterIdByName(name)
	if err != nil {
		return 0
	}
	return ma.ID
}
