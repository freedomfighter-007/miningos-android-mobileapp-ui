# Security Audit Report

**Project:** MiningOS Android Mobile App UI
**Date:** 2026-02-04
**Auditor:** Automated Security Analysis
**Framework:** React 19 / Vite / Redux Toolkit

---

## Executive Summary

This security audit identified **8 findings** across various risk levels. The application is a React-based web application for mining operations management with OAuth-based authentication. While the codebase follows many security best practices, several areas require attention.

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 2 |
| Medium | 4 |
| Low | 2 |

---

## Findings

### HIGH-001: Vulnerable Dependency - jspdf (HIGH)

**Location:** `package.json:29`

**Description:**
The application uses `jspdf@4.0.0` which has multiple known vulnerabilities:
- **GHSA-pqxr-3g65-p328**: PDF Injection in AcroFormChoiceField allows Arbitrary JavaScript Execution (CVSS 8.1)
- **GHSA-95fx-jjr5-f39c**: DoS via Unvalidated BMP Dimensions in BMPDecoder
- **GHSA-vm32-vv63-w422**: Stored XMP Metadata Injection
- **GHSA-cjw8-79x6-5cj4**: Shared State Race Condition in addJS Plugin

**Risk:**
Attackers could potentially execute arbitrary JavaScript through crafted PDF forms or cause denial of service.

**Recommendation:**
```bash
npm update jspdf
# or check for patched version when available
```

---

### HIGH-002: Auth Token Stored in localStorage (HIGH)

**Location:** `src/app/store.ts:57`

**Description:**
Authentication tokens are persisted to localStorage via redux-persist:
```typescript
const persistConfig = {
  key: 'miningos',
  storage,
  whitelist: ['auth', 'theme', 'devices', 'timezone', 'multiSite', 'sidebar', 'userInfo'],
}
```

**Risk:**
- Tokens in localStorage are accessible to any JavaScript running on the page
- XSS vulnerabilities could allow token theft
- Tokens persist even after browser is closed

**Recommendation:**
1. Consider using httpOnly cookies for token storage (requires backend changes)
2. Implement token rotation and short expiration times
3. Add token binding to prevent token theft
4. Consider removing 'auth' from the persist whitelist

---

### MEDIUM-003: Potential XSS via innerHTML Assignment (MEDIUM)

**Location:** `src/Components/LineChart/LineChart.tsx:297` and `src/Components/LineChart/LineChart.utils.tsx:129-186`

**Description:**
The `buildTooltipHTML` function constructs HTML strings that are assigned to `innerHTML`:
```typescript
toolTipRef.current.innerHTML = html
```

The function interpolates values like `label`, `customLabel`, `borderColor`, and `extraTooltipData` directly into HTML without sanitization:
```typescript
tooltipHTML += `
  <span style="margin-right: 8px;">${label || customLabel || ''}</span>
  <span style="color: ${borderColor}">${valueWithUnit}</span>
`
```

**Risk:**
If any of these values come from user-controlled or API data, they could inject malicious scripts.

**Recommendation:**
1. Use React's built-in JSX rendering instead of innerHTML
2. If innerHTML is necessary, sanitize all interpolated values using a library like DOMPurify
3. Escape HTML special characters in the values

---

### MEDIUM-004: Redux DevTools Enabled in Production (MEDIUM)

**Location:** `src/app/store.ts:113`

**Description:**
Redux DevTools are unconditionally enabled:
```typescript
export const store = configureStore({
  // ...
  devTools: true, // Should be: devTools: import.meta.env.DEV
})
```

**Risk:**
- Attackers can inspect application state including auth tokens and user data
- Facilitates reverse engineering of application logic

**Recommendation:**
```typescript
export const store = configureStore({
  // ...
  devTools: import.meta.env.DEV,
})
```

---

### MEDIUM-005: Missing CSRF Protection (MEDIUM)

**Location:** `src/app/services/api.ts`, `src/app/services/api/baseQuery.ts`

**Description:**
No CSRF tokens are included in API requests. The application relies solely on Bearer token authentication.

**Risk:**
While Bearer tokens provide some protection against CSRF (they're not automatically sent by browsers), state-changing operations could be vulnerable if:
- Tokens are exposed via XSS
- The application implements any cookie-based authentication in the future

**Recommendation:**
1. Implement CSRF tokens for state-changing operations
2. Add `SameSite=Strict` attribute to any cookies
3. Validate `Origin` and `Referer` headers on the backend

---

### MEDIUM-006: Environment Files Committed to Repository (MEDIUM)

**Location:** `.env`, `.env.development`, `.env.staging`, `.env.production`

**Description:**
Multiple environment files are present in the repository and not excluded by `.gitignore`:
- `.env` - Contains basic configuration
- `.env.development` - Development configuration
- `.env.staging` - Staging configuration
- `.env.production` - Production configuration

While currently these files don't contain real secrets (API URLs are commented out), this pattern is risky.

**Risk:**
- Future developers may add real secrets to these files
- Sensitive configuration could be accidentally committed

**Recommendation:**
1. Add to `.gitignore`:
   ```
   .env
   .env.development
   .env.staging
   .env.production
   ```
2. Create `.env.example` files with placeholder values
3. Use environment-specific CI/CD secrets management

---

### LOW-007: Feature Flags Controllable via URL Parameters (LOW)

**Location:** `src/app/services/api.utils.ts:35-46`

**Description:**
Feature flags can be enabled via URL parameters:
```typescript
export const getFeaturesFromUrlParams = (params: string): FeatureFlags => {
  const queryParams = new URLSearchParams(params)
  const features = queryParams.get(FEATURES_GET_API_ENDPOINT)
  // ...
}
```

**Risk:**
- Users could enable experimental or admin features not intended for their role
- Could bypass feature gates

**Recommendation:**
1. Validate feature flags against user permissions
2. Restrict URL-based feature flags to development environments
3. Log and monitor feature flag overrides

---

### LOW-008: Auth Token Passed via URL Parameter (LOW)

**Location:** `src/hooks/useAuthToken.ts:20`

**Description:**
The application accepts auth tokens via URL query parameter:
```typescript
const token = searchParams.get('authToken')
```

**Risk:**
- Tokens in URLs can be logged by proxies, servers, and browser history
- Tokens may be leaked via Referer headers
- Users may accidentally share URLs containing tokens

**Recommendation:**
1. Use POST requests or response headers for token delivery
2. Immediately remove token from URL (current code does this, which is good)
3. Consider using short-lived tokens for URL-based auth
4. Add warning logs when URL-based auth is used

---

## Security Strengths

The codebase demonstrates several security best practices:

1. **Bearer Token Authentication**: Proper use of `Authorization: Bearer` headers
2. **Permission-Based Access Control**: Granular permission system (`useCheckPerm`, `GateKeeper`)
3. **OAuth Integration**: Using Google OAuth rather than custom password authentication
4. **Proper Token Removal from URL**: Auth tokens are removed from URL after extraction
5. **Production Console Stripping**: Console statements dropped in production builds (`vite.config.js:95`)
6. **Sentry Integration**: Error monitoring configured for production
7. **TypeScript Usage**: Strong typing reduces certain vulnerability classes
8. **No Hardcoded Secrets**: No API keys, passwords, or connection strings found in source code
9. **ESLint Configuration**: Code quality checks in place

---

## Recommendations Summary

### Immediate Actions (High Priority)
1. Update or replace `jspdf` dependency
2. Evaluate token storage strategy (localStorage vs httpOnly cookies)
3. Disable Redux DevTools in production

### Short-Term Actions (Medium Priority)
4. Sanitize HTML in tooltip rendering
5. Add CSRF protection for mutations
6. Update `.gitignore` for environment files

### Long-Term Actions (Low Priority)
7. Review feature flag security
8. Consider alternative token delivery mechanisms

---

## Appendix: Files Reviewed

### Core Security Files
- `src/app/services/api.ts` - API configuration and requests
- `src/app/services/api/baseQuery.ts` - Base query with auth headers
- `src/app/slices/authSlice.ts` - Auth state management
- `src/app/utils/authUtils.ts` - Permission checking utilities
- `src/app/utils/tokenUtils.ts` - Token parsing
- `src/app/store.ts` - Redux store configuration
- `src/hooks/useAuthToken.ts` - Auth token hook
- `src/hooks/usePermissions.ts` - Permission hooks

### Configuration Files
- `package.json` - Dependencies
- `vite.config.js` - Build configuration
- `.env*` - Environment files
- `.gitignore` - Git ignore rules

### UI Components (XSS Review)
- `src/Components/LineChart/LineChart.tsx` - Chart tooltip rendering
- `src/Components/LineChart/LineChart.utils.tsx` - HTML building utilities

---

*Report generated as part of security audit. For questions or clarifications, please contact the security team.*
