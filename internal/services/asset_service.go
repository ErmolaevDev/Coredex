package services

import (
	"context"
	"net/http"
	"strings"
	"time"

	"coredex/internal/models"
	"coredex/internal/repositories"
	"coredex/pkg/vault"
)

// AssetPublic is returned to clients (decrypted value).
type AssetPublic struct {
	ID        uint   `json:"id"`
	Type      string `json:"type"`
	Value     string `json:"value"`
	CreatedAt string `json:"created_at"`
}

// AssetService manages vault entries with encrypt-at-rest.
type AssetService struct {
	repo  *repositories.AssetRepository
	vault *vault.Vault
}

func NewAssetService(repo *repositories.AssetRepository, v *vault.Vault) *AssetService {
	return &AssetService{repo: repo, vault: v}
}

// CreateInput holds plaintext before encryption.
type CreateAssetInput struct {
	Type  string
	Value string
}

// Create encrypts and stores an asset.
func (s *AssetService) Create(ctx context.Context, userID uint, in CreateAssetInput) (*AssetPublic, error) {
	t := strings.ToLower(strings.TrimSpace(in.Type))
	if err := validateAssetType(t); err != nil {
		return nil, err
	}
	val := strings.TrimSpace(in.Value)
	if val == "" {
		return nil, models.NewAppError(http.StatusBadRequest, "validation_failed", "value is required")
	}

	enc, err := s.vault.Encrypt(val)
	if err != nil {
		return nil, models.NewAppError(http.StatusInternalServerError, "encrypt_failed", "could not encrypt value")
	}

	a := &models.Asset{
		UserID:         userID,
		Type:           t,
		EncryptedValue: enc,
	}
	if err := s.repo.Create(ctx, a); err != nil {
		return nil, err
	}

	return &AssetPublic{
		ID:        a.ID,
		Type:      a.Type,
		Value:     val,
		CreatedAt: a.CreatedAt.UTC().Format(time.RFC3339Nano),
	}, nil
}

// List decrypts and returns all assets for the user.
func (s *AssetService) List(ctx context.Context, userID uint) ([]AssetPublic, error) {
	rows, err := s.repo.ListByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}
	out := make([]AssetPublic, 0, len(rows))
	for _, row := range rows {
		plain, err := s.vault.Decrypt(row.EncryptedValue)
		if err != nil {
			return nil, models.NewAppError(http.StatusInternalServerError, "decrypt_failed", "could not decrypt stored asset")
		}
		out = append(out, AssetPublic{
			ID:        row.ID,
			Type:      row.Type,
			Value:     plain,
			CreatedAt: row.CreatedAt.UTC().Format(time.RFC3339Nano),
		})
	}
	return out, nil
}

func validateAssetType(t string) error {
	switch t {
	case models.AssetTypeAPIKey, models.AssetTypeLicense, models.AssetTypeDomain:
		return nil
	default:
		return models.NewAppError(http.StatusBadRequest, "validation_failed", "type must be api_key, license, or domain")
	}
}
