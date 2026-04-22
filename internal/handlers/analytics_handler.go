package handlers

import (
	"errors"
	"net/http"

	"coredex/internal/middleware"
	"coredex/internal/models"
	"coredex/internal/services"
	"coredex/pkg/response"

	"github.com/gin-gonic/gin"
)

// AnalyticsHandler exposes spending analytics for the authenticated user.
type AnalyticsHandler struct {
	svc *services.AnalyticsService
}

func NewAnalyticsHandler(svc *services.AnalyticsService) *AnalyticsHandler {
	return &AnalyticsHandler{svc: svc}
}

// Summary handles GET /analytics/summary.
func (h *AnalyticsHandler) Summary(c *gin.Context) {
	uid, ok := middleware.UserID(c)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "unauthorized", "missing user context", nil)
		return
	}
	out, err := h.svc.Summary(c.Request.Context(), uid)
	if err != nil {
		pushAnalyticsError(c, err)
		return
	}
	c.JSON(http.StatusOK, out)
}

func pushAnalyticsError(c *gin.Context, err error) {
	var app *models.AppError
	if errors.As(err, &app) {
		c.Error(app)
		return
	}
	c.Error(err)
}

// RegisterAnalyticsRoutes mounts authenticated analytics routes (group must use RequireAuth).
func RegisterAnalyticsRoutes(r gin.IRoutes, h *AnalyticsHandler) {
	r.GET("/analytics/summary", h.Summary)
}
