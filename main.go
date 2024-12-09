package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/computerextra/golang-backend/cmsroutes"
	"github.com/computerextra/golang-backend/env"
	"github.com/computerextra/golang-backend/lieferanten"
	"github.com/computerextra/golang-backend/mitarbeiter"
	"github.com/computerextra/golang-backend/service"
	"github.com/computerextra/golang-backend/wiki"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// spaHandler implements the http.Handler interface, so we can use it
// to respond to HTTP Requests. The path to the static directory and
// path to the index file within that static directory are used to
// serve the SPA in the given static directory
type spaHandler struct {
	staticPath string
	indexPath  string
}

// ServeHTTP inspects the URL path to locate a file within the static dir
// on the SPA handler. If a file is found, it will be served. If not, the
// file located at the index path on the SPA handler will be served. This
// is suitable behavior for serving an SPA (single page application).
func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Join internally call path.Clean to prevent directory traversal
	path := filepath.Join(h.staticPath, r.URL.Path)

	// check whether a file exists or is a directory at the given path
	fi, err := os.Stat(path)
	if os.IsNotExist(err) || fi.IsDir() {
		// file does not exist or path is a directory, serve index.html
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	}

	if err != nil {
		// if we got an error (that wasn't that the file doesn't exist) stating the
		// file, return a 500 internal server error and stop
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

func main() {

	router := mux.NewRouter()

	router.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		// an example API handler
		json.NewEncoder(w).Encode(map[string]bool{"okasd": true})
	})
	// Mitarbeiter
	router.HandleFunc("/api/user", mitarbeiter.GetAll).Methods(http.MethodGet)              // Get All Mitarbeiter
	router.HandleFunc("/api/user/new", mitarbeiter.Create).Methods(http.MethodPost)         // Create Mitarbeiter
	router.HandleFunc("/api/user/{id}", mitarbeiter.Get).Methods(http.MethodGet)            // Get Mitarbeiter
	router.HandleFunc("/api/user/{id}/edit", mitarbeiter.Edit).Methods(http.MethodPost)     // Update Mitarbeiter
	router.HandleFunc("/api/user/{id}/delete", mitarbeiter.Delete).Methods(http.MethodPost) // Delete Mitarbeiter

	// Einkauf
	router.HandleFunc("/api/Einkauf", mitarbeiter.GetEinkaufListe).Methods(http.MethodGet)            // Get Einkaufsliste
	router.HandleFunc("/api/Einkauf/Mail", mitarbeiter.SendPaypalMail).Methods(http.MethodPost)       // Send PayPal Mail
	router.HandleFunc("/api/Einkauf/new", mitarbeiter.Createeinkauf).Methods(http.MethodPost)         // Create Einkauf
	router.HandleFunc("/api/Einkauf/delete", mitarbeiter.DeleteEinkauf).Methods(http.MethodPost)      // Delete Einkauf
	router.HandleFunc("/api/Einkauf/skip", mitarbeiter.SkipEinkauf).Methods(http.MethodPost)          // Skip Einkauf
	router.HandleFunc("/api/Einkauf/update/{id}", mitarbeiter.Updateeinkauf).Methods(http.MethodPost) // Update Einkauf
	router.HandleFunc("/api/Einkauf/{id}", mitarbeiter.GetEinkauf).Methods(http.MethodGet)            // Get Einkauf

	// Lieferanten
	router.HandleFunc("/api/Lieferant", lieferanten.GetLieferanten).Methods(http.MethodGet)                                       // Get Lieferanten
	router.HandleFunc("/api/Lieferant/new", lieferanten.CreateLieferant).Methods(http.MethodPost)                                 // Create Lieferant
	router.HandleFunc("/api/Lieferant/{id}", lieferanten.GetLieferant).Methods(http.MethodGet)                                    // Get Lieferant
	router.HandleFunc("/api/Lieferant/{id}/edit", lieferanten.UpdateLieferant).Methods(http.MethodPost)                           // Update Lieferant
	router.HandleFunc("/api/Lieferant/{id}/delete", lieferanten.DeleteLieferant).Methods(http.MethodPost)                         // Delete Lieferant
	router.HandleFunc("/api/Lieferant/{id}/Ansprechpartner", lieferanten.GetAnsprechpartnerFromLieferant).Methods(http.MethodGet) // Get Ansprechpartner von Lieferant

	// Ansprechpartner
	router.HandleFunc("/api/Ansprechpartner/new", lieferanten.CreateAnsprechpartner).Methods(http.MethodPost)         // Create Ansprechpartner
	router.HandleFunc("/api/Ansprechpartner/{id}", lieferanten.GetAnsprechpartner).Methods(http.MethodGet)            // Get Ansprechparnter
	router.HandleFunc("/api/Ansprechpartner/{id}/edit", lieferanten.UpdateAnsprechpartner).Methods(http.MethodPost)   // Update Ansprechpartner
	router.HandleFunc("/api/Ansprechpartner/{id}/delete", lieferanten.DeleteAnsprechpartner).Methods(http.MethodPost) // Delete Ansprechpartner

	// Wiki
	router.HandleFunc("/api/Wiki", wiki.GetWikis).Methods(http.MethodGet)                // Get All Wikis
	router.HandleFunc("/api/Wiki/new", wiki.CreateWiki).Methods(http.MethodPost)         // Create Wiki
	router.HandleFunc("/api/Wiki/{id}", wiki.GetWiki).Methods(http.MethodGet)            // Get Wiki
	router.HandleFunc("/api/Wiki/{id}/edit", wiki.UpdateWiki).Methods(http.MethodPost)   // Update Wiki
	router.HandleFunc("/api/Wiki/{id}/delete", wiki.DeleteWiki).Methods(http.MethodPost) // Delete Wiki

	// Service
	router.HandleFunc("/api/Service/Info/", service.Info).Methods(http.MethodPost) // Send Info Mail

	// CMS - Abteilung
	router.HandleFunc("/api/CMS/Abteilung", cmsroutes.GetAbteilungen).Methods(http.MethodGet)               // Get All Abteilungen
	router.HandleFunc("/api/CMS/Abteilung/new", cmsroutes.CreateAbteilung).Methods(http.MethodPost)         // Create Abteilung
	router.HandleFunc("/api/CMS/Abteilung/count", cmsroutes.CountAbteilung).Methods(http.MethodGet)         // Count Abteilungen
	router.HandleFunc("/api/CMS/Abteilung/{id}", cmsroutes.GetAbteilung).Methods(http.MethodGet)            // Get Abteilung
	router.HandleFunc("/api/CMS/Abteilung/{id}/edit", cmsroutes.UpdateAbteilung).Methods(http.MethodPost)   // Update Abteilung
	router.HandleFunc("/api/CMS/Abteilung/{id}/delete", cmsroutes.DeleteAbteilung).Methods(http.MethodPost) // Delete Abteilung

	// CMS - Angebot
	router.HandleFunc("/api/CMS/Angebot", cmsroutes.GetAngebote).Methods(http.MethodGet)                // Get All Angebote
	router.HandleFunc("/api/CMS/Angebot/new", cmsroutes.CreateAngebot).Methods(http.MethodPost)         // Create Angebot
	router.HandleFunc("/api/CMS/Angebot/count", cmsroutes.CountAngebot).Methods(http.MethodGet)         // Count Angebote
	router.HandleFunc("/api/CMS/Angebot/{id}", cmsroutes.GetAngebot).Methods(http.MethodGet)            // Get Angebot
	router.HandleFunc("/api/CMS/Angebot/{id}/edit", cmsroutes.UpdateAngebot).Methods(http.MethodPost)   // Update Angebot
	router.HandleFunc("/api/CMS/Angebot/{id}/delete", cmsroutes.DeleteAngebot).Methods(http.MethodPost) // Delete Angebot

	// CMS - Jobs
	router.HandleFunc("/api/CMS/Jobs", cmsroutes.GetJobs).Methods(http.MethodGet)                // Get All Jobs
	router.HandleFunc("/api/CMS/Jobs/new", cmsroutes.CreateJob).Methods(http.MethodPost)         // Create Job
	router.HandleFunc("/api/CMS/Jobs/count", cmsroutes.CountJobs).Methods(http.MethodGet)        // Count Jobs
	router.HandleFunc("/api/CMS/Jobs/{id}", cmsroutes.GetJob).Methods(http.MethodGet)            // Get Job
	router.HandleFunc("/api/CMS/Jobs/{id}/edit", cmsroutes.UpdateJob).Methods(http.MethodPost)   // Update Job
	router.HandleFunc("/api/CMS/Jobs/{id}/delete", cmsroutes.DeleteJob).Methods(http.MethodPost) // Delete Job

	// CMS - Mitarbeiter
	router.HandleFunc("/api/CMS/Mitarbeiter", cmsroutes.GetAllMitarbeiter).Methods(http.MethodGet)              // Get All Mitarbeiter
	router.HandleFunc("/api/CMS/Mitarbeiter/new", cmsroutes.CreateMitarbeiter).Methods(http.MethodPost)         // Create Mitarbeiter
	router.HandleFunc("/api/CMS/Mitarbeiter/count", cmsroutes.CountMitarbeiter).Methods(http.MethodGet)         // Count Mitarbeiter
	router.HandleFunc("/api/CMS/Mitarbeiter/{id}", cmsroutes.GetMitarbeiter).Methods(http.MethodGet)            // Get Mitarbeiter
	router.HandleFunc("/api/CMS/Mitarbeiter/{id}/edit", cmsroutes.UpdateMitarbeiter).Methods(http.MethodPost)   // Update Mitarbeiter
	router.HandleFunc("/api/CMS/Mitarbeiter/{id}/delete", cmsroutes.DeleteMitarbeiter).Methods(http.MethodPost) // Delete Mitarbeiter

	// CMS - Partner
	router.HandleFunc("/api/CMS/Partner", cmsroutes.GetAllPartner).Methods(http.MethodGet)              // Get All Partner
	router.HandleFunc("/api/CMS/Partner/new", cmsroutes.CreatePartner).Methods(http.MethodPost)         // Create Partner
	router.HandleFunc("/api/CMS/Partner/count", cmsroutes.CountPartner).Methods(http.MethodGet)         // Count Partner
	router.HandleFunc("/api/CMS/Partner/{id}", cmsroutes.GetPartner).Methods(http.MethodGet)            // Get Partner
	router.HandleFunc("/api/CMS/Partner/{id}/edit", cmsroutes.UpdatePartner).Methods(http.MethodPost)   // Update Partner
	router.HandleFunc("/api/CMS/Partner/{id}/delete", cmsroutes.DeletePartner).Methods(http.MethodPost) // Delete Partner

	// SAGE Routes

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
	})
	handler := c.Handler(router)

	spa := spaHandler{staticPath: "dist", indexPath: "index.html"}
	router.PathPrefix("/").Handler(spa)

	port := env.GetEnv("VITE_PORT")
	srv := &http.Server{
		Handler: handler,
		Addr:    fmt.Sprintf(":%v", port),
		// Good Pratice: enfoce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
