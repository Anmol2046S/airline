# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in the Airline Booking System, please email us at security@example.com instead of using the issue tracker.

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Best Practices

### For Users
- Keep your PHP and MySQL updated to the latest versions
- Use strong passwords for database credentials
- Enable SSL/HTTPS in production
- Regularly backup your database
- Use environment variables for sensitive configuration

### For Developers
- Never commit credentials or API keys to the repository
- Use parameterized queries to prevent SQL injection
- Validate and sanitize all user inputs
- Use HTTPS for all communications
- Implement proper authentication and authorization
- Keep dependencies updated
- Perform regular security audits

## Known Issues

None currently reported.

## Supported Versions

| Version | Supported          |
|---------|-----------------|
| 1.0.x   | :white_check_mark: |

## Deployment Security

When deploying to production:
1. Set proper file permissions (755 for directories, 644 for files)
2. Remove unnecessary files and directories
3. Use environment variables for configuration
4. Enable CORS restrictions
5. Implement rate limiting
6. Use security headers
7. Enable error logging (but don't expose errors to users)
8. Regularly update dependencies
