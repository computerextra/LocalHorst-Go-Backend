package main

import (
	"context"
	"fmt"
	"golang-backend/db"
)

// App struct
type App struct {
	ctx      context.Context
	database *db.PrismaClient
	config   *Config
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
		panic(err)
	}
	a.config = config
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		panic(err)
	}
	a.database = client
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetAllMitarbeiter() []db.MitarbeiterModel {
	ma, err := a.getAllMitarbeiter()
	if err != nil {
		return nil
	}

	return ma
}
