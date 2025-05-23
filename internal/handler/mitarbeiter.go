package handler

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/internal/component"
	"github.com/computerextra/golang-backend/internal/utils"
)

func (h *Handler) getAllMitarbeiter(ctx context.Context) ([]db.MitarbeiterModel, error) {
	return h.database.Mitarbeiter.FindMany().OrderBy(db.Mitarbeiter.Name.Order(db.SortOrderAsc)).With(db.Mitarbeiter.Einkauf.Fetch()).Exec(ctx)
}

func (h *Handler) GetMitarbeiter(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.PathValue("id")

	user, err := h.database.Mitarbeiter.FindUnique(
		db.Mitarbeiter.ID.Equals(id),
	).Exec(ctx)
	if err != nil {
		h.logger.Error("failed to get database entry:", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.MitarbeiterDetails(user).Render(ctx, w)
}

func (h *Handler) GetMitarbeiterEdit(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.PathValue("id")

	user, err := h.database.Mitarbeiter.FindUnique(
		db.Mitarbeiter.ID.Equals(id),
	).Exec(ctx)
	if err != nil {
		h.logger.Error("failed to get database entry:", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.MitarbeiterBearbeiten(user).Render(ctx, w)
}

func (h *Handler) CreateMitarbeiter(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

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
	Geburtstag_time, _ := time.Parse(time.RFC3339, fmt.Sprintf("%sT00:00:00Z", Geburtstag))

	h.logger.Info("Geburtag:", slog.Any("Geburtstag", Geburtstag), slog.Any("Geburtstag_time", Geburtstag_time))

	_, err := h.database.Mitarbeiter.CreateOne(
		db.Mitarbeiter.Name.Set(Name),
		db.Mitarbeiter.Short.Set(Short),
		db.Mitarbeiter.Gruppenwahl.Set(Gruppenwahl),
		db.Mitarbeiter.InternTelefon1.Set(InternTelefon1),
		db.Mitarbeiter.InternTelefon2.Set(InternTelefon2),
		db.Mitarbeiter.FestnetzAlternativ.Set(FestnetzAlternativ),
		db.Mitarbeiter.FestnetzPrivat.Set(FestnetzPrivat),
		db.Mitarbeiter.HomeOffice.Set(HomeOffice),
		db.Mitarbeiter.MobilBusiness.Set(MobilBusiness),
		db.Mitarbeiter.MobilPrivat.Set(MobilPrivat),
		db.Mitarbeiter.Email.Set(Email),
		db.Mitarbeiter.Azubi.Set(utils.If(Azubi == "on", true, false)),
		db.Mitarbeiter.Geburtstag.Set(Geburtstag_time),
	).Exec(ctx)

	if err != nil {
		h.logger.Error("failed to create database entry:", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	host := r.Host
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	uri := fmt.Sprintf("%s://%s/Mitarbeiter", scheme, host)
	http.Redirect(w, r, uri, http.StatusFound)
}

func (h *Handler) UpdateMitarbeiter(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.PathValue("id")
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
	Geburtstag_time, _ := time.Parse(time.RFC3339, fmt.Sprintf("%sT00:00:00Z", Geburtstag))

	_, err := h.database.Mitarbeiter.FindUnique(
		db.Mitarbeiter.ID.Equals(id),
	).Update(
		db.Mitarbeiter.Name.Set(Name),
		db.Mitarbeiter.Short.Set(Short),
		db.Mitarbeiter.Gruppenwahl.Set(Gruppenwahl),
		db.Mitarbeiter.InternTelefon1.Set(InternTelefon1),
		db.Mitarbeiter.InternTelefon2.Set(InternTelefon2),
		db.Mitarbeiter.FestnetzAlternativ.Set(FestnetzAlternativ),
		db.Mitarbeiter.FestnetzPrivat.Set(FestnetzPrivat),
		db.Mitarbeiter.HomeOffice.Set(HomeOffice),
		db.Mitarbeiter.MobilBusiness.Set(MobilBusiness),
		db.Mitarbeiter.MobilPrivat.Set(MobilPrivat),
		db.Mitarbeiter.Email.Set(Email),
		db.Mitarbeiter.Azubi.Set(utils.If(Azubi == "on", true, false)),
		db.Mitarbeiter.Geburtstag.Set(Geburtstag_time),
	).Exec(ctx)

	if err != nil {
		h.logger.Error("failed to update database entry:", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	host := r.Host
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	uri := fmt.Sprintf("%s://%s/Mitarbeiter", scheme, host)
	http.Redirect(w, r, uri, http.StatusFound)
}

func (h *Handler) DeleteMitarbeiter(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.PathValue("id")

	_, err := h.database.Mitarbeiter.FindUnique(
		db.Mitarbeiter.ID.Equals(id),
	).Delete().Exec(ctx)

	if err != nil {
		h.logger.Error("failed to delete database entry:", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	host := r.Host
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	uri := fmt.Sprintf("%s://%s/Mitarbeiter", scheme, host)
	http.Redirect(w, r, uri, http.StatusFound)
}

func (h *Handler) GetIndex(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	user, err := h.getAllMitarbeiter(ctx)
	if err != nil {
		h.logger.Error("failed to get database entry:", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.Index(user).Render(ctx, w)
}

func (h *Handler) GetGeburtstagsPage(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	user, err := h.database.Mitarbeiter.FindMany().OrderBy(
		db.Mitarbeiter.Geburtstag.Order(db.SortOrderAsc),
	).Exec(ctx)
	if err != nil {
		h.logger.Error("failed to get database entry:", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.Geburtstage(user).Render(ctx, w)
}

func (h *Handler) GetMitarbeiterOverview(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	user, err := h.getAllMitarbeiter(ctx)
	if err != nil {
		h.logger.Error("failed to get database entry:", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.MitarbeiterOverview(user).Render(ctx, w)
}

func (h *Handler) GetMitarbeiterListe(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	user, err := h.getAllMitarbeiter(ctx)
	if err != nil {
		h.logger.Error("failed to get database entry:", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.EinkaufMitarbeiterAuswahl(user).Render(ctx, w)
}
