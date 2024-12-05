package service

import (
	"bytes"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"text/template"

	"github.com/computerextra/golang-backend/env"

	gomail "gopkg.in/mail.v2"
)

func Info(w http.ResponseWriter, r *http.Request) {
	// Get Mail Settings
	MAIL_FROM := env.GetEnv("MAIL_FROM")
	MAIL_SERVER := env.GetEnv("MAIL_SERVER")
	MAIL_PORT := env.GetEnv("MAIL_PORT")
	PORT, err := strconv.Atoi(MAIL_PORT)
	if err != nil {
		fmt.Println(err)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	MAIL_USER := env.GetEnv("MAIL_USER")
	MAIL_PASSWORD := env.GetEnv("MAIL_PASSWORD")

	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")

	Auftrag := r.FormValue("Auftrag")
	Mail := r.FormValue("Mail")

	// Get and Parse HTML Template
	t := template.New("mail.html")

	t, err = t.ParseFiles("mail.html")
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

	d := gomail.NewDialer(MAIL_SERVER, PORT, MAIL_USER, MAIL_PASSWORD)

	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		fmt.Println(err)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"error": "false"})
}
