# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to the project maintainer. All security vulnerabilities will be promptly addressed.

Please include the following information in your report:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Security Best Practices

When using this template:

1. **Environment Variables**: Never commit `.env` files with sensitive data
2. **Dependencies**: Regularly update dependencies to patch security vulnerabilities
3. **API Keys**: Store all API keys in environment variables
4. **Authentication**: Implement proper authentication and authorization
5. **Input Validation**: Always validate and sanitize user input
6. **HTTPS**: Use HTTPS in production
7. **CORS**: Configure CORS appropriately for your use case

## Disclosure Policy

- Security issues will be addressed as soon as possible
- We will notify users of any security updates through GitHub releases
- Credit will be given to security researchers who responsibly disclose vulnerabilities
