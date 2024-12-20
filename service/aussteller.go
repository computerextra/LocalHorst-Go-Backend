package service

import (
	"encoding/json"
	"net/http"

	"github.com/computerextra/golang-backend/sage"
)

func SyncAussteller(w http.ResponseWriter, r *http.Request) {
	r.Header.Add("Content-Type", "application/json")
	w.Header().Set("Content-Type", "application/json")
	ctx := r.Context()

	err := sage.SyncAussteller(ctx)
	if err != nil {
		fehler := err.Error()
		json.NewEncoder(w).Encode(map[string]string{"ok": "false", "error": fehler})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"ok": "true", "error": "false"})
}
