package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// JSON writes a JSON envelope with optional extra fields merged at the top level.
func JSON(c *gin.Context, status int, data gin.H) {
	if data == nil {
		data = gin.H{}
	}
	c.JSON(status, data)
}

// OK is a shorthand for 200 JSON.
func OK(c *gin.Context, data gin.H) {
	JSON(c, http.StatusOK, data)
}

// Error writes a consistent error body.
func Error(c *gin.Context, status int, code, message string, details any) {
	errObj := gin.H{
		"success": false,
		"message": message,
	}
	if details != nil {
		errObj["details"] = details
	}
	c.JSON(status, errObj)
}
