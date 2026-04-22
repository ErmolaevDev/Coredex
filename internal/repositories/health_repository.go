package repositories

import (
	"context"
	"time"

	"coredex/internal/models"
)

// HealthRepository provides health-related persistence or upstream checks.
// This implementation is in-memory; swap for DB/cache probes as the product grows.
type HealthRepository struct{}

func NewHealthRepository() *HealthRepository {
	return &HealthRepository{}
}

// Check returns the current application health snapshot.
func (r *HealthRepository) Check(ctx context.Context) (models.HealthStatus, error) {
	_ = ctx
	return models.HealthStatus{
		Status:    "ok",
		Service:   "coredex",
		Timestamp: time.Now().UTC(),
	}, nil
}
