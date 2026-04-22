package logger

import (
	"io"
	"log/slog"
	"os"
	"strings"
)

// New returns a structured slog.Logger. In production, JSON is used; otherwise text.
func New(env, level string) *slog.Logger {
	var handler slog.Handler
	opts := &slog.HandlerOptions{Level: parseLevel(level)}

	if strings.EqualFold(env, "production") {
		handler = slog.NewJSONHandler(os.Stdout, opts)
	} else {
		handler = slog.NewTextHandler(os.Stdout, opts)
	}

	return slog.New(handler)
}

// NewDiscard returns a logger that discards all output (tests).
func NewDiscard() *slog.Logger {
	return slog.New(slog.NewTextHandler(io.Discard, &slog.HandlerOptions{Level: slog.LevelError + 1}))
}

func parseLevel(s string) slog.Leveler {
	switch strings.ToLower(strings.TrimSpace(s)) {
	case "debug":
		return slog.LevelDebug
	case "warn", "warning":
		return slog.LevelWarn
	case "error":
		return slog.LevelError
	default:
		return slog.LevelInfo
	}
}
