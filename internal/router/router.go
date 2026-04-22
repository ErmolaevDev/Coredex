package router

import (
	"fmt"
	"log/slog"

	"coredex/internal/auth"
	"coredex/internal/config"
	"coredex/internal/handlers"
	"coredex/internal/middleware"
	"coredex/internal/repositories"
	"coredex/internal/services"
	"coredex/pkg/vault"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Dependencies wires concrete implementations for the modular monolith.
type Dependencies struct {
	DB                   *gorm.DB
	TokenService         *auth.TokenService
	AuthHandler          *handlers.AuthHandler
	FamilyHandler        *handlers.FamilyHandler
	SubscriptionHandler  *handlers.SubscriptionHandler
	AnalyticsHandler     *handlers.AnalyticsHandler
	NotificationHandler  *handlers.NotificationHandler
	AssetHandler         *handlers.AssetHandler
	HealthHandler        *handlers.HealthHandler
	DemoHandler          *handlers.DemoHandler
}

// NewDependencies builds default service graph (swap for DI container or per-module factories later).
func NewDependencies(cfg config.Config, db *gorm.DB) (*Dependencies, error) {
	ts, err := auth.NewTokenService(cfg.Auth.JWTSecret, cfg.Auth.JWTExpiry)
	if err != nil {
		return nil, fmt.Errorf("jwt: %w", err)
	}

	userRepo := repositories.NewUserRepository(db)
	authSvc := services.NewAuthService(userRepo, ts)

	familyRepo := repositories.NewFamilyRepository(db)
	subRepo := repositories.NewSubscriptionRepository(db)

	familySvc := services.NewFamilyService(familyRepo, userRepo)
	subSvc := services.NewSubscriptionService(subRepo, familyRepo)
	analyticsSvc := services.NewAnalyticsService(subRepo, familyRepo)

	notifRepo := repositories.NewNotificationRepository(db)
	notifSvc := services.NewNotificationService(notifRepo, subRepo, familyRepo)

	v, err := vault.New(cfg.VaultKey)
	if err != nil {
		return nil, fmt.Errorf("vault: %w", err)
	}
	assetRepo := repositories.NewAssetRepository(db)
	assetSvc := services.NewAssetService(assetRepo, v)

	healthRepo := repositories.NewHealthRepository()
	healthSvc := services.NewHealthService(healthRepo)

	return &Dependencies{
		DB:                  db,
		TokenService:        ts,
		AuthHandler:         handlers.NewAuthHandler(authSvc),
		FamilyHandler:       handlers.NewFamilyHandler(familySvc),
		SubscriptionHandler: handlers.NewSubscriptionHandler(subSvc),
		AnalyticsHandler:    handlers.NewAnalyticsHandler(analyticsSvc),
		NotificationHandler: handlers.NewNotificationHandler(notifSvc),
		AssetHandler:        handlers.NewAssetHandler(assetSvc),
		HealthHandler:       handlers.NewHealthHandler(healthSvc),
		DemoHandler:         handlers.NewDemoHandler(),
	}, nil
}

// New creates the Gin engine with global middleware and route groups.
func New(cfg config.Config, log *slog.Logger, deps *Dependencies) *gin.Engine {
	if cfg.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.New()
	r.Use(middleware.CORS(cfg.CORSAllowedOrigins))
	r.Use(middleware.RateLimit(cfg.RateLimitRPS, cfg.RateLimitBurst))
	r.Use(middleware.Recovery(log))
	r.Use(middleware.RequestLogger(log))
	r.Use(middleware.ErrorHandler(log))

	handlers.RegisterHealthRoutes(r, deps.HealthHandler)

	authGroup := r.Group("/auth")
	handlers.RegisterAuthRoutes(authGroup, deps.AuthHandler)

	v1 := r.Group("/v1")
	handlers.RegisterDemoRoutes(v1, deps.DemoHandler)

	authed := r.Group("")
	authed.Use(middleware.RequireAuth(deps.TokenService))

	v1Protected := authed.Group("/v1")
	handlers.RegisterProtectedUserRoutes(v1Protected, deps.AuthHandler)

	handlers.RegisterFamilyRoutes(authed, deps.FamilyHandler)
	handlers.RegisterSubscriptionRoutes(authed, deps.SubscriptionHandler)
	handlers.RegisterAnalyticsRoutes(authed, deps.AnalyticsHandler)
	handlers.RegisterNotificationRoutes(authed, deps.NotificationHandler)
	handlers.RegisterAssetRoutes(authed, deps.AssetHandler)

	return r
}
