package sage

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/computerextra/golang-backend/env"
	_ "github.com/denisenkom/go-mssqldb"
)

type User struct {
	Name    string
	Vorname string
}

func getConnectionString() string {

	server := env.GetEnv("SAGE_SERVER")
	db := env.GetEnv("SAGE_DB")
	user := env.GetEnv("SAGE_USER")
	password := env.GetEnv("SAGE_PASS")
	port, err := strconv.ParseInt(env.GetEnv("SAGE_PORT"), 0, 64)
	if err != nil {
		log.Fatal("SAGE_PORT not in .env: ", err)
	}
	return fmt.Sprintf("server=%s;database=%s;user id=%s;password=%s;port=%d", server, db, user, password, port)
}

func GetKunde(w http.ResponseWriter, r *http.Request) {
	id := r.FormValue("id")
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")

	database, err := sql.Open("sqlserver", getConnectionString())
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	defer database.Close()

	rows, err := database.Query(fmt.Sprintf("SELECT Name, Vorname FROM sg_adressen WHERE KundNr LIKE '%s';", id))
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	defer rows.Close()

	var user User
	for rows.Next() {
		var name sql.NullString
		var vorname sql.NullString
		if err := rows.Scan(&name, &vorname); err != nil {
			log.Fatal(err)
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}
		if name.Valid {
			user.Name = name.String
		}
		if vorname.Valid {
			user.Vorname = vorname.String
		}
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	json.NewEncoder(w).Encode(user)
}
