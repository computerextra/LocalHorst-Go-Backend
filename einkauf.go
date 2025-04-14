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

	"github.com/wailsapp/wails/v2/pkg/runtime"
	gomail "gopkg.in/mail.v2"
)

func (a *App) GetEinkaufsListe() []db.Einkauf {
	database := db.New(a.config.DATABASE_URL)

	res, err := database.GetEinkaufsliste()
	if err != nil {
		return nil
	}
	return res
}

func (a *App) UpdateEinkauf(values db.UpsertEinkaufParams, id *string) bool {
	if len(values.MitarbeiterId) == 0 {
		return false
	}

	database := db.New(a.config.DATABASE_URL)

	_, err := database.UpsertEinkauf(values, id)
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

func (a *App) GetEinkauf(id string) *db.Einkauf {
	database := db.New(a.config.DATABASE_URL)
	res, err := database.GetEinkauf(id)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) SkipEinkauf(id string) bool {
	database := db.New(a.config.DATABASE_URL)
	_, err := database.SkipEinkauf(id)
	return err == nil
}

func (a *App) DeleteEinkauf(id string) bool {
	database := db.New(a.config.DATABASE_URL)
	_, err := database.DeleteEinkauf(id)
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
	database := db.New(a.config.DATABASE_URL)
	ma, err := database.GetEinkauf(id)
	if err != nil {
		return ImageResponse{
			Valid: false,
		}
	}
	switch Nr {
	case "1":
		if ma.Bild1.Valid && ma.Bild1Date.Valid {
			return checkImage(ma.Bild1Date.Time, filepath.Join(a.config.UPLOAD_FOLDER, ma.Bild1.String))
		}
	case "2":
		if ma.Bild2.Valid && ma.Bild2Date.Valid {
			return checkImage(ma.Bild2Date.Time, filepath.Join(a.config.UPLOAD_FOLDER, ma.Bild2.String))
		}
	case "3":
		if ma.Bild3.Valid && ma.Bild3Date.Valid {
			return checkImage(ma.Bild3Date.Time, filepath.Join(a.config.UPLOAD_FOLDER, ma.Bild3.String))
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
