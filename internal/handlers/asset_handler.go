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

// AssetHandler exposes the digital asset vault.
type AssetHandler struct {
	svc *services.AssetService
}

func NewAssetHandler(svc *services.AssetService) *AssetHandler {
	return &AssetHandler{svc: svc}
}

type createAssetRequest struct {
	Type  string `json:"type" binding:"required,oneof=api_key license domain"`
	Value string `json:"value" binding:"required"`
}

// Create handles POST /assets.
func (h *AssetHandler) Create(c *gin.Context) {
	uid, ok := middleware.UserID(c)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "unauthorized", "missing user context", nil)
		return
	}
	var req createAssetRequest
	if !middleware.BindJSON(c, &req) {
		return
	}
	out, err := h.svc.Create(c.Request.Context(), uid, services.CreateAssetInput{
		Type:  req.Type,
		Value: req.Value,
	})
	if err != nil {
		pushAssetError(c, err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"asset": out})
}

// List handles GET /assets.
func (h *AssetHandler) List(c *gin.Context) {
	uid, ok := middleware.UserID(c)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "unauthorized", "missing user context", nil)
		return
	}
	items, err := h.svc.List(c.Request.Context(), uid)
	if err != nil {
		pushAssetError(c, err)
		return
	}
	if items == nil {
		items = []services.AssetPublic{}
	}
	response.OK(c, gin.H{"assets": items})
}

func pushAssetError(c *gin.Context, err error) {
	var app *models.AppError
	if errors.As(err, &app) {
		c.Error(app)
		return
	}
	c.Error(err)
}

// RegisterAssetRoutes mounts authenticated vault routes.
func RegisterAssetRoutes(r gin.IRoutes, h *AssetHandler) {
	r.POST("/assets", h.Create)
	r.GET("/assets", h.List)
}
