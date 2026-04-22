package config

import (
	"encoding/base64"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

// Config holds application configuration loaded from the environment.
type Config struct {
	Env      string
	HTTPPort int
	LogLevel string
	Database Database
	Auth     Auth
	// VaultKey is a 32-byte AES-256 key (from VAULT_ENCRYPTION_KEY base64). Do not log.
	VaultKey []byte

	// ShutdownTimeout is the grace period for http.Server.Shutdown (default 30s).
	ShutdownTimeout time.Duration
	// CORSAllowedOrigins lists allowed Origin values (empty = CORS middleware disabled).
	CORSAllowedOrigins []string
	// RateLimitRPS is per-IP requests/sec (0 = disabled).
	RateLimitRPS float64
	// RateLimitBurst is the token bucket burst (used when RateLimitRPS > 0).
	RateLimitBurst int
	// HTTP server timeouts (defaults: read 30s, write 30s, idle 120s).
	HTTPReadTimeout  time.Duration
	HTTPWriteTimeout time.Duration
	HTTPIdleTimeout  time.Duration
}

// Auth holds JWT settings.
type Auth struct {
	JWTSecret string
	JWTExpiry time.Duration
}

// Database holds PostgreSQL connection settings (see .env.example).
type Database struct {
	Host     string
	Port     string
	User     string
	Password string
	Name     string
	SSLMode  string
}

// Validate ensures required database settings are present for a production connection.
func (d Database) Validate() error {
	host := strings.TrimSpace(d.Host)
	user := strings.TrimSpace(d.User)
	name := strings.TrimSpace(d.Name)
	port := strings.TrimSpace(d.Port)
	if host == "" {
		return fmt.Errorf("DB_HOST is required")
	}
	if user == "" {
		return fmt.Errorf("DB_USER is required")
	}
	if name == "" {
		return fmt.Errorf("DB_NAME is required")
	}
	if port == "" {
		return fmt.Errorf("DB_PORT is required")
	}
	if _, err := strconv.Atoi(port); err != nil || port == "0" {
		return fmt.Errorf("invalid DB_PORT: %q", port)
	}
	return nil
}

// Load reads configuration from environment variables. Optional keys use sensible defaults.
func Load() (Config, error) {
	port := 8080
	if v := strings.TrimSpace(os.Getenv("COREDEX_HTTP_PORT")); v != "" {
		p, err := strconv.Atoi(v)
		if err != nil || p < 1 || p > 65535 {
			return Config{}, fmt.Errorf("invalid COREDEX_HTTP_PORT: %q", v)
		}
		port = p
	}

	env := strings.TrimSpace(os.Getenv("COREDEX_ENV"))
	if env == "" {
		env = "development"
	}

	logLevel := strings.TrimSpace(os.Getenv("COREDEX_LOG_LEVEL"))
	if logLevel == "" {
		logLevel = "info"
	}

	dbPort := strings.TrimSpace(os.Getenv("DB_PORT"))
	if dbPort == "" {
		dbPort = "5432"
	}

	db := Database{
		Host:     strings.TrimSpace(os.Getenv("DB_HOST")),
		Port:     dbPort,
		User:     strings.TrimSpace(os.Getenv("DB_USER")),
		Password: os.Getenv("DB_PASSWORD"),
		Name:     strings.TrimSpace(os.Getenv("DB_NAME")),
		SSLMode:  strings.TrimSpace(os.Getenv("DB_SSLMODE")),
	}
	if err := db.Validate(); err != nil {
		return Config{}, err
	}

	jwtSecret := strings.TrimSpace(os.Getenv("JWT_SECRET"))
	if jwtSecret == "" {
		return Config{}, fmt.Errorf("JWT_SECRET is required")
	}
	jwtExpiry := 24 * time.Hour
	if v := strings.TrimSpace(os.Getenv("JWT_EXPIRES_IN")); v != "" {
		d, err := time.ParseDuration(v)
		if err != nil {
			return Config{}, fmt.Errorf("invalid JWT_EXPIRES_IN: %w", err)
		}
		jwtExpiry = d
	}

	vaultKey, err := loadVaultEncryptionKey()
	if err != nil {
		return Config{}, err
	}

	shutdownTimeout := 30 * time.Second
	if v := strings.TrimSpace(os.Getenv("COREDEX_SHUTDOWN_TIMEOUT")); v != "" {
		d, err := time.ParseDuration(v)
		if err != nil {
			return Config{}, fmt.Errorf("invalid COREDEX_SHUTDOWN_TIMEOUT: %w", err)
		}
		shutdownTimeout = d
	}

	corsOrigins := parseCSVEnv(os.Getenv("COREDEX_CORS_ORIGINS"))
	if len(corsOrigins) == 0 && strings.EqualFold(env, "development") {
		corsOrigins = []string{"http://localhost:3000"}
	}

	rateRPS := 0.0
	if v := strings.TrimSpace(os.Getenv("COREDEX_RATE_LIMIT_RPS")); v != "" {
		f, err := strconv.ParseFloat(v, 64)
		if err != nil {
			return Config{}, fmt.Errorf("invalid COREDEX_RATE_LIMIT_RPS: %w", err)
		}
		rateRPS = f
	}
	rateBurst := 20
	if v := strings.TrimSpace(os.Getenv("COREDEX_RATE_LIMIT_BURST")); v != "" {
		b, err := strconv.Atoi(v)
		if err != nil {
			return Config{}, fmt.Errorf("invalid COREDEX_RATE_LIMIT_BURST: %w", err)
		}
		rateBurst = b
	}
	if rateRPS > 0 && rateBurst <= 0 {
		rateBurst = 20
	}

	readTimeout := 30 * time.Second
	if v := strings.TrimSpace(os.Getenv("COREDEX_HTTP_READ_TIMEOUT")); v != "" {
		d, err := time.ParseDuration(v)
		if err != nil {
			return Config{}, fmt.Errorf("invalid COREDEX_HTTP_READ_TIMEOUT: %w", err)
		}
		readTimeout = d
	}
	writeTimeout := 30 * time.Second
	if v := strings.TrimSpace(os.Getenv("COREDEX_HTTP_WRITE_TIMEOUT")); v != "" {
		d, err := time.ParseDuration(v)
		if err != nil {
			return Config{}, fmt.Errorf("invalid COREDEX_HTTP_WRITE_TIMEOUT: %w", err)
		}
		writeTimeout = d
	}
	idleTimeout := 120 * time.Second
	if v := strings.TrimSpace(os.Getenv("COREDEX_HTTP_IDLE_TIMEOUT")); v != "" {
		d, err := time.ParseDuration(v)
		if err != nil {
			return Config{}, fmt.Errorf("invalid COREDEX_HTTP_IDLE_TIMEOUT: %w", err)
		}
		idleTimeout = d
	}

	return Config{
		Env:      env,
		HTTPPort: port,
		LogLevel: logLevel,
		Database: db,
		Auth: Auth{
			JWTSecret: jwtSecret,
			JWTExpiry: jwtExpiry,
		},
		VaultKey:             vaultKey,
		ShutdownTimeout:      shutdownTimeout,
		CORSAllowedOrigins:   corsOrigins,
		RateLimitRPS:         rateRPS,
		RateLimitBurst:       rateBurst,
		HTTPReadTimeout:      readTimeout,
		HTTPWriteTimeout:     writeTimeout,
		HTTPIdleTimeout:      idleTimeout,
	}, nil
}

func parseCSVEnv(s string) []string {
	s = strings.TrimSpace(s)
	if s == "" {
		return nil
	}
	parts := strings.Split(s, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p != "" {
			out = append(out, p)
		}
	}
	if len(out) == 0 {
		return nil
	}
	return out
}

// loadVaultEncryptionKey reads VAULT_ENCRYPTION_KEY: base64-encoded 32 bytes (AES-256).
func loadVaultEncryptionKey() ([]byte, error) {
	s := strings.TrimSpace(os.Getenv("VAULT_ENCRYPTION_KEY"))
	if s == "" {
		return nil, fmt.Errorf("VAULT_ENCRYPTION_KEY is required")
	}
	key, err := base64.StdEncoding.DecodeString(s)
	if err != nil {
		return nil, fmt.Errorf("VAULT_ENCRYPTION_KEY must be valid base64: %w", err)
	}
	if len(key) != 32 {
		return nil, fmt.Errorf("VAULT_ENCRYPTION_KEY must decode to exactly 32 bytes (AES-256), got %d", len(key))
	}
	return key, nil
}
