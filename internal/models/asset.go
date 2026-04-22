package models

import "time"

// Asset type values for the digital vault.
const (
	AssetTypeAPIKey  = "api_key"
	AssetTypeLicense = "license"
	AssetTypeDomain  = "domain"
)

// Asset stores user secrets; EncryptedValue is AES-GCM ciphertext (base64) at rest.
type Asset struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	UserID         uint      `gorm:"not null;index" json:"user_id"`
	User           User      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"-"`
	Type           string    `gorm:"size:32;not null" json:"type"`
	EncryptedValue string    `gorm:"type:text;not null" json:"-"`
	CreatedAt      time.Time `json:"created_at"`
}

func (Asset) TableName() string {
	return "assets"
}
