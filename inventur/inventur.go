package inventur

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

var (
	RootPath = filepath.Join("inventur", "Data")
)

type AllFile struct {
	Artikelnummer string `json:"Artikelnummer"`
	Suchbegriff   string `json:"Suchbegriff"`
	Anzahl        int    `json:"Anzahl"`
	Team          string `json:"Team"`
}

func GetYears(w http.ResponseWriter, r *http.Request) {
	ex, err := os.Executable()
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	exPath := filepath.Dir(ex)

	folder, err := os.ReadDir(filepath.Join(exPath, RootPath))
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
	ex, err := os.Executable()
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	exPath := filepath.Dir(ex)

	file, err := os.ReadFile(fmt.Sprintf("%s/_ALL.json", filepath.Join(exPath, RootPath, year)))
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
	ex, err := os.Executable()
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	exPath := filepath.Dir(ex)

	file, err := os.ReadFile(fmt.Sprintf("%s/_TEAMS.json", filepath.Join(exPath, RootPath, year)))

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
	ex, err := os.Executable()
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"error": fehler})
		return
	}
	exPath := filepath.Dir(ex)

	file, err := os.ReadFile(fmt.Sprintf("%s/%s.json", filepath.Join(exPath, RootPath, year), team))

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
