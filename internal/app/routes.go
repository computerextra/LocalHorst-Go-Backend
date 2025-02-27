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

	// Index Route
	router.HandleFunc("GET /{$}", h.GetIndex)

	// Einkauf Routes
	router.HandleFunc("GET /Einkauf", h.GetEinkaufslistePage)               // Einkaufsliste
	router.HandleFunc("GET /Einkauf/Eingabe", h.GetMitarbeiterListe)        // Mitarbeiter Auswahl
	router.HandleFunc("POST /Einkauf/Eingabe", h.GetEinkauf)                // Mitarbeiter Auswahl
	router.HandleFunc("GET /Einkauf/Eingabe/{id}", h.GetEinkaufEingabePage) // Einkauf Eingabe
	router.HandleFunc("POST /Einkauf/Eingabe/{id}", h.UpdateEinkauf)        // Einkauf speichern
	router.HandleFunc("PATCH /Einkauf/Eingabe/{id}", h.SkipEinkauf)         // Einkauf überspringen
	router.HandleFunc("DELETE /Einkauf/Eingabe/{id}", h.DeleteEinkauf)      // Einkauf löschen
	router.HandleFunc("GET /Einkauf/Abrechnung", h.GetAbrechnung)           // Abrechnung anzeigen
	router.HandleFunc("POST /Einkauf/Abrechnung", h.SendAbrechnung)         // Abrechnung senden

	// Mitarbeiter Routes
	// router.HandleFunc("GET /Mitarbeiter") // Mitarbeiter Übersicht
	router.HandleFunc("GET /Mitarbeiter/Geburtstag", h.GetGeburtstagsPage) // Mitarbeiter Geburtstage
	// router.HandleFunc("GET /Mitarbeiter/Neu") // Neuer Mitarbeiter
	// router.HandleFunc("POST /Mitarbeiter/Neu") // Neuer Mitarbeiter
	// router.HandleFunc("GET /Mitarbeiter/{id}") // Mitarbeiter Details
	// router.HandleFunc("GET /Mitarbeiter/{id}/Bearbeiten") // Mitarbeiter bearbeiten
	// router.HandleFunc("POST /Mitarbeiter/{id}/Bearbeiten") // Mitarbeiter bearbeiten
	// router.HandleFunc("DELETE /Mitarbeiter/{id}/Bearbeiten") // Mitarbeiter Löschen

	// Lieferanten Routes
	// router.HandleFunc("GET /Lieferanten")                        // Lieferanten Übersicht
	// router.HandleFunc("GET /Lieferanten/Neu")                    // Neuer Lieferant
	// router.HandleFunc("POST /Lieferanten/Neu")                    // Neuer Lieferant
	// router.HandleFunc("GET /Lieferanten/{id}")                   // Lieferant
	// router.HandleFunc("GET /Lieferanten/{id}/Bearbeiten")        // Lieferant bearbeiten
	// router.HandleFunc("POST /Lieferanten/{id}/Bearbeiten")        // Lieferant bearbeiten
	// router.HandleFunc("DELETE /Lieferanten/{id}/Bearbeiten")        // Lieferant löschen
	// router.HandleFunc("GET /Lieferanten/{lid}/{aid}")            // Ansprechpartner Übersicht
	// router.HandleFunc("GET /Lieferanten/{lid}/{aid}/Bearbeiten") // Ansprechpartner bearbeiten
	// router.HandleFunc("POST /Lieferanten/{lid}/{aid}/Bearbeiten") // Ansprechpartner bearbeiten
	// router.HandleFunc("DELETE /Lieferanten/{lid}/{aid}/Bearbeiten") // Ansprechpartner löschen
	// router.HandleFunc("GET /Lieferanten/{lid}/Neu")              // Neuer Ansprechpartner
	// router.HandleFunc("POST /Lieferanten/{lid}/Neu")              // Neuer Ansprechpartner

	// SAGE Routes
	// router.HandleFunc("GET /Sage")                                // CE Archiv
	// router.HandleFunc("POST /Sage")                                // CE Archiv Suche
	// router.HandleFunc("GET /Sage/{filenmae}")                     // Rechnung Download
	// router.HandleFunc("GET /Sage/Suche")                          // Kunden Suche
	// router.HandleFunc("POST /Sage/Suche")                          // Kunden Suche
	// router.HandleFunc("GET /Sage/Inventur")                       // Inventur Übersicht
	// router.HandleFunc("GET /Sage/Inventur/{year}")               // Jahres Übersicht
	// router.HandleFunc("GET /Sage/Inventur/{year}/Teams")         // Teams Übersicht
	// router.HandleFunc("GET /Sage/Inventur/{year}/Teams/{items}") // Teams Items Übersicht

	// Werkstatt Route
	// router.HandleFunc("GET /Werkstatt") // Werkstatt Formulare
	// router.HandleFunc("POST /Werkstatt") // Werkstatt Formulare gen

	// Health Route
	router.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	// Catch the Rest
	router.Handle("GET /", handler.Component(component.NotFound()))
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
