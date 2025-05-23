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
	router.HandleFunc("GET /Mitarbeiter", h.GetMitarbeiterOverview)                        // Mitarbeiter Übersicht
	router.HandleFunc("GET /Mitarbeiter/Geburtstag", h.GetGeburtstagsPage)                 // Mitarbeiter Geburtstage
	router.Handle("GET /Mitarbeiter/Neu", handler.Component(component.NeuerMitarbeiter())) // Neuer Mitarbeiter
	router.HandleFunc("POST /Mitarbeiter/Neu", h.CreateMitarbeiter)                        // Neuer Mitarbeiter
	router.HandleFunc("GET /Mitarbeiter/{id}", h.GetMitarbeiter)                           // Mitarbeiter Details
	router.HandleFunc("GET /Mitarbeiter/{id}/Bearbeiten", h.GetMitarbeiterEdit)            // Mitarbeiter bearbeiten
	router.HandleFunc("POST /Mitarbeiter/{id}/Bearbeiten", h.UpdateMitarbeiter)            // Mitarbeiter bearbeiten
	router.HandleFunc("DELETE /Mitarbeiter/{id}/Bearbeiten", h.DeleteMitarbeiter)          // Mitarbeiter Löschen

	// Lieferanten Routes
	router.HandleFunc("GET /Lieferanten", h.GetLieferanten)                                       // Lieferanten Übersicht
	router.HandleFunc("GET /Lieferanten/{id}", h.GetLieferant)                                    // Lieferant Details
	router.Handle("GET /Lieferanten/Neu", handler.Component(component.LieferantNew()))            // Neuer Lieferant
	router.HandleFunc("POST /Lieferanten/Neu", h.CreateLieferant)                                 // Neuer Lieferant
	router.HandleFunc("GET /Lieferanten/{id}/edit", h.GetLieferantForEdit)                        // Lieferant bearbeiten
	router.HandleFunc("POST /Lieferanten/{id}/edit", h.UpdateLieferant)                           // Lieferant bearbeiten
	router.HandleFunc("DELETE /Lieferanten/{id}/edit", h.DeleteLieferant)                         // Lieferant bearbeiten
	router.Handle("GET /Lieferanten/{id}/Neu", handler.Component(component.AnsprechpartnerNew())) // Neuer Ansprechpartner
	router.HandleFunc("POST /Lieferanten/{id}/Neu", h.CreateAnsprechpartner)                      // Neuer Ansprechpartner
	router.HandleFunc("GET /Lieferanten/{id}/{aid}", h.GetAnsprechpartner)                        // Ansprechpartner bearbeiten
	router.HandleFunc("POST /Lieferanten/{id}/{aid}", h.UpdateAnsprechpartner)                    // Ansprechpartner bearbeiten
	router.HandleFunc("DELETE /Lieferanten/{id}/{aid}", h.DeleteAnsprechpartner)                  // Ansprechpartner löschen

	// CE Archiv Routes
	router.HandleFunc("GET /Archiv", h.SearchArchive)       // CE Archiv Form
	router.HandleFunc("GET /Archiv/{id}", h.GetArchiveFile) // CE Archiv Download

	// Sage Kundensuche
	router.HandleFunc("GET /Kunde", h.SearchKunde) // Kunden Suche

	// Inventur Routes
	router.HandleFunc("GET /Inventur", h.GetInventur) // Inventur Übersicht

	// Werkstatt Route
	router.Handle("GET /Werkstatt", handler.Component(component.Werkstatt())) // Werkstatt Formular Auswahl
	router.HandleFunc("GET /Werkstatt/Software", h.GetSoftwareForm)           // Werkstatt Formulare
	router.HandleFunc("POST /api/Werkstatt", h.GenerateForm)                  // Werkstatt Formulare Gen

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
