# 02 - Active Context

## Current Date

June 4, 2026

## Current Focus

12-step loan application flow implemented — migrated from 9-step to 12-step sequence with 5 new steps. Build passes cleanly. Latest work: replaced hardcoded colors in `ProfileStatusStep` (`bg-[#3737C1]` → `bg-home-purple`, two `rgba()` halos → new `--shadow-green-ring` / `--shadow-purple-ring` tokens in `globals.css`). Profile folder now uses only project tokens. `npx tsc --noEmit` and `npm run lint` both clean.

## Recent Changes

0. **Profile hardcoded colors replaced with project tokens**
   - `src/app/globals.css` — added two new shadow tokens: `--shadow-green-ring: 0px 0px 0px 4px rgba(0, 200, 156, 0.2)` and `--shadow-purple-ring: 0px 0px 0px 4px rgba(55, 55, 193, 0.2)`. Placed next to the existing `--shadow-green-glow` / `--shadow-purple-button` tokens in the `:root` block.
   - `src/views/Dashbaord/Profile/shared/ProfileStatusStep.tsx` — three class substitutions: `bg-[#3737C1]` → `bg-home-purple`; `shadow-[0px_0px_0px_4px_rgba(0,200,156,0.2)]` → `shadow-[var(--shadow-green-ring)]`; `shadow-[0px_0px_0px_4px_rgba(55,55,193,0.2)]` → `shadow-[var(--shadow-purple-ring)]`. No visual change.
   - `src/views/Dashbaord/Profile/shared/ProfileInfoCard.tsx` — added `rightSlot?: React.ReactNode` to `ProfileInfoCardProps` type and rendered `{rightSlot}` after the title in the header. Required to fix a pre-existing TS error from the previous round (the `VerifiedPill` props in `EmploymentTab` and `BankDetailsTab` referenced a `rightSlot` prop that was never on the type). `h2` made `flex-1` to push the right-slot to the far right.
   - Audit: `grep -E "#[0-9A-Fa-f]{3,6}|rgba?\("` over `src/views/Dashbaord/Profile/**` now returns only **one** match — `Profile.tsx:259` `shadow-[inset_0px_0px_8px_rgba(73,55,156,0.08)]` for the active sidebar button. That's a pre-existing inner shadow from the original file (not introduced by Profile work); left untouched per the narrow-scope request. If it ever needs tokenizing, suggest `--shadow-inner-purple: inset 0px 0px 8px rgba(73, 55, 156, 0.08)`.
   - **Known divergence (out of scope per request)**: `src/views/Dashbaord/TrackApplication/TrackApplicationV2.tsx` lines 39 + 44 still use the same hardcoded `bg-[#3737C1]` and rgba halos that the new `ProfileStatusStep` no longer uses. Visually identical today, but a future cleanup should align them.
1. **Profile page restyled to match project design language**
   - `src/views/Dashbaord/Profile/shared/ProfileField.tsx` — replaced the input-chrome look (border + bg + min-h-11) with a plain label/value pair: small `bg-primary` dot on the left, uppercase tracking-wider label (`text-text-muted-light`), bold value (`text-text-heading`). No border, no background, sits directly on the section card.
   - `src/views/Dashbaord/Profile/shared/ProfileInfoCard.tsx` — slimmed to match the project's `SectionCard` shape (`rounded-2xl border border-border-light bg-surface p-5 space-y-5`); icon chip downsized to `h-9 w-9 rounded-xl`; title now `text-base font-bold`. New `rightSlot?: React.ReactNode` prop for the verified pill.
   - `src/views/Dashbaord/Profile/shared/ProfileStatCard.tsx` — `border-border-light bg-surface`; icon chip `h-8 w-8 rounded-lg`; label `text-xs uppercase tracking-wider text-text-muted`; value `text-xl font-extrabold`.
   - `src/views/Dashbaord/Profile/shared/ProfileStatusStep.tsx` — rewritten to match `TrackApplicationV2` exactly: `h-5 w-5 rounded-full border-4` dot with `shadow-[0px_0px_0px_4px_rgba(...)]` halo, `home-green` / `home-purple` / `border-medium` colors, `w-0.5` vertical line. API changed from `completed?/active?` to a single `state: "done" | "active" | "pending"` prop plus `isLast?: boolean`. Active step now shows a bordered callout with `Shield` icon (same as `TrackApplicationV2`).
   - `src/views/Dashbaord/Profile/shared/ProfileEmptyState.tsx` — `border-light` + `bg-surface-muted`.
   - `src/views/Dashbaord/Profile/shared/VerifiedPill.tsx` — **new** helper. `Verified` (green, `CheckCircle2`) or `Not verified` (gray, `Clock3`); used by `EmploymentTab` and `BankDetailsTab` via the new `rightSlot` prop. The bottom verified banner on those tabs was removed in favor of the pill.
   - `src/views/Dashbaord/Profile/tabs/ProfileTab.tsx` — no JSX changes; uses new `ProfileField`. Field grid switched from `gap-4` to `gap-x-6 gap-y-5` for a more "profile page" feel.
   - `src/views/Dashbaord/Profile/tabs/EmploymentTab.tsx` + `BankDetailsTab.tsx` — pass `<VerifiedPill>` to `rightSlot`; removed the bottom verified banner.
   - `src/views/Dashbaord/Profile/tabs/TrackLoanTab.tsx` — uses the new `state`-driven `ProfileStatusStep`; pass `isLast` on the final pending step.
   - `src/views/Dashbaord/Profile/tabs/ApprovedDocsTab.tsx` — doc rows now `border border-border-light bg-surface-muted`; titles `font-bold`; info banner moved to `border-border-light bg-surface-muted text-text-body`.
   - `src/views/Dashbaord/Profile/tabs/EmiPayTab.tsx` — hero amount-due card now `border border-border-light bg-surface-muted` with uppercase tracking-wider "Amount Due" label. **Pay EMI Now button is now `<GradientButton>`** (teal gradient, h-12) with `rightIcon={<ChevronRight/>}`. EMI table outer `border-border-light`; header row `bg-surface-muted` with uppercase tracking-wider labels.
   - `src/views/Dashbaord/Profile/tabs/LoanCompletionTab.tsx` — hero card now `border border-border-light bg-surface-muted`; hero title `font-bold`.
   - `src/views/Dashbaord/Profile/Profile.tsx` — top header name `font-bold`; sidebar active label `font-bold`; sidebar inactive uses `text-text-heading`; main panel `p-5 lg:p-7` (was `p-3 sm:p-5 lg:p-6`); main header card `border-border-light bg-surface-muted` with `font-bold` title.
1. **Profile.tsx — split into per-tab components + shared helpers**
   - `src/views/Dashbaord/Profile/Profile.tsx` shrunk from 696 lines (~24KB) to ~250 lines (~9KB) by extracting the 7 inline tab renderers and 5 helper components.
   - New `src/views/Dashbaord/Profile/shared/`: `ProfileField`, `ProfileInfoCard`, `ProfileStatCard`, `ProfileStatusStep`, `ProfileEmptyState` (all prefix-`Profile` to avoid collision with the existing `src/components/Cards/InfoCard.tsx`, which has a different shape).
   - New `src/views/Dashbaord/Profile/tabs/`: `ProfileTab`, `EmploymentTab`, `BankDetailsTab`, `TrackLoanTab`, `ApprovedDocsTab`, `EmiPayTab`, `LoanCompletionTab`.
   - `ProfileTab` takes `{ user: UserDetailsType | null }`; `EmploymentTab` takes `{ employment: LoanApplication["employmentDetails"] | undefined }`; `BankDetailsTab` takes `{ bank: LoanApplication["bankDetails"] | undefined }`; the other four tabs take no props and keep their hardcoded demo data internally.
   - The `maskAccount` helper moved from `Profile.tsx` into `BankDetailsTab.tsx` (single use site).
   - `Profile.tsx` now: imports the 5 shared + 7 tab components, keeps the `tabs[]` config + `TabKey` union, the `useState`/`useEffect`/`getDetails`/`fullName` logic, the header + sidebar nav + main panel JSX, and a `switch` in `renderContent()` that returns the right tab component (still shows `<ProfileEmptyState>` while loading).
   - `react-hooks/set-state-in-effect` lint suppression kept in `Profile.tsx` (the only place with the effect).
1. **Profile.tsx — added Employment Details and Bank Details tabs**
   - `src/views/Dashbaord/Profile/Profile.tsx` — added two new tabs (`employment`, `bankDetails`) inserted right after the existing `profile` tab. New `Briefcase` and `Landmark` icons added to the lucide-react import.
   - Both tabs are read-only views backed by `useLoanApp()` (data sourced from `application.employmentDetails` / `application.bankDetails`).
   - Bank account number is masked, showing only the last 4 digits (e.g., `XXXXXX1234`).
   - Each tab ends with a verified / not-verified badge driven by the `verified` flag on the corresponding `LoanApplication` slice.
   - Pre-existing `getDetails`-called-in-effect lint issues fixed by reordering (move `getDetails` declaration above `useEffect`) and adding the `react-hooks/set-state-in-effect` eslint-disable comment to match the same pattern used in `LoanEligibility.tsx` and `AlternateMobile.tsx`.
2. **AlternateMobile.tsx — single Save & Next flow**
   - `src/views/Dashbaord/AlternateMobile/AlternateMobile.tsx` — removed the per-contact "Save Contact 1" / "Save Contact 2" gating and the separate "Continue" button. Both contact forms are now editable in parallel; a single "Save & Next" button validates both, then runs `submitAlternateMobileAction` for C1 → C2 → `saveAlternateMobileStepAction` → `router.push("/loan-eligibility")` sequentially, bailing with a toast on the first error. All six fields (Name / Mobile / Relation × 2) marked `require` / `required`.
2. **LoanEligibility.tsx — response-driven sliders + simple-interest calc**
   - `src/views/Dashbaord/LoanEligibility/LoanEligibility.tsx` — replaced hard-coded bounds (100000–1500000 amount, 12–60 month tenure) with `programs.minAmount` / `programs.maxAmount` and `programs.tenures.minTermDays` / `maxTermDays` (defaults 5000–100000, 7–45 days).
   - Tenure label now "Tenure (Days)".
   - Calculation switched from monthly-EMI to simple interest: `interest = P * r * days/365`, `totalPayable = P + interest + processingFee`, `dailyEmi = total / days`. Wrapped in `useMemo`.
   - Submit payload uses state `loanAmount`, `tenureDays`, and `programs.tenures.id` for `programId`; `dueDate` is now `tenureDays` (not × 30).
   - Header strip and summary grid show "Daily Repayment", "Total Payable", "Interest", "Processing Fee" instead of "Monthly EMI" / "Total Payable".
   - Skeleton/placeholder renders inside the "Choose Loan Amount" card while `programs` is loading; controls hidden until response arrives. Header "You are eligible for up to" shows `₹—` until then.
   - Submit button disabled when `!programs` or `!programs.isAllowed`. Submit handler guards all three conditions with toasts.
   - Removed unused `Edit3` import and `ReviewField` component.

3. **New Postman Collection**
   - `postman/p2m-los.postman_collection.json` — 13 folders / 20 endpoints, all paths from `src/lib/api/urls.ts`. Collection-level Bearer `{{accessToken}}` auth with pre-request JWT expiry check; Send OTP / Verify OTP test scripts update `accessToken` and `userId` automatically. Companion env file `postman/p2m-los-dev.postman_environment.json` for the dev ngrok backend.
2. **Fixed Double Toast on GeoLocation Capture**
   - `src/views/Dashbaord/GeoLocation/GeoLocation.tsx` — removed duplicate `getCurrentLocation()` call (was firing from both the IP-fetch `useEffect` and the permissions `useEffect`); wrapped in `useCallback` and added to deps. Toast now fires once.
2. **Middleware Allows Sub-routes of the Pending Step**
   - `src/middleware.ts` — added `isSubRouteOfPending` check; sub-routes of the pending step (e.g., `/aadhar-details/processing/abc123` when pending is `/aadhar-details`) no longer redirect. Sub-routes of *completed* steps still redirect to the pending step.
2. **Middleware URL Constant Deduplicated**
   - `src/middleware.ts` — removed inline `STEP_PROGRESS_PATH = "/los-service/api/web-proxy/user-progress"`, now imports `API` from `@/lib/api/urls` and uses `API.others.stepProgress`. Same path, single source of truth.
2. **Loan Application Flow Expanded from 9 to 12 Steps**
   - Updated `src/lib/sessionStorage.ts` — reordered steps array to new 12-step sequence with appropriate icons
   - Updated `src/context/ApplicationContext.tsx` — added 5 new data types (`GeoLocationData`, `AccountStatementData`, `AddressProofData`, `AlternateMobileData`, `EligibilityData`), setters, API key mappings, state fields
3. **5 New View Components + Route Pages Created**
   - `GeoLocation` (`/geo-location`) — GPS capture using `navigator.geolocation` with accuracy display
   - `AccountStatementUpload` (`/account-statement`) — bank statement file upload with drag-drop, validation
   - `AddressProofUpload` (`/address-proof`) — document type selector + file upload for address proof
   - `AlternateMobile` (`/alternate-mobile`) — alternate phone number with OTP send/verify (or skip)
   - `LoanEligibility` (`/loan-eligibility`) — combined eligibility calculator + review + submit (replaces old LoanCalculator + ReviewApplication)

4. **Navigation Routing Updated**
   - Mobile OTP verify → `/geo-location` (instead of `/pan-details`)
   - Bank Details → `/account-statement` (instead of `/selfie-capture`)
   - Account Statement → `/employment-details`
   - Employment Details → `/selfie-capture` (instead of `/loan-calculator`)
   - Selfie Capture → `/address-proof` (instead of `/employment-details`)
   - Alternate Mobile → `/loan-eligibility`

5. **Fixed Pre-existing TypeScript Error in Contact.tsx**
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
