package main

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"coredex/internal/config"
	"coredex/internal/database"
	"coredex/internal/router"
	"coredex/pkg/logger"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	cfg, err := config.Load()
	if err != nil {
		slog.Error("config_load_failed", slog.String("error", err.Error()))
		os.Exit(1)
	}

	log := logger.New(cfg.Env, cfg.LogLevel)
	slog.SetDefault(log)

	log.Info("coredex_starting",
		slog.String("env", cfg.Env),
		slog.Int("http_port", cfg.HTTPPort),
		slog.String("log_level", cfg.LogLevel),
		slog.Duration("shutdown_timeout", cfg.ShutdownTimeout),
		slog.Bool("cors_enabled", len(cfg.CORSAllowedOrigins) > 0),
		slog.Bool("rate_limit_enabled", cfg.RateLimitRPS > 0),
	)

	db, err := database.Connect(cfg.Database, cfg.Env, log)
	if err != nil {
		log.Error("database_connect_failed", slog.String("error", err.Error()))
		os.Exit(1)
	}

	if err := database.Migrate(db); err != nil {
		log.Error("database_migrate_failed", slog.String("error", err.Error()))
		_ = database.Close(db)
		os.Exit(1)
	}
	log.Info("database_migrate_ok")

	if err := database.Seed(db, log); err != nil {
		log.Error("database_seed_failed", slog.String("error", err.Error()))
		_ = database.Close(db)
		os.Exit(1)
	}
	log.Info("database_seed_ok")

	deps, err := router.NewDependencies(cfg, db)
	if err != nil {
		log.Error("dependencies_init_failed", slog.String("error", err.Error()))
		_ = database.Close(db)
		os.Exit(1)
	}

	engine := router.New(cfg, log, deps)

	addr := fmt.Sprintf(":%d", cfg.HTTPPort)
	srv := &http.Server{
		Addr:              addr,
		Handler:           engine,
		ReadTimeout:       cfg.HTTPReadTimeout,
		ReadHeaderTimeout: 10 * time.Second,
		WriteTimeout:      cfg.HTTPWriteTimeout,
		IdleTimeout:       cfg.HTTPIdleTimeout,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Error("http_listen_failed", slog.String("error", err.Error()))
			os.Exit(1)
		}
	}()

	log.Info("coredex_listen", slog.String("addr", addr))

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)
	sig := <-sigCh
	log.Info("shutdown_signal_received", slog.String("signal", sig.String()))

	shutdownCtx, cancel := context.WithTimeout(context.Background(), cfg.ShutdownTimeout)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Error("http_shutdown_error", slog.String("error", err.Error()))
	} else {
		log.Info("http_server_stopped")
	}

	if cerr := database.Close(db); cerr != nil {
		log.Error("database_close_failed", slog.String("error", cerr.Error()))
	} else {
		log.Info("database_closed")
	}

	log.Info("coredex_shutdown_complete")
}
