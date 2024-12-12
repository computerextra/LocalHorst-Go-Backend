package cmsroutes

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/computerextra/golang-backend/cms"
	"github.com/computerextra/golang-backend/env"
	"github.com/computerextra/golang-backend/helper"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func GetAngebote(w http.ResponseWriter, r *http.Request) {
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
	User, err := queries.GetAngeboten(ctx)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func GetAngebot(w http.ResponseWriter, r *http.Request) {
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
	User, err := queries.GetAngebot(ctx, id)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func UpdateAngebot(w http.ResponseWriter, r *http.Request) {
	ID := r.FormValue("ID")
	Title := r.FormValue("Title")
	Subtitle := r.FormValue("Subtitle")
	DateStart := r.FormValue("DateStart") // Format: 30.09.1991
	DateStop := r.FormValue("DateStop")   // Format: 30.09.1991
	Link := r.FormValue("Link")
	Image := r.FormValue("Image")
	Anzeigen := r.FormValue("Anzeigen")
	var Start time.Time
	var Stop time.Time

	if len(DateStart) > 1 {
		split := strings.Split(DateStart, ".")
		year, err := strconv.Atoi(split[2])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}

		month, err := strconv.Atoi(split[1])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}

		day, err := strconv.Atoi(split[0])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}

		Start = time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)
	}
	if len(DateStop) > 1 {
		split := strings.Split(DateStop, ".")
		year, err := strconv.Atoi(split[2])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}
		month, err := strconv.Atoi(split[1])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}
		day, err := strconv.Atoi(split[0])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}

		Stop = time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)
	}

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
	User, err := queries.UpdateAngebot(ctx, cms.UpdateAngebotParams{
		Title:     Title,
		Subtitle:  sql.NullString{String: Subtitle, Valid: helper.If(len(Subtitle) > 1, true, false)},
		DateStart: Start,
		DateStop:  Stop,
		Link:      Link,
		Image:     Image,
		Anzeigen:  sql.NullBool{Bool: helper.If(Anzeigen == "true", true, false), Valid: helper.If(len(Anzeigen) > 1, true, false)},
		ID:        ID,
	})
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func CreateAngebot(w http.ResponseWriter, r *http.Request) {
	Title := r.FormValue("Title")
	Subtitle := r.FormValue("Subtitle")
	DateStart := r.FormValue("DateStart") // Format: 30.09.1991
	DateStop := r.FormValue("DateStop")   // Format: 30.09.1991
	Link := r.FormValue("Link")
	Image := r.FormValue("Image")
	Anzeigen := r.FormValue("Anzeigen")
	var Start time.Time
	var Stop time.Time

	if len(DateStart) > 1 {
		split := strings.Split(DateStart, ".")

		year, err := strconv.Atoi(split[2])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}

		month, err := strconv.Atoi(split[1])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}

		day, err := strconv.Atoi(split[0])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}

		Start = time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)
	}
	if len(DateStop) > 1 {
		split := strings.Split(DateStop, ".")
		year, err := strconv.Atoi(split[2])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}
		month, err := strconv.Atoi(split[1])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}
		day, err := strconv.Atoi(split[0])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}

		Stop = time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)
	}
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
	User, err := queries.CreateAngebot(ctx, cms.CreateAngebotParams{
		Title:     Title,
		Subtitle:  sql.NullString{String: Subtitle, Valid: helper.If(len(Subtitle) > 1, true, false)},
		DateStart: Start,
		DateStop:  Stop,
		Link:      Link,
		Image:     Image,
		Anzeigen:  sql.NullBool{Bool: helper.If(Anzeigen == "true", true, false), Valid: helper.If(len(Anzeigen) > 1, true, false)},
		ID:        uuid.New().String(),
	})
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}
}

func DeleteAngebot(w http.ResponseWriter, r *http.Request) {
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
	err = queries.DeleteAngebot(ctx, ID)
	datebase.Close()

	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(map[string]string{"error": ""})
	}
}
