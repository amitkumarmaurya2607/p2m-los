# 02 - Active Context

## Current Date

May 19, 2026

## Current Focus

12-step loan application flow implemented — migrated from 9-step to 12-step sequence with 5 new steps. Build now passes cleanly (pre-existing Contact.tsx TS error also fixed).

## Recent Changes

1. **Loan Application Flow Expanded from 9 to 12 Steps**
   - Updated `src/lib/sessionStorage.ts` — reordered steps array to new 12-step sequence with appropriate icons
   - Updated `src/context/ApplicationContext.tsx` — added 5 new data types (`GeoLocationData`, `AccountStatementData`, `AddressProofData`, `AlternateMobileData`, `EligibilityData`), setters, API key mappings, state fields
2. **5 New View Components + Route Pages Created**
   - `GeoLocation` (`/geo-location`) — GPS capture using `navigator.geolocation` with accuracy display
   - `AccountStatementUpload` (`/account-statement`) — bank statement file upload with drag-drop, validation
   - `AddressProofUpload` (`/address-proof`) — document type selector + file upload for address proof
   - `AlternateMobile` (`/alternate-mobile`) — alternate phone number with OTP send/verify (or skip)
   - `LoanEligibility` (`/loan-eligibility`) — combined eligibility calculator + review + submit (replaces old LoanCalculator + ReviewApplication)

3. **Navigation Routing Updated**
   - Mobile OTP verify → `/geo-location` (instead of `/pan-details`)
   - Bank Details → `/account-statement` (instead of `/selfie-capture`)
   - Account Statement → `/employment-details`
   - Employment Details → `/selfie-capture` (instead of `/loan-calculator`)
   - Selfie Capture → `/address-proof` (instead of `/employment-details`)
   - Alternate Mobile → `/loan-eligibility`

4. **Fixed Pre-existing TypeScript Error in Contact.tsx**
   - `COMPANY_DETAILS.address` → `COMPANY_DETAILS.officeAddress`

## Active Decisions

- Step 2 (Geo Location): auto-detects on user click, shows coordinates + accuracy, allows recapture
- Step 7 (Account Statement): standalone bank statement upload (adapted from older UploadDocuments component)
- Step 12 (Loan Eligibility & Application): combined single-page with eligibility display, amount/tenure sliders, EMI calculation, information review, T&C checkbox, and submit button
- Old `LoanCalculator.tsx` and `ReviewApplication.tsx` kept for backward compatibility (no longer routed from stepper)
- `setLoanCalculatorData`/`setReviewData` kept as deprecated backward-compatible setters in context
- Horizontal stepper defaults to v2 (dots with tooltips) for 12-step flow via existing StepCard usage

## Next Steps

1. Wire up actual API endpoints for OTP send/verify
2. Add server actions for new steps (GeoLocation, AccountStatement, AddressProof, AlternateMobile, LoanEligibility)
3. Add file upload endpoints for account statement and address proof
4. Connect loan eligibility calculation to backend (instead of hardcoded max)

## Active Decisions

## Blockers

- No API endpoints connected yet — calls will fail until backend is reachable
- File upload components don't POST to a server — files stored in state only

## New Additions

- **`src/lib/crypto.ts`** — AES-256-GCM encryption/decryption utility using Web Crypto API. Works on both client (browser) and server (Node.js v22+). Derives key via SHA-256 from `ENCRYPTION_KEY` env var. Exports `encrypt(plaintext)` and `decrypt(ciphertext)` — both async. Combined output format: `base64(iv + authTag + ciphertext)`.
- **`src/lib/secure-action.ts`** — Client-side (`callSecure`, `callSecureFormData`) and server-side (`withDecryption`) helpers for transparent payload encryption. Toggled via `NEXT_PUBLIC_ENCRYPTION_ENABLED` (client) and `ENCRYPTION_ENABLED` (server) env vars. Disabled by default — when off, all wrappers are zero-overhead pass-throughs.
  - JSON payloads: `callSecure(action, payload)` → encrypt → `{ __encrypted: true, data: "<base64>" }`
  - FormData payloads: `callSecureFormData(action, formData)` → reads files as base64 → encrypt → reconstructs FormData on server
- **All 9 server action files** wrapped with `withDecryption` — `auth.action.ts`, `verification.action.ts`, `personal-info.action.ts`, `document.action.ts`, `selfie.action.ts`, `apply.action.ts`, `contact.action.ts`
- **All 14 component call sites** updated to use `callSecure`/`callSecureFormData`

## Notes

- Build passes: **Turbopack compilation** ✓, **TypeScript type-check** ✓
- 5 new routes: `/geo-location`, `/account-statement`, `/address-proof`, `/alternate-mobile`, `/loan-eligibility`
- Old routes `/loan-calculator` and `/review` still exist for backward compatibility
- Fixed pre-existing Contact.tsx TS error (property name mismatch)
