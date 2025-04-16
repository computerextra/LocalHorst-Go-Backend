package main

import (
	"database/sql"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Archive struct {
	Id    int32
	Title string
	Body  string
}

func (a *App) SearchArchive(search string) []Archive {
	conn, err := sql.Open("mysql", a.config.DATABASE_URL)
	if err != nil {
		return nil
	}
	defer conn.Close()
	stmt, err := conn.Prepare("SELECT id, title, body FROM pdfs WHERE body LIKE ? OR title LIKE ?;")
	if err != nil {
		return nil
	}
	defer stmt.Close()

	rows, err := stmt.Query(
		search, search,
	)
	if err != nil {
		return nil
	}
	defer rows.Close()

	var res []Archive
	for rows.Next() {
		var x Archive
		if err := rows.Scan(&x.Id, &x.Title, &x.Body); err != nil {
			return nil
		}
		res = append(res, x)
	}
	return res
}

func (a *App) GetArchive(id string) string {
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return "Incorrect ID"
	}

	conn, err := sql.Open("mysql", a.config.DATABASE_URL)
	if err != nil {
		return err.Error()
	}
	defer conn.Close()

	stmt, err := conn.Prepare("SELECT id, title, body FROM pdfs WHERE id= ?;")
	if err != nil {
		return err.Error()
	}
	defer stmt.Close()
	var pdf Archive
	err = stmt.QueryRow(idInt).Scan(&pdf.Id, &pdf.Title, &pdf.Body)
	if err != nil {
		return err.Error()
	}

	// pdf, err := a.db.GetArchive(int32(idInt))
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
