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

// NotificationHandler serves in-app notifications for the authenticated user.
type NotificationHandler struct {
	svc *services.NotificationService
}

func NewNotificationHandler(svc *services.NotificationService) *NotificationHandler {
	return &NotificationHandler{svc: svc}
}

// List handles GET /notifications (syncs billing reminders, then returns all notifications).
func (h *NotificationHandler) List(c *gin.Context) {
	uid, ok := middleware.UserID(c)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "unauthorized", "missing user context", nil)
		return
	}
	items, err := h.svc.List(c.Request.Context(), uid)
	if err != nil {
		pushNotificationError(c, err)
		return
	}
	if items == nil {
		items = []models.Notification{}
	}
	response.OK(c, gin.H{"notifications": items})
}

func pushNotificationError(c *gin.Context, err error) {
	var app *models.AppError
	if errors.As(err, &app) {
		c.Error(app)
		return
	}
	c.Error(err)
}

// RegisterNotificationRoutes mounts authenticated notification routes.
func RegisterNotificationRoutes(r gin.IRoutes, h *NotificationHandler) {
	r.GET("/notifications", h.List)
}
