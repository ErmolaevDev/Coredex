package repositories

import (
	"context"
	"errors"

	"coredex/internal/models"

	"gorm.io/gorm"
)

// UserRepository persists users.
type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

// Create inserts a new user. Caller must set PasswordHash.
func (r *UserRepository) Create(ctx context.Context, u *models.User) error {
	return r.db.WithContext(ctx).Create(u).Error
}

// FindByEmail returns the user or models.ErrNotFound.
func (r *UserRepository) FindByEmail(ctx context.Context, email string) (*models.User, error) {
	var u models.User
	err := r.db.WithContext(ctx).Where("email = ?", email).First(&u).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, models.ErrNotFound
		}
		return nil, err
	}
	return &u, nil
}

// FindByID returns the user or models.ErrNotFound.
func (r *UserRepository) FindByID(ctx context.Context, id uint) (*models.User, error) {
	var u models.User
	err := r.db.WithContext(ctx).First(&u, id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, models.ErrNotFound
		}
		return nil, err
	}
	return &u, nil
}
