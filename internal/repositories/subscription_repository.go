package repositories

import (
	"context"
	"errors"

	"coredex/internal/models"

	"gorm.io/gorm"
)

// SubscriptionRepository persists subscriptions scoped by user.
type SubscriptionRepository struct {
	db *gorm.DB
}

func NewSubscriptionRepository(db *gorm.DB) *SubscriptionRepository {
	return &SubscriptionRepository{db: db}
}

// Create inserts a subscription. Caller must set UserID.
func (r *SubscriptionRepository) Create(ctx context.Context, s *models.Subscription) error {
	return r.db.WithContext(ctx).Create(s).Error
}

// ListByUserID returns all subscriptions for the user, newest first by id.
func (r *SubscriptionRepository) ListByUserID(ctx context.Context, userID uint) ([]models.Subscription, error) {
	var rows []models.Subscription
	err := r.db.WithContext(ctx).
		Where("user_id = ?", userID).
		Order("id DESC").
		Find(&rows).Error
	return rows, err
}

// ListVisibleForUser returns the user's own subscriptions plus any shared with their family when familyID is set.
func (r *SubscriptionRepository) ListVisibleForUser(ctx context.Context, userID uint, familyID *uint) ([]models.Subscription, error) {
	var rows []models.Subscription
	tx := r.db.WithContext(ctx).Model(&models.Subscription{})
	if familyID == nil {
		err := tx.Where("user_id = ?", userID).Order("id DESC").Find(&rows).Error
		return rows, err
	}
	err := tx.Where("user_id = ? OR family_id = ?", userID, *familyID).Order("id DESC").Find(&rows).Error
	return rows, err
}

// ListActiveByUserID returns subscriptions with status active for the user.
func (r *SubscriptionRepository) ListActiveByUserID(ctx context.Context, userID uint) ([]models.Subscription, error) {
	var rows []models.Subscription
	err := r.db.WithContext(ctx).
		Where("user_id = ? AND status = ?", userID, models.SubscriptionStatusActive).
		Order("id ASC").
		Find(&rows).Error
	return rows, err
}

// ListActiveVisibleForUser returns active subscriptions visible to the user (own + family-shared when familyID set).
func (r *SubscriptionRepository) ListActiveVisibleForUser(ctx context.Context, userID uint, familyID *uint) ([]models.Subscription, error) {
	var rows []models.Subscription
	tx := r.db.WithContext(ctx).Model(&models.Subscription{})
	if familyID == nil {
		err := tx.Where("user_id = ? AND status = ?", userID, models.SubscriptionStatusActive).Order("id ASC").Find(&rows).Error
		return rows, err
	}
	err := tx.Where("(user_id = ? OR family_id = ?) AND status = ?", userID, *familyID, models.SubscriptionStatusActive).
		Order("id ASC").
		Find(&rows).Error
	return rows, err
}

// GetByIDForUser returns a subscription owned by the user, or models.ErrNotFound.
func (r *SubscriptionRepository) GetByIDForUser(ctx context.Context, id, userID uint) (*models.Subscription, error) {
	var s models.Subscription
	err := r.db.WithContext(ctx).
		Where("id = ? AND user_id = ?", id, userID).
		First(&s).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, models.ErrNotFound
		}
		return nil, err
	}
	return &s, nil
}

// Update persists changes to an existing row scoped by id and user_id.
func (r *SubscriptionRepository) Update(ctx context.Context, s *models.Subscription) error {
	updates := map[string]any{
		"name":              s.Name,
		"price":             s.Price,
		"billing_cycle":     s.BillingCycle,
		"next_billing_date": s.NextBillingDate,
		"status":            s.Status,
	}
	if s.FamilyID == nil {
		updates["family_id"] = nil
	} else {
		updates["family_id"] = *s.FamilyID
	}
	res := r.db.WithContext(ctx).Model(&models.Subscription{}).
		Where("id = ? AND user_id = ?", s.ID, s.UserID).
		Updates(updates)
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return models.ErrNotFound
	}
	return nil
}

// DeleteByIDForUser removes a subscription owned by the user, or returns models.ErrNotFound.
func (r *SubscriptionRepository) DeleteByIDForUser(ctx context.Context, id, userID uint) error {
	res := r.db.WithContext(ctx).
		Where("id = ? AND user_id = ?", id, userID).
		Delete(&models.Subscription{})
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return models.ErrNotFound
	}
	return nil
}
