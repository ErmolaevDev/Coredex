# Contributing to Coredex

Thank you for your interest in contributing to Coredex! We welcome contributions of all kinds: bug reports, feature requests, documentation improvements, and code contributions.

## Code of Conduct

Please be respectful and professional in all interactions. We strive for a welcoming and inclusive community.

## Getting Started

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ErmolaevDev/Coredex.git
   cd Coredex
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Run development servers**
   ```bash
   pnpm dev
   ```

### Requirements

- Node.js 20+
- Go 1.22+
- Docker & Docker Compose (for database)
- pnpm (package manager)

## Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only
- `style`: Changes that don't affect code meaning (formatting)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Dependency updates, tooling, etc.
- `ci`: CI/CD configuration changes

### Examples

```
feat(dashboard): add asset distribution chart

fix(auth): handle expired token gracefully

docs: improve deployment instructions

chore: update dependencies
```

## Making Changes

### Process

1. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature
   ```

2. **Make your changes**
   - Write clean, readable code
   - Add tests if applicable
   - Update documentation

3. **Lint and format**
   ```bash
   pnpm lint
   pnpm format
   ```

4. **Commit with conventional commits**
   ```bash
   git commit -m "feat(component): description"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feat/your-feature
   ```

## Pull Requests

Please provide:

- Clear description of changes
- Reference to related issues (if any)
- Screenshots/videos (if UI changes)
- Testing instructions

## Backend (Go) Contributions

- Follow [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
- Run `go fmt` and `go vet`
- Add tests: `go test ./...`

## Frontend (Next.js/TypeScript) Contributions

- Use TypeScript strictly (no `any`)
- Component naming: PascalCase
- File naming: kebab-case for pages, PascalCase for components
- Run `pnpm type-check` before committing

## Testing

- Add tests for new features
- Ensure existing tests pass
- Aim for reasonable coverage

## Documentation

- Update README.md if adding features
- Add comments for complex logic
- Keep docs in sync with code

## Issues

Found a bug? Please open an issue with:

- Clear title
- Detailed description
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, browser, versions)

## Security

If you discover a security vulnerability, please see [SECURITY.md](SECURITY.md).

## Questions?

Feel free to open a discussion or contact us. We're here to help!

---

Thank you for contributing to Coredex! 🚀
