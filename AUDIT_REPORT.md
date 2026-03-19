# MoviesDaily Repository Audit Report

**Date:** 2026-03-19
**Branch:** claude/audit-repository-pmPqi
**Auditor:** Claude Code

---

## Executive Summary

The MoviesDaily React Native application has **26 identified issues** across security, code quality, and documentation categories. Two issues require **immediate action** due to critical security risks: an exposed API key and critically vulnerable dependencies.

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High | 9 |
| Medium | 8 |
| Low | 7 |

---

## CRITICAL FINDINGS

### 1. Hardcoded API Key
**File:** `src/api/url.js:3`

```javascript
const API_KEY = "1abb3e68d878be1155d781ce812f80a8";
```

The TMDb API key is hardcoded directly in source code, making it visible in the git history, compiled binaries, and to anyone with repository access. This key should be rotated immediately and moved to environment variables.

**Fix:** Use `react-native-dotenv` or `react-native-config` to load from a `.env` file (not committed to git).

---

### 2. Critically Vulnerable Dependencies (87 total vulnerabilities)
**File:** `package.json`

`npm audit` reports:
- **11 Critical** vulnerabilities
- **29 High** vulnerabilities
- **38 Moderate** vulnerabilities
- **9 Low** vulnerabilities

Notable critical issue: `@babel/traverse < 7.23.2` — arbitrary code execution when compiling malicious code (CVSS 9.4, CVE GHSA-67hx-6x53-jw92).

**Fix:** Run `npm audit fix` and manually update pinned versions where auto-fix is insufficient.

---

## HIGH SEVERITY FINDINGS

### 3. Missing Error Handling in API Layer
**File:** `src/api/api.js`

- `.catch()` blocks only call `console.error()` — errors are swallowed silently
- `requestSearchMovie()` and `requestSearchTv()` (lines 84–90) have no error handling at all
- No timeout handling, no retry logic, no error propagation to UI

### 4. No Loading or Error States in Detail Screens
**Files:** `src/screen/MovieDetailScreen.js`, `src/screen/TVDetailScreen.js`, `src/screen/MovieSeasonScreen.js`

Users have no feedback while data loads, and no indication when requests fail. The UI silently shows empty/stale data.

### 5. Missing Input Validation and Debouncing in Search
**File:** `src/screen/SearchScreen.js:83`

Search fires on every keystroke with no debouncing, minimum length, or input sanitization. This risks API rate limiting and sends unnecessary requests.

### 6. Unsafe WebView URL Construction
**File:** `src/screen/WebViewScreen.js:8`

```javascript
const url = `https://www.youtube.com/watch?v=${id}`;
```

The `id` route parameter is used without validation. No JavaScript bridge restrictions, no origin validation, and no content security policy are configured.

### 7. Deprecated React / React Native Versions
**Current:** React 16.13.1, React Native 0.63.2 (released 2020)

Both versions are EOL. They lack critical security patches, performance improvements, and modern React features. The navigation library (`react-navigation` v5) is also outdated (current: v6+).

### 8. Weak ESLint Configuration
**File:** `.eslintrc.json`

The `react/prop-types` rule is commented out, disabling prop validation. There are no rules for `console` statements, unused variables, or import ordering — meaning the pre-commit hook catches very little.

### 9. PropTypes.any Used Broadly
**Files:** `src/screen/SearchScreen.js:93`, `src/component/MoviePoster.js:30`, `src/screen/MovieDetailScreen.js:101`

Using `PropTypes.any` defeats the purpose of prop validation. These should use specific PropTypes shapes.

### 10. OfflineNotice Does Not Prevent API Calls
**File:** `src/component/OfflineNotice.js`

The component detects offline state and shows a banner but does not prevent API calls from being made. Requests will silently fail when the device is offline.

### 11. Potential Memory Leak in OfflineNotice
**File:** `src/component/OfflineNotice.js:23`

```javascript
componentWillUnmount() {
  this.subscription();
}
```

No null check before calling `this.subscription()`. If the subscription was never assigned (e.g., due to an error during mount), this will throw.

---

## MEDIUM SEVERITY FINDINGS

### 12. Console Statements in Production Code
**Files:** `src/api/api.js` (lines 29, 69, 81), `src/screen/MovieDetailScreen.js:38`, `src/screen/TVDetailScreen.js:39`

Debug `console.log` and `console.error` calls are left in production code. These expose internal data and have a minor performance cost.

### 13. Hardcoded Magic Numbers and Strings
Multiple files use hardcoded values: font sizes, spacing, colors, slice limits (`.slice(0, 10)`, `.slice(0, 7)`), and API endpoints. These should be constants or configuration.

### 14. Misleading Variable Names
`movieData` is reused for both movies and TV shows across screens, which is misleading and makes the code harder to follow.

### 15. Functions Named as Components
In detail screens, helper rendering functions (`imageComponent()`, `Cast()`, etc.) follow component naming conventions but are not proper React components, which is confusing.

### 16. No Environment Configuration Documentation
There is no `.env.example` file and no documentation explaining required environment variables, making local setup unclear for new developers.

### 17. No Error Tracking or Analytics
There is no integration with an error reporting service (e.g., Sentry) or analytics. Production crashes and failures are completely invisible.

### 18. No Network Request Timeouts
**File:** `src/api/api.js`

`fetch()` calls have no timeout configured. On slow or unresponsive networks, requests can hang indefinitely.

### 19. Response Structure Not Validated Before Parsing
**File:** `src/api/api.js:24`

```javascript
const handleErrors = (response) => {
  if (!response.ok) throw Error(response.statusText);
  return response;
};
```

If the API returns an unexpected format or non-JSON body, the subsequent `.json()` call will throw an uncaught error.

---

## LOW SEVERITY FINDINGS

### 20. Minimal Test Coverage
**File:** `__tests__/App-test.js`

Only one test exists, which simply renders the app. There are no unit tests for API functions, no component tests, and no integration tests.

### 21. Missing JSDoc / Inline Documentation
Most components, functions, and API methods lack any documentation comments, making the codebase harder to maintain.

### 22. Inconsistent Naming Conventions
A mix of camelCase and snake_case appears in variable names across the codebase. No consistent convention is enforced.

### 23. Incomplete README.md
The README lacks:
- API key setup instructions
- Environment variable documentation
- Troubleshooting guidance
- Contribution guidelines
- Security reporting instructions

### 24. No Security Headers in WebView
**File:** `src/screen/WebViewScreen.js`

The WebView renders YouTube without any security configuration: no `scalesPageToFit`, no JavaScript bridge restrictions, and no origin validation.

### 25. Husky Pre-commit Hook Has Limited Coverage
**File:** `package.json:51`

A pre-commit lint hook exists, but because ESLint is poorly configured (see #8), it catches very few real issues.

### 26. No CI/CD Pipeline
There is no continuous integration configuration (GitHub Actions, CircleCI, etc.), so no automated testing, linting, or security scanning runs on pull requests.

---

## Recommended Action Plan

### Phase 1 — Immediate (This Week)
1. Rotate the exposed TMDb API key
2. Move API key to environment variables (add `.env` to `.gitignore`, create `.env.example`)
3. Run `npm audit fix` to resolve auto-fixable vulnerabilities
4. Update `@babel/traverse` and other critical packages manually

### Phase 2 — Short Term (2–4 Weeks)
5. Add proper error handling and error propagation in `src/api/api.js`
6. Add loading and error states to all detail screens
7. Add debouncing and input validation to the search screen
8. Fix ESLint configuration: enable `react/prop-types`, add `no-console`, `no-unused-vars`
9. Add request timeouts to all `fetch()` calls
10. Fix `PropTypes.any` usages with specific shapes

### Phase 3 — Medium Term (1–2 Months)
11. Upgrade React Native to a supported version
12. Integrate an error reporting service (e.g., Sentry)
13. Add comprehensive unit and integration tests
14. Set up a CI/CD pipeline
15. Add network state management to prevent requests when offline

### Phase 4 — Ongoing
16. Add JSDoc comments for public APIs and components
17. Create coding conventions documentation
18. Improve README with setup and security guidelines
19. Add analytics tracking
