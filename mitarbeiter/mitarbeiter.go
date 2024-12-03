package mitarbeiter

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/env"
	"github.com/computerextra/golang-backend/helper"
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

func Create(w http.ResponseWriter, r *http.Request) {
	Name := r.FormValue("Name")
	Short := r.FormValue("Short")
	Gruppenwahl := r.FormValue("Gruppenwahl")
	InternTelefon1 := r.FormValue("InternTelefon1")
	InternTelefon2 := r.FormValue("InternTelefon2")
	FestnetzAlternativ := r.FormValue("FestnetzAlternativ")
	FestnetzPrivat := r.FormValue("FestnetzPrivat")
	HomeOffice := r.FormValue("HomeOffice")
	MobilBusiness := r.FormValue("MobilBusiness")
	MobilPrivat := r.FormValue("MobilPrivat")
	Email := r.FormValue("Email")
	Azubi := r.FormValue("Azubi")
	Geburtstag := r.FormValue("Geburtstag")
	Geburtstag_time, _ := time.Parse("2006-01-02 15:04:05", Geburtstag)

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
	User, err := queries.CreateUser(ctx, db.CreateUserParams{
		Name:               Name,
		Short:              sql.NullString{Valid: helper.If(len(Short) > 0, true, false), String: Short},
		Gruppenwahl:        sql.NullString{Valid: helper.If(len(Gruppenwahl) > 0, true, false), String: Gruppenwahl},
		Interntelefon1:     sql.NullString{Valid: helper.If(len(InternTelefon1) > 0, true, false), String: InternTelefon1},
		Interntelefon2:     sql.NullString{Valid: helper.If(len(InternTelefon2) > 0, true, false), String: InternTelefon2},
		Festnetzalternativ: sql.NullString{Valid: helper.If(len(FestnetzAlternativ) > 0, true, false), String: FestnetzAlternativ},
		Festnetzprivat:     sql.NullString{Valid: helper.If(len(FestnetzPrivat) > 0, true, false), String: FestnetzPrivat},
		Homeoffice:         sql.NullString{Valid: helper.If(len(HomeOffice) > 0, true, false), String: HomeOffice},
		Mobilbusiness:      sql.NullString{Valid: helper.If(len(MobilBusiness) > 0, true, false), String: MobilBusiness},
		Mobilprivat:        sql.NullString{Valid: helper.If(len(MobilPrivat) > 0, true, false), String: MobilPrivat},
		Email:              sql.NullString{Valid: helper.If(len(Email) > 0, true, false), String: Email},
		Azubi:              sql.NullBool{Valid: helper.If(len(Azubi) > 0, true, false), Bool: helper.If(len(Azubi) > 0, true, false)},
		Geburtstag:         sql.NullTime{Valid: helper.If(len(Geburtstag) > 0, true, false), Time: Geburtstag_time},
	})
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

func Edit(w http.ResponseWriter, r *http.Request) {
	de, err := time.LoadLocation("Europe/Berlin")
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	id := mux.Vars(r)["id"]
	Name := r.FormValue("Name")
	Short := r.FormValue("Short")
	Gruppenwahl := r.FormValue("Gruppenwahl")
	InternTelefon1 := r.FormValue("InternTelefon1")
	InternTelefon2 := r.FormValue("InternTelefon2")
	FestnetzAlternativ := r.FormValue("FestnetzAlternativ")
	FestnetzPrivat := r.FormValue("FestnetzPrivat")
	HomeOffice := r.FormValue("HomeOffice")
	MobilBusiness := r.FormValue("MobilBusiness")
	MobilPrivat := r.FormValue("MobilPrivat")
	Email := r.FormValue("Email")
	Azubi := r.FormValue("Azubi")
	Geburtstag := r.FormValue("Geburtstag")
	var Geburtstag_time time.Time
	if len(Geburtstag) > 1 && Geburtstag != "1.1.1" {
		GebSplit := strings.Split(Geburtstag, ".")
		Year, err := strconv.Atoi(GebSplit[2])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}
		Month, err := strconv.Atoi(GebSplit[1])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}
		Day, err := strconv.Atoi(GebSplit[0])
		if err != nil {
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}
		Geburtstag_time = time.Date(Year, time.Month(Month), Day, 0, 0, 0, 0, de)
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
	User, err := queries.UpdateUser(ctx, db.UpdateUserParams{
		ID:                 id,
		Name:               Name,
		Short:              sql.NullString{Valid: helper.If(len(Short) > 0, true, false), String: Short},
		Gruppenwahl:        sql.NullString{Valid: helper.If(len(Gruppenwahl) > 0, true, false), String: Gruppenwahl},
		Interntelefon1:     sql.NullString{Valid: helper.If(len(InternTelefon1) > 0, true, false), String: InternTelefon1},
		Interntelefon2:     sql.NullString{Valid: helper.If(len(InternTelefon2) > 0, true, false), String: InternTelefon2},
		Festnetzalternativ: sql.NullString{Valid: helper.If(len(FestnetzAlternativ) > 0, true, false), String: FestnetzAlternativ},
		Festnetzprivat:     sql.NullString{Valid: helper.If(len(FestnetzPrivat) > 0, true, false), String: FestnetzPrivat},
		Homeoffice:         sql.NullString{Valid: helper.If(len(HomeOffice) > 0, true, false), String: HomeOffice},
		Mobilbusiness:      sql.NullString{Valid: helper.If(len(MobilBusiness) > 0, true, false), String: MobilBusiness},
		Mobilprivat:        sql.NullString{Valid: helper.If(len(MobilPrivat) > 0, true, false), String: MobilPrivat},
		Email:              sql.NullString{Valid: helper.If(len(Email) > 0, true, false), String: Email},
		Azubi:              sql.NullBool{Valid: helper.If(len(Azubi) > 0, true, false), Bool: helper.If(Azubi == "true", true, false)},
		Geburtstag:         sql.NullTime{Valid: helper.If(len(Geburtstag) > 1 && Geburtstag != "1.1.1", true, false), Time: Geburtstag_time},
	})
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

func Delete(w http.ResponseWriter, r *http.Request) {
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
	err = queries.DeleteUser(ctx, id)
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
