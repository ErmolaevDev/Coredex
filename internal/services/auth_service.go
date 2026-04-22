package services

import (
	"context"
	"errors"
	"net/http"
	"strings"

	"coredex/internal/auth"
	"coredex/internal/models"
	"coredex/internal/repositories"

	"github.com/jackc/pgx/v5/pgconn"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

const bcryptCost = bcrypt.DefaultCost

// AuthService handles registration, login, and profile reads.
type AuthService struct {
	users *repositories.UserRepository
	jwt   *auth.TokenService
}

func NewAuthService(users *repositories.UserRepository, jwt *auth.TokenService) *AuthService {
	return &AuthService{users: users, jwt: jwt}
}

// Register creates a user and returns a JWT.
func (s *AuthService) Register(ctx context.Context, username, email, password, promoCode string) (models.PublicUser, string, error) {
	email = strings.ToLower(strings.TrimSpace(email))
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcryptCost)
	if err != nil {
		return models.PublicUser{}, "", models.NewAppError(http.StatusInternalServerError, "hash_failed", "could not process password")
	}

	u := &models.User{
		Username:      username,
		Email:         email,
		PasswordHash:  string(hash),
		Role:          "user",
		EmailVerified: false,
		PromoCode:     promoCode,
	}
	if err := s.users.Create(ctx, u); err != nil {
		if isUniqueViolation(err) {
			return models.PublicUser{}, "", models.NewAppError(http.StatusConflict, "email_taken", "email is already registered")
		}
		return models.PublicUser{}, "", err
	}

	token, err := s.jwt.Issue(u.ID)
	if err != nil {
		return models.PublicUser{}, "", models.NewAppError(http.StatusInternalServerError, "token_failed", "could not issue token")
	}

	return u.ToPublic(), token, nil
}

// Login verifies credentials and returns a JWT.
func (s *AuthService) Login(ctx context.Context, email, password string) (models.PublicUser, string, error) {
	email = strings.ToLower(strings.TrimSpace(email))
	u, err := s.users.FindByEmail(ctx, email)
	if err != nil {
		if errors.Is(err, models.ErrNotFound) {
			return models.PublicUser{}, "", models.NewAppError(http.StatusUnauthorized, "invalid_credentials", "invalid email or password")
		}
		return models.PublicUser{}, "", err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password)); err != nil {
		return models.PublicUser{}, "", models.NewAppError(http.StatusUnauthorized, "invalid_credentials", "invalid email or password")
	}

	token, err := s.jwt.Issue(u.ID)
	if err != nil {
		return models.PublicUser{}, "", models.NewAppError(http.StatusInternalServerError, "token_failed", "could not issue token")
	}

	return u.ToPublic(), token, nil
}

// Profile returns the public profile for a user ID.
func (s *AuthService) Profile(ctx context.Context, userID uint) (models.PublicUser, error) {
	u, err := s.users.FindByID(ctx, userID)
	if err != nil {
		if errors.Is(err, models.ErrNotFound) {
			return models.PublicUser{}, models.NewAppError(http.StatusNotFound, "user_not_found", "user not found")
		}
		return models.PublicUser{}, err
	}
	return u.ToPublic(), nil
}

func isUniqueViolation(err error) bool {
	if errors.Is(err, gorm.ErrDuplicatedKey) {
		return true
	}
	var pg *pgconn.PgError
	return errors.As(err, &pg) && pg.Code == "23505"
}
