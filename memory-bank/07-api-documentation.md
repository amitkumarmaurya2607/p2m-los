# 07 - API Documentation

All backend endpoints used by the P2M LOS frontend, derived from `src/lib/api/urls.ts`.

Base URL is configured via `process.env.API_BASE_URL` (defaults to `http://localhost:8080/api`). All requests go through the shared axios client in `src/lib/axios.ts`, which automatically attaches:
- `Authorization: Bearer <sessionToken>` from `getSession()`
- `LATITUDE` / `LONGITUDE` / `CITY` / `COUNTRY` / `REGION` headers from `p2m-*` cookies
- API request/response logging via `src/lib/api-logger.ts`
- Automatic 401 redirect to `/apply-now?type=exp`

## Auth

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `auth.sendOTP` | POST | `/los-service/api/web-proxy/send-otp` | Sends OTP to mobile/email |
| `auth.verifyOTP` | POST | `/los-service/api/web-proxy/verify-otp` | Verifies OTP, returns access token |

## PAN

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `pan.verify` | POST | `/los-service/api/web-proxy/pan/verify` | Verifies PAN and returns holder details |

## Personal Info

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `personalInfo.getDetails` | GET | `/los-service/api/web-proxy/user-profile` | Fetches user profile data |
| `personalInfo.submit` | POST | `/los-service/api/web-proxy/personal-detail` | Submits personal information |

## Aadhaar

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `aadhaar.digiLocker` | POST | `/los-service/api/web-proxy/aadhar/generate` | Initiates DigiLocker Aadhaar fetch |
| `aadhaar.verifyCallback` | POST | `/los-service/api/web-proxy/aadhar/verify-callback` | DigiLocker callback |
| `aadhaar.status` | GET | `/los-service/api/web-proxy/aadhar/status` | Aadhaar verification status |

## Bank

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `bank.verify` | POST | `/los-service/api/web-proxy/bank/verify` | Penny-drop / bank account verification |
| `bank.uploadStatement` | POST | `/los-service/api/web-proxy/bank/statement` | Upload bank statement file |
| `bank.initiateFetch` | GET | `/los-service/api/kyc/statement/initiate` | Initiate account aggregator fetch |

## Employment

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `employment.submit` | POST | `/los-service/api/kyc/upsertEmployment` | Upserts employment details |

## Address Proof

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `addressProof.upload` | POST | `/los-service/api/kyc/upload/localAddProof` | Upload local address proof document |

## Alternate Mobile

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `alternateMobile.update` | POST | `/los-service/api/kyc/update/alternateMobNum` | Update alternate mobile numbers |

## Application / Loan

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `application.submit` | POST | `/los-service/api/web-proxy/apply-loan` | Submits loan application |
| `loan.program` | GET | `/los-service/api/web-proxy/program` | Fetches loan program rules (used by LoanEligibility) |
| `loan.credibility` | GET | `/los-service/api/web-proxy/loans-credibility` | Fetches loans credibility data (used by Profile → Loan Application tab) |

## Contact

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `contact.submit` | POST | `/contact/submit` | Submits contact form |

## Selfie

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `selfie.upload` | POST | `/los-service/api/web-proxy/media/upload` | Uploads selfie/video file |

## Others

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `others.stepProgress` | GET | `/los-service/api/web-proxy/user-progress` | Fetches user step progress (used by middleware) |
| `others.geoLocation` | POST | `/los-service/api/web-proxy/geo-location` | Submits geolocation data |
| `others.userProfile` | GET | `/los-service/api/web-proxy/user-profile` | Fetches user profile (mirrors `personalInfo.getDetails`) |

## Webhook

| Key | Method | Path | Notes |
| --- | --- | --- | --- |
| `webhook.digiLocker` | POST | `/los-service/api/webhook/digiLocker` | Server-side DigiLocker webhook |

## Encryption

Payloads sent to endpoints wrapped with `withDecryption` (server) / `callSecure` (client) from `src/lib/secure-action.ts` are AES-256-GCM encrypted when `NEXT_PUBLIC_ENCRYPTION_ENABLED` (client) and `ENCRYPTION_ENABLED` (server) are `"true"`. When disabled, all wrappers are zero-overhead pass-throughs.

Current actions wrapped with `withDecryption`:
- `auth.action.ts`
- `verification.action.ts`
- `personal-info.action.ts` (`submitPersonalInfoAction`)
- `document.action.ts`
- `selfie.action.ts`
- `apply.action.ts` (`submitApplicationAction`)
- `contact.action.ts`

Unencrypted actions (plain JSON):
- `apply.action.ts` — `getLoanProgramsAction`, `getLoansCredibilityAction`
- `other.action.ts` — `getProfileDataAction`
- `personal-info.action.ts` — `getPersonalInfoAction`
- `statement.action.ts` — `fetchStatementUrlAction`
- `logout.action.ts`

## Recently Added

- **`loan.credibility`** (`/los-service/api/web-proxy/loans-credibility`) — added June 5, 2026. New `getLoansCredibility()` service in `src/lib/services/apply.service.ts` (response typed as `LoansCredibilityData = Record<string, unknown>` until real shape is known). New `getLoansCredibilityAction()` server action in `src/lib/actions/apply.action.ts`. Consumed by the `LoanApplication` tab in the Profile page (`src/views/Dashbaord/Profile/tabs/LoanApplication.tsx`), which renders the raw JSON in a styled `<pre>` code block.
