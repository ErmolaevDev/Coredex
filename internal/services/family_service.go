package services

import (
	"context"
	"errors"
	"net/http"
	"strings"

	"coredex/internal/models"
	"coredex/internal/repositories"

	"github.com/jackc/pgx/v5/pgconn"
	"gorm.io/gorm"
)

// FamilyService handles family creation, invites, and reads.
type FamilyService struct {
	families *repositories.FamilyRepository
	users    *repositories.UserRepository
}

func NewFamilyService(families *repositories.FamilyRepository, users *repositories.UserRepository) *FamilyService {
	return &FamilyService{families: families, users: users}
}

// CreateFamily creates a family with the current user as owner.
func (s *FamilyService) CreateFamily(ctx context.Context, userID uint) (*models.Family, error) {
	if _, err := s.families.GetMembershipByUserID(ctx, userID); err == nil {
		return nil, models.NewAppError(http.StatusConflict, "already_in_family", "user already belongs to a family")
	} else if !errors.Is(err, models.ErrNotFound) {
		return nil, err
	}
	return s.families.CreateFamilyWithOwner(ctx, userID)
}

// InviteByEmail adds an existing user to the inviter's family as member.
func (s *FamilyService) InviteByEmail(ctx context.Context, inviterID uint, email string) error {
	email = strings.ToLower(strings.TrimSpace(email))
	if email == "" {
		return models.NewAppError(http.StatusBadRequest, "validation_failed", "email is required")
	}

	inviter, err := s.families.GetMembershipByUserID(ctx, inviterID)
	if err != nil {
		if errors.Is(err, models.ErrNotFound) {
			return models.NewAppError(http.StatusForbidden, "not_in_family", "you are not in a family")
		}
		return err
	}
	target, err := s.users.FindByEmail(ctx, email)
	if err != nil {
		if errors.Is(err, models.ErrNotFound) {
			return models.NewAppError(http.StatusNotFound, "user_not_found", "no user with that email")
		}
		return err
	}
	if target.ID == inviterID {
		return models.NewAppError(http.StatusBadRequest, "validation_failed", "cannot invite yourself")
	}

	if _, err := s.families.GetMembershipByUserID(ctx, target.ID); err == nil {
		return models.NewAppError(http.StatusConflict, "user_in_family", "user already belongs to a family")
	} else if !errors.Is(err, models.ErrNotFound) {
		return err
	}

	if err := s.families.AddMember(ctx, inviter.FamilyID, target.ID, models.FamilyRoleMember); err != nil {
		if isFamilyUniqueViolation(err) {
			return models.NewAppError(http.StatusConflict, "user_in_family", "user already belongs to a family")
		}
		return err
	}
	return nil
}

func isFamilyUniqueViolation(err error) bool {
	if errors.Is(err, gorm.ErrDuplicatedKey) {
		return true
	}
	var pg *pgconn.PgError
	return errors.As(err, &pg) && pg.Code == "23505"
}

// FamilyView is returned by GetFamily.
type FamilyView struct {
	Family  models.Family        `json:"family"`
	Members []FamilyMemberView   `json:"members"`
}

// FamilyMemberView exposes safe member fields.
type FamilyMemberView struct {
	ID       uint   `json:"id"`
	UserID   uint   `json:"user_id"`
	Email    string `json:"email"`
	Role     string `json:"role"`
}

// GetFamily returns the family and members if the user belongs to it.
func (s *FamilyService) GetFamily(ctx context.Context, userID uint) (*FamilyView, error) {
	m, err := s.families.GetMembershipByUserID(ctx, userID)
	if err != nil {
		if errors.Is(err, models.ErrNotFound) {
			return nil, models.NewAppError(http.StatusNotFound, "not_in_family", "you are not in a family")
		}
		return nil, err
	}
	fam, err := s.families.GetFamilyByID(ctx, m.FamilyID)
	if err != nil {
		return nil, err
	}
	members, err := s.families.ListMembersByFamilyID(ctx, m.FamilyID)
	if err != nil {
		return nil, err
	}
	out := make([]FamilyMemberView, 0, len(members))
	for _, row := range members {
		out = append(out, FamilyMemberView{
			ID:     row.ID,
			UserID: row.UserID,
			Email:  row.User.Email,
			Role:   row.Role,
		})
	}
	return &FamilyView{Family: *fam, Members: out}, nil
}
