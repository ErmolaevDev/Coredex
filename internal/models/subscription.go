package models

import "time"

// Billing cycle values for subscriptions.
const (
	BillingCycleMonthly = "monthly"
	BillingCycleYearly  = "yearly"
)

// Subscription status values.
const (
	SubscriptionStatusActive   = "active"
	SubscriptionStatusInactive = "inactive"
)

// Subscription is a user's recurring billing record.
type Subscription struct {
	ID              uint      `gorm:"primaryKey" json:"id"`
	UserID          uint      `gorm:"not null;index" json:"user_id"`
	User            User      `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"-"`
	FamilyID        *uint     `gorm:"index" json:"family_id,omitempty"`
	Name            string    `gorm:"size:255;not null" json:"name"`
	Price           float64   `gorm:"type:numeric(12,2);not null" json:"price"`
	BillingCycle    string    `gorm:"size:20;not null" json:"billing_cycle"`
	NextBillingDate time.Time `gorm:"not null" json:"next_billing_date"`
	Status          string    `gorm:"size:20;not null;default:active" json:"status"`
}

func (Subscription) TableName() string {
	return "subscriptions"
}
