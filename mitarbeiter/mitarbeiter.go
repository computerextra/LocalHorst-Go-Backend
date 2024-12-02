package mitarbeiter

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/env"
	_ "github.com/go-sql-driver/mysql"
)

func GetAll(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
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
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		json.NewEncoder(w).Encode(User)
	}

}

func Get() {}

func Create() {}

func Edit() {}
