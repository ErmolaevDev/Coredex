package middleware

import (
	"errors"
	"net/http"

	"coredex/pkg/response"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

// BindJSON decodes and validates JSON using Gin binding tags. On failure it writes a 400 and returns false.
func BindJSON(c *gin.Context, dst any) bool {
	if err := c.ShouldBindJSON(dst); err != nil {
		HandleBindingError(c, err)
		return false
	}
	return true
}

// HandleBindingError maps binding or validation errors to a stable JSON shape.
func HandleBindingError(c *gin.Context, err error) {
	var ve validator.ValidationErrors
	if errors.As(err, &ve) {
		details := make([]gin.H, 0, len(ve))
		for _, fe := range ve {
			details = append(details, gin.H{
				"field": fe.Field(),
				"tag":   fe.Tag(),
				"error": fe.Error(),
			})
		}
		response.Error(c, http.StatusBadRequest, "validation_failed", "request validation failed", details)
		return
	}
	response.Error(c, http.StatusBadRequest, "invalid_request", err.Error(), nil)
}
