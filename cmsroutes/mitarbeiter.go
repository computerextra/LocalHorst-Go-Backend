package cmsroutes

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/computerextra/golang-backend/cms"
	"github.com/computerextra/golang-backend/env"
	"github.com/computerextra/golang-backend/helper"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func GetAllMitarbeiter(w http.ResponseWriter, r *http.Request) {
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
	queries := cms.New(datebase)
	User, err := queries.GetAllMitarbeiter(ctx)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func GetMitarbeiter(w http.ResponseWriter, r *http.Request) {
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
	queries := cms.New(datebase)
	User, err := queries.GetMitarbeiter(ctx, id)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func UpdateMitarbeiter(w http.ResponseWriter, r *http.Request) {
	Name := r.FormValue("Name")
	ID := r.FormValue("ID")
	Short := r.FormValue("Short")
	Image := r.FormValue("Image")
	Sex := r.FormValue("Sex")
	Tags := r.FormValue("Tags")
	Focus := r.FormValue("Focus")
	Abteilungid := r.FormValue("Abteilungid")
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
	queries := cms.New(datebase)
	User, err := queries.UpdateMitarbeiter(ctx, cms.UpdateMitarbeiterParams{
		Name:        Name,
		ID:          ID,
		Short:       Short,
		Image:       helper.If(Image == "true", true, false),
		Sex:         Sex,
		Tags:        Tags,
		Focus:       Focus,
		Abteilungid: Abteilungid,
	})
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func CreateMitarbeiter(w http.ResponseWriter, r *http.Request) {
	Name := r.FormValue("Name")
	Short := r.FormValue("Short")
	Image := r.FormValue("Image")
	Sex := r.FormValue("Sex")
	Tags := r.FormValue("Tags")
	Focus := r.FormValue("Focus")
	Abteilungid := r.FormValue("Abteilungid")
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
	queries := cms.New(datebase)
	User, err := queries.CreateMitarbeiter(ctx, cms.CreateMitarbeiterParams{
		ID:          uuid.New().String(),
		Name:        Name,
		Short:       Short,
		Image:       helper.If(Image == "true", true, false),
		Sex:         Sex,
		Tags:        Tags,
		Focus:       Focus,
		Abteilungid: Abteilungid,
	})
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func DeleteMitarbeiter(w http.ResponseWriter, r *http.Request) {
	ID := r.FormValue("ID")
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
	queries := cms.New(datebase)
	err = queries.DeleteMitarbeiter(ctx, ID)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(map[string]string{"error": ""})
	}
}
