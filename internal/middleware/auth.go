package middleware

import (
	"log/slog"
	"net/http"
	"strings"

	"coredex/internal/auth"
	"coredex/pkg/response"

	"github.com/gin-gonic/gin"
)

// ContextUserIDKey is the Gin context key for the authenticated user ID.
const ContextUserIDKey = "auth_user_id"

// RequireAuth validates a Bearer JWT and stores the user ID in the context.
func RequireAuth(tokens *auth.TokenService) gin.HandlerFunc {
	return func(c *gin.Context) {
		raw := strings.TrimSpace(c.GetHeader("Authorization"))
		const prefix = "Bearer "
		if len(raw) <= len(prefix) || !strings.EqualFold(raw[:len(prefix)], prefix) {
			response.Error(c, http.StatusUnauthorized, "unauthorized", "missing or invalid authorization header", nil)
			c.Abort()
			return
		}
		tokenString := strings.TrimSpace(raw[len(prefix):])
		if tokenString == "" {
			response.Error(c, http.StatusUnauthorized, "unauthorized", "missing bearer token", nil)
			c.Abort()
			return
		}

		slog.Debug("auth_token_received",
			slog.String("path", c.Request.URL.Path),
			slog.Int("token_len", len(tokenString)),
		)

		uid, err := tokens.ParseUserID(tokenString)
		if err != nil {
			slog.Debug("auth_jwt_parse_failed", slog.String("error", err.Error()))
			response.Error(c, http.StatusUnauthorized, "unauthorized", "invalid or expired token", nil)
			c.Abort()
			return
		}

		slog.Debug("auth_user_id_parsed", slog.Uint64("user_id", uint64(uid)))

		c.Set(ContextUserIDKey, uid)
		c.Next()
	}
}

// UserID returns the authenticated user ID set by RequireAuth.
func UserID(c *gin.Context) (uint, bool) {
	v, ok := c.Get(ContextUserIDKey)
	if !ok {
		return 0, false
	}
	id, ok := v.(uint)
	return id, ok
}
