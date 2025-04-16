package main

import (
	"context"
	"fmt"
	"golang-backend/db"
	"os/user"

	_ "github.com/go-sql-driver/mysql"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx    context.Context
	config *Config
	db     *db.PrismaClient
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

	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:          "error",
			Title:         "Datenbank",
			Message:       fmt.Sprintf("Datenbank Fehler: %s", err.Error()),
			Buttons:       []string{"Ok"},
			DefaultButton: "Ok",
		})
		panic(err)
	}
	// conn, err := db.GetConnection(config.DATABASE_URL)
	// if err != nil {
	// 	runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
	// 		Type:          "error",
	// 		Title:         "Datenbank",
	// 		Message:       fmt.Sprintf("Datenbank Fehler: %s", err.Error()),
	// 		Buttons:       []string{"Ok"},
	// 		DefaultButton: "Ok",
	// 	})
	// 	panic(err)
	// }

	a.db = client

	a.config = config

	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
			panic(err)
		}
	}()
}

func (a App) GetUsername() string {
	u, err := user.Current()
	if err != nil {
		return ""
	}

	return u.Name
}
