package app

import (
	"context"
	"errors"
	"fmt"
	"io/fs"
	"log/slog"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/computerextra/golang-backend/db"
	"github.com/computerextra/golang-backend/internal/middleware"
)

type App struct {
	config   Config
	files    fs.FS
	logger   *slog.Logger
	database *db.PrismaClient
}

func New(logger *slog.Logger, config Config, files fs.FS) (*App, error) {
	// Connect to DB
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		return nil, fmt.Errorf("failed to connect to bd: %w", err)
	}
	return &App{
		config:   config,
		logger:   logger,
		files:    files,
		database: client,
	}, nil
}

func (a *App) Start(ctx context.Context) error {

	port := getPort(3000)

	router, err := a.loadRoutes()
	if err != nil {
		return fmt.Errorf("failed when loading routes: %w", err)
	}

	middlewares := middleware.Chain(
		middleware.Logging(a.logger),
	)

	srv := &http.Server{
		Addr:           fmt.Sprintf(":%d", port),
		Handler:        middlewares(router),
		MaxHeaderBytes: 1 << 20, // Max header size (e.g., 1 MB)
	}

	errCh := make(chan error, 1)

	go func() {
		err := srv.ListenAndServe()
		if err != nil && !errors.Is(err, http.ErrServerClosed) {
			errCh <- fmt.Errorf("failed to listen and serve: %w", err)
		}

		close(errCh)
	}()

	a.logger.Info("server running", slog.Int("port", port))

	select {
	// Wait until we receive SIGINT (ctrl+c on cli)
	case <-ctx.Done():
		break
	case err := <-errCh:
		return err
	}

	sCtx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()

	srv.Shutdown(sCtx)

	return nil
}

func getPort(defaultPort int) int {
	portStr, ok := os.LookupEnv("PORT")
	if !ok {
		return defaultPort
	}

	port, err := strconv.Atoi(portStr)
	if err != nil {
		return defaultPort
	}

	return port
}
