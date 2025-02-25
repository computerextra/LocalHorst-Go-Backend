package app

import (
	"fmt"
	"io/fs"
	"net/http"
	"os"

	"github.com/computerextra/golang-backend/internal/component"
	"github.com/computerextra/golang-backend/internal/handler"
)

func (a *App) loadPages(router *http.ServeMux) {
	// Backend Handler with database
	h := handler.New(a.logger, a.database)

	router.Handle("GET /", handler.Component(component.Index()))

	router.HandleFunc("GET /Mitarbeiter/Geburtstag", h.GetGeburtstagsPage)

	router.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})
}

func (a *App) loadStaticFiles() (http.Handler, error) {
	if os.Getenv("BUILD_MODE") == "develop" {
		return http.FileServer(http.Dir("./static")), nil
	}

	static, err := fs.Sub(a.files, "static")
	if err != nil {
		return nil, fmt.Errorf("failed to subdir static: %w", err)
	}

	return http.FileServerFS(static), nil
}

func (a *App) loadRoutes() (http.Handler, error) {
	static, err := a.loadStaticFiles()
	if err != nil {
		return nil, fmt.Errorf("failed to load static files: %w", err)
	}

	// Create new router
	router := http.NewServeMux()

	// this is the static file server
	router.Handle("GET /static/", http.StripPrefix("/static", static))

	a.loadPages(router)

	return router, nil
}
