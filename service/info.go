package service

import (
	"bytes"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"text/template"

	"github.com/computerextra/golang-backend/env"

	gomail "gopkg.in/mail.v2"
)

func Info(w http.ResponseWriter, r *http.Request) {
	env := env.GetEnv()
	// Get Mail Settings
	MAIL_FROM := env.MAIL_FROM
	MAIL_SERVER := env.MAIL_SERVER
	MAIL_PORT := env.MAIL_PORT
	MAIL_USER := env.MAIL_USER
	MAIL_PASSWORD := env.MAIL_PASSWORD

	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")

	Auftrag := r.FormValue("Auftrag")
	Mail := r.FormValue("Mail")

	// Get and Parse HTML Template
	t := template.New("mail.html")

	t, err := t.ParseFiles("mail.html")
	if err != nil {
		log.Println(err)
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, nil); err != nil {
		log.Println(err)
	}

	result := tpl.String()

	// Create Mail
	m := gomail.NewMessage()

	// Set Mail Sender
	m.SetHeader("From", MAIL_FROM)
	// Receiver
	m.SetHeader("To", Mail)
	// BCC
	m.SetHeader("Bcc", "service@computer-extra.de")
	// Set Subject
	m.SetHeader("Subject", fmt.Sprintf("Ihre Bestellung %s", Auftrag))
	// Set Body
	m.SetBody("text/html", result)

	d := gomail.NewDialer(MAIL_SERVER, MAIL_PORT, MAIL_USER, MAIL_PASSWORD)

	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		fmt.Println(err)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"error": "false"})
}
