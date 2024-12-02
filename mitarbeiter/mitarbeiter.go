package mitarbeiter

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/env"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func GetAll(w http.ResponseWriter, r *http.Request) {
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
	User, err := queries.GetUsers(ctx)
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

func Get(w http.ResponseWriter, r *http.Request) {
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
	User, err := queries.GetUser(ctx, id)
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

func Create() {}

func Edit() {}
