package auth

import (
	"crypto/rand"
	"encoding/hex"
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type User struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Email     string    `json:"email" gorm:"uniqueIndex;not null"`
	Phone     string    `json:"phone" gorm:"uniqueIndex"`
	Password  string    `json:"-" gorm:"not null"`
	Verified  bool      `json:"verified" gorm:"default:false"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Session struct {
	ID           string    `json:"id" gorm:"primaryKey"`
	UserID       uint      `json:"user_id" gorm:"not null"`
	RefreshToken string    `json:"refresh_token" gorm:"not null"`
	ExpiresAt    time.Time `json:"expires_at"`
	CreatedAt    time.Time `json:"created_at"`
}

var db *gorm.DB
var jwtSecret []byte

func init() {
	godotenv.Load()
	jwtSecret = []byte(os.Getenv("JWT_SECRET"))
}

func main() {
	var err error
	dsn := os.Getenv("DATABASE_URL")
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	db.AutoMigrate(&User{}, &Session{})

	r := gin.Default()

	// Security headers middleware
	r.Use(securityHeaders())

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://coredex.ru"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Rate limiting (simplified, use redis in production)
	r.Use(rateLimit())

	// Auth routes
	auth := r.Group("/auth")
	{
		auth.POST("/register", registerHandler)
		auth.POST("/login", loginHandler)
		auth.POST("/refresh", refreshHandler)
		auth.POST("/logout", logoutHandler)
	}

	// Protected routes
	protected := r.Group("/")
	protected.Use(authMiddleware())
	{
		protected.GET("/me", meHandler)
		protected.POST("/assets", createAssetHandler)
		protected.GET("/assets", listAssetsHandler)
	}

	r.Run(":8080")
}

func securityHeaders() gin.HandlerFunc {
	return gin.HandlerFunc(func(c *gin.Context) {
		c.Header("X-Content-Type-Options", "nosniff")
		c.Header("X-Frame-Options", "DENY")
		c.Header("X-XSS-Protection", "1; mode=block")
		c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		c.Header("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'")
		c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
		c.Header("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
		c.Next()
	})
}

func rateLimit() gin.HandlerFunc {
	// Simplified rate limiting - use redis in production
	return gin.HandlerFunc(func(c *gin.Context) {
		// Implement proper rate limiting with redis
		c.Next()
	})
}

func authMiddleware() gin.HandlerFunc {
	return gin.HandlerFunc(func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.AbortWithStatusJSON(401, gin.H{"error": "Missing token"})
			return
		}

		if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
			tokenString = tokenString[7:]
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(401, gin.H{"error": "Invalid token"})
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			userID := uint(claims["user_id"].(float64))
			c.Set("user_id", userID)
		}

		c.Next()
	})
}

func registerHandler(c *gin.Context) {
	var req struct {
		Email    string `json:"email" binding:"required,email"`
		Phone    string `json:"phone"`
		Password string `json:"password" binding:"required,min=8"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to hash password"})
		return
	}

	user := User{
		Email:    req.Email,
		Phone:    req.Phone,
		Password: string(hashedPassword),
	}

	if err := db.Create(&user).Error; err != nil {
		c.JSON(400, gin.H{"error": "User already exists"})
		return
	}

	// Send verification email (implement email service)
	// sendVerificationEmail(user.Email)

	c.JSON(201, gin.H{"message": "User registered successfully"})
}

func loginHandler(c *gin.Context) {
	var req struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var user User
	if err := db.Where("email = ?", req.Email).First(&user).Error; err != nil {
		c.JSON(401, gin.H{"error": "Invalid credentials"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		c.JSON(401, gin.H{"error": "Invalid credentials"})
		return
	}

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(15 * time.Minute).Unix(),
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to generate token"})
		return
	}

	// Generate refresh token
	refreshToken := make([]byte, 32)
	rand.Read(refreshToken)
	refreshTokenString := hex.EncodeToString(refreshToken)

	session := Session{
		UserID:       user.ID,
		RefreshToken: refreshTokenString,
		ExpiresAt:    time.Now().Add(7 * 24 * time.Hour),
	}

	db.Create(&session)

	// Set HttpOnly cookie
	c.SetCookie("refresh_token", refreshTokenString, 7*24*3600, "/", "coredex.ru", true, true)

	c.JSON(200, gin.H{
		"access_token": tokenString,
		"token_type":   "Bearer",
	})
}

func refreshHandler(c *gin.Context) {
	refreshToken, err := c.Cookie("refresh_token")
	if err != nil {
		c.JSON(401, gin.H{"error": "No refresh token"})
		return
	}

	var session Session
	if err := db.Where("refresh_token = ? AND expires_at > ?", refreshToken, time.Now()).First(&session).Error; err != nil {
		c.JSON(401, gin.H{"error": "Invalid refresh token"})
		return
	}

	// Generate new access token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": session.UserID,
		"exp":     time.Now().Add(15 * time.Minute).Unix(),
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(200, gin.H{
		"access_token": tokenString,
		"token_type":   "Bearer",
	})
}

func logoutHandler(c *gin.Context) {
	refreshToken, err := c.Cookie("refresh_token")
	if err != nil {
		c.JSON(200, gin.H{"message": "Already logged out"})
		return
	}

	db.Where("refresh_token = ?", refreshToken).Delete(&Session{})

	c.SetCookie("refresh_token", "", -1, "/", "coredex.ru", true, true)
	c.JSON(200, gin.H{"message": "Logged out successfully"})
}

func meHandler(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(401, gin.H{"error": "Unauthorized"})
		return
	}

	var user User
	if err := db.First(&user, userID).Error; err != nil {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}

	c.JSON(200, gin.H{
		"id":       user.ID,
		"email":    user.Email,
		"phone":    user.Phone,
		"verified": user.Verified,
	})
}

func createAssetHandler(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var req struct {
		Name          string `json:"name" binding:"required"`
		Description   string `json:"description"`
		EncryptedData string `json:"encrypted_data" binding:"required"` // Zero-knowledge: server sees only ciphertext
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Store in database (simplified - add proper asset model)
	// Log audit event
	log.Printf("User %d created asset: %s", userID, req.Name)

	c.JSON(201, gin.H{"message": "Asset created successfully"})
}

func listAssetsHandler(c *gin.Context) {
	// userID, _ := c.Get("user_id")

	// Return encrypted assets (simplified)
	c.JSON(200, gin.H{"assets": []string{}})
}
