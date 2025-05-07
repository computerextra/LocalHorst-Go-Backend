package main

import (
	"golang-backend/ent"
	"golang-backend/ent/mitarbeiter"
	"log"
	"sort"
	"strings"
	"time"
)

func (a *App) GetAllMitarbeiterWithoutMail() []*ent.Mitarbeiter {
	var ret []*ent.Mitarbeiter
	ma := a.GetAllMitarbeiter()

	for _, x := range ma {
		if len(*x.Email) < 1 {
			ret = append(ret, x)
		}
	}
	return ret
}

func (a *App) GetAllMitarbeiter() []*ent.Mitarbeiter {
	ma, err := a.db.Mitarbeiter.Query().Order(ent.Asc(mitarbeiter.FieldName)).All(a.ctx)

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

type Geburtstag struct {
	Name       string
	Geburtstag time.Time
	Diff       float64
}

type GeburtstagList struct {
	Vergangen []Geburtstag
	Heute     []Geburtstag
	Zukunft   []Geburtstag
}

func (a *App) GetGeburtstagsListe() GeburtstagList {
	var vergangen, heute, zukunft []Geburtstag
	location, _ := time.LoadLocation("Europe/Berlin")
	ma, _ := a.db.Mitarbeiter.
		Query().
		Where(
			mitarbeiter.GeburtstagGT(
				time.Date(0, 0, 0, 0, 0, 0, 0, location),
			),
		).
		All(a.ctx)

	for _, y := range ma {
		loc, _ := time.LoadLocation("Europe/Berlin")

		if y.Geburtstag != nil {
			newDate := time.Date(
				time.Now().Year(),
				y.Geburtstag.Month(),
				y.Geburtstag.Day(),
				time.Now().Hour(),
				time.Now().Minute(),
				time.Now().Second(),
				time.Now().Nanosecond(),
				loc,
			)
			duration := time.Since(newDate)
			days := duration.Hours() / 24
			if days < -1 {
				zukunft = append(zukunft, Geburtstag{
					Name:       y.Name,
					Geburtstag: newDate,
					Diff:       days,
				})

			} else if days == 0 {
				heute = append(heute, Geburtstag{
					Name:       y.Name,
					Geburtstag: newDate,
					Diff:       days,
				})
			} else {
				vergangen = append(vergangen, Geburtstag{
					Name:       y.Name,
					Geburtstag: newDate,
					Diff:       days,
				})
			}
		}

		sort.Slice(heute, func(i, j int) bool {
			return heute[i].Geburtstag.Before(heute[j].Geburtstag)
		})
		sort.Slice(vergangen, func(i, j int) bool {
			return vergangen[i].Geburtstag.Before(vergangen[j].Geburtstag)
		})
		sort.Slice(zukunft, func(i, j int) bool {
			return zukunft[i].Geburtstag.Before(zukunft[j].Geburtstag)
		})
	}

	return GeburtstagList{
		Vergangen: vergangen,
		Zukunft:   zukunft,
		Heute:     heute,
	}
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
	Day                int
	Month              int
	Year               int
}

func (a *App) UpsertMitarbeiter(params MitarbeiterParams) bool {
	var Geburtstag time.Time
	location, err := time.LoadLocation("Europe/Berlin")
	if err != nil {
		log.Fatal(err)
	}
	if params.Day > 0 && params.Month > 0 && params.Year > 0 {
		Geburtstag = time.Date(params.Year, time.Month(params.Month), params.Day, 0, 0, 0, 0, location)
	} else {
		Geburtstag = time.Date(0, 0, 0, 0, 0, 0, 0, location)
	}

	err = a.db.Mitarbeiter.
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
		SetEmail(strings.ToLower(params.Email)).
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
