package lieferanten

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/env"
	"github.com/computerextra/golang-backend/helper"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func GetLieferanten(w http.ResponseWriter, r *http.Request) {
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
	User, err := queries.GetLieferanten(ctx)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func GetLieferant(w http.ResponseWriter, r *http.Request) {
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
	User, err := queries.GetLieferant(ctx, id)
	database.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func GetAnsprechpartnerFromLieferant(w http.ResponseWriter, r *http.Request) {
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
	User, err := queries.GetAnsprechpartnerFromLiegerant(ctx, sql.NullString{String: id, Valid: true})
	database.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func CreateLieferant(w http.ResponseWriter, r *http.Request) {
	Firma := r.FormValue("Firma")
	Kundennummer := r.FormValue("Kundennummer")
	Webseite := r.FormValue("Webseite")

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
	User, err := queries.CreateLieferant(ctx, db.CreateLieferantParams{
		ID:           uuid.New().String(),
		Firma:        Firma,
		Kundennummer: sql.NullString{String: Kundennummer, Valid: helper.If(len(Kundennummer) > 0, true, false)},
		Webseite:     sql.NullString{String: Webseite, Valid: helper.If(len(Webseite) > 0, true, false)},
	})
	database.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func UpdateLieferant(w http.ResponseWriter, r *http.Request) {
	id := r.FormValue("ID")
	Firma := r.FormValue("Firma")
	Kundennummer := r.FormValue("Kundennummer")
	Webseite := r.FormValue("Webseite")

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
	User, err := queries.UpdateLuieferant(ctx, db.UpdateLuieferantParams{
		ID:           id,
		Firma:        Firma,
		Kundennummer: sql.NullString{String: Kundennummer, Valid: helper.If(len(Kundennummer) > 0, true, false)},
		Webseite:     sql.NullString{String: Webseite, Valid: helper.If(len(Webseite) > 0, true, false)},
	})
	database.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func DeleteLieferant(w http.ResponseWriter, r *http.Request) {
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
	err = queries.DeleteLieferant(ctx, id)
	database.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(map[string]string{"error": ""})
	}
}
