package main

import (
	"golang-backend/db"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *App) SearchArchive(search string) []db.PdfsModel {
	res, err := a.database.Pdfs.FindMany(
		db.Pdfs.Or(
			db.Pdfs.Body.Contains(search),
			db.Pdfs.Title.Contains(search),
		),
	).Exec(a.ctx)
	if err != nil {
		return nil
	}
	return res
}

func (a *App) GetArchive(id string) string {
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return "Incorrect ID"
	}
	pdf, err := a.database.Pdfs.FindUnique(
		db.Pdfs.ID.Equals(idInt),
	).Exec(a.ctx)
	if err != nil {
		return "Document not found"
	}
	directory := filepath.Join(a.config.ARCHIVE_PATH, strings.Replace(pdf.Title, ":", ".", 1))
	file, err := os.ReadFile(directory)
	if err != nil {
		return "File not Found"
	}
	pathName, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		DefaultFilename: pdf.Title,
	})
	if err != nil {
		return "Server Error"
	}
	if len(pathName) == 0 {
		return "No Path given"
	}
	err = os.WriteFile(pathName, file, 0644)
	if err != nil {
		return "Error writting file"
	}
	return "File saved"
}
