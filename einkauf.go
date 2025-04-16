package main

import (
	"crypto/tls"
	"encoding/base64"
	"fmt"
	"golang-backend/db"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/lucsky/cuid"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	gomail "gopkg.in/mail.v2"
)

func (a *App) GetEinkaufsListe() []db.EinkaufModel {
	res, err := a.db.Einkauf.FindMany(
		db.Einkauf.Or(
			db.Einkauf.Abonniert.Equals(true),
			db.Einkauf.And(
				db.Einkauf.Abgeschickt.BeforeEquals(time.Now()),
				db.Einkauf.Abgeschickt.After(
					time.Date(
						time.Now().Year(),
						time.Now().Month(),
						time.Now().Add(
							time.Duration(-24)*time.Hour,
						).Day(),
						0,
						0,
						0,
						0,
						time.Local,
					),
				),
			),
		),
	).With(
		db.Einkauf.Mitarbeiter.Fetch(),
	).Exec(a.ctx)

	// res, err := a.db.GetEinkaufsliste()
	if err != nil {
		return nil
	}
	return res
}

type UpsertEinkaufParams struct {
	Paypal        bool
	Abonniert     bool
	Geld          string
	Pfand         string
	Dinge         string
	Bild1         string
	Bild2         string
	Bild3         string
	MitarbeiterId string
}

func (a *App) UpdateEinkauf(values UpsertEinkaufParams, id *string) bool {

	var Bild1 string
	if len(values.Bild1) > 0 {

		Bild1 = values.Bild1
	}
	var Bild2 string
	if len(values.Bild2) > 0 {

		Bild2 = values.Bild2
	}
	var Bild3 string
	if len(values.Bild3) > 0 {

		Bild3 = values.Bild3
	}
	var Bild1Date db.DateTime
	if len(Bild1) > 0 {
		Bild1Date = time.Now()
	}

	var Bild2Date db.DateTime
	if len(Bild2) > 0 {
		Bild2Date = time.Now()
	}

	var Bild3Date db.DateTime
	if len(Bild3) > 0 {
		Bild3Date = time.Now()
	}

	_, err := a.db.Einkauf.UpsertOne(
		db.Einkauf.MitarbeiterID.Equals(values.MitarbeiterId),
	).Create(
		db.Einkauf.ID.Set(cuid.New()),
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
		db.Einkauf.Abgeschickt.Set(time.Now()),
		db.Einkauf.Paypal.Set(values.Paypal),
		db.Einkauf.Abonniert.Set(values.Abonniert),
		db.Einkauf.Geld.Set(values.Geld),
		db.Einkauf.Pfand.Set(values.Pfand),
		db.Einkauf.Dinge.Set(values.Dinge),
		db.Einkauf.Bild1.SetIfPresent(&Bild1),
		db.Einkauf.Bild2.SetIfPresent(&Bild2),
		db.Einkauf.Bild3.SetIfPresent(&Bild3),
		db.Einkauf.Bild1Date.SetIfPresent(&Bild1Date),
		db.Einkauf.Bild2Date.SetIfPresent(&Bild2Date),
		db.Einkauf.Bild3Date.SetIfPresent(&Bild3Date),
	).Exec(a.ctx)

	// _, err := a.db.UpsertEinkauf(values, id)
	return err == nil
}

func (a *App) UploadImage(mitarbeiter string, imageNr string) string {
	file, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Bilder",
				Pattern:     "*.jpg;*.png;*.jpeg;*.gif",
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
	filePath := filepath.Join(a.config.UPLOAD_FOLDER, fileName)
	err = os.WriteFile(filePath, data, 0644)
	if err != nil {
		return err.Error()
	}
	return fileName
}

func (a *App) GetEinkauf(id string) *db.EinkaufModel {

	res, err := a.db.Einkauf.FindUnique(db.Einkauf.ID.Equals(id)).Exec(a.ctx)

	// res, err := a.db.GetEinkauf(id)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) SkipEinkauf(id string) bool {

	_, err := a.db.Einkauf.FindUnique(
		db.Einkauf.ID.Equals(id),
	).Update(
		db.Einkauf.Abgeschickt.Set(time.Now().Add(time.Duration(24) * time.Hour)),
	).Exec(a.ctx)
	// _, err := a.db.SkipEinkauf(id)
	return err == nil
}

func (a *App) DeleteEinkauf(id string) bool {

	_, err := a.db.Einkauf.FindUnique(
		db.Einkauf.ID.Equals(id),
	).Delete().Exec(a.ctx)

	// _, err := a.db.DeleteEinkauf(id)
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

type ImageResponse struct {
	Valid bool
	Image string
}

func (a *App) CheckImage(id string, Nr string) ImageResponse {
	ma, err := a.db.Einkauf.FindUnique(db.Einkauf.ID.Equals(id)).Exec(a.ctx)

	// ma, err := a.db.GetEinkauf(id)
	if err != nil {
		return ImageResponse{
			Valid: false,
		}
	}
	switch Nr {
	case "1":
		bild, bild_ok := ma.Bild1()
		date, date_ok := ma.Bild1Date()
		if bild_ok && date_ok {
			return checkImage(date, filepath.Join(a.config.UPLOAD_FOLDER, bild))
		}
	case "2":
		bild, bild_ok := ma.Bild2()
		date, date_ok := ma.Bild2Date()
		if bild_ok && date_ok {
			return checkImage(date, filepath.Join(a.config.UPLOAD_FOLDER, bild))
		}
	case "3":
		bild, bild_ok := ma.Bild3()
		date, date_ok := ma.Bild3Date()
		if bild_ok && date_ok {
			return checkImage(date, filepath.Join(a.config.UPLOAD_FOLDER, bild))
		}
	}
	return ImageResponse{
		Valid: false,
	}
}

func checkImage(date time.Time, data string) ImageResponse {
	res := ImageResponse{}
	loc, _ := time.LoadLocation("Europe/Berlin")
	new := time.Date(date.Year(), date.Month(), date.Day(), time.Now().Hour(), time.Now().Minute(), time.Now().Second(), time.Now().Nanosecond(), loc)
	duration := time.Since(new)
	days := duration.Hours() / 24
	if days == 0 {
		res.Valid = true
		res.Image = imageToBase64(data)
	} else {
		res.Valid = false
		res.Image = ""
	}
	return res
}

func imageToBase64(path string) string {
	bytes, err := os.ReadFile(path)
	if err != nil {
		return ""
	}

	var base64Encoding string
	mimeType := http.DetectContentType(bytes)
	switch mimeType {
	case "image/jpg":
		base64Encoding = "data:image/jpg;base64,"
	case "image/jpeg":
		base64Encoding = "data:image/jpeg;base64,"
	case "image/png":
		base64Encoding = "data:image/png;base64,"
	}
	base64Encoding += base64.StdEncoding.EncodeToString(bytes)
	return base64Encoding
}
