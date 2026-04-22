package auth

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// TokenService issues and parses access tokens (HS256).
type TokenService struct {
	secret []byte
	expiry time.Duration
}

// NewTokenService builds a signer/verifier. secret must be non-empty.
func NewTokenService(secret string, expiry time.Duration) (*TokenService, error) {
	if secret == "" {
		return nil, fmt.Errorf("jwt secret is empty")
	}
	if expiry <= 0 {
		return nil, fmt.Errorf("jwt expiry must be positive")
	}
	return &TokenService{secret: []byte(secret), expiry: expiry}, nil
}

// accessClaims is the private JWT payload shape.
type accessClaims struct {
	UserID uint `json:"uid"`
	jwt.RegisteredClaims
}

// Issue creates a signed JWT for the given user ID.
func (s *TokenService) Issue(userID uint) (string, error) {
	now := time.Now().UTC()
	claims := accessClaims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(now.Add(s.expiry)),
			IssuedAt:  jwt.NewNumericDate(now),
			NotBefore: jwt.NewNumericDate(now),
			Subject:   fmt.Sprintf("%d", userID),
		},
	}
	tok := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return tok.SignedString(s.secret)
}

// ParseUserID validates the token and returns the embedded user ID.
func (s *TokenService) ParseUserID(tokenString string) (uint, error) {
	var claims accessClaims
	tok, err := jwt.ParseWithClaims(tokenString, &claims, func(t *jwt.Token) (any, error) {
		if t.Method != jwt.SigningMethodHS256 {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return s.secret, nil
	})
	if err != nil {
		return 0, fmt.Errorf("invalid token: %w", err)
	}
	if tok == nil || !tok.Valid {
		return 0, fmt.Errorf("invalid token")
	}
	if claims.UserID == 0 {
		return 0, fmt.Errorf("invalid token claims")
	}
	return claims.UserID, nil
}
