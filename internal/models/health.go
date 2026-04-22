package models

import "time"

// HealthStatus is returned by the health check use case.
type HealthStatus struct {
	Status    string    `json:"status"`
	Service   string    `json:"service"`
	Timestamp time.Time `json:"timestamp"`
}
