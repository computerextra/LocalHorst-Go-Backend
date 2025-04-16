package main

import (
	"context"
	"fmt"
	"os/user"

	"golang-backend/ent"

	_ "github.com/mattn/go-sqlite3"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx    context.Context
	config *Config
	db     *ent.Client
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	config, err := GetConfig()
	if err != nil {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:          "error",
			Title:         "Keine Config",
			Message:       fmt.Sprintf("Config Fehler: %s", err.Error()),
			Buttons:       []string{"Ok"},
			DefaultButton: "Ok",
		})
		panic(err)
	}

	a.config = config

	client, err := ent.Open("sqlite3", fmt.Sprintf("file:%s\\viktor.db?cache=shared&mode=rwc&_fk=1", config.UPLOAD_FOLDER))
	if err != nil {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:          "error",
			Title:         "Database",
			Message:       fmt.Sprintf("Datenbank fehler: %s", err.Error()),
			Buttons:       []string{"Ok"},
			DefaultButton: "Ok",
		})
		panic(err)
	}
	a.db = client
}

func (a App) GetUsername() string {
	u, err := user.Current()
	if err != nil {
		return ""
	}

	return u.Name
}
