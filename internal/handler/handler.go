package handler

import (
	"log/slog"
	"net/http"

	"github.com/a-h/templ"
	"github.com/computerextra/golang-backend/db"
)

type Handler struct {
	logger   *slog.Logger
	database *db.PrismaClient
}

func New(logger *slog.Logger, database *db.PrismaClient) *Handler {
	return &Handler{
		logger:   logger,
		database: database,
	}
}

func Component(comp templ.Component) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "text/html")
		comp.Render(r.Context(), w)
	})
}
