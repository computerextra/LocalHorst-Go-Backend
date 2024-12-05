package mitarbeiter

import (
	"bytes"
	"crypto/tls"
	"database/sql"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/env"
	"github.com/computerextra/golang-backend/helper"
	"github.com/gorilla/mux"

	gomail "gopkg.in/mail.v2"
)

func GetEinkauf(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()

	// Get Database
	datebase, err := sql.Open("mysql", env.GetEnv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := db.New(datebase)
	User, err := queries.GetEinkauf(ctx, id)
	datebase.Close()

	if err != nil {
		// w.WriteHeader(http.StatusBadRequest)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		// w.WriteHeader(http.StatusOK)

		json.NewEncoder(w).Encode(User)
	}
}

func GetEinkaufListe(w http.ResponseWriter, r *http.Request) {
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()

	// Get Database
	datebase, err := sql.Open("mysql", env.GetEnv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := db.New(datebase)
	User, err := queries.GetEinkaufListe(ctx)
	datebase.Close()

	if err != nil {
		// w.WriteHeader(http.StatusBadRequest)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		// w.WriteHeader(http.StatusOK)

		json.NewEncoder(w).Encode(User)
	}
}

func Updateeinkauf(w http.ResponseWriter, r *http.Request) {
	mitarbeiterId := r.FormValue("mitarbeiterId")
	Abonniert := r.FormValue("Abonniert")
	Bild1 := r.FormValue("Bild1")
	Bild2 := r.FormValue("Bild2")
	Bild3 := r.FormValue("Bild3")
	Dinge := r.FormValue("Dinge")
	Geld := r.FormValue("Geld")
	Paypal := r.FormValue("Paypal")
	Pfand := r.FormValue("Pfand")

	var Bild1Date time.Time
	var Bild2Date time.Time
	var Bild3Date time.Time
	if len(Bild1) > 0 {
		Bild1Date = time.Now()
	}
	if len(Bild2) > 0 {
		Bild2Date = time.Now()
	}
	if len(Bild3) > 0 {
		Bild3Date = time.Now()
	}

	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()

	// Get Database
	datebase, err := sql.Open("mysql", env.GetEnv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := db.New(datebase)

	einkauf, err := queries.UpsertEinkauf(ctx, db.UpsertEinkaufParams{
		Paypal:        helper.If(Paypal == "true", true, false),
		Abonniert:     helper.If(Abonniert == "true", true, false),
		Geld:          sql.NullString{String: Geld, Valid: helper.If(len(Geld) > 0, true, false)},
		Pfand:         sql.NullString{String: Pfand, Valid: helper.If(len(Pfand) > 0, true, false)},
		Dinge:         sql.NullString{String: Dinge, Valid: helper.If(len(Dinge) > 0, true, false)},
		Mitarbeiterid: mitarbeiterId,
		Bild1:         sql.NullString{String: Bild1, Valid: helper.If(len(Bild1) > 0, true, false)},
		Bild2:         sql.NullString{String: Bild2, Valid: helper.If(len(Bild2) > 0, true, false)},
		Bild3:         sql.NullString{String: Bild3, Valid: helper.If(len(Bild3) > 0, true, false)},
		Bild1date:     sql.NullTime{Valid: helper.If(len(Bild1) > 0, true, false), Time: Bild1Date},
		Bild2date:     sql.NullTime{Valid: helper.If(len(Bild2) > 0, true, false), Time: Bild2Date},
		Bild3date:     sql.NullTime{Valid: helper.If(len(Bild3) > 0, true, false), Time: Bild3Date},
	})
	datebase.Close()

	if err != nil {
		// w.WriteHeader(http.StatusBadRequest)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		// w.WriteHeader(http.StatusOK)

		json.NewEncoder(w).Encode(einkauf)
	}
}

func DeleteEinkauf(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()

	// Get Database
	datebase, err := sql.Open("mysql", env.GetEnv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := db.New(datebase)
	err = queries.DeleteEinkauf(ctx, id)
	datebase.Close()

	if err != nil {
		// w.WriteHeader(http.StatusBadRequest)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		// w.WriteHeader(http.StatusOK)

		json.NewEncoder(w).Encode(map[string]string{"error": "false"})
	}
}

func SkipEinkauf(w http.ResponseWriter, r *http.Request) {
	id := r.FormValue("id")
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()

	// Get Database
	datebase, err := sql.Open("mysql", env.GetEnv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := db.New(datebase)
	err = queries.SkipEinkauf(ctx, id)
	datebase.Close()

	if err != nil {
		// w.WriteHeader(http.StatusBadRequest)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		// w.WriteHeader(http.StatusOK)

		json.NewEncoder(w).Encode(map[string]string{"error": "false"})
	}
}

type infos struct {
	Name   string
	Betrag string
}

func SendPaypalMail(w http.ResponseWriter, r *http.Request) {
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	Name := r.FormValue("Name")
	Mail := r.FormValue("Mail")
	Betrag := r.FormValue("Betrag")

	infos := infos{
		Name:   Name,
		Betrag: Betrag,
	}

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

	// Get and Parse HTML Template
	t := template.New("Info.html")

	t, err = t.ParseFiles("Info.html")
	if err != nil {
		log.Println(err)
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, infos); err != nil {
		log.Println(err)
	}

	result := tpl.String()

	// Create Mail
	m := gomail.NewMessage()

	// Set Mail Sender
	m.SetHeader("From", MAIL_FROM)
	// Receiver
	m.SetHeader("To", Mail)
	// Set Subject
	m.SetHeader("Subject", "PayPal Abrechnung")
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

	json.NewEncoder(w).Encode(map[string]string{"error": ""})
}
