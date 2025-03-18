package utils

import (
	"bytes"
	"crypto/tls"
	"fmt"
	"html/template"
	"os"
	"strconv"

	gomail "gopkg.in/mail.v2"
)

type infos struct {
	Name   string
	Betrag string
}

func SendPaypalMail(Name string, Mail string, Betrag string) error {
	mail_from, ok := os.LookupEnv("MAIL_FROM")
	if !ok {
		return fmt.Errorf("env error: MAIL_FROM not set")
	}
	mail_server, ok := os.LookupEnv("MAIL_SERVER")
	if !ok {
		return fmt.Errorf("env error: MAIL_FROM not set")
	}
	mail_port, ok := os.LookupEnv("MAIL_PORT")
	if !ok {
		return fmt.Errorf("env error: MAIL_FROM not set")
	}
	port, err := strconv.Atoi(mail_port)
	if err != nil {
		return err
	}
	mail_user, ok := os.LookupEnv("MAIL_USER")
	if !ok {
		return fmt.Errorf("env error: MAIL_FROM not set")
	}
	mail_password, ok := os.LookupEnv("MAIL_PASSWORD")
	if !ok {
		return fmt.Errorf("env error: MAIL_FROM not set")
	}

	infos := infos{
		Name:   Name,
		Betrag: Betrag,
	}

	t := template.New("Info.html")
	t, err = t.ParseFiles("Info.html")
	if err != nil {
		return err
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, infos); err != nil {
		return err
	}
	result := tpl.String()

	// Create Mail
	m := gomail.NewMessage()
	m.SetHeader("From", mail_from)
	m.SetHeader("To", Mail)
	m.SetHeader("Subject", "PayPal Abrechnung")
	m.SetBody("text/html", result)

	// Get Dialer
	d := gomail.NewDialer(mail_server, port, mail_user, mail_password)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}
