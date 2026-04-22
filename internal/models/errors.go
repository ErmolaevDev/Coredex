package models

import (
	"errors"
	"fmt"
	"net/http"
)

// AppError is a domain or HTTP-layer error with a stable code for clients.
type AppError struct {
	Code       string
	Message    string
	StatusCode int
	Cause      error
}

func (e *AppError) Error() string {
	if e.Cause != nil {
		return fmt.Sprintf("%s: %v", e.Message, e.Cause)
	}
	return e.Message
}

func (e *AppError) Unwrap() error {
	return e.Cause
}

// ErrNotFound is a sample domain error for repository/service layers.
var ErrNotFound = errors.New("not found")

// NewAppError builds an AppError with defaults.
func NewAppError(status int, code, message string) *AppError {
	if status == 0 {
		status = http.StatusInternalServerError
	}
	return &AppError{
		Code:       code,
		Message:    message,
		StatusCode: status,
	}
}
