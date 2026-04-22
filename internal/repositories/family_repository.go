package repositories

import (
	"context"
	"errors"

	"coredex/internal/models"

	"gorm.io/gorm"
)

// FamilyRepository persists families and memberships.
type FamilyRepository struct {
	db *gorm.DB
}

func NewFamilyRepository(db *gorm.DB) *FamilyRepository {
	return &FamilyRepository{db: db}
}

// CreateFamilyWithOwner creates a family and adds the owner as a member in one transaction.
func (r *FamilyRepository) CreateFamilyWithOwner(ctx context.Context, ownerID uint) (*models.Family, error) {
	var out *models.Family
	err := r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		f := &models.Family{OwnerID: ownerID}
		if err := tx.Create(f).Error; err != nil {
			return err
		}
		m := &models.FamilyMember{
			FamilyID: f.ID,
			UserID:   ownerID,
			Role:     models.FamilyRoleOwner,
		}
		if err := tx.Create(m).Error; err != nil {
			return err
		}
		out = f
		return nil
	})
	if err != nil {
		return nil, err
	}
	return out, nil
}

// GetMembershipByUserID returns membership or models.ErrNotFound.
func (r *FamilyRepository) GetMembershipByUserID(ctx context.Context, userID uint) (*models.FamilyMember, error) {
	var m models.FamilyMember
	err := r.db.WithContext(ctx).Where("user_id = ?", userID).First(&m).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, models.ErrNotFound
		}
		return nil, err
	}
	return &m, nil
}

// GetFamilyByID loads a family by id.
func (r *FamilyRepository) GetFamilyByID(ctx context.Context, id uint) (*models.Family, error) {
	var f models.Family
	err := r.db.WithContext(ctx).First(&f, id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, models.ErrNotFound
		}
		return nil, err
	}
	return &f, nil
}

// ListMembersByFamilyID returns members with User preloaded (for email).
func (r *FamilyRepository) ListMembersByFamilyID(ctx context.Context, familyID uint) ([]models.FamilyMember, error) {
	var rows []models.FamilyMember
	err := r.db.WithContext(ctx).
		Preload("User").
		Where("family_id = ?", familyID).
		Order("id ASC").
		Find(&rows).Error
	return rows, err
}

// GetMembershipByUserAndFamily returns membership for user in family or ErrNotFound.
func (r *FamilyRepository) GetMembershipByUserAndFamily(ctx context.Context, userID, familyID uint) (*models.FamilyMember, error) {
	var m models.FamilyMember
	err := r.db.WithContext(ctx).
		Where("user_id = ? AND family_id = ?", userID, familyID).
		First(&m).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, models.ErrNotFound
		}
		return nil, err
	}
	return &m, nil
}

// AddMember inserts a member row (caller validates uniqueness).
func (r *FamilyRepository) AddMember(ctx context.Context, familyID, userID uint, role string) error {
	m := &models.FamilyMember{
		FamilyID: familyID,
		UserID:   userID,
		Role:     role,
	}
	return r.db.WithContext(ctx).Create(m).Error
}
