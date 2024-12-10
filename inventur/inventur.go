package inventur

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"runtime"
)

var (
	_, b, _, _ = runtime.Caller(0)
	RootPath   = filepath.Join(filepath.Dir(b), "./Data")
)

type AllFile struct {
	Artikelnummer string `json:"Artikelnummer"`
	Suchbegriff   string `json:"Suchbegriff"`
	Anzahl        int    `json:"Anzahl"`
	Team          string `json:"Team"`
}

func GetYears(w http.ResponseWriter, r *http.Request) {
	folder, err := os.ReadDir(RootPath)
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	var folderNames []string
	for _, e := range folder {
		folderNames = append(folderNames, e.Name())
	}
	json.NewEncoder(w).Encode(folderNames)
}

func GetAllEntries(w http.ResponseWriter, r *http.Request) {
	year := r.FormValue("Year")

	file, err := os.ReadFile(fmt.Sprintf("%s/%s/_ALL.json", RootPath, year))
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}

	var res []AllFile
	err = json.Unmarshal([]byte(file), &res)
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}

	json.NewEncoder(w).Encode(res)
}

type TeamFile struct {
	Team        int    `json:"Team"`
	Mitarbeiter string `json:"Mitarbeiter"`
	Farbe       string `json:"Farbe"`
	Ort         string `json:"Ort"`
}

func GetTeams(w http.ResponseWriter, r *http.Request) {
	year := r.FormValue("Year")

	file, err := os.ReadFile(fmt.Sprintf("%s/%s/_TEAMS.json", RootPath, year))
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}

	var res []TeamFile
	err = json.Unmarshal([]byte(file), &res)
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}

	json.NewEncoder(w).Encode(res)
}

type Entry struct {
	Artikelnummer string `json:"Artikelnummer"`
	Suchbegriff   string `json:"Suchbegriff"`
	Anzahl        int    `json:"Anzahl"`
}

func GetEntry(w http.ResponseWriter, r *http.Request) {
	year := r.FormValue("Year")
	team := r.FormValue("Team")

	file, err := os.ReadFile(fmt.Sprintf("%s/%s/%s.json", RootPath, year, team))
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}

	var res []Entry
	err = json.Unmarshal([]byte(file), &res)
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}

	json.NewEncoder(w).Encode(res)
}
