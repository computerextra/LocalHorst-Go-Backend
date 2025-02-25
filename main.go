package main

import (
	"context"
	"embed"
	"log/slog"
	"os"
	"os/signal"

	"github.com/computerextra/golang-backend/internal/app"
	"github.com/joho/godotenv"
)

var files embed.FS

func main() {
	godotenv.Load()

	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()

	app, err := app.New(logger, app.Config{}, files)
	if err != nil {
		logger.Error("failed to create app", slog.Any("error", err))
	}

	if err := app.Start(ctx); err != nil {
		logger.Error("failed to start app", slog.Any("error", err))
	}

}
