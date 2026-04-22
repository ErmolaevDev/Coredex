# Build
FROM golang:1.22-bookworm AS builder

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags="-s -w" -o /out/coredex ./cmd/coredex

# Runtime
FROM alpine:3.23

RUN apk add --no-cache ca-certificates tzdata wget \
	&& addgroup -S app && adduser -S -G app -u 65532 app

WORKDIR /home/app
COPY --from=builder /out/coredex /usr/local/bin/coredex

USER app
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
	CMD wget -qO- http://127.0.0.1:8080/health || exit 1

ENTRYPOINT ["/usr/local/bin/coredex"]
