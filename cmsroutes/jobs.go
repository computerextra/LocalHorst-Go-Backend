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

func GetJobs(w http.ResponseWriter, r *http.Request) {
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
	User, err := queries.GetJos(ctx)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func GetJob(w http.ResponseWriter, r *http.Request) {
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
	User, err := queries.GetJob(ctx, id)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func UpdateJob(w http.ResponseWriter, r *http.Request) {
	Name := r.FormValue("Name")
	ID := r.FormValue("ID")
	Online := r.FormValue("Online")
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
	User, err := queries.UpdateJob(ctx, cms.UpdateJobParams{
		Name:   Name,
		ID:     ID,
		Online: helper.If(Online == "true", true, false),
	})
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func CreateJob(w http.ResponseWriter, r *http.Request) {
	Name := r.FormValue("Name")
	Online := r.FormValue("Online")
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
	User, err := queries.CreateJob(ctx, cms.CreateJobParams{
		ID:     uuid.New().String(),
		Name:   Name,
		Online: helper.If(Online == "true", true, false),
	})
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func DeleteJob(w http.ResponseWriter, r *http.Request) {
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
	err = queries.DeleteJob(ctx, ID)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(map[string]string{"error": ""})
	}
}
