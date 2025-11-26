# 🔒 Security Guidelines

## Sensitive Information

This repository contains a public landing page for Shipinbox. The following information is intentionally public:

### Mailchimp Integration

The Mailchimp form endpoints and IDs are **public by design** and safe to expose:

- **List ID**: Used in public HTML forms
- **Account ID**: Required for form submission
- **Form ID**: Part of the embedded form URL

These IDs are meant to be public (similar to Google Analytics IDs) as they only allow:
- ✅ Adding subscribers to the list (intended use)
- ❌ Cannot read existing subscribers
- ❌ Cannot modify list settings
- ❌ Cannot access sensitive data

### What IS Protected

- API Keys (not used in this frontend-only implementation)
- Private user data (stored only in Mailchimp's servers)
- Server-side configurations (not applicable)

### Best Practices Implemented

1. **JSONP Method**: Safe cross-domain submission
2. **Honeypot Field**: Bot protection
3. **Frontend Validation**: Email regex check
4. **No API Keys**: All endpoints are public form submissions
5. **HTTPS Only**: Enforced via GitHub Pages

## GitHub Pages Deployment

This site is safe to deploy on GitHub Pages as:
- ✅ No backend code
- ✅ No API keys
- ✅ No sensitive credentials
- ✅ Client-side only
- ✅ Public endpoints only

## Questions?

If you have security concerns, please open an issue in the repository.

---

**Last Updated**: November 26, 2025
