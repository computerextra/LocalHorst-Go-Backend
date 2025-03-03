package handler

import (
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/internal/component"
)

func (h *Handler) SearchArchive(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	searchParams := r.URL.Query().Get("search")

	if len(searchParams) < 1 {
		component.Archiv([]db.PdfsModel{}, "").Render(ctx, w)
		return
	}

	search := strings.ToLower(searchParams)
	res, err := h.database.Pdfs.FindMany(
		db.Pdfs.Or(
			db.Pdfs.Body.Contains(search),
			db.Pdfs.Title.Contains(search),
		),
	).Exec(ctx)
	if err != nil {
		h.logger.Error("failed to query database", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	component.Archiv(res, search).Render(ctx, w)
}

func (h *Handler) GetArchiveFile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	id := r.PathValue("id")
	if len(id) < 1 {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	idInt, err := strconv.Atoi(id)
	if err != nil {
		h.logger.Error("failed to change string to int", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	pdf, err := h.database.Pdfs.FindUnique(
		db.Pdfs.ID.Equals(idInt),
	).Exec(ctx)
	if err != nil {
		h.logger.Error("failed to query database", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	archivePath, ok := os.LookupEnv("ARCHIVE_PATH")
	if !ok {
		h.logger.Error("env error: no ARCHIVE_PATH", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	directory := filepath.Join(archivePath, strings.Replace(pdf.Title, ":", ".", 1))
	file, err := os.ReadFile(directory)
	if err != nil {
		h.logger.Error("failed to read file", slog.Any("error", err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Add("ContentType", "application/pdf")
	w.Header().Add("Content-Disposition", fmt.Sprintf("attachment;filename=%s", pdf.Title))
	w.Header().Add("Content-Length", fmt.Sprintf("%v", len(file)))

	// flusher, ok := w.(http.Flusher)
	// if !ok {
	// 	h.logger.Error("cannot use flusher", slog.Any("error", err))
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	return
	// }

	w.Write(file)
}
