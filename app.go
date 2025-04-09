package main

import (
	"context"
	"fmt"
	"golang-backend/db"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx      context.Context
	database *db.PrismaClient
	config   *Config
	firma    bool
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
		_, err := runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:          runtime.InfoDialog,
			Title:         "Keine Konfiguration",
			Message:       "Keine Konfiguration gefunden, hier stimmt was nicht.",
			Buttons:       []string{"Ok"},
			DefaultButton: "Ok",
		})
		if err != nil {
			panic(err)
		}
		a.config = nil
	} else {
		a.config = config
	}
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		_, err := runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:          runtime.InfoDialog,
			Title:         "Kein Internet",
			Message:       "Dieser PC ist nicht mit dem Internet verbunden. Online Funktionen können nicht genutzt werden",
			Buttons:       []string{"Ok"},
			DefaultButton: "Ok",
		})
		if err != nil {
			panic(err)
		}
		a.database = nil
	} else {
		a.database = client
	}
	// Check Paths
	_, err = os.Stat(config.ARCHIVE_PATH)
	if err != nil {
		_, err := runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:          runtime.InfoDialog,
			Title:         "Firmennetz Fehler",
			Message:       "Dieser PC ist nicht im Firmennetz, viele Funktionen können nicht genutzt werden",
			Buttons:       []string{"Ok"},
			DefaultButton: "Ok",
		})
		if err != nil {
			panic(err)
		}
		a.firma = false
	} else {
		a.firma = true
	}

}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Firma() bool {
	return a.firma
}

func (a *App) Internet() bool {
	return a.database != nil
}
