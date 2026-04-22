# Coredex

> **Zero-Knowledge Digital Asset OS** — Unified platform for managing family subscriptions, licenses, API keys, domains, crypto, and digital legacy with military-grade encryption.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Go](https://img.shields.io/badge/Go-1.22-00ADD8?logo=go)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![License](https://img.shields.io/badge/License-MIT-green)

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Development](#development)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Overview

Coredex is a modern **SaaS platform** designed to give families complete visibility and control over their digital assets and financial subscriptions. Built with privacy-first principles using zero-knowledge architecture.

### Why Coredex?

- **🔐 Zero-Knowledge**: Your data is encrypted. We can't see it.
- **👨‍👩‍👧‍👦 Family-First**: Share access, not passwords. Granular permissions.
- **💰 Financial Intelligence**: Track subscriptions, detect savings opportunities, understand spending.
- **🛡️ Security**: Military-grade encryption, no plain text secrets, audit-ready.
- **🚀 Production-Ready**: Docker, Kubernetes-friendly, scalable architecture.

## Features

### Asset Management
- 📦 Organize digital assets: subscriptions, licenses, API keys, domains, crypto, devices
- 🔍 Track expiration dates and renewal schedules
- 📊 Asset distribution dashboard with visualization
- 🏷️ Categorization and tagging system

### Subscription Intelligence
- 📅 Upcoming payments timeline
- 💡 AI-powered savings recommendations
- 🔄 Subscription usage tracking
- 💰 Monthly/yearly spend analysis

### Family Governance
- 👥 Member management with role-based access
- 🔐 Hierarchical permissions (owner, manager, viewer, child)
- 💳 Shared budget allocation
- 🎯 Child safe mode with limits

### Security & Compliance
- 🔒 End-to-end encryption (AES-256-GCM)
- 🛡️ Zero-Knowledge design (server never sees plaintext)
- ✅ GDPR-ready architecture
- 📋 Audit logging for compliance
- 🔑 JWT token-based auth with refresh tokens

### Digital Legacy
- 👤 Emergency contacts management
- 📦 Digital asset inheritance planning
- 🏠 Legacy transfer on death
- 📝 Custom emergency instructions

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript 5 |
| **Styling** | Tailwind CSS, Radix UI |
| **Charts** | Recharts |
| **Backend API** | Go 1.22, Gin Web Framework |
| **Database** | PostgreSQL 16 |
| **ORM** | GORM |
| **Authentication** | JWT (HS256) with refresh tokens |
| **Encryption** | crypto/aes (Go standard lib) |
| **Containerization** | Docker, Docker Compose |
| **Package Manager** | pnpm (frontend) |

## Quick Start

### Prerequisites

```bash
# Required
- Node.js 20+ (or use nvm)
- Go 1.22+
- Docker & Docker Compose
- Git

# Verify
node --version   # v20.11.0+
go version        # go1.22+
docker --version  # Docker 24+
pnpm --version    # 8+
```

### Using Docker Compose (Recommended)

```bash
# Clone repository
git clone https://github.com/ErmolaevDev/Coredex.git
cd Coredex

# Copy example environment
cp deploy/docker.env.example deploy/docker.env

# Build and run
docker-compose up --build

# Access
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8080"
echo "Health:   http://localhost:8080/health"
```

### Manual Setup (Development)

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your config

# Run both frontend & backend concurrently
pnpm dev

# Or run separately
pnpm dev:web    # Next.js on :3000
pnpm dev:api    # Go API on :8080
```

## Development

### Project Structure

```
Coredex/
├── app/                  # Next.js pages & routes
├── components/           # React components
├── internal/             # Go backend
│   ├── handlers/         # HTTP handlers
│   ├── services/         # Business logic
│   ├── models/           # Data models
│   └── ...
├── lib/                  # Shared utilities
├── cmd/coredex/          # Go binary entrypoint
└── deploy/               # Deployment configs
```

### Development Commands

```bash
# Install & setup
pnpm install
cp .env.example .env.local

# Development
pnpm dev               # Both frontend & backend
pnpm dev:web          # Next.js only
pnpm dev:api          # Go API only

# Testing & Linting
pnpm lint             # ESLint
pnpm type-check       # TypeScript
go test ./...         # Go tests

# Formatting
pnpm format           # Prettier

# Docker
docker-compose up --build
docker-compose down
```

### Environment Variables

Create `.env.local`:

```env
# App
COREDEX_ENV=development
COREDEX_HTTP_PORT=8080

# Database
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=coredex
DB_PASSWORD=coredex_password

# Auth
JWT_SECRET=your-secret-min-32-chars
JWT_EXPIRES_IN=24h

# Encryption
VAULT_ENCRYPTION_KEY=base64-encoded-32-byte-key
```

**⚠️ NEVER commit `.env` files!**

## Deployment

### Docker Compose

```bash
docker-compose up -d
docker-compose ps
docker-compose logs -f
```

### Kubernetes (Helm)

```bash
helm install coredex ./helm/coredex \
  --values helm/coredex/values.yaml \
  --namespace production
```

### Self-Hosted VPS

```bash
# Ubuntu 22.04+
git clone https://github.com/ErmolaevDev/Coredex.git
cd Coredex
cp deploy/docker.env.example deploy/docker.env
# Edit deploy/docker.env with production values
docker-compose up -d
```

### Production Checklist

```
☑ Change all default credentials
☑ Use strong JWT_SECRET (min 32 chars, random)
☑ Use strong VAULT_ENCRYPTION_KEY
☑ Enable HTTPS with valid SSL certificate
☑ Set CORS to production domain only
☑ Enable rate limiting
☑ Regular dependency audits
☑ Setup monitoring & alerting
```

## Security

See [SECURITY.md](SECURITY.md) for:
- Responsible vulnerability disclosure
- Security best practices
- Known limitations
- Security standards

**Key Security Features:**
- ✅ Zero-Knowledge Architecture
- ✅ AES-256-GCM encryption
- ✅ JWT token-based auth
- ✅ Bcrypt password hashing
- ✅ HTTPS/TLS ready
- ✅ Rate limiting
- ✅ SQL injection protection

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development setup
- Commit conventions
- Pull request process
- Code style guidelines

### Quick Contribute

```bash
git checkout -b feat/your-feature
git commit -m "feat(component): description"
git push origin feat/your-feature
# Create Pull Request
```

## Roadmap

- [ ] Advanced analytics & insights
- [ ] Mobile app (React Native)
- [ ] Multi-factor authentication (MFA)
- [ ] Crypto asset management
- [ ] Social recovery of accounts

## FAQ

**Is Coredex open source?**  
Yes! Licensed under MIT.

**Can I self-host?**  
Yes! Docker Compose included.

**Is my data encrypted?**  
Yes! Zero-Knowledge architecture.

See [FAQ](docs/FAQ.md) for more.

## Support

- 📧 Email: `support@coredex.example.com`
- 🐛 Issues: [GitHub Issues](https://github.com/ErmolaevDev/Coredex/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/ErmolaevDev/Coredex/discussions)

## License

MIT License. See [LICENSE](LICENSE) for details.

---

**Made with ❤️ for families who deserve privacy**

⭐ Star us on GitHub if you find Coredex useful!
# COREDEx Platform

Современное решение для управления семейными финансами и цифровыми активами с единой панелью и безопасной бэкенд-архитектурой.  
Включает frontend на Next.js, backend на Go и PostgreSQL в Docker Compose.

## 🚀 Краткое описание

COREDEx Platform объединяет веб-интерфейс и API для управления подписками, тратами и финансовым здоровьем.  
Ключевые фичи:
- Разделенная архитектура: React/Next.js на frontend и Go API на backend.
- Готовый Docker Compose для быстрого локального запуска с PostgreSQL.

## ⚡ Быстрый старт

```bash
cp deploy/docker.env.example deploy/docker.env
docker-compose up --build
```

Откройте:
- frontend: `http://localhost:3000`
- backend: `http://localhost:8080/health`

## 🧰 Технологический стек

| Компонент | Технология |
| --- | --- |
| Frontend | `Next.js`, `React`, `TypeScript` |
| Стили | `Tailwind CSS` |
| UI-компоненты | `Radix UI`, `Lucide`, `Recharts` |
| Backend | `Go`, `Gin`, `GORM`, `pgx` |
| База данных | `PostgreSQL` |
| Контейнеризация | `Docker`, `Docker Compose` |
| Инструменты | `pnpm`, `concurrently` |

## ✅ Предварительные требования

- Docker
- Docker Compose
- Node.js (рекомендуется 20+)
- `pnpm`
- Go 1.22+
- `git`

## 📦 Установка и запуск

### Рекомендуемый способ: Docker Compose

```bash
cp deploy/docker.env.example deploy/docker.env
docker-compose up --build
```

### Вручную (pnpm + Go)

```bash
pnpm install
cp deploy/docker.env.example deploy/docker.env
```

Запустите backend:

```bash
go run ./cmd/coredex
```

Запустите frontend:

```bash
pnpm dev:web
```

Или сразу оба сервиса:

```bash
pnpm dev
```

## 🔐 Переменные окружения

Скопируйте docker.env.example в `deploy/docker.env` и настройте значения.

Основные переменные:

```env
COREDEX_ENV=production
COREDEX_HTTP_PORT=8080
COREDEX_LOG_LEVEL=info

DB_HOST=postgres
DB_PORT=5432
DB_USER=coredex
DB_PASSWORD=coredex
DB_NAME=coredex
DB_SSLMODE=disable

JWT_SECRET=replace-with-a-long-random-secret-at-least-32-chars
JWT_EXPIRES_IN=24h
VAULT_ENCRYPTION_KEY=MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=
```

Дополнительно:
- `COREDEX_CORS_ORIGINS` — список разрешенных источников для CORS.
- `COREDEX_RATE_LIMIT_RPS` / `COREDEX_RATE_LIMIT_BURST` — настройка rate limiting.

## 📁 Структура проекта

- app — страницы frontend приложения Next.js.
- components — UI и бизнес-компоненты для сайта и панели.
- deploy — пример конфигурации окружения для Docker.
- internal — backend логика Go: auth, config, database, handlers, middleware, модели, репозитории, сервисы.
- coredex — точка входа Go-сервера.
- lib — общий frontend API и утилиты.
- public — статические assets.
- styles — глобальные стили.
- Dockerfile — сборка Go-приложения.
- docker-compose.yml — локальная связка `api + postgres`.

## 🧪 Скрипты

### Frontend / package.json

```bash
pnpm dev
pnpm dev:web
pnpm dev:api
pnpm build
pnpm start
pnpm lint
```

### Go

```bash
go run ./cmd/coredex
```

Для production-сборки:

```bash
go build -o coredex ./cmd/coredex
```

## ☁️ Развёртывание

1. Скопируйте docker.env.example в `deploy/docker.env` и задайте реальные значения.
2. Соберите образ:

```bash
docker build -t coredex .
```

3. Запустите в проде:

```bash
docker-compose up -d
```

4. Убедитесь, что `postgres` и `api` поднялись корректно.

Дополнительно:
- Используйте безопасные секреты для `JWT_SECRET` и `VAULT_ENCRYPTION_KEY`.
- Настройте HTTPS и reverse proxy перед доступом из интернета.

## 🤝 Contributing

Если хотите участвовать:

- Открывайте issue для предложений и багов.
- Форкайте репозиторий.
- Создавайте pull request с понятными коммитами.
- Соблюдайте стиль кода и используйте `pnpm lint`.

## 📜 Лицензия

Проект предлагается на условиях MIT License.
# 🚀 Быстрый старт

Самый быстрый способ запустить проект — через `Docker Compose`.

```bash
cp deploy/docker.env.example deploy/docker.env
docker-compose up --build
```

После этого:
- Frontend доступен на `http://localhost:3000`
- Backend доступен на `http://localhost:8080/health`

---

# 🖥️ Требования к системе

Перед запуском убедитесь, что установлено:

- Docker
- Docker Compose
- Node.js 20+ (или совместимая версия)
- pnpm
- Go 1.22+
- Git

> Если вы запускаете вручную, Docker не обязателен, но для `docker-compose` он нужен.

---

# 🧩 Способ 1: Запуск через Docker Compose

Это рекомендованный способ для локального запуска, потому что он сразу поднимает backend и базу данных.

1. Скопируйте пример конфигурации окружения:

```bash
cp deploy/docker.env.example deploy/docker.env
```

2. Запустите сервисы:

```bash
docker-compose up --build
```

3. Дождитесь сборки и запуска.

### Что запускается

- `api` — backend на Go, собираемый через Dockerfile
- `postgres` — база данных PostgreSQL

### Проверка

```bash
docker-compose ps
```

Если всё в порядке, увидите контейнеры `api` и `postgres` со статусом `Up`.

---

# 🔧 Способ 2: Запуск вручную

Если вы хотите запускать frontend и backend отдельно, можно использовать `pnpm` и `go`.

## Frontend (Next.js + pnpm)

1. Установите зависимости:

```bash
pnpm install
```

2. Запустите frontend:

```bash
pnpm dev:web
```

### Где работает

- Frontend запускается по адресу `http://localhost:3000`

## Backend (Go)

1. Убедитесь, что Go установлено и go.mod доступен.
2. Запустите API:

```bash
go run ./cmd/coredex
```

### Где работает

- Backend стартует на `http://localhost:8080`
- Проверка здоровья: `http://localhost:8080/health`

## Как запустить оба сервиса одновременно

```bash
pnpm dev
```

Эта команда запустит одновременно:
- frontend через `next dev`
- backend через `go run ./cmd/coredex`

---

# 🧩 Настройка переменных окружения

В проекте есть несколько файлов окружения:

- .env
- .env.example
- .env.local
- docker.env.example

Для Docker используйте docker.env.example:

```bash
cp deploy/docker.env.example deploy/docker.env
```

Основные переменные:

```env
COREDEX_ENV=production
COREDEX_HTTP_PORT=8080
COREDEX_LOG_LEVEL=info

DB_HOST=postgres
DB_PORT=5432
DB_USER=coredex
DB_PASSWORD=coredex
DB_NAME=coredex
DB_SSLMODE=disable

JWT_SECRET=replace-with-a-long-random-secret-at-least-32-chars
JWT_EXPIRES_IN=24h
VAULT_ENCRYPTION_KEY=MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=
```

> Внимание: в реальном проекте замените `JWT_SECRET` и `VAULT_ENCRYPTION_KEY` на безопасные секреты.

Если запускаете вручную на frontend, .env.local может использоваться Next.js для локальных переменных.

---

# 🌐 Порты и доступ к приложению

- `http://localhost:3000` — frontend Next.js
- `http://localhost:8080` — backend Go API
- `http://localhost:8080/health` — health-check backend
- `5432` — PostgreSQL внутри Docker, проброс при необходимости через `POSTGRES_PORT`

> Убедитесь, что указанные порты не заняты другими приложениями.

---

# ⚠️ Возможные проблемы и их решения

### Проблема: `docker-compose` не стартует
- Проверьте, что Docker запущен
- Убедитесь, что файл docker.env существует
- Выполните:

```bash
docker-compose down
docker-compose up --build
```

### Проблема: frontend не видит API
- Проверьте, что backend работает на `8080`
- Убедитесь, что CORS настроен, если frontend и backend работают на разных портах

### Проблема: `pnpm dev` не запускается
- Установите зависимости:

```bash
pnpm install
```

- Убедитесь, что `pnpm` доступен в PATH

### Проблема: Go не компилируется
- Убедитесь, что установлен Go 1.22+
- Запустите:

```bash
go mod tidy
```

---

# 🧾 Полезные команды

## pnpm

```bash
pnpm install
pnpm dev
pnpm dev:web
pnpm dev:api
pnpm build
pnpm start
pnpm lint
```

## go

```bash
go run ./cmd/coredex
go build -o coredex ./cmd/coredex
go mod tidy
```

## docker-compose

```bash
docker-compose up --build
docker-compose down
docker-compose ps
docker-compose logs -f
```

---

# 💡 Дополнительные советы

- Если вы впервые работаете с проектом, сначала используйте Docker Compose.
- Для разработки frontend/backend одновременно `pnpm dev` — самый простой вариант.
- Всегда храните секреты в отдельных файлах и не коммитьте их в репозиторий.