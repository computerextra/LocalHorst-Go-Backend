package sage

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func GetSeriennummer(w http.ResponseWriter, r *http.Request) {
	Artikelnummer := r.FormValue("Artikelnummer")
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")

	database, err := sql.Open("sqlserver", getConnectionString())
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	defer database.Close()

	rows, err := database.Query(fmt.Sprintf("SELECT SUCHBEGRIFF FROM sg_auf_artikel WHERE ARTNR LIKE '%s';", Artikelnummer))
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	defer rows.Close()
	var Suchbegriff string
	for rows.Next() {
		if err := rows.Scan(&Suchbegriff); err != nil {
			log.Fatal(err)
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	json.NewEncoder(w).Encode(Suchbegriff)
}
