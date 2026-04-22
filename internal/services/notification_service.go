package services

import (
	"context"
	"errors"
	"fmt"
	"time"

	"coredex/internal/models"
	"coredex/internal/repositories"
)

// DefaultBillingReminderHorizon is how far ahead we consider a subscription "close" to billing.
const DefaultBillingReminderHorizon = 7 * 24 * time.Hour

// NotificationService manages in-app notifications and billing reminders.
type NotificationService struct {
	notifs  *repositories.NotificationRepository
	subs    *repositories.SubscriptionRepository
	family  *repositories.FamilyRepository
	horizon time.Duration
}

func NewNotificationService(notifs *repositories.NotificationRepository, subs *repositories.SubscriptionRepository, family *repositories.FamilyRepository) *NotificationService {
	return &NotificationService{
		notifs:  notifs,
		subs:   subs,
		family: family,
		horizon: DefaultBillingReminderHorizon,
	}
}

// List returns all notifications for the user after syncing billing reminders.
func (s *NotificationService) List(ctx context.Context, userID uint) ([]models.Notification, error) {
	if err := s.SyncBillingReminders(ctx, userID); err != nil {
		return nil, err
	}
	return s.notifs.ListByUserID(ctx, userID)
}

// SyncBillingReminders creates billing_reminder notifications for active subscriptions whose
// billing calendar day falls within the next N calendar days starting today (UTC), where N is
// horizon/(24h) (default 7). One row per unique (user, type, message) to avoid duplicates.
func (s *NotificationService) SyncBillingReminders(ctx context.Context, userID uint) error {
	var famID *uint
	if m, err := s.family.GetMembershipByUserID(ctx, userID); err == nil {
		fid := m.FamilyID
		famID = &fid
	} else if !errors.Is(err, models.ErrNotFound) {
		return err
	}
	active, err := s.subs.ListActiveVisibleForUser(ctx, userID, famID)
	if err != nil {
		return err
	}

	now := time.Now().UTC()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.UTC)
	days := int(s.horizon / (24 * time.Hour))
	if days < 1 {
		days = 7
	}
	last := today.AddDate(0, 0, days-1)

	for i := range active {
		sub := &active[i]
		when := sub.NextBillingDate.UTC()
		billDay := time.Date(when.Year(), when.Month(), when.Day(), 0, 0, 0, 0, time.UTC)
		if billDay.Before(today) || billDay.After(last) {
			continue
		}

		msg := billingReminderMessage(sub)
		exists, err := s.notifs.ExistsForUserTypeMessage(ctx, userID, models.NotificationTypeBillingReminder, msg)
		if err != nil {
			return err
		}
		if exists {
			continue
		}

		n := &models.Notification{
			UserID:  userID,
			Message: msg,
			Type:    models.NotificationTypeBillingReminder,
		}
		if err := s.notifs.Create(ctx, n); err != nil {
			return err
		}
	}
	return nil
}

func billingReminderMessage(sub *models.Subscription) string {
	return fmt.Sprintf("Subscription %q renews on %s.", sub.Name, sub.NextBillingDate.UTC().Format("2006-01-02"))
}
