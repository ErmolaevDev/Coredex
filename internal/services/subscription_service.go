package services

import (
	"context"
	"errors"
	"net/http"
	"strings"
	"time"

	"coredex/internal/models"
	"coredex/internal/repositories"
)

// SubscriptionService applies subscription rules per authenticated user.
type SubscriptionService struct {
	repo       *repositories.SubscriptionRepository
	familyRepo *repositories.FamilyRepository
}

func NewSubscriptionService(repo *repositories.SubscriptionRepository, familyRepo *repositories.FamilyRepository) *SubscriptionService {
	return &SubscriptionService{repo: repo, familyRepo: familyRepo}
}

// List returns subscriptions owned by the user plus subscriptions shared with their family (when applicable).
func (s *SubscriptionService) List(ctx context.Context, userID uint) ([]models.Subscription, error) {
	var famID *uint
	if m, err := s.familyRepo.GetMembershipByUserID(ctx, userID); err == nil {
		fid := m.FamilyID
		famID = &fid
	} else if !errors.Is(err, models.ErrNotFound) {
		return nil, err
	}
	return s.repo.ListVisibleForUser(ctx, userID, famID)
}

// CreateInput is validated input for a new subscription.
type CreateInput struct {
	Name              string
	Price             float64
	BillingCycle      string
	NextBillingDate   string // RFC3339 or date-only accepted in handler/service parse
	Status            string
	ShareWithFamily   bool
}

// Create stores a subscription for the user.
func (s *SubscriptionService) Create(ctx context.Context, userID uint, in CreateInput) (*models.Subscription, error) {
	if err := validateBillingCycle(in.BillingCycle); err != nil {
		return nil, err
	}
	status, err := normalizeStatus(in.Status, true)
	if err != nil {
		return nil, err
	}
	if in.Name == "" {
		return nil, models.NewAppError(http.StatusBadRequest, "validation_failed", "name is required")
	}
	if in.Price < 0 {
		return nil, models.NewAppError(http.StatusBadRequest, "validation_failed", "price must be zero or greater")
	}
	next, err := parseBillingDate(in.NextBillingDate)
	if err != nil {
		return nil, models.NewAppError(http.StatusBadRequest, "validation_failed", "invalid next_billing_date")
	}

	sub := &models.Subscription{
		UserID:          userID,
		Name:            strings.TrimSpace(in.Name),
		Price:           in.Price,
		BillingCycle:    strings.ToLower(strings.TrimSpace(in.BillingCycle)),
		NextBillingDate: next,
		Status:          status,
	}
	if in.ShareWithFamily {
		m, err := s.familyRepo.GetMembershipByUserID(ctx, userID)
		if err != nil {
			if errors.Is(err, models.ErrNotFound) {
				return nil, models.NewAppError(http.StatusBadRequest, "validation_failed", "join or create a family before sharing subscriptions")
			}
			return nil, err
		}
		fid := m.FamilyID
		sub.FamilyID = &fid
	}
	if err := s.repo.Create(ctx, sub); err != nil {
		return nil, err
	}
	return sub, nil
}

// UpdateInput is validated input for updating a subscription.
type UpdateInput struct {
	Name              string
	Price             float64
	BillingCycle      string
	NextBillingDate   string
	Status            string
	ShareWithFamily   *bool
}

// Update modifies a subscription if it belongs to the user.
func (s *SubscriptionService) Update(ctx context.Context, userID, id uint, in UpdateInput) (*models.Subscription, error) {
	if err := validateBillingCycle(in.BillingCycle); err != nil {
		return nil, err
	}
	status, err := normalizeStatus(in.Status, false)
	if err != nil {
		return nil, err
	}
	if strings.TrimSpace(in.Name) == "" {
		return nil, models.NewAppError(http.StatusBadRequest, "validation_failed", "name is required")
	}
	if in.Price < 0 {
		return nil, models.NewAppError(http.StatusBadRequest, "validation_failed", "price must be zero or greater")
	}
	next, err := parseBillingDate(in.NextBillingDate)
	if err != nil {
		return nil, models.NewAppError(http.StatusBadRequest, "validation_failed", "invalid next_billing_date")
	}

	existing, err := s.repo.GetByIDForUser(ctx, id, userID)
	if err != nil {
		if errors.Is(err, models.ErrNotFound) {
			return nil, models.NewAppError(http.StatusNotFound, "not_found", "subscription not found")
		}
		return nil, err
	}

	existing.Name = strings.TrimSpace(in.Name)
	existing.Price = in.Price
	existing.BillingCycle = strings.ToLower(strings.TrimSpace(in.BillingCycle))
	existing.NextBillingDate = next
	existing.Status = status

	if in.ShareWithFamily != nil {
		if *in.ShareWithFamily {
			m, err := s.familyRepo.GetMembershipByUserID(ctx, userID)
			if err != nil {
				if errors.Is(err, models.ErrNotFound) {
					return nil, models.NewAppError(http.StatusBadRequest, "validation_failed", "join or create a family before sharing subscriptions")
				}
				return nil, err
			}
			fid := m.FamilyID
			existing.FamilyID = &fid
		} else {
			existing.FamilyID = nil
		}
	}

	if err := s.repo.Update(ctx, existing); err != nil {
		if errors.Is(err, models.ErrNotFound) {
			return nil, models.NewAppError(http.StatusNotFound, "not_found", "subscription not found")
		}
		return nil, err
	}
	return existing, nil
}

// Delete removes a subscription if it belongs to the user.
func (s *SubscriptionService) Delete(ctx context.Context, userID, id uint) error {
	if err := s.repo.DeleteByIDForUser(ctx, id, userID); err != nil {
		if errors.Is(err, models.ErrNotFound) {
			return models.NewAppError(http.StatusNotFound, "not_found", "subscription not found")
		}
		return err
	}
	return nil
}

func validateBillingCycle(v string) error {
	c := strings.ToLower(strings.TrimSpace(v))
	switch c {
	case models.BillingCycleMonthly, models.BillingCycleYearly:
		return nil
	default:
		return models.NewAppError(http.StatusBadRequest, "validation_failed", "billing_cycle must be monthly or yearly")
	}
}

func normalizeStatus(v string, isCreate bool) (string, error) {
	s := strings.ToLower(strings.TrimSpace(v))
	if s == "" && isCreate {
		return models.SubscriptionStatusActive, nil
	}
	if s == "" {
		return "", models.NewAppError(http.StatusBadRequest, "validation_failed", "status is required")
	}
	switch s {
	case models.SubscriptionStatusActive, models.SubscriptionStatusInactive:
		return s, nil
	default:
		return "", models.NewAppError(http.StatusBadRequest, "validation_failed", "status must be active or inactive")
	}
}

func parseBillingDate(s string) (time.Time, error) {
	s = strings.TrimSpace(s)
	if s == "" {
		return time.Time{}, errors.New("empty next_billing_date")
	}
	if t, err := time.Parse(time.RFC3339, s); err == nil {
		return t.UTC(), nil
	}
	t, err := time.ParseInLocation("2006-01-02", s, time.UTC)
	if err != nil {
		return time.Time{}, err
	}
	return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, time.UTC), nil
}
