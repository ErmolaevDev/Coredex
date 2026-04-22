package services

import (
	"context"

	"coredex/internal/models"
	"coredex/internal/repositories"
)

// HealthService orchestrates health checks across repositories and external systems.
type HealthService struct {
	repo *repositories.HealthRepository
}

func NewHealthService(repo *repositories.HealthRepository) *HealthService {
	return &HealthService{repo: repo}
}

// Status returns aggregated health for public endpoints.
func (s *HealthService) Status(ctx context.Context) (models.HealthStatus, error) {
	return s.repo.Check(ctx)
}
