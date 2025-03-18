package handler

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/internal/component"
	"github.com/computerextra/golang-backend/internal/utils"
)

const MAXFILESIZE = 200 << 20 // Max 200 MB files

func (h *Handler) getEinkaufsliste(ctx context.Context) ([]db.EinkaufModel, error) {
	return h.database.Einkauf.FindMany().With(
		db.Einkauf.Mitarbeiter.Fetch(),
	).Exec(ctx)
}

func (h *Handler) UpdateEinkauf(w http.ResponseWriter, r *http.Request) {
	mitarbeiterId := r.PathValue("id")
	if err := r.ParseMultipartForm(MAXFILESIZE); err != nil {
		h.logger.Error("failes to parse form", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	Dinge := r.FormValue("Dinge")
	Pfand := r.FormValue("Pfand")
	Geld := r.FormValue("Geld")
	var Paypal bool = false
	if r.FormValue("Paypal") == "on" {
		Paypal = true
	}
	var Abonniert bool = false
	if r.FormValue("Abonniert") == "on" {
		Abonniert = true
	}
	var err error
	var Bild1 string
	var Bild2 string
	var Bild3 string
	for _, x := range r.MultipartForm.File["Bild1"] {
		Bild1, err = utils.SaveFile(x, mitarbeiterId, "1")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
	for _, x := range r.MultipartForm.File["Bild2"] {
		Bild2, err = utils.SaveFile(x, mitarbeiterId, "2")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
	for _, x := range r.MultipartForm.File["Bild3"] {
		Bild3, err = utils.SaveFile(x, mitarbeiterId, "3")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	var Bild1Date time.Time
	var Bild2Date time.Time
	var Bild3Date time.Time

	if len(Bild1) > 0 {
		Bild1Date = time.Now()
	}
	if len(Bild2) > 0 {
		Bild2Date = time.Now()
	}
	if len(Bild3) > 0 {
		Bild3Date = time.Now()
	}

	ctx := r.Context()

	_, err = h.database.Einkauf.UpsertOne(
		db.Einkauf.MitarbeiterID.Equals(mitarbeiterId),
	).Create(
		db.Einkauf.Paypal.Set(Paypal),
		db.Einkauf.Abonniert.Set(Abonniert),
		db.Einkauf.Mitarbeiter.Link(db.Mitarbeiter.ID.Equals(mitarbeiterId)),
		db.Einkauf.Dinge.Set(Dinge),
		db.Einkauf.Geld.Set(Geld),
		db.Einkauf.Pfand.Set(Pfand),
		db.Einkauf.Bild1.SetIfPresent(&Bild1),
		db.Einkauf.Bild2.SetIfPresent(&Bild2),
		db.Einkauf.Bild3.SetIfPresent(&Bild3),
		db.Einkauf.Bild1Date.SetIfPresent(&Bild1Date),
		db.Einkauf.Bild2Date.SetIfPresent(&Bild2Date),
		db.Einkauf.Bild3Date.SetIfPresent(&Bild3Date),
		db.Einkauf.Abgeschickt.Set(time.Now()),
	).Update(
		db.Einkauf.Abgeschickt.Set(time.Now()),
		db.Einkauf.Paypal.Set(Paypal),
		db.Einkauf.Abonniert.Set(Abonniert),
		db.Einkauf.Geld.Set(Geld),
		db.Einkauf.Pfand.Set(Pfand),
		db.Einkauf.Dinge.Set(Dinge),
		db.Einkauf.Bild1.SetIfPresent(&Bild1),
		db.Einkauf.Bild2.SetIfPresent(&Bild2),
		db.Einkauf.Bild3.SetIfPresent(&Bild3),
		db.Einkauf.Bild1Date.SetIfPresent(&Bild1Date),
		db.Einkauf.Bild2Date.SetIfPresent(&Bild2Date),
		db.Einkauf.Bild3Date.SetIfPresent(&Bild3Date),
	).Exec(ctx)

	if err != nil {
		h.logger.Error("failed to write to db", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	host := r.Host
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	uri := fmt.Sprintf("%s://%s/Einkauf", scheme, host)

	http.Redirect(w, r, uri, http.StatusFound)
}

func (h *Handler) getEinkauf(id string, ctx context.Context) (*db.MitarbeiterModel, error) {
	return h.database.Mitarbeiter.FindFirst(
		db.Mitarbeiter.ID.Equals(id),
	).With(
		db.Mitarbeiter.Einkauf.Fetch(),
	).Exec(ctx)

}

func (h *Handler) GetEinkauf(w http.ResponseWriter, r *http.Request) {
	id := r.FormValue("mitarbeiterId")
	ctx := r.Context()

	einkauf, err := h.getEinkauf(id, ctx)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	host := r.Host
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	uri := fmt.Sprintf("%s://%s/Einkauf/Eingabe/%s", scheme, host, einkauf.ID)

	http.Redirect(w, r, uri, http.StatusFound)
}

func (h *Handler) GetEinkaufEingabePage(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	ctx := r.Context()

	einkauf, err := h.getEinkauf(id, ctx)

	if err != nil {
		h.logger.Error("failed to get database entry", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.EinkaufEingabe(einkauf).Render(ctx, w)
}

func (h *Handler) GetEinkaufslistePage(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	einkauf, err := h.getEinkaufsliste(ctx)
	if err != nil {
		h.logger.Error("failed to get database entry", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.Einkaufsliste(einkauf).Render(ctx, w)
}

func (h *Handler) SkipEinkauf(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	ctx := r.Context()

	_, err := h.database.Einkauf.FindUnique(
		db.Einkauf.MitarbeiterID.Equals(id),
	).Update(
		db.Einkauf.Abgeschickt.Set(time.Now().Add(24 * time.Hour)),
	).Exec(ctx)

	if err != nil {
		h.logger.Error("failed to skip einkauf", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)

}

func (h *Handler) DeleteEinkauf(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	ctx := r.Context()

	_, err := h.database.Einkauf.FindUnique(
		db.Einkauf.MitarbeiterID.Equals(id),
	).Delete().Exec(ctx)

	if err != nil {
		h.logger.Error("failed to skip einkauf", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
}

func (h *Handler) GetAbrechnung(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	username := r.URL.Query().Get("user")

	einkauf, err := h.getEinkaufsliste(ctx)
	if err != nil {
		h.logger.Error("failed to get database entry", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.Abrechnung(einkauf, username).Render(ctx, w)
}

func (h *Handler) SendAbrechnung(w http.ResponseWriter, r *http.Request) {
	Name := r.FormValue("Name")
	Betrag := r.FormValue("Betrag")
	Mail := r.FormValue("Mail")
	// ctx := r.Context()

	Name = strings.Replace(Name, "@", "", -1)

	if err := utils.SendPaypalMail(Name, Mail, Betrag); err != nil {
		h.logger.Error("failed to send paypal mail", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	host := r.Host
	scheme := "http"
	if r.TLS != nil {
		scheme = "https"
	}
	uri := fmt.Sprintf("%s://%s/Einkauf/Abrechnung?user=%s", scheme, host, Name)
	http.Redirect(w, r, uri, http.StatusFound)
}
