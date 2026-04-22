# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Coredex, please **do not** open a public GitHub issue. Instead, please follow these steps:

### Responsible Disclosure

1. **Email**: Send details to `security@coredex.example.com` (or create this email)
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

3. **Timeline**:
   - We acknowledge receipt within 24 hours
   - We aim to provide an initial assessment within 72 hours
   - We'll work with you on a fix and timeline for public disclosure

### What We Do

- Take all security reports seriously
- Work promptly to verify and patch vulnerabilities
- Credit researchers (with permission) in security advisories
- Follow coordinated disclosure practices

## Security Best Practices

### For Developers

- Always use HTTPS in production
- Never commit secrets (.env, API keys, credentials)
- Use environment variables for sensitive config
- Keep dependencies updated: `npm audit` regularly
- Use least-privilege access patterns
- Implement proper input validation
- Use TypeScript for type safety

### For Users/Deployers

- Change default credentials immediately
- Use strong, random JWT_SECRET and VAULT_ENCRYPTION_KEY
- Enable HTTPS and use reverse proxy
- Keep PostgreSQL updated with security patches
- Run `npm audit` and address vulnerabilities
- Monitor logs for suspicious activity
- Use network firewalls to restrict access
- Regular backups of encrypted data

## Security Standards

Coredex implements:

- ✅ Zero-Knowledge Architecture (encryption at rest)
- ✅ HTTPS/TLS ready (configure in production)
- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ SQL injection protection (via ORM/prepared statements)
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Dependency scanning via GitHub Actions

## Known Limitations

- This is an early-stage project; audit before production use
- Some features may not be fully audited yet
- See roadmap for planned security enhancements

## Support

For other security questions, please contact: `team@coredex.example.com`
