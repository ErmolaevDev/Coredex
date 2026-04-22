package middleware

import (
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

// RateLimit enforces a per-client-IP token bucket (requests per second + burst).
// When rps <= 0, returns a no-op middleware.
func RateLimit(rps float64, burst int) gin.HandlerFunc {
	if rps <= 0 || burst <= 0 {
		return func(c *gin.Context) { c.Next() }
	}

	var mu sync.Mutex
	limiters := make(map[string]*rate.Limiter)

	return func(c *gin.Context) {
		ip := c.ClientIP()
		mu.Lock()
		lim, ok := limiters[ip]
		if !ok {
			lim = rate.NewLimiter(rate.Limit(rps), burst)
			limiters[ip] = lim
		}
		mu.Unlock()

		if !lim.Allow() {
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
				"error": gin.H{
					"code":    "rate_limited",
					"message": "too many requests",
				},
			})
			return
		}
		c.Next()
	}
}
