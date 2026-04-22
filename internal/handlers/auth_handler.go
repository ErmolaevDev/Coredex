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

// AuthHandler serves /auth and protected profile routes.
type AuthHandler struct {
	svc *services.AuthService
}

func NewAuthHandler(svc *services.AuthService) *AuthHandler {
	return &AuthHandler{svc: svc}
}

type registerRequest struct {
	Username  string `json:"username" binding:"required,min=3,max=50"`
	Email     string `json:"email" binding:"required,email"`
	Password  string `json:"password" binding:"required,min=8,max=72"`
	PromoCode string `json:"promo_code"`
}

type loginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// Register handles POST /auth/register.
func (h *AuthHandler) Register(c *gin.Context) {
	var req registerRequest
	if !middleware.BindJSON(c, &req) {
		return
	}
	user, token, err := h.svc.Register(c.Request.Context(), req.Username, req.Email, req.Password, req.PromoCode)
	if err != nil {
		pushAuthError(c, err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"user":  user,
		"token": token,
	})
}

// Login handles POST /auth/login.
func (h *AuthHandler) Login(c *gin.Context) {
	var req loginRequest
	if !middleware.BindJSON(c, &req) {
		return
	}
	_, token, err := h.svc.Login(c.Request.Context(), req.Email, req.Password)
	if err != nil {
		pushAuthError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}

// Me handles GET /v1/me (requires auth middleware).
func (h *AuthHandler) Me(c *gin.Context) {
	uid, ok := middleware.UserID(c)
	if !ok {
		response.Error(c, http.StatusUnauthorized, "unauthorized", "missing user context", nil)
		return
	}
	user, err := h.svc.Profile(c.Request.Context(), uid)
	if err != nil {
		pushAuthError(c, err)
		return
	}
	response.OK(c, gin.H{"user": user})
}

func pushAuthError(c *gin.Context, err error) {
	var app *models.AppError
	if errors.As(err, &app) {
		c.Error(app)
		return
	}
	c.Error(err)
}

// RegisterAuthRoutes mounts public auth routes on the given group (e.g. /auth).
func RegisterAuthRoutes(r gin.IRoutes, h *AuthHandler) {
	r.POST("/register", h.Register)
	r.POST("/login", h.Login)
}

// RegisterProtectedUserRoutes mounts routes that require JWT (under /v1).
func RegisterProtectedUserRoutes(r gin.IRoutes, h *AuthHandler) {
	r.GET("/me", h.Me)
}
