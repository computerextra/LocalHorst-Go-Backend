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

const MAXFILESIZE = 200 << 20 // Max 200 MB files

func (h *Handler) getEinkaufsliste(ctx context.Context) ([]db.EinkaufModel, error) {
	return h.database.Einkauf.FindMany().With(
		db.Einkauf.Mitarbeiter.Fetch(),
	).Exec(ctx)
}

func (h *Handler) UpdateEinkauf(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if err := r.ParseMultipartForm(MAXFILESIZE); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	mitarbeiterId := r.FormValue("mitarbeiterId")
	Dinge := r.FormValue("Dinge")
	Pfand := r.FormValue("Pfand")
	Geld := r.FormValue("Geld")
	var Paypal bool = false
	if r.FormValue("Paypal") == "true" {
		Paypal = true
	}
	var Abonniert bool = false
	if r.FormValue("Abonniert") == "true" {
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
	for _, x := range r.MultipartForm.File["Bild1"] {
		Bild2, err = utils.SaveFile(x, mitarbeiterId, "1")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
	for _, x := range r.MultipartForm.File["Bild1"] {
		Bild3, err = utils.SaveFile(x, mitarbeiterId, "1")
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

	_, err = h.database.Einkauf.FindUnique(
		db.Einkauf.ID.Equals(id),
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
		db.Einkauf.MitarbeiterID.Set(mitarbeiterId),
	).Exec(ctx)

	if err != nil {
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

func (h *Handler) GetEinkauf(w http.ResponseWriter, r *http.Request) {
	id := r.FormValue("mitarbeiterId")
	ctx := r.Context()

	einkauf, err := h.database.Einkauf.FindFirst(
		db.Einkauf.MitarbeiterID.Equals(id),
	).Exec(ctx)

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
