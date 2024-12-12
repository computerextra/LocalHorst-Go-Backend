package cmsroutes

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/computerextra/golang-backend/cms"
	"github.com/computerextra/golang-backend/env"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func GetAllPartner(w http.ResponseWriter, r *http.Request) {
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()
	// Get Database
	datebase, err := sql.Open("mysql", env.CMS_DATABASE_URL)
	if err != nil {
		panic(err)
	}
	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := cms.New(datebase)
	User, err := queries.GetAllPartner(ctx)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func GetPartner(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()
	// Get Database
	datebase, err := sql.Open("mysql", env.CMS_DATABASE_URL)
	if err != nil {
		panic(err)
	}
	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := cms.New(datebase)
	User, err := queries.GetPartner(ctx, id)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func UpdatePartner(w http.ResponseWriter, r *http.Request) {
	Name := r.FormValue("Name")
	ID := r.FormValue("ID")
	Link := r.FormValue("Link")
	Image := r.FormValue("Image")
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()
	// Get Database
	datebase, err := sql.Open("mysql", env.CMS_DATABASE_URL)
	if err != nil {
		panic(err)
	}
	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := cms.New(datebase)
	User, err := queries.UpdatePartner(ctx, cms.UpdatePartnerParams{
		Name:  Name,
		ID:    ID,
		Link:  Link,
		Image: Image,
	})
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func CreatePartner(w http.ResponseWriter, r *http.Request) {
	Name := r.FormValue("Name")
	Link := r.FormValue("Link")
	Image := r.FormValue("Image")
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()
	// Get Database
	datebase, err := sql.Open("mysql", env.CMS_DATABASE_URL)
	if err != nil {
		panic(err)
	}
	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := cms.New(datebase)
	User, err := queries.CreatePartner(ctx, cms.CreatePartnerParams{
		ID:    uuid.New().String(),
		Name:  Name,
		Link:  Link,
		Image: Image,
	})
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func DeletePartner(w http.ResponseWriter, r *http.Request) {
	ID := r.FormValue("ID")
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()
	env := env.GetEnv()
	// Get Database
	datebase, err := sql.Open("mysql", env.CMS_DATABASE_URL)
	if err != nil {
		panic(err)
	}
	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := cms.New(datebase)
	err = queries.DeletePartner(ctx, ID)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(map[string]string{"error": ""})
	}
}
