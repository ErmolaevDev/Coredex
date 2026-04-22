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

// FamilyHandler manages family CRUD and invites.
type FamilyHandler struct {
	svc *services.FamilyService
}

func NewFamilyHandler(svc *services.FamilyService) *FamilyHandler {
	return &FamilyHandler{svc: svc}
}

// Create handles POST /family.
func (h *FamilyHandler) Create(c *gin.Context) {
	uid, ok := middleware.UserID(c)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "unauthorized", "missing user context", nil)
		return
	}
	fam, err := h.svc.CreateFamily(c.Request.Context(), uid)
	if err != nil {
		pushFamilyError(c, err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"family": fam})
}

type inviteRequest struct {
	Email string `json:"email" binding:"required,email"`
}

// Invite handles POST /family/invite.
func (h *FamilyHandler) Invite(c *gin.Context) {
	uid, ok := middleware.UserID(c)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "unauthorized", "missing user context", nil)
		return
	}
	var req inviteRequest
	if !middleware.BindJSON(c, &req) {
		return
	}
	if err := h.svc.InviteByEmail(c.Request.Context(), uid, req.Email); err != nil {
		pushFamilyError(c, err)
		return
	}
	response.OK(c, gin.H{"message": "invited"})
}

// Get handles GET /family.
func (h *FamilyHandler) Get(c *gin.Context) {
	uid, ok := middleware.UserID(c)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "unauthorized", "missing user context", nil)
		return
	}
	view, err := h.svc.GetFamily(c.Request.Context(), uid)
	if err != nil {
		pushFamilyError(c, err)
		return
	}
	c.JSON(http.StatusOK, view)
}

func pushFamilyError(c *gin.Context, err error) {
	var app *models.AppError
	if errors.As(err, &app) {
		c.Error(app)
		return
	}
	c.Error(err)
}

// RegisterFamilyRoutes mounts authenticated family routes.
func RegisterFamilyRoutes(r gin.IRoutes, h *FamilyHandler) {
	r.POST("/family", h.Create)
	r.POST("/family/invite", h.Invite)
	r.GET("/family", h.Get)
}
