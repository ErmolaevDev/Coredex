package handlers

import (
	"net/http"

	"coredex/internal/services"

	"github.com/gin-gonic/gin"
)

// HealthHandler exposes operational endpoints.
type HealthHandler struct {
	svc *services.HealthService
}

func NewHealthHandler(svc *services.HealthService) *HealthHandler {
	return &HealthHandler{svc: svc}
}

// Get handles GET /health.
func (h *HealthHandler) Get(c *gin.Context) {
	ctx := c.Request.Context()
	st, err := h.svc.Status(ctx)
	if err != nil {
		c.Error(err)
		return
	}
	c.JSON(http.StatusOK, st)
}

// RegisterHealthRoutes mounts health routes on the given group or engine.
func RegisterHealthRoutes(r gin.IRoutes, h *HealthHandler) {
	r.GET("/health", h.Get)
}
