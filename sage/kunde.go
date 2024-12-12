package sage

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/computerextra/golang-backend/env"
	_ "github.com/denisenkom/go-mssqldb"
)

type User struct {
	Name    string
	Vorname string
}

func getConnectionString() string {
	env := env.GetEnv()
	server := env.SAGE_SERVER
	db := env.SAGE_DB
	user := env.SAGE_USER
	password := env.SAGE_PASS
	port := env.SAGE_PORT
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

type Sg_Adressen struct {
	SG_Adressen_PK int
	Suchbegriff    sql.NullString
	KundNr         sql.NullString
	LiefNr         sql.NullString
	Homepage       sql.NullString
	Telefon1       sql.NullString
	Telefon2       sql.NullString
	Mobiltelefon1  sql.NullString
	Mobiltelefon2  sql.NullString
	EMail1         sql.NullString
	EMail2         sql.NullString
	KundUmsatz     sql.NullFloat64
	LiefUmsatz     sql.NullFloat64
}

func SucheKunde(w http.ResponseWriter, r *http.Request) {
	Search := r.FormValue("Search")
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")

	database, err := sql.Open("sqlserver", getConnectionString())
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	defer database.Close()

	rows, err := database.Query(fmt.Sprintf(`
		DECLARE @SearchWord NVARCHAR(30) 
		SET @SearchWord = N'%%%s%%' 
		SELECT 
		SG_Adressen_PK, 
		Suchbegriff,  
		KundNr, 
		LiefNr, 
		Homepage, 
		Telefon1, 
		Telefon2, 
		Mobiltelefon1, 
		Mobiltelefon2, 
		EMail1, 
		EMail2, 
		KundUmsatz, 
		LiefUmsatz 
		FROM sg_adressen 
		WHERE Suchbegriff LIKE @SearchWord 
		OR KundNr LIKE @SearchWord 
		OR LiefNr LIKE @SearchWord;`, Search))
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	defer rows.Close()

	var Res []Sg_Adressen
	for rows.Next() {
		var x Sg_Adressen

		if err := rows.Scan(
			&x.SG_Adressen_PK,
			&x.Suchbegriff,
			&x.KundNr,
			&x.LiefNr,
			&x.Homepage,
			&x.Telefon1,
			&x.Telefon2,
			&x.Mobiltelefon1,
			&x.Mobiltelefon2,
			&x.EMail1,
			&x.EMail2,
			&x.KundUmsatz,
			&x.LiefUmsatz); err != nil {
			log.Fatal(err)
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}
		Res = append(Res, x)
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	json.NewEncoder(w).Encode(Res)
}

func ReverseSucheKunde(w http.ResponseWriter, r *http.Request) {
	Search := r.FormValue("Search")
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")

	database, err := sql.Open("sqlserver", getConnectionString())
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	defer database.Close()
	SearchParam := strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(Search, "+49", "0"), " ", ""), "(", ""), ")", ""), "/", ""), "-", ""), ",", "")
	query := fmt.Sprintf(`
		SELECT SG_Adressen_PK, Suchbegriff,  KundNr, LiefNr, Homepage, Telefon1, Telefon2, Mobiltelefon1, Mobiltelefon2, EMail1, EMail2, KundUmsatz, LiefUmsatz 
		FROM sg_adressen WHERE 
		REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Telefon1, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','')
		LIKE '%%%s%%' 
		OR 
		REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Telefon2, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','')
		LIKE '%%%s%%' 
		OR 
		REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Mobiltelefon1, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','')
		LIKE '%%%s%%' 
		OR 
		REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Mobiltelefon2, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','')
		LIKE '%%%s%%'`, SearchParam, SearchParam, SearchParam, SearchParam,
	)

	rows, err := database.Query(query)
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	defer rows.Close()

	var Res []Sg_Adressen
	for rows.Next() {
		var x Sg_Adressen

		if err := rows.Scan(&x.SG_Adressen_PK,
			&x.Suchbegriff,
			&x.KundNr,
			&x.LiefNr,
			&x.Homepage,
			&x.Telefon1,
			&x.Telefon2,
			&x.Mobiltelefon1,
			&x.Mobiltelefon2,
			&x.EMail1,
			&x.EMail2,
			&x.KundUmsatz,
			&x.LiefUmsatz); err != nil {
			log.Fatal(err)
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}
		Res = append(Res, x)
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	json.NewEncoder(w).Encode(Res)
}
