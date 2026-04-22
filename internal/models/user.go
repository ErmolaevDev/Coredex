package models

import (
	"time"
)

// User is the persisted account used for authentication.
type User struct {
	ID            uint      `gorm:"primaryKey" json:"id"`
	Username      string    `gorm:"size:50;uniqueIndexsername"`
	Email         string    `gorm:"size:255;uniqueIndex;not null" json:"email"`
	PasswordHash  string    `gorm:"column:password;size:255;not null" json:"-"`
	Role          string    `gorm:"size:50;not null;default:'user'" json:"role"`
	EmailVerified bool      `gorm:"default:false" json:"email_verified"`
	PromoCode     string    `gorm:"size:100" json:"promo_code"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

func (User) TableName() string {
	return "users"
}

// PublicUser is the safe JSON shape (no secrets).
type PublicUser struct {
	ID            uint      `json:"id"`
	Username      string    `json:"username"`
	Email         string    `json:"email"`
	Role          string    `json:"role"`
	EmailVerified bool      `json:"email_verified"`
	PromoCode     string    `json:"promo_code"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

// ToPublic maps a User to PublicUser.
func (u *User) ToPublic() PublicUser {
	return PublicUser{
		ID:            u.ID,
		Username:      u.Username,
		Email:         u.Email,
		Role:          u.Role,
		EmailVerified: u.EmailVerified,
		PromoCode:     u.PromoCode,
		CreatedAt:     u.CreatedAt,
		UpdatedAt:     u.UpdatedAt,
	}
}
