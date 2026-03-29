# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| v1.0.x  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an e-mail to Omar Assaf. All security vulnerabilities will be promptly addressed.

## Known Limitations

This site is hosted on GitHub Pages. As a result, certain HTTP Security Headers cannot be set via the server configuration:
- `X-Frame-Options` (or `frame-ancestors` in CSP)
- `X-Content-Type-Options: nosniff`

We use a strong Content Security Policy via `<meta>` tag where possible.