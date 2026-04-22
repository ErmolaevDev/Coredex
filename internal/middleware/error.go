package middleware

import (
	"errors"
	"log/slog"
	"net/http"

	"coredex/internal/models"
	"coredex/pkg/response"

	"github.com/gin-gonic/gin"
)

// ErrorHandler turns handler-pushed errors (and panics caught elsewhere) into JSON responses.
// Handlers should use c.Error(err) and return without writing when delegating to this middleware.
func ErrorHandler(log *slog.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		if len(c.Errors) == 0 || c.Writer.Written() {
			return
		}

		err := c.Errors.Last().Err
		var app *models.AppError
		if errors.As(err, &app) {
			response.Error(c, app.StatusCode, app.Code, app.Message, nil)
			return
		}

		log.Error("unhandled_error",
			slog.String("path", c.Request.URL.Path),
			slog.String("error", err.Error()),
		)
		response.Error(c, http.StatusInternalServerError, "internal_error", "an unexpected error occurred", nil)
	}
}

// Recovery returns a Gin recovery middleware with structured logging.
func Recovery(log *slog.Logger) gin.HandlerFunc {
	return gin.CustomRecovery(func(c *gin.Context, recovered any) {
		log.Error("panic_recovered",
			slog.String("path", c.Request.URL.Path),
			slog.Any("recovered", recovered),
		)
		if c.Writer.Written() {
			return
		}
		response.Error(c, http.StatusInternalServerError, "internal_error", "an unexpected error occurred", nil)
	})
}
