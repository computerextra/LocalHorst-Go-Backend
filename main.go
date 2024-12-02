package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/computerextra/golang-backend/env"
	"github.com/computerextra/golang-backend/mitarbeiter"
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
	router.HandleFunc("/api/user", mitarbeiter.GetAll).Methods(http.MethodGet)
	router.HandleFunc("/api/user/{id}", mitarbeiter.Get).Methods(http.MethodGet)

	// Einkauf
	router.HandleFunc("/api/Einkauf/{id}", mitarbeiter.GetEinkauf).Methods(http.MethodGet)

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
	})
	handler := c.Handler(router)

	spa := spaHandler{staticPath: "dist", indexPath: "index.html"}
	router.PathPrefix("/").Handler(spa)

	port := env.GetEnv("VITE_PORT")
	srv := &http.Server{
		Handler: handler,
		Addr:    fmt.Sprintf("127.0.0.1:%v", port),
		// Good Pratice: enfoce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
