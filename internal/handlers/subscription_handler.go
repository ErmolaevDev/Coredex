package handlers

import (
	"errors"
	"net/http"
	"strconv"

	"coredex/internal/middleware"
	"coredex/internal/models"
	"coredex/internal/services"
	"coredex/pkg/response"

	"github.com/gin-gonic/gin"
)

// SubscriptionHandler exposes subscription CRUD for the authenticated user.
type SubscriptionHandler struct {
	svc *services.SubscriptionService
}

func NewSubscriptionHandler(svc *services.SubscriptionService) *SubscriptionHandler {
	return &SubscriptionHandler{svc: svc}
}

type createSubscriptionRequest struct {
	Name              string  `json:"name" binding:"required"`
	Price             float64 `json:"price" binding:"gte=0"`
	BillingCycle      string  `json:"billing_cycle" binding:"required"`
	NextBillingDate   string  `json:"next_billing_date" binding:"required"`
	Status            string  `json:"status" binding:"omitempty,oneof=active inactive"`
	ShareWithFamily   bool    `json:"share_with_family"`
}

type updateSubscriptionRequest struct {
	Name              string  `json:"name" binding:"required"`
	Price             float64 `json:"price" binding:"gte=0"`
	BillingCycle      string  `json:"billing_cycle" binding:"required"`
	NextBillingDate   string  `json:"next_billing_date" binding:"required"`
	Status            string  `json:"status" binding:"required,oneof=active inactive"`
	ShareWithFamily   *bool   `json:"share_with_family"`
}

// List handles GET /subscriptions.
func (h *SubscriptionHandler) List(c *gin.Context) {
	uid, ok := middleware.UserID(c)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "unauthorized", "missing user context", nil)
		return
	}
	items, err := h.svc.List(c.Request.Context(), uid)
	if err != nil {
		pushSubscriptionError(c, err)
		return
	}
	if items == nil {
		items = []models.Subscription{}
	}
	response.OK(c, gin.H{"subscriptions": items})
}

// Create handles POST /subscriptions.
func (h *SubscriptionHandler) Create(c *gin.Context) {
	uid, ok := middleware.UserID(c)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "unauthorized", "missing user context", nil)
		return
	}
	var req createSubscriptionRequest
	if !middleware.BindJSON(c, &req) {
		return
	}
	sub, err := h.svc.Create(c.Request.Context(), uid, services.CreateInput{
		Name:              req.Name,
		Price:             req.Price,
		BillingCycle:      req.BillingCycle,
		NextBillingDate:   req.NextBillingDate,
		Status:            req.Status,
		ShareWithFamily:   req.ShareWithFamily,
	})
	if err != nil {
		pushSubscriptionError(c, err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"subscription": sub})
}

// Update handles PUT /subscriptions/:id.
func (h *SubscriptionHandler) Update(c *gin.Context) {
	uid, ok := middleware.UserID(c)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "unauthorized", "missing user context", nil)
		return
	}
	id, ok := parseUintParam(c, "id")
	if !ok {
		return
	}
	var req updateSubscriptionRequest
	if !middleware.BindJSON(c, &req) {
		return
	}
	sub, err := h.svc.Update(c.Request.Context(), uid, id, services.UpdateInput{
		Name:              req.Name,
		Price:             req.Price,
		BillingCycle:      req.BillingCycle,
		NextBillingDate:   req.NextBillingDate,
		Status:            req.Status,
		ShareWithFamily:   req.ShareWithFamily,
	})
	if err != nil {
		pushSubscriptionError(c, err)
		return
	}
	response.OK(c, gin.H{"subscription": sub})
}

// Delete handles DELETE /subscriptions/:id.
func (h *SubscriptionHandler) Delete(c *gin.Context) {
	uid, ok := middleware.UserID(c)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "unauthorized", "missing user context", nil)
		return
	}
	id, ok := parseUintParam(c, "id")
	if !ok {
		return
	}
	if err := h.svc.Delete(c.Request.Context(), uid, id); err != nil {
		pushSubscriptionError(c, err)
		return
	}
	c.Status(http.StatusNoContent)
}

func parseUintParam(c *gin.Context, name string) (uint, bool) {
	s := c.Param(name)
	n, err := strconv.ParseUint(s, 10, 64)
	if err != nil || n == 0 {
		response.Error(c, http.StatusBadRequest, "invalid_id", "id must be a positive integer", nil)
		return 0, false
	}
	return uint(n), true
}

func pushSubscriptionError(c *gin.Context, err error) {
	var app *models.AppError
	if errors.As(err, &app) {
		c.Error(app)
		return
	}
	c.Error(err)
}

// RegisterSubscriptionRoutes mounts authenticated subscription routes (group must use RequireAuth).
func RegisterSubscriptionRoutes(r gin.IRoutes, h *SubscriptionHandler) {
	r.GET("/subscriptions", h.List)
	r.POST("/subscriptions", h.Create)
	r.PUT("/subscriptions/:id", h.Update)
	r.DELETE("/subscriptions/:id", h.Delete)
}
