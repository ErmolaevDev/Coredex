package handlers

import (
	"coredex/internal/middleware"
	"coredex/pkg/response"

	"github.com/gin-gonic/gin"
)

// DemoHandler illustrates validated JSON input (replace with real modules as features ship).
type DemoHandler struct{}

func NewDemoHandler() *DemoHandler {
	return &DemoHandler{}
}

// ContactRequest is a sample DTO with binding/validation tags.
type ContactRequest struct {
	Email string `json:"email" binding:"required,email"`
	Name  string `json:"name" binding:"required,min=1,max=120"`
}

// PostContact handles POST /v1/demo/contact with request validation.
func (h *DemoHandler) PostContact(c *gin.Context) {
	var req ContactRequest
	if !middleware.BindJSON(c, &req) {
		return
	}
	response.OK(c, gin.H{
		"message": "accepted",
		"email":   req.Email,
		"name":    req.Name,
	})
}

// RegisterDemoRoutes mounts sample routes under /v1/demo.
func RegisterDemoRoutes(r gin.IRoutes, h *DemoHandler) {
	r.POST("/demo/contact", h.PostContact)
}
