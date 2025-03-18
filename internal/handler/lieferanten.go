package handler

import (
	"fmt"
	"log/slog"
	"net/http"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/internal/component"
)

func (h *Handler) GetLieferanten(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	lieferanten, err := h.database.Lieferanten.FindMany().With(
		db.Lieferanten.Anschprechpartner.Fetch(),
	).OrderBy(
		db.Lieferanten.Firma.Order(db.SortOrderAsc),
	).Exec(ctx)

	if err != nil {
		h.logger.Error("failed to query database", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.LieferantenOverview(lieferanten).Render(ctx, w)
}

func (h *Handler) GetLieferant(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.PathValue("id")

	lieferant, err := h.database.Lieferanten.FindUnique(
		db.Lieferanten.ID.Equals(id),
	).With(
		db.Lieferanten.Anschprechpartner.Fetch(),
	).Exec(ctx)
	if err != nil {
		h.logger.Error("failed to query database", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.Lieferant(lieferant).Render(ctx, w)
}

func (h *Handler) GetLieferantForEdit(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.PathValue("id")

	lieferant, err := h.database.Lieferanten.FindUnique(
		db.Lieferanten.ID.Equals(id),
	).With(
		db.Lieferanten.Anschprechpartner.Fetch(),
	).Exec(ctx)
	if err != nil {
		h.logger.Error("failed to query database", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.LieferantEdit(lieferant).Render(ctx, w)
}

func (h *Handler) UpdateLieferant(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.PathValue("id")

	Firma := r.FormValue("Firma")
	Kundennummer := r.FormValue("Kundennummer")
	Webseite := r.FormValue("Webseite")

	lieferant, err := h.database.Lieferanten.FindUnique(
		db.Lieferanten.ID.Equals(id),
	).Update(
		db.Lieferanten.Firma.Set(Firma),
		db.Lieferanten.Kundennummer.SetIfPresent(&Kundennummer),
		db.Lieferanten.Webseite.SetIfPresent(&Webseite),
	).Exec(ctx)
	if err != nil {
		h.logger.Error("failed to create database entry", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	host := r.Host
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	uri := fmt.Sprintf("%s://%s/Lieferanten/%s", scheme, host, lieferant.ID)
	http.Redirect(w, r, uri, http.StatusFound)
}

func (h *Handler) CreateLieferant(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	Firma := r.FormValue("Firma")
	Kundennummer := r.FormValue("Kundennummer")
	Webseite := r.FormValue("Webseite")

	lieferant, err := h.database.Lieferanten.CreateOne(
		db.Lieferanten.Firma.Set(Firma),
		db.Lieferanten.Kundennummer.SetIfPresent(&Kundennummer),
		db.Lieferanten.Webseite.SetIfPresent(&Webseite),
	).Exec(ctx)
	if err != nil {
		h.logger.Error("failed to create database entry", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	host := r.Host
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	uri := fmt.Sprintf("%s://%s/Lieferanten/%s", scheme, host, lieferant.ID)
	http.Redirect(w, r, uri, http.StatusFound)
}

func (h *Handler) DeleteLieferant(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	ctx := r.Context()

	_, err := h.database.Lieferanten.FindUnique(
		db.Lieferanten.ID.Equals(id),
	).Delete().Exec(ctx)

	if err != nil {
		h.logger.Error("failed to delete lieferant", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
}

func (h *Handler) CreateAnsprechpartner(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.PathValue("id")

	Name := r.FormValue("Name")
	Telefon := r.FormValue("Telefon")
	Mobil := r.FormValue("Mobil")
	Mail := r.FormValue("Mail")

	_, err := h.database.Anschprechpartner.CreateOne(
		db.Anschprechpartner.Name.Set(Name),
		db.Anschprechpartner.Telefon.SetIfPresent(&Telefon),
		db.Anschprechpartner.Mobil.SetIfPresent(&Mobil),
		db.Anschprechpartner.Mail.SetIfPresent(&Mail),
		db.Anschprechpartner.Lieferanten.Link(
			db.Lieferanten.ID.Equals(id),
		),
	).Exec(ctx)

	if err != nil {
		h.logger.Error("failed to create Anschprechpartner", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
	}

	host := r.Host
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	uri := fmt.Sprintf("%s://%s/Lieferanten/%s", scheme, host, id)
	http.Redirect(w, r, uri, http.StatusFound)
}

func (h *Handler) GetAnsprechpartner(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	aid := r.PathValue("aid")

	ap, err := h.database.Anschprechpartner.FindUnique(
		db.Anschprechpartner.ID.Equals(aid),
	).Exec(ctx)

	if err != nil {
		h.logger.Error("failed to get Anschprechpartner", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
	}
	component.AnsprechpartnerEdit(ap).Render(ctx, w)
}

func (h *Handler) UpdateAnsprechpartner(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.PathValue("id")
	aid := r.PathValue("aid")

	Name := r.FormValue("Name")
	Telefon := r.FormValue("Telefon")
	Mobil := r.FormValue("Mobil")
	Mail := r.FormValue("Mail")

	_, err := h.database.Anschprechpartner.FindUnique(
		db.Anschprechpartner.ID.Equals(aid),
	).Update(
		db.Anschprechpartner.Name.Set(Name),
		db.Anschprechpartner.Telefon.SetIfPresent(&Telefon),
		db.Anschprechpartner.Mobil.SetIfPresent(&Mobil),
		db.Anschprechpartner.Mail.SetIfPresent(&Mail),
		db.Anschprechpartner.Lieferanten.Link(
			db.Lieferanten.ID.Equals(id),
		),
	).Exec(ctx)

	if err != nil {
		h.logger.Error("failed to update Anschprechpartner", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
	}

	host := r.Host
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	uri := fmt.Sprintf("%s://%s/Lieferanten/%s", scheme, host, id)
	http.Redirect(w, r, uri, http.StatusFound)
}

func (h *Handler) DeleteAnsprechpartner(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	aid := r.PathValue("aid")

	_, err := h.database.Anschprechpartner.FindUnique(
		db.Anschprechpartner.ID.Equals(aid),
	).Delete().Exec(ctx)

	if err != nil {
		h.logger.Error("failed to delete lieferant", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
}
