package handler

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"regexp"
	"strings"

	"github.com/computerextra/golang-backend/internal/component"
	"github.com/computerextra/golang-backend/internal/types"
	"github.com/computerextra/golang-backend/internal/utils"

	_ "github.com/denisenkom/go-mssqldb"
)

func (h *Handler) SearchKunde(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	searchParams := r.URL.Query().Get("search")

	var SearchResults []types.Sg_Adressen

	if len(searchParams) < 1 {
		component.Kunde(SearchResults, "", false).Render(ctx, w)
		return
	}

	reverse, err := regexp.MatchString("^(\\d|[+]49)", searchParams)
	if err != nil {
		h.logger.Error("faulty regex", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	connectionString, err := utils.GetSageConnectionString()
	if err != nil {
		h.logger.Error("failed to get connection string", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	database, err := sql.Open("sqlserver", connectionString)
	if err != nil {
		h.logger.Error("failed to get sage connection", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer database.Close()

	if reverse {
		SearchParam := strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(searchParams, "+49", "0"), " ", ""), "(", ""), ")", ""), "/", ""), "-", ""), ",", "")
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
			h.logger.Error("failed to query sage", slog.Any("error", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		for rows.Next() {
			var x types.Sg_Adressen

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
			SearchResults = append(SearchResults, x)
		}
		if err := rows.Err(); err != nil {
			h.logger.Error("failed to scan rows", slog.Any("error", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
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
		OR LiefNr LIKE @SearchWord;`, searchParams))

		if err != nil {
			h.logger.Error("failed to get sage connection", slog.Any("error", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		for rows.Next() {
			var x types.Sg_Adressen
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
			SearchResults = append(SearchResults, x)
		}
		if err := rows.Err(); err != nil {
			h.logger.Error("failed to scan rows", slog.Any("error", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	component.Kunde(SearchResults, searchParams, true).Render(ctx, w)
}
