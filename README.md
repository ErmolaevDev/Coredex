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