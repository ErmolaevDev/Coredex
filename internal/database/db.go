package database

import (
	"fmt"
	"log/slog"
	"strings"
	"time"

	"coredex/internal/config"
	"coredex/internal/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	gormlogger "gorm.io/gorm/logger"
)

const (
	defaultMaxOpenConns    = 25
	defaultMaxIdleConns    = 5
	defaultConnMaxLifetime = time.Hour
	defaultConnMaxIdleTime = 10 * time.Minute
)

// Connect opens a PostgreSQL connection via GORM, configures the pool, and verifies connectivity with Ping.
func Connect(cfg config.Database, env string, log *slog.Logger) (*gorm.DB, error) {
	dsn, err := buildDSN(cfg)
	if err != nil {
		return nil, err
	}

	gormLog := gormLogMode(env)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: gormLog,
	})
	if err != nil {
		return nil, fmt.Errorf("open database: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("retrieve sql.DB: %w", err)
	}

	sqlDB.SetMaxOpenConns(defaultMaxOpenConns)
	sqlDB.SetMaxIdleConns(defaultMaxIdleConns)
	sqlDB.SetConnMaxLifetime(defaultConnMaxLifetime)
	sqlDB.SetConnMaxIdleTime(defaultConnMaxIdleTime)

	if err := sqlDB.Ping(); err != nil {
		_ = sqlDB.Close()
		return nil, fmt.Errorf("ping database: %w", err)
	}

	if log != nil {
		log.Info("database_connected",
			slog.String("host", cfg.Host),
			slog.String("port", cfg.Port),
			slog.String("dbname", cfg.Name),
			slog.Int("max_open_conns", defaultMaxOpenConns),
			slog.Int("max_idle_conns", defaultMaxIdleConns),
		)
	}

	return db, nil
}

func buildDSN(cfg config.Database) (string, error) {
	if err := cfg.Validate(); err != nil {
		return "", err
	}
	ssl := cfg.SSLMode
	if ssl == "" {
		ssl = "disable"
	}
	// Password may be empty (e.g. local trust); still include key for driver compatibility.
	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s TimeZone=UTC",
		cfg.Host,
		cfg.Port,
		cfg.User,
		cfg.Password,
		cfg.Name,
		ssl,
	), nil
}

func gormLogMode(env string) gormlogger.Interface {
	if strings.EqualFold(strings.TrimSpace(env), "production") {
		return gormlogger.Default.LogMode(gormlogger.Error)
	}
	return gormlogger.Default.LogMode(gormlogger.Warn)
}

// Migrate runs AutoMigrate for all registered models.
func Migrate(db *gorm.DB) error {
	if err := db.AutoMigrate(
		&models.User{},
		&models.Family{},
		&models.FamilyMember{},
		&models.Subscription{},
		&models.Notification{},
		&models.Asset{},
	); err != nil {
		return fmt.Errorf("auto migrate: %w", err)
	}
	return nil
}

// Close releases the underlying connection pool.
func Close(db *gorm.DB) error {
	if db == nil {
		return nil
	}
	sqlDB, err := db.DB()
	if err != nil {
		return fmt.Errorf("retrieve sql.DB for close: %w", err)
	}
	if err := sqlDB.Close(); err != nil {
		return fmt.Errorf("close database pool: %w", err)
	}
	return nil
}

// Seed creates initial data if not exists.
func Seed(db *gorm.DB, log *slog.Logger) error {
	// Seed admin user
	var count int64
	if err := db.Model(&models.User{}).Where("email = ?", "admin").Count(&count).Error; err != nil {
		return fmt.Errorf("check admin user: %w", err)
	}
	if count == 0 {
		hash, err := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)
		if err != nil {
			return fmt.Errorf("hash admin password: %w", err)
		}
		admin := &models.User{
			Email:         "admin",
			PasswordHash:  string(hash),
			Role:          "admin",
			EmailVerified: true,
		}
		if err := db.Create(admin).Error; err != nil {
			return fmt.Errorf("create admin user: %w", err)
		}
		if log != nil {
			log.Info("admin_user_seeded", slog.String("email", "admin"))
		}
	}
	return nil
}
