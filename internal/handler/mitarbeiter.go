package handler

import (
	"context"
	"log/slog"
	"net/http"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/internal/component"
	"github.com/computerextra/golang-backend/internal/utils"
)

func (h *Handler) getAllMitarbeiter(ctx context.Context) ([]db.MitarbeiterModel, error) {
	return h.database.Mitarbeiter.FindMany().Exec(ctx)
}

func (h *Handler) getMitarbeiter(ctx context.Context, id string) (*db.MitarbeiterModel, error) {
	return h.database.Mitarbeiter.FindUnique(
		db.Mitarbeiter.ID.Equals(id),
	).Exec(ctx)
}

func (h *Handler) createMitarbeiter(ctx context.Context, r *http.Request) (*db.MitarbeiterModel, error) {
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

	return h.database.Mitarbeiter.CreateOne(
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
		db.Mitarbeiter.Azubi.Set(utils.If(Azubi == "true", true, false)),
		db.Mitarbeiter.Geburtstag.Set(Geburtstag_time),
	).Exec(ctx)
}

func (h *Handler) updateMitarbeiter(ctx context.Context, r *http.Request) (*db.MitarbeiterModel, error) {
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
	Geburtstag_time, _ := time.Parse("2006-01-02 15:04:05", Geburtstag)

	return h.database.Mitarbeiter.FindUnique(
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
		db.Mitarbeiter.Azubi.Set(utils.If(Azubi == "true", true, false)),
		db.Mitarbeiter.Geburtstag.Set(Geburtstag_time),
	).Exec(ctx)
}

func (h *Handler) deleteMitarbeiter(ctx context.Context, r *http.Request) (*db.MitarbeiterModel, error) {
	id := r.PathValue("id")

	return h.database.Mitarbeiter.FindUnique(
		db.Mitarbeiter.ID.Equals(id),
	).Delete().Exec(ctx)
}

func (h *Handler) GetIndex(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	user, err := h.getAllMitarbeiter(ctx)
	if err != nil {
		h.logger.Error("failed to get database entry: %w", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.Index(user).Render(ctx, w)
}

func (h *Handler) GetGeburtstagsPage(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	user, err := h.getAllMitarbeiter(ctx)
	if err != nil {
		h.logger.Error("failed to get database entry: %w", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.Geburtstage(user).Render(ctx, w)
}
