package main

import (
	"crypto/tls"
	"fmt"
	"golang-backend/db"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	gomail "gopkg.in/mail.v2"
)

func (a *App) GetEinkaufsListe() []db.EinkaufModel {
	loc, _ := time.LoadLocation("Europe/Berlin")
	year, month, day := time.Now().In(loc).Date()
	yesterday := time.Date(year, month, day, 0, 0, 0, 0, loc).AddDate(0, 0, -1)
	res, err := a.database.Einkauf.FindMany(
		db.Einkauf.And(
			db.Einkauf.Abgeschickt.BeforeEquals(time.Now()),
			db.Einkauf.Abgeschickt.After(yesterday),
		),
	).With(
		db.Einkauf.Mitarbeiter.Fetch(),
	).Exec(a.ctx)

	if err != nil {
		return nil
	}
	return res
}

type EinkaufResponse struct {
	MitarbeiterId string
	Dinge         string
	Pfand         string
	Geld          string
	Paypal        bool
	Abonniert     bool
	Bild1         string
	Bild2         string
	Bild3         string
}

func (a *App) UpdateEinkauf(values EinkaufResponse) bool {
	if len(values.MitarbeiterId) == 0 {
		return false
	}

	var Bild1 string
	var Bild2 string
	var Bild3 string
	var Bild1Date time.Time
	var Bild2Date time.Time
	var Bild3Date time.Time

	if len(values.Bild1) > 0 {
		Bild1Date = time.Now()
		Bild1 = values.Bild1
	}
	if len(values.Bild2) > 0 {
		Bild2Date = time.Now()
		Bild2 = values.Bild2
	}
	if len(values.Bild3) > 0 {
		Bild3Date = time.Now()
		Bild3 = values.Bild3
	}

	_, err := a.database.Einkauf.UpsertOne(
		db.Einkauf.MitarbeiterID.Equals(values.MitarbeiterId),
	).Create(
		db.Einkauf.Paypal.Set(values.Paypal),
		db.Einkauf.Abonniert.Set(values.Abonniert),
		db.Einkauf.Mitarbeiter.Link(db.Mitarbeiter.ID.Equals(values.MitarbeiterId)),
		db.Einkauf.Dinge.Set(values.Dinge),
		db.Einkauf.Geld.Set(values.Geld),
		db.Einkauf.Pfand.Set(values.Pfand),
		db.Einkauf.Bild1.SetIfPresent(&Bild1),
		db.Einkauf.Bild2.SetIfPresent(&Bild2),
		db.Einkauf.Bild3.SetIfPresent(&Bild3),
		db.Einkauf.Bild1Date.SetIfPresent(&Bild1Date),
		db.Einkauf.Bild2Date.SetIfPresent(&Bild2Date),
		db.Einkauf.Bild3Date.SetIfPresent(&Bild3Date),
		db.Einkauf.Abgeschickt.Set(time.Now()),
	).Update(
		db.Einkauf.Paypal.Set(values.Paypal),
		db.Einkauf.Abonniert.Set(values.Abonniert),
		db.Einkauf.Dinge.Set(values.Dinge),
		db.Einkauf.Geld.Set(values.Geld),
		db.Einkauf.Pfand.Set(values.Pfand),
		db.Einkauf.Bild1.SetIfPresent(&Bild1),
		db.Einkauf.Bild2.SetIfPresent(&Bild2),
		db.Einkauf.Bild3.SetIfPresent(&Bild3),
		db.Einkauf.Bild1Date.SetIfPresent(&Bild1Date),
		db.Einkauf.Bild2Date.SetIfPresent(&Bild2Date),
		db.Einkauf.Bild3Date.SetIfPresent(&Bild3Date),
		db.Einkauf.Abgeschickt.Set(time.Now()),
	).Exec(a.ctx)

	return err == nil
}

func (a *App) UploadImage(mitarbeiter string, imageNr string) string {
	file, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Bilder",
				Pattern:     "*.jpg,*.png,*.jpeg,*.gif",
			},
		},
	})
	if err != nil {
		return err.Error()
	}
	if len(file) == 0 {
		return "No file selected"
	}
	data, err := os.ReadFile(file)
	if err != nil {
		return err.Error()
	}
	fileSuffix := filepath.Ext(file)
	fileName := fmt.Sprintf("%s-%s.%s", mitarbeiter, imageNr, fileSuffix)
	err = os.WriteFile(fileName, data, 0644)
	if err != nil {
		return err.Error()
	}
	return fileName
}

func (a *App) GetEinkauf(id string) *db.MitarbeiterModel {
	res, err := a.database.Mitarbeiter.FindFirst(
		db.Mitarbeiter.ID.Equals(id),
	).With(
		db.Mitarbeiter.Einkauf.Fetch(),
	).Exec(a.ctx)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) SkipEinkauf(id string) bool {
	_, err := a.database.Einkauf.FindUnique(
		db.Einkauf.MitarbeiterID.Equals(id),
	).Update(
		db.Einkauf.Abgeschickt.Set(time.Now().Add(24 * time.Hour)),
	).Exec(a.ctx)

	return err == nil
}

func (a *App) DeleteEinkauf(id string) bool {
	_, err := a.database.Einkauf.FindUnique(
		db.Einkauf.MitarbeiterID.Equals(id),
	).Delete().Exec(a.ctx)
	return err == nil
}

func (a *App) SendAbrechnung(Name, Betrag, Mail string) bool {
	Name = strings.Replace(Name, "@", "", -1)

	body := "<!DOCTYPE html><html lang=\"de\"><head><meta charset=\"UTF-8\" />"
	body = fmt.Sprintf("%s<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />", body)
	body = fmt.Sprintf("%s<title>Paypal Abrechnung</title></head><body> <h1>Paypal Abrechnung</h1>", body)
	body = fmt.Sprintf("%s<p>Bitte Bezahle %s€ über Paypal.</p>", body, Betrag)
	body = fmt.Sprintf("%s<p>Link: <a href=\"http://paypal.me/%s/%s\">", body, Name, Betrag)
	body = fmt.Sprintf("%shttp://paypal.me/%s/%s</a></p></body></html>", body, Name, Betrag)

	m := gomail.NewMessage()
	m.SetHeader("From", a.config.MAIL_FROM)
	m.SetHeader("To", Mail)
	m.SetHeader("Subject", "PayPal Abrechnung")
	m.SetBody("text/html", body)

	d := gomail.NewDialer(a.config.MAIL_SERVER, a.config.MAIL_PORT, a.config.MAIL_USER, a.config.MAIL_PASSWORD)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	err := d.DialAndSend(m)
	return err == nil
}
