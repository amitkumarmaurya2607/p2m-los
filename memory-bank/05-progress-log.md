# 05 - Progress Log

## Session 1 - May 4, 2026

### Completed

1. **Toast System Implementation**
   - Installed `react-hot-toast`
   - Created `src/lib/toast.ts` with `showToast()`, `dismissToast()`, `updateToast()`
   - Configured `ToastProvider` with theme-aware styling
   - Integrated into `Login.tsx` - shows toast on OTP sent and validation errors
   - Integrated into `OTPVerify.tsx` - shows toast on verification success/failure

2. **CSS Variable Theming System**
   - Updated `globals.css` with 40+ CSS variables covering:
     - Primary/secondary colors with variants
     - Surface layers (background, overlay)
     - Text color variants (heading, primary, secondary, muted, label)
     - Input styling (bg, border)
     - Border colors (default, light)
     - Status colors (success, warning, info, destructive)
     - Shadow values (sm, md, lg, button)
     - Component-specific (card, stepper, sidebar)

   - Mapped all variables via Tailwind CSS v4 `@theme inline`
   - Replaced hardcoded colors in 20+ component files:
     - `TextInput.tsx`, `OTPInput.tsx`, `SelectBox.tsx`, `CustomDatePicker.tsx`
     - `GradientButton.tsx`
     - `ToastProvider.tsx`
     - `Login.tsx`, `OTPVerify.tsx`
     - `SideBar.tsx`, `InfoCard.tsx`
     - `StepCard.tsx`, `Header.tsx`, `Stepper.tsx`, `ProgressBar.tsx`
     - `SelfieCapture.tsx`, `PersonalInfo.tsx`, `BankDetails.tsx`, `AadhaarDetails.tsx`
     - `ResendTimer.tsx`
     - `toast.ts`

3. **Memory Bank Initialization**
   - Created all core files (00-05)
   - Documented project architecture, patterns, and technical context

## Session 4 - May 15, 2026

### Completed

1. **Replaced Hardcoded Colors with CSS Variables (~120 occurrences across 9 files)**
   - `TrackApplication.tsx` — replaced `#0F172B` → `text-text-heading`, `#3737C1` → `home-purple`, `#00C89C` → `home-green`, `#90A1B9` → `text-muted-light`, `#62748E` → `text-muted-dark`, `#45556C` → `text-body`, `#CAD5E2` → `text-on-dark-muted`, `#314158` → `text-dark-blue`, `#E2E8F0` → `border-medium`, `#F1F5F9` → `border-light`, `#F8FAFC` → `surface-muted`
   - `ReviewApplication.tsx` — same pattern (20+ occurrences)
   - `LoanCalculator.tsx` — same pattern (15 occurrences)
   - `BankDetails.tsx` — same pattern (11 occurrences)
   - `ApplicationSubmitted.tsx` — same pattern (11 occurrences)
   - `UploadDocuments.tsx` — same pattern (6 occurrences)
   - `StepCard.tsx` — replaced `bg-[#00C89C]` → `bg-home-green`
   - `StepNotes.tsx` — replaced `rgba(55,55,193,0.1)` → `bg-home-purple/10`, `#3737C1` → `home-purple`, `#62748E` → `text-muted-dark`, `#45556C` → `text-body`

2. **Replaced Hardcoded Width Values with CSS Variables**
   - `Community.tsx`: `max-w-[1280px]` → `var(--max-width-section)`
   - `LoanProducts.tsx`: `max-w-[1280px]` → `var(--max-width-section)`, `max-w-[672px]` → `var(--max-width-text)`
   - `FaqSection.tsx`: `max-w-[1280px]` → `var(--max-width-section)`
   - `MoreThanLoans.tsx`: `max-w-[672px]` → `var(--max-width-text)`

3. **Left as-is** (no exact variable match):
   - SideBar.tsx gradient stops (`#6FFFD2`, `#7A7AF5`)
   - Complex SVG gradient colors in StepCard.tsx
   - Logo.tsx branding assets
   - `#1D293D`, `#00A882`, `#2B2B9A`, `#FEF3C6`, `#E17100`, `#FB2C36` — no matching CSS variable

### Build Status

- Lint: PASS (all 98 issues are pre-existing)
- Turbopack compilation: PASS
- TypeScript type-check: FAIL (pre-existing errors, not caused by changes)
  - `src/pages/Home/Home.tsx` - not a module
  - `src/pages/VerifyOtpPage.tsx/VerifyOtpPage.tsx` - directory structure issue

## Session 2 - May 11, 2026

### Completed

1. **Redux Removed → Replaced with React Context API**
   - Created `src/context/AuthContext.tsx` - Auth state with sessionStorage persistence
   - Created `src/context/ApplicationContext.tsx` - Application form state with computed selectors and sessionStorage persistence
   - Updated `src/app/providers.tsx` to use AuthProvider + ApplicationProvider
   - Updated 15 consumer files to use `useAuthContext()` / `useApplicationContext()` hooks
   - Deleted `src/store/`, `src/features/`, `src/components/ReduxProvider.tsx`
   - Uninstalled `@reduxjs/toolkit` and `react-redux` (saved ~2KB bundle size)
   - Build passes (pre-existing Contact.tsx error unchanged)

## Session 4 - May 15, 2026 (Part 2)

### Completed

1. **Added new CSS variables to `globals.css`**
   - Colors: `--home-green-dark: #00A882`, `--home-purple-dark: #2B2B9A`
   - Shadows: `--shadow-card`, `--shadow-dark-card`, `--shadow-btn-soft`, `--shadow-green-glow`, `--shadow-purple-button`
   - Mapped new colors in `@theme inline` block

2. **Replaced hardcoded `--shadow-sm`** (4 occurrences)
   - `FaqSection.tsx`, `Community.tsx`, `EmiDashboard.tsx` (×2)

3. **Replaced hardcoded `--shadow-card`** (6 occurrences)
   - `MoreThanLoans.tsx`, `LoanProducts.tsx`, `StepProcess.tsx`, `QuickEasySection.tsx`, `FinalCTA.tsx`, `LoanCalculator.tsx`

4. **Replaced hardcoded `--shadow-dark-card`** (5 occurrences)
   - `Community.tsx`, `FinalCTA.tsx` (×2), `ReviewApplication.tsx`, `TrackApplication.tsx`

5. **Replaced hardcoded `--shadow-btn-soft`** (4 occurrences)
   - `EmiDashboard.tsx`, `QuickEasySection.tsx`, `WhyChoose.tsx`, `FaqSection.tsx`

6. **Replaced hardcoded `--shadow-green-glow`** (2 occurrences)
   - `ApplicationSubmitted.tsx`, `BankDetails.tsx`

7. **Replaced hardcoded `--shadow-purple-button`** (1 occurrence)
   - `ApplicationSubmitted.tsx`

8. **Replaced hardcoded gradient stops**
   - `to-[#00A882]` → `to-home-green-dark` (3 files: ApplicationSubmitted, BankDetails, ReviewApplication)
   - `to-[#2B2B9A]` → `to-home-purple-dark` (2 files: ApplicationSubmitted, BankDetails)
   - `to-[#1D293D]` → `to-home-border-dark` (3 files: LoanCalculator, ReviewApplication, TrackApplication)

9. **Replaced `card-icon-shadow`** in `LoanProducts.tsx`

10. **Left as-is** (no variable match):
    - Unique hover shadows (e.g., `hover:shadow-[0px_30px_60px_rgba(...)]`)
    - Complex `bg-[linear-gradient(...)]` in StepCard.tsx
    - `sessionStorage.ts` step gradient colors
    - SideBar.tsx gradient starts (`#6FFFD2`, `#7A7AF5`)
    - Instagram brand gradient in Community.tsx

## Session 3 - May 11, 2026

### Completed

1. **Unified Logging System**
   - Added `LogLevel` and `LogEntry` types to `src/types/index.ts`
   - Created `src/lib/logger.ts` — universal logger with:
     - Auto-PII sanitization (masks PAN, Aadhaar, mobile, email)
     - Server path: writes JSON lines to `logs/YYYY-MM-DD.log`
     - Client path: `POST /api/log` via `fetch` or `sendBeacon` (for errors)
     - Console output on server for dev visibility
   - Created `src/app/api/log/route.ts` — receives client logs, writes to same file
   - Created `src/components/GlobalErrorHandler.tsx` — catches `window.onerror` + `unhandledrejection`
   - Updated `src/components/ErrorBoundary.tsx` — uses logger in `componentDidCatch`
   - Updated `src/app/error.tsx` — uses logger instead of `console.error`
   - Updated `src/app/layout.tsx` — includes `GlobalErrorHandler`
   - Created `logs/` directory with `.gitkeep`
   - Updated `.gitignore` to exclude `logs/*.log`
   - Build: passes (only pre-existing Contact.tsx error)

### Remaining Work

1. Fix pre-existing TypeScript errors in Home, VerifyOtpPage, and Contact
2. Connect actual API endpoints for OTP flows
3. Wire up form submissions to backend
4. Implement step-to-step navigation logic
5. Add proper error handling for API failures (use logger when making API calls)
6. Consider renaming `Dashbaord` directory to `Dashboard`
7. Clean up commented-out code

## Session 5 - May 19, 2026

### Completed

1. **Deduplicated Step-Progress URL in Middleware**
   - `src/middleware.ts` — removed inline constant `STEP_PROGRESS_PATH = "/los-service/api/web-proxy/user-progress"` (was hardcoded alongside `API_BASE_URL`); now imports `API` from `@/lib/api/urls` and uses `API.others.stepProgress` in the `fetchStepProgress` call. Path is now defined once (in `src/lib/api/urls.ts:48`).
   - Note: `getStepProgressAction` (Server Action) cannot be called from middleware because it depends on `next/headers` `cookies()` and `next/navigation` `redirect()` (via the shared axios client) and the Server Action runtime, none of which are available in the Edge Runtime. The middleware continues to use a raw `fetch` with the session token from `request.cookies` — the right pattern.
2. **Allow Sub-routes of the Pending Step in Middleware**
   - `src/middleware.ts` — added an `isSubRouteOfPending` check in the `currentStepIndex === -1` branch. If the pathname is the pending step's exact route or a sub-path of it (`/aadhar-details` or `/aadhar-details/processing/abc123` when pending is `/aadhar-details`), the middleware now allows the request through instead of redirecting.
   - Why: the aadhaar flow uses a sub-route `/aadhar-details/processing/[id]` (the DigiLocker callback landing page at `src/app/(dashboard)\aadhar-details\processing\[id]\page.tsx`). The previous code would redirect this to `/aadhar-details`, breaking the verification flow.
   - Sub-routes of *completed* steps (e.g., `/aadhar-details/processing/abc123` when the pending step is `/bank-details`) still redirect to the pending step, so completed-step sub-routes cannot be reached out of order.
3. **Fixed Double Toast on GeoLocation Capture**
   - `src/views/Dashbaord/GeoLocation/GeoLocation.tsx` — `getCurrentLocation()` was being called twice on mount: once from the first `useEffect`'s `.finally()` (after IP geolocation cookie save) and again from the second `useEffect` when `navigator.permissions` reported `"granted"`. Each call invoked `navigator.geolocation.getCurrentPosition`'s success handler, firing the `"Location captured successfully"` toast twice.
   - Fix: removed the duplicate `getCurrentLocation()` call from the first `useEffect`'s `.finally()` (IP cookie save retained). The auto-detect-when-granted path in the second `useEffect` is now the sole entry point on mount; the "Detect My Location" button still calls it manually when permission is `"prompt"`. Also wrapped `getCurrentLocation` in `useCallback([ipLocation])` and added it to the second `useEffect`'s deps to clear a pre-existing `react-hooks/exhaustive-deps` warning.
4. **Created Comprehensive Postman Collection**
   - `postman/p2m-los.postman_collection.json` — 13 folders, 20 endpoints covering every API in `src/lib/api/urls.ts` except the mocked `bank.initiateFetch` and `loan-application.service.ts`. Organized by feature: Auth, PAN, Personal Info, Aadhaar (DigiLocker), Bank, Employment, Documents, Selfie/Media, GeoLocation, Loan, Step Progress, Webhooks, Contact.
   - **Auth flow**: collection-level Bearer `{{accessToken}}`. Test scripts on Send OTP and Verify OTP capture `userId` and `accessToken` from the response — subsequent requests pick up the new token automatically. Collection-level pre-request script decodes the JWT, logs the expiry timestamp, and warns (without blocking) if the token is expired or about to expire.
   - `postman/p2m-los-dev.postman_environment.json` — sample environment pointing at the dev ngrok backend; switch `baseUrl` for staging/prod.
   - Replaces the previous 6-endpoint `p2m-los.postman_collection.json` at the project root.

2. **Loan Application Flow Expanded from 9 to 12 Steps**
   - Updated step definitions in `sessionStorage.ts`
   - Added 5 new data types and setters to `ApplicationContext.tsx`
   - Added new API key mappings for all 12 steps
   - Updated mock data with new step fields

2. **5 New View Components Created**

   | Component | Route | Purpose |
   |-----------|-------|---------|
   | `GeoLocation.tsx` | `/geo-location` | GPS location capture with accuracy |
   | `AccountStatementUpload.tsx` | `/account-statement` | Bank statement file upload |
   | `AddressProofUpload.tsx` | `/address-proof` | Address proof with doc type selector |
   | `AlternateMobile.tsx` | `/alternate-mobile` | Alternate phone + OTP verify |
   | `LoanEligibility.tsx` | `/loan-eligibility` | Combined calc + review + submit |

3. **Navigation Routing Updated**
   - Mobile OTP → Geo Location → PAN → Personal Info → Aadhaar → Bank Details → Account Statement → Employment Details → Selfie → Address Proof → Alternate Mobile → Loan Eligibility

4. **Fixed pre-existing Contact.tsx TypeScript Error**
   - `COMPANY_DETAILS.address` → `COMPANY_DETAILS.officeAddress`

5. **Route Mappings Updated**
   - `HorizontalStepper.tsx` route map
   - `Header.tsx` route step map

### Build Status

- **Turbopack compilation**: ✓ PASS
- **TypeScript type-check**: ✓ PASS (Contact.tsx fixed)
- **ESLint** (`npx eslint src/middleware.ts`): ✓ PASS
- **Pre-existing**: `src/pages/Home/Home.tsx` (not a module), `src/pages/VerifyOtpPage.tsx/VerifyOtpPage.tsx` (directory structure issue) still present

### Known Issues

- No API integration yet - all flows use `setTimeout` simulation
- No file upload endpoints - files stored in memory only
- Directory naming inconsistencies (Dashbaord typo)

## Session 2 - June 4, 2026

### Completed

1. **AlternateMobile.tsx - single Save & Next flow**
   - Removed per-contact save buttons and the C2 grey-out gate. Both contact forms now editable in parallel.
   - New handleSaveAndNext runs submitAlternateMobileAction for C1 then C2, then saveAlternateMobileStepAction, then outer.push("/loan-eligibility"). Bails on first error with toast.
   - All six fields (Name / Mobile / Relation for both contacts) marked equire / equired.

2. **LoanEligibility.tsx - response-driven sliders + simple-interest calculation**
   - Amount slider bound to programs.minAmount (5000) and programs.maxAmount (100000).
   - Tenure slider bound to programs.tenures.minTermDays (7) and programs.tenures.maxTermDays (45); label changed to Tenure (Days).
   - Calculation replaced: interest = P * r * days/365; 	otalPayable = P + interest + processingFee; dailyEmi = total / days. Memoized.
   - Submit payload: loanAmount and 	enureDays come from state; programId = programs.tenures.id; dueDate = 
ow + tenureDays days.
   - Skeleton placeholder renders inside Choose Loan Amount card while programs is loading. Submit button disabled when !programs or !programs.isAllowed.
   - Removed unused Edit3 import and ReviewField component.

### Build Status

- **ESLint** (
px eslint on both files): PASS
- **TypeScript** (
px tsc --noEmit): PASS

