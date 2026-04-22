package services

import (
	"context"
	"errors"
	"math"
	"strings"

	"coredex/internal/models"
	"coredex/internal/repositories"
)

// AnalyticsSummary is the spending snapshot for the authenticated user.
type AnalyticsSummary struct {
	MonthlySpend        float64 `json:"monthly_spend"`
	YearlySpend         float64 `json:"yearly_spend"`
	ActiveSubscriptions int     `json:"active_subscriptions"`
}

// AnalyticsService derives spend metrics from active subscriptions only.
type AnalyticsService struct {
	subs   *repositories.SubscriptionRepository
	family *repositories.FamilyRepository
}

func NewAnalyticsService(subs *repositories.SubscriptionRepository, family *repositories.FamilyRepository) *AnalyticsService {
	return &AnalyticsService{subs: subs, family: family}
}

// Summary computes normalized monthly and yearly cashflow from active subscriptions:
//   - monthly: sum of monthly prices plus (yearly price / 12)
//   - yearly: sum of (monthly price * 12) plus yearly prices
func (s *AnalyticsService) Summary(ctx context.Context, userID uint) (AnalyticsSummary, error) {
	var famID *uint
	if m, err := s.family.GetMembershipByUserID(ctx, userID); err == nil {
		fid := m.FamilyID
		famID = &fid
	} else if !errors.Is(err, models.ErrNotFound) {
		return AnalyticsSummary{}, err
	}
	active, err := s.subs.ListActiveVisibleForUser(ctx, userID, famID)
	if err != nil {
		return AnalyticsSummary{}, err
	}

	var monthlyEq, yearlyEq float64
	for _, sub := range active {
		switch strings.ToLower(strings.TrimSpace(sub.BillingCycle)) {
		case models.BillingCycleMonthly:
			monthlyEq += sub.Price
			yearlyEq += sub.Price * 12
		case models.BillingCycleYearly:
			monthlyEq += sub.Price / 12
			yearlyEq += sub.Price
		}
	}

	n := len(active)
	return AnalyticsSummary{
		MonthlySpend:        roundMoney(monthlyEq),
		YearlySpend:         roundMoney(yearlyEq),
		ActiveSubscriptions: n,
	}, nil
}

func roundMoney(v float64) float64 {
	return math.Round(v*100) / 100
}
