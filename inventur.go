package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

// TODO: Inventur in DB packen! Auf der Webseite auch dementsprechend anpassen!

var (
	RootPath = filepath.Join("inventur", "Data")
)

type InventurAllFile struct {
	Artikelnummer string `json:"Artikelnummer"`
	Suchbegriff   string `json:"Suchbegriff"`
	Anzahl        int    `json:"Anzahl"`
	Team          string `json:"Team"`
}

type InventurTeamFile struct {
	Team        int    `json:"Team"`
	Mitarbeiter string `json:"Mitarbeiter"`
	Farbe       string `json:"Farbe"`
	Ort         string `json:"Ort"`
}

type InventurEntry struct {
	Artikelnummer string `json:"Artikelnummer"`
	Suchbegriff   string `json:"Suchbegriff"`
	Anzahl        int    `json:"Anzahl"`
}

func (a *App) GetInventurYears() []string {
	years, err := getyears()
	if err != nil {
		return nil
	}
	return years
}

type YearData struct {
	Teams   []InventurTeamFile
	Entries []InventurAllFile
}

func (a *App) GetDataFromYear(year string) YearData {
	teams, err := getTeamData(year)
	if err != nil {
		return YearData{}
	}
	all, err := getAllEntries(year)
	if err != nil {
		return YearData{}
	}
	return YearData{
		Teams:   teams,
		Entries: all,
	}
}

func (a *App) GetEntriesFromTeam(year, team string) []InventurEntry {
	entries, err := getEntries(year, team)
	if err != nil {
		return nil
	}
	return entries
}

func getyears() ([]string, error) {
	ex, err := os.Executable()
	if err != nil {
		return nil, err
	}
	exPath := filepath.Dir(ex)

	folder, err := os.ReadDir(filepath.Join(exPath, RootPath))
	if err != nil {
		return nil, err
	}

	var folderName []string
	for _, e := range folder {
		folderName = append(folderName, e.Name())
	}
	return folderName, nil
}

func getAllEntries(year string) ([]InventurAllFile, error) {
	ex, err := os.Executable()
	fmt.Println(ex)
	if err != nil {
		return nil, err
	}
	exPath := filepath.Dir(ex)
	fmt.Println(exPath)
	file, err := os.ReadFile(fmt.Sprintf("%s/_ALL.json", filepath.Join(exPath, RootPath, year)))
	if err != nil {
		return nil, err
	}

	var res []InventurAllFile
	err = json.Unmarshal([]byte(file), &res)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func getTeamData(year string) ([]InventurTeamFile, error) {
	ex, err := os.Executable()
	if err != nil {
		return nil, err
	}
	exPath := filepath.Dir(ex)
	file, err := os.ReadFile(fmt.Sprintf("%s/_TEAMS.json", filepath.Join(exPath, RootPath, year)))
	if err != nil {
		return nil, err
	}
	var res []InventurTeamFile
	err = json.Unmarshal([]byte(file), &res)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func getEntries(year string, team string) ([]InventurEntry, error) {
	ex, err := os.Executable()
	if err != nil {
		return nil, err
	}
	exPath := filepath.Dir(ex)

	file, err := os.ReadFile(fmt.Sprintf("%s/%s.json", filepath.Join(exPath, RootPath, year), team))

	if err != nil {
		return nil, err
	}

	var res []InventurEntry
	err = json.Unmarshal([]byte(file), &res)
	if err != nil {
		return nil, err
	}
	return res, nil
}
