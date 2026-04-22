package models

import "time"

// In-app notification kinds.
const (
	NotificationTypeBillingReminder = "billing_reminder"
)

// Notification is a user-visible in-app message.
type Notification struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `gorm:"not null;index" json:"user_id"`
	User      User      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"-"`
	Message   string    `gorm:"type:text;not null" json:"message"`
	Type      string    `gorm:"size:64;not null;index" json:"type"`
	CreatedAt time.Time `json:"created_at"`
}

func (Notification) TableName() string {
	return "notifications"
}
