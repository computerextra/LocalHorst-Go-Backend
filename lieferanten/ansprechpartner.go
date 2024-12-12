package lieferanten

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/env"
	"github.com/computerextra/golang-backend/helper"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func GetAnsprechpartner(w http.ResponseWriter, r *http.Request) {
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
	User, err := queries.GetAnsprechpartner(ctx, id)
	datebase.Close()
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func CreateAnsprechpartner(w http.ResponseWriter, r *http.Request) {
	Name := r.FormValue("Name")
	Telefon := r.FormValue("Telefon")
	Mobil := r.FormValue("Mobil")
	Mail := r.FormValue("Mail")
	Lieferantenid := r.FormValue("Lieferantenid")

	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()
	database, err := sql.Open("mysql", env.DATABASE_URL)
	if err != nil {
		fmt.Println(err.Error())
		panic(err)
	}
	database.SetConnMaxIdleTime(time.Minute * 3)
	database.SetMaxOpenConns(10)
	database.SetMaxIdleConns(10)
	queries := db.New(database)
	User, err := queries.CreateAnsprechpartner(ctx, db.CreateAnsprechpartnerParams{
		ID:            uuid.New().String(),
		Name:          Name,
		Telefon:       sql.NullString{String: Telefon, Valid: helper.If(len(Telefon) > 0, true, false)},
		Mobil:         sql.NullString{String: Mobil, Valid: helper.If(len(Mobil) > 0, true, false)},
		Mail:          sql.NullString{String: Mail, Valid: helper.If(len(Mail) > 0, true, false)},
		Lieferantenid: sql.NullString{String: Lieferantenid, Valid: helper.If(len(Lieferantenid) > 0, true, false)},
	})
	database.Close()

	if err != nil {
		fmt.Println(err.Error())
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func UpdateAnsprechpartner(w http.ResponseWriter, r *http.Request) {
	id := r.FormValue("ID")
	Name := r.FormValue("Name")
	Telefon := r.FormValue("Telefon")
	Mobil := r.FormValue("Mobil")
	Mail := r.FormValue("Mail")
	Lieferantenid := r.FormValue("Lieferantenid")

	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()
	database, err := sql.Open("mysql", env.DATABASE_URL)
	if err != nil {
		panic(err)
	}
	database.SetConnMaxIdleTime(time.Minute * 3)
	database.SetMaxOpenConns(10)
	database.SetMaxIdleConns(10)
	queries := db.New(database)
	User, err := queries.UpdateAnsprechpartner(ctx, db.UpdateAnsprechpartnerParams{
		ID:            id,
		Name:          Name,
		Telefon:       sql.NullString{String: Telefon, Valid: helper.If(len(Telefon) > 0, true, false)},
		Mobil:         sql.NullString{String: Mobil, Valid: helper.If(len(Mobil) > 0, true, false)},
		Mail:          sql.NullString{String: Mail, Valid: helper.If(len(Mail) > 0, true, false)},
		Lieferantenid: sql.NullString{String: Lieferantenid, Valid: helper.If(len(Lieferantenid) > 0, true, false)},
	})
	database.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func DeleteAnsprechpartner(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()
	database, err := sql.Open("mysql", env.DATABASE_URL)
	if err != nil {
		panic(err)
	}
	database.SetConnMaxIdleTime(time.Minute * 3)
	database.SetMaxOpenConns(10)
	database.SetMaxIdleConns(10)
	queries := db.New(database)
	err = queries.DeleteAnsprechpartner(ctx, id)
	database.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(map[string]string{"error": ""})
	}
}
