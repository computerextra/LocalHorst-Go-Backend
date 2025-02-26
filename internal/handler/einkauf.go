package handler

import (
	"context"
	"log/slog"
	"net/http"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/internal/component"
)

func (h *Handler) getEinkaufsliste(ctx context.Context) ([]db.EinkaufModel, error) {
	return h.database.Einkauf.FindMany().With(
		db.Einkauf.Mitarbeiter.Fetch(),
	).Exec(ctx)
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
