package main

import (
	"context"
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

	// TODO: Change to sqlc! https://sqlc.dev/
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		panic(err)
	}
	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
			panic(err)
		}
	}()
	a.database = client
}
