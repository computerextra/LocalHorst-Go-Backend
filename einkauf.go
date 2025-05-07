package main

import (
	"crypto/tls"
	"encoding/base64"
	"fmt"
	"golang-backend/ent"
	"golang-backend/ent/mitarbeiter"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	gomail "gopkg.in/gomail.v2"
)

type ImageResponse struct {
	Valid bool
	Image string
}

type Einkauf struct {
	*ent.Mitarbeiter
	Bild1Data ImageResponse
	Bild2Data ImageResponse
	Bild3Data ImageResponse
}

func (a *App) GetEinkaufsListe() []Einkauf {
	var EinkaufsListe []Einkauf
	now := time.Now()
	yesterday := now.Add(time.Duration(-24) * time.Hour)
	res, err := a.db.Mitarbeiter.Query().
		Where(
			mitarbeiter.And(
				mitarbeiter.AbgeschicktLTE(now),
				mitarbeiter.AbgeschicktGTE(yesterday),
			),
		).All(a.ctx)

	if err != nil {
		return nil
	}

	for _, e := range res {
		bild1 := ImageResponse{}
		bild2 := ImageResponse{}
		bild3 := ImageResponse{}
		if len(*e.Bild1) > 0 {
			bild1 = checkImage(*e.Bild1Date, filepath.Join(a.config.UPLOAD_FOLDER, "Upload", *e.Bild1))
		}
		if len(*e.Bild2) > 0 {
			bild2 = checkImage(*e.Bild2Date, filepath.Join(a.config.UPLOAD_FOLDER, "Upload", *e.Bild2))
		}
		if len(*e.Bild3) > 0 {
			bild3 = checkImage(*e.Bild3Date, filepath.Join(a.config.UPLOAD_FOLDER, "Upload", *e.Bild3))
		}
		EinkaufsListe = append(EinkaufsListe, Einkauf{
			Mitarbeiter: e,
			Bild1Data:   bild1,
			Bild2Data:   bild2,
			Bild3Data:   bild3,
		})
	}

	return EinkaufsListe
}

type UpsertEinkaufParams struct {
	Paypal    bool
	Abonniert bool
	Geld      string
	Pfand     string
	Dinge     string
	Bild1     string
	Bild2     string
	Bild3     string
}

func (a *App) UpdateEinkauf(values UpsertEinkaufParams, id int) bool {
	fmt.Println(values)

	var Bild1Date *time.Time
	now := time.Now()
	if len(values.Bild1) > 0 {
		Bild1Date = &now
	}

	var Bild2Date *time.Time
	if len(values.Bild2) > 0 {
		Bild2Date = &now
	}

	var Bild3Date *time.Time
	if len(values.Bild3) > 0 {
		Bild3Date = &now
	}

	err := a.db.Mitarbeiter.UpdateOneID(id).
		SetAbgeschickt(time.Now()).
		SetAbonniert(values.Abonniert).
		SetDinge(values.Dinge).
		SetGeld(values.Geld).
		SetPfand(values.Pfand).
		SetBild1(values.Bild1).
		SetBild2(values.Bild2).
		SetBild3(values.Bild3).
		SetNillableBild1Date(Bild1Date).
		SetNillableBild2Date(Bild2Date).
		SetNillableBild3Date(Bild3Date).
		Exec(a.ctx)

	return err == nil
}

func (a *App) UploadImage(mitarbeiter int, imageNr string) string {
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
	fileName := fmt.Sprintf("%v-%s.%s", mitarbeiter, imageNr, fileSuffix)
	filePath := filepath.Join(a.config.UPLOAD_FOLDER, "Upload", fileName)
	err = os.WriteFile(filePath, data, 0644)
	if err != nil {
		return err.Error()
	}
	return fileName
}

func (a *App) GetEinkauf(id int) *ent.Mitarbeiter {

	res, err := a.db.Mitarbeiter.Query().Where(mitarbeiter.ID(id)).Only(a.ctx)

	if err != nil {
		return nil
	}
	return res
}

func (a *App) SkipEinkauf(id int) bool {
	err := a.db.Mitarbeiter.UpdateOneID(id).SetAbgeschickt(time.Now().Add(time.Duration(24) * time.Hour)).Exec(a.ctx)

	return err == nil
}

func (a *App) DeleteEinkauf(id int) bool {
	err := a.db.Mitarbeiter.UpdateOneID(id).SetAbgeschickt(time.Now().Add(time.Duration(-24) * time.Hour)).Exec(a.ctx)

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
