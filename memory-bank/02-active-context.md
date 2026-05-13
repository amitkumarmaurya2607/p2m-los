# 02 - Active Context

## Current Date

May 11, 2026

## Current Focus

Unified logging system implemented — frontend and backend errors log to the same file. Now focusing on fixing pre-existing type errors and API integration.

## Recent Changes

1. **Redux Removed → Replaced with React Context API**
   - Created `src/context/AuthContext.tsx` - Auth state with sessionStorage persistence
   - Created `src/context/ApplicationContext.tsx` - Application form data with computed selectors and sessionStorage persistence
   - Updated `src/app/providers.tsx`, deleted Redux files
   - Uninstalled `@reduxjs/toolkit` and `react-redux`

2. **Unified Logging System**
   - Created `src/lib/logger.ts` — universal logger (client + server) with auto-PII sanitization
   - Created `src/app/api/log/route.ts` — POST endpoint for client log collection
   - Created `src/components/GlobalErrorHandler.tsx` — catches `window.onerror` + `unhandledrejection`
   - Updated `src/components/ErrorBoundary.tsx` — logs via logger in `componentDidCatch`
   - Updated `src/app/error.tsx` — logger replaces `console.error`
   - Updated `src/app/layout.tsx` — includes `GlobalErrorHandler`
   - Logs stored in `logs/YYYY-MM-DD.log` as JSON lines in project root
   - Auto-masks PAN, Aadhaar, mobile, email in all log entries

## Active Decisions

- CSS variables used instead of Tailwind hardcoded colors for maintainability
- `react-hot-toast` chosen over custom toast for reliability and bundle size
- Tailwind CSS v4 native approach (no tailwind.config.js)
- Context API over Redux to reduce bundle size and complexity for simple CRUD state
- File-based logging over external service for simplicity (no Sentry/etc.)
- PII auto-sanitized at logger level to prevent accidental data leaks

## Next Steps

1. Fix pre-existing TypeScript errors in `src/pages/Home/Home.tsx`, `src/pages/VerifyOtpPage.tsx/VerifyOtpPage.tsx`, and `src/views/Contact/Contact.tsx`
2. Wire up actual API endpoints for OTP send/verify
3. Complete remaining verification page integrations
4. Add form submission handlers with backend communication
5. Implement proper routing between steps after verification

## Blockers

- Pre-existing TypeScript errors in `Home/Home.tsx`, `VerifyOtpPage.tsx`, and `Contact.tsx` prevent clean build
- No API endpoints connected yet - all verification flows use simulated delays

## Notes

- Build compiles successfully in Turbopack, fails only on TypeScript type-checking for pre-existing files
- Logger client-side uses `sendBeacon` for error-level logs (reliable on page unload), `fetch` for others
- Logger server-side writes to both file and console
