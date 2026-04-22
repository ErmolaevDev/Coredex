package repositories

import (
	"context"

	"coredex/internal/models"

	"gorm.io/gorm"
)

// NotificationRepository persists in-app notifications.
type NotificationRepository struct {
	db *gorm.DB
}

func NewNotificationRepository(db *gorm.DB) *NotificationRepository {
	return &NotificationRepository{db: db}
}

// Create inserts a notification.
func (r *NotificationRepository) Create(ctx context.Context, n *models.Notification) error {
	return r.db.WithContext(ctx).Create(n).Error
}

// ListByUserID returns notifications for the user, newest first.
func (r *NotificationRepository) ListByUserID(ctx context.Context, userID uint) ([]models.Notification, error) {
	var rows []models.Notification
	err := r.db.WithContext(ctx).
		Where("user_id = ?", userID).
		Order("created_at DESC, id DESC").
		Find(&rows).Error
	return rows, err
}

// ExistsForUserTypeMessage reports whether an identical notification already exists (deduplication).
func (r *NotificationRepository) ExistsForUserTypeMessage(ctx context.Context, userID uint, typ, message string) (bool, error) {
	var count int64
	err := r.db.WithContext(ctx).Model(&models.Notification{}).
		Where("user_id = ? AND type = ? AND message = ?", userID, typ, message).
		Count(&count).Error
	if err != nil {
		return false, err
	}
	return count > 0, nil
}
