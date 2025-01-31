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
	"strings"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/env"
	"github.com/computerextra/golang-backend/helper"
	"github.com/google/uuid"
	"github.com/gorilla/mux"

	gomail "gopkg.in/mail.v2"
)

type EinkaufResponse struct {
	ID            string
	Paypal        bool
	Abonniert     bool
	Geld          sql.NullString
	Pfand         sql.NullString
	Dinge         sql.NullString
	Mitarbeiterid string
	Abgeschickt   sql.NullTime
	Bild1         sql.NullString
	Bild2         sql.NullString
	Bild3         sql.NullString
	Bild1date     sql.NullTime
	Bild2date     sql.NullTime
	Bild3date     sql.NullTime
	Bild1Data     string
	Bild2Data     string
	Bild3Data     string
}

func GetEinkauf(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()
	// Get Database
	datebase, err := sql.Open("mysql", env.DATABASE_URL)
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
		var Bild1Data string
		var Bild2Data string
		var Bild3Data string

		if User.Bild1.Valid {
			Bild1Data = helper.ImageToBase64(User.Bild1.String)
		} else {
			Bild1Data = ""
		}
		if User.Bild2.Valid {
			Bild2Data = helper.ImageToBase64(User.Bild2.String)
		} else {
			Bild2Data = ""
		}
		if User.Bild3.Valid {
			Bild3Data = helper.ImageToBase64(User.Bild3.String)
		} else {
			Bild3Data = ""
		}

		// w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(EinkaufResponse{
			ID:            User.ID,
			Paypal:        User.Paypal,
			Abonniert:     User.Abonniert,
			Geld:          User.Geld,
			Pfand:         User.Pfand,
			Dinge:         User.Dinge,
			Mitarbeiterid: User.Mitarbeiterid,
			Abgeschickt:   User.Abgeschickt,
			Bild1:         User.Bild1,
			Bild2:         User.Bild2,
			Bild3:         User.Bild3,
			Bild1date:     User.Bild1date,
			Bild2date:     User.Bild2date,
			Bild3date:     User.Bild3date,
			Bild1Data:     Bild1Data,
			Bild2Data:     Bild2Data,
			Bild3Data:     Bild3Data,
		})
	}
}

type EinkaufListeResponse struct {
	ID        string
	Paypal    bool
	Abonniert bool
	Geld      sql.NullString
	Pfand     sql.NullString
	Dinge     sql.NullString
	Bild1     sql.NullString
	Bild2     sql.NullString
	Bild3     sql.NullString
	Bild1date sql.NullTime
	Bild2date sql.NullTime
	Bild3date sql.NullTime
	Name      sql.NullString
	Email     sql.NullString
	Bild1Data string
	Bild2Data string
	Bild3Data string
}

func GetEinkaufListe(w http.ResponseWriter, r *http.Request) {
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()
	// Get Database
	datebase, err := sql.Open("mysql", env.DATABASE_URL)
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
		var Einkauf []EinkaufListeResponse

		for _, user := range User {
			var Bild1Data string
			var Bild2Data string
			var Bild3Data string

			if user.Bild1.Valid {
				Bild1Data = helper.ImageToBase64(user.Bild1.String)
			} else {
				Bild1Data = ""
			}
			if user.Bild2.Valid {
				Bild2Data = helper.ImageToBase64(user.Bild2.String)
			} else {
				Bild2Data = ""
			}
			if user.Bild3.Valid {
				Bild3Data = helper.ImageToBase64(user.Bild3.String)
			} else {
				Bild3Data = ""
			}
			Einkauf = append(Einkauf, EinkaufListeResponse{
				ID:        user.ID,
				Paypal:    user.Paypal,
				Abonniert: user.Abonniert,
				Geld:      user.Geld,
				Pfand:     user.Pfand,
				Dinge:     user.Dinge,
				Bild1:     user.Bild1,
				Bild2:     user.Bild2,
				Bild3:     user.Bild3,
				Bild1date: user.Bild1date,
				Bild2date: user.Bild2date,
				Bild3date: user.Bild3date,
				Name:      user.Name,
				Email:     user.Email,
				Bild1Data: Bild1Data,
				Bild2Data: Bild2Data,
				Bild3Data: Bild3Data,
			})
		}

		json.NewEncoder(w).Encode(Einkauf)
	}
}

func Updateeinkauf(w http.ResponseWriter, r *http.Request) {

	if err := r.ParseMultipartForm(200 << 20); err != nil { // Maximum of 200MB file allowed
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	mitarbeiterId := r.FormValue("mitarbeiterId")

	Dinge := strings.TrimSpace(r.FormValue("Dinge"))

	Pfand := r.FormValue("Pfand")
	Geld := r.FormValue("Geld")
	var Paypal bool
	if r.FormValue("Paypal") == "true" {
		Paypal = true
	} else {
		Paypal = false
	}
	var Abonniert bool
	if r.FormValue("Abonniert") == "true" {
		Abonniert = true
	} else {
		Abonniert = false
	}
	var err error
	var Bild1 string
	var Bild2 string
	var Bild3 string
	for _, h := range r.MultipartForm.File["Bild1"] {
		Bild1, err = helper.SaveFile(h, mitarbeiterId, "1")
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		}
	}
	for _, h := range r.MultipartForm.File["Bild2"] {
		Bild2, err = helper.SaveFile(h, mitarbeiterId, "2")
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		}
	}
	for _, h := range r.MultipartForm.File["Bild3"] {
		Bild3, err = helper.SaveFile(h, mitarbeiterId, "3")
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		}
	}

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
	env := env.GetEnv()
	// Get Database
	datebase, err := sql.Open("mysql", env.DATABASE_URL)
	if err != nil {
		panic(err)
	}

	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := db.New(datebase)

	einkauf, err := queries.UpdateEinkauf(ctx, db.UpdateEinkaufParams{
		Paypal:        Paypal,
		Abonniert:     Abonniert,
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

func Createeinkauf(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(200 << 20); err != nil { // Maximum of 200MB file allowed
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	mitarbeiterId := r.FormValue("mitarbeiterId")

	Dinge := strings.TrimSpace(r.FormValue("Dinge"))
	Pfand := r.FormValue("Pfand")
	Geld := r.FormValue("Geld")
	var Paypal bool
	if r.FormValue("Paypal") == "true" {
		Paypal = true
	} else {
		Paypal = false
	}
	var Abonniert bool
	if r.FormValue("Abonniert") == "true" {
		Abonniert = true
	} else {
		Abonniert = false
	}
	var err error
	var Bild1 string
	var Bild2 string
	var Bild3 string
	for _, h := range r.MultipartForm.File["Bild1"] {
		Bild1, err = helper.SaveFile(h, mitarbeiterId, "1")
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		}
	}
	for _, h := range r.MultipartForm.File["Bild2"] {
		Bild2, err = helper.SaveFile(h, mitarbeiterId, "2")
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		}
	}
	for _, h := range r.MultipartForm.File["Bild3"] {
		Bild3, err = helper.SaveFile(h, mitarbeiterId, "3")
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		}
	}

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
	env := env.GetEnv()
	// Get Database
	datebase, err := sql.Open("mysql", env.DATABASE_URL)
	if err != nil {
		panic(err)
	}

	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := db.New(datebase)

	// Update geht nicht, gibts noch nicht. Lege neu an:
	einkauf, err := queries.CreateEinkauf(ctx, db.CreateEinkaufParams{
		ID:            uuid.New().String(),
		Paypal:        Paypal,
		Abonniert:     Abonniert,
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
	id := r.FormValue("id")
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()
	// Get Database
	datebase, err := sql.Open("mysql", env.DATABASE_URL)
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
	env := env.GetEnv()
	// Get Database
	datebase, err := sql.Open("mysql", env.DATABASE_URL)
	if err != nil {
		panic(err)
	}

	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := db.New(datebase)
	now := time.Now()
	tomorrowMorning := time.Date(now.Year(), now.Month(), now.Day()+1, 9, 0, 0, 0, time.UTC)
	fmt.Printf("ID: %s", id)
	fmt.Printf("Heute: %s", now)
	fmt.Printf("Morgen: %s", tomorrowMorning)

	err = queries.SkipEinkauf(ctx, db.SkipEinkaufParams{
		ID: id,
		Abgeschickt: sql.NullTime{
			Time:  tomorrowMorning,
			Valid: true,
		},
	})
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
	env := env.GetEnv()
	// Get Mail Settings
	MAIL_FROM := env.MAIL_FROM
	MAIL_SERVER := env.MAIL_SERVER
	MAIL_PORT := env.MAIL_PORT
	MAIL_USER := env.MAIL_USER
	MAIL_PASSWORD := env.MAIL_PASSWORD

	// Get and Parse HTML Template
	t := template.New("Info.html")

	t, err := t.ParseFiles("Info.html")
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

	d := gomail.NewDialer(MAIL_SERVER, MAIL_PORT, MAIL_USER, MAIL_PASSWORD)

	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		fmt.Println(err)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"error": ""})
}
