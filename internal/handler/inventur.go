package handler

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"

	"github.com/computerextra/golang-backend/internal/component"
	"github.com/computerextra/golang-backend/internal/types"
)

var (
	RootPath = filepath.Join("inventur", "Data")
)

func (h *Handler) GetInventur(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// All The possible Params
	year := r.URL.Query().Get("year")
	team := r.URL.Query().Get("team")

	var err error
	var all []types.InventurAllFile
	var teams []types.InventurTeamFile
	var entries []types.InventurEntry
	var years []string

	if len(year) == 4 {
		teams, err = getTeamData(year)
		if err != nil {
			h.logger.Error("failed to read folder", slog.Any("error", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		all, err = getAllEntries(year)
		if err != nil {
			h.logger.Error("failed to read folder", slog.Any("error", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
	if len(year) == 4 && len(team) == 3 {
		entries, err = getEntries(year, team)
		if err != nil {
			h.logger.Error("failed to read folder", slog.Any("error", err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
	years, err = getyears()
	if err != nil {
		h.logger.Error("failed to read folder", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	component.Inventur(year, team, years, all, teams, entries).Render(ctx, w)
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

func getAllEntries(year string) ([]types.InventurAllFile, error) {
	ex, err := os.Executable()
	if err != nil {
		return nil, err
	}
	exPath := filepath.Dir(ex)
	file, err := os.ReadFile(fmt.Sprintf("%s/_ALL.json", filepath.Join(exPath, RootPath, year)))
	if err != nil {
		return nil, err
	}

	var res []types.InventurAllFile
	err = json.Unmarshal([]byte(file), &res)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func getTeamData(year string) ([]types.InventurTeamFile, error) {
	ex, err := os.Executable()
	if err != nil {
		return nil, err
	}
	exPath := filepath.Dir(ex)
	file, err := os.ReadFile(fmt.Sprintf("%s/_TEAMS.json", filepath.Join(exPath, RootPath, year)))
	if err != nil {
		return nil, err
	}
	var res []types.InventurTeamFile
	err = json.Unmarshal([]byte(file), &res)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func getEntries(year string, team string) ([]types.InventurEntry, error) {
	ex, err := os.Executable()
	if err != nil {
		return nil, err
	}
	exPath := filepath.Dir(ex)

	file, err := os.ReadFile(fmt.Sprintf("%s/%s.json", filepath.Join(exPath, RootPath, year), team))

	if err != nil {
		return nil, err
	}

	var res []types.InventurEntry
	err = json.Unmarshal([]byte(file), &res)
	if err != nil {
		return nil, err
	}
	return res, nil
}
