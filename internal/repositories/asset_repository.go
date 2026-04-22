package repositories

import (
	"context"

	"coredex/internal/models"

	"gorm.io/gorm"
)

// AssetRepository persists encrypted vault entries per user.
type AssetRepository struct {
	db *gorm.DB
}

func NewAssetRepository(db *gorm.DB) *AssetRepository {
	return &AssetRepository{db: db}
}

// Create inserts an asset. EncryptedValue must already be ciphertext.
func (r *AssetRepository) Create(ctx context.Context, a *models.Asset) error {
	return r.db.WithContext(ctx).Create(a).Error
}

// ListByUserID returns assets for the user, newest first.
func (r *AssetRepository) ListByUserID(ctx context.Context, userID uint) ([]models.Asset, error) {
	var rows []models.Asset
	err := r.db.WithContext(ctx).
		Where("user_id = ?", userID).
		Order("id DESC").
		Find(&rows).Error
	return rows, err
}
