package handler

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"

	"github.com/computerextra/golang-backend/internal/component"
	"github.com/computerextra/golang-backend/internal/utils"

	_ "github.com/denisenkom/go-mssqldb"
)

func (h *Handler) GetSoftwareForm(w http.ResponseWriter, r *http.Request) {
	val := r.URL.Query().Get("val")
	ctx := r.Context()

	if len(val) < 1 {
		host := r.Host
		scheme := "http"
		if r.TLS != nil {
			scheme = "https"
		}
		uri := fmt.Sprintf("%s://%s/Werkstatt", scheme, host)
		http.Redirect(w, r, uri, http.StatusFound)
	}

	component.WerkstattForm(val).Render(ctx, w)
}

func (h *Handler) GenerateForm(w http.ResponseWriter, r *http.Request) {
	Kundennummer := r.FormValue("Kundennummer")
	h.logger.Info("Kundennummer", slog.Any("data", Kundennummer))
	var user User
	var err error
	if len(Kundennummer) > 1 {
		user, err = getKunde(Kundennummer)
		if err != nil {
			h.logger.Error("failed to get sage kunde", slog.Any("error", err))
			fehler := err.Error()
			json.NewEncoder(w).Encode(map[string]string{"error": fehler})
			return
		}
	}

	json.NewEncoder(w).Encode(user)
}

type User struct {
	Name    string
	Vorname string
}

func getKunde(kundennummer string) (User, error) {
	connectionString, err := utils.GetSageConnectionString()
	if err != nil {
		return User{}, err
	}

	database, err := sql.Open("sqlserver", connectionString)
	if err != nil {
		return User{}, err
	}
	defer database.Close()
	rows, err := database.Query(fmt.Sprintf("SELECT Name, Vorname FROM sg_adressen WHERE KundNr LIKE '%s';", kundennummer))
	if err != nil {
		return User{}, err
	}
	defer rows.Close()

	var user User
	for rows.Next() {
		var name sql.NullString
		var vorname sql.NullString
		if err := rows.Scan(&name, &vorname); err != nil {
			return User{}, err
		}
		if name.Valid {
			user.Name = name.String
		}
		if vorname.Valid {
			user.Vorname = vorname.String
		}
		if err := rows.Err(); err != nil {
			return User{}, err
		}
	}
	return user, nil
}
