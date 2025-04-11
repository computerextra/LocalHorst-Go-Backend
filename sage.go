package main

import (
	"database/sql"
	"fmt"
	"regexp"
	"strings"

	_ "github.com/denisenkom/go-mssqldb"
)

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

type User struct {
	Name    string
	Vorname string
}

func (a *App) GetKunde(Kundennummer string) *User {
	var result User
	connectionString := fmt.Sprintf("server=%s;database=%s;user id=%s;password=%s;port=%d", a.config.SAGE_SERVER, a.config.SAGE_DB, a.config.SAGE_USER, a.config.SAGE_PASS, a.config.SAGE_PORT)
	database, err := sql.Open("sqlserver", connectionString)
	if err != nil {
		return nil
	}
	defer database.Close()

	rows, err := database.Query(fmt.Sprintf("SELECT Name, Vorname FROM sg_adressen WHERE KundNr LIKE '%s';", Kundennummer))
	if err != nil {
		return nil
	}
	defer rows.Close()

	for rows.Next() {
		var name sql.NullString
		var vorname sql.NullString
		if err := rows.Scan(&name, &vorname); err != nil {
			return nil
		}
		if name.Valid {
			result.Name = name.String
		}
		if vorname.Valid {
			result.Vorname = vorname.String
		}
		if err := rows.Err(); err != nil {
			return nil
		}
	}

	return &result
}

func (a *App) SearchSage(searchTerm string) []Sg_Adressen {
	var results []Sg_Adressen

	if len(searchTerm) == 0 {
		fmt.Println("no searchterm")
		return nil
	}

	reverse, err := regexp.MatchString("^(\\d|[+]49)", searchTerm)
	if err != nil {
		fmt.Println("regex error", err.Error())
		return nil
	}

	connectionString := fmt.Sprintf("server=%s;database=%s;user id=%s;password=%s;port=%d", a.config.SAGE_SERVER, a.config.SAGE_DB, a.config.SAGE_USER, a.config.SAGE_PASS, a.config.SAGE_PORT)
	database, err := sql.Open("sqlserver", connectionString)
	if err != nil {
		fmt.Println("database error", err.Error())
		return nil
	}
	defer database.Close()

	if reverse {
		searchTerm := strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(searchTerm, "+49", "0"), " ", ""), "(", ""), ")", ""), "/", ""), "-", ""), ",", "")
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
			LIKE '%%%s%%'`, searchTerm, searchTerm, searchTerm, searchTerm,
		)

		rows, err := database.Query(query)
		if err != nil {
			fmt.Println("row error", err.Error())
			return nil
		}
		defer rows.Close()

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

				return nil
			}
			results = append(results, x)
		}
		if err := rows.Err(); err != nil {
			fmt.Println("row error", err.Error())
			return nil
		}
	} else {
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
		OR LiefNr LIKE @SearchWord;`, searchTerm))

		if err != nil {
			fmt.Println("row error", err.Error())
			return nil
		}
		defer rows.Close()

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

				fmt.Println("row error", err.Error())
				return nil
			}
			results = append(results, x)
		}
		if err := rows.Err(); err != nil {
			fmt.Println("row error", err.Error())
			return nil
		}
	}

	return results
}
