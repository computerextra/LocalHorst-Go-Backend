package sage

import (
	"database/sql"
	b64 "encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/env"
	"github.com/gorilla/mux"
)

func SearchArchive(w http.ResponseWriter, r *http.Request) {
	Search := r.FormValue("Search")
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	env := env.GetEnv()
	// Get Database
	ctx := r.Context()
	datebase, err := sql.Open("mysql", env.DATABASE_URL)
	if err != nil {
		panic(err)
	}

	datebase.SetConnMaxIdleTime(time.Minute * 3)
	datebase.SetMaxOpenConns(10)
	datebase.SetMaxIdleConns(10)
	queries := db.New(datebase)

	s := fmt.Sprintf("%%%s%%", strings.ToLower(Search))
	User, err := queries.SearchArchive(ctx, db.SearchArchiveParams{
		Title: s,
		Body:  s,
	})
	datebase.Close()

	if err != nil {
		// w.WriteHeader(http.StatusBadRequest)
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
	} else {
		// w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(User)
	}
}

func GetArchiveFile(w http.ResponseWriter, r *http.Request) {
	Title := mux.Vars(r)["filename"]

	env := env.GetEnv()
	ArchivePath := env.ARCHIVE_PATH

	w.Header().Set("Content-Type", "application/json") // Initial Content-Type

	directory := filepath.Join(ArchivePath, strings.Replace(Title, ":", ".", 1))
	file, err := os.ReadFile(directory)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("Unable to open file")
		return
	}

	// Set download headers:#
	// w.Header().Set("Content-Disposition", "attachment; filename="+filepath.Base(directory))
	// w.Header().Set("Content-Type", "application/octet-stream") // Set binary stream type
	sEnc := b64.StdEncoding.EncodeToString([]byte(file))
	// Serve the file
	// http.ServeFile(w, r, string(file))
	json.NewEncoder(w).Encode(sEnc)
}
