# 03 - System Patterns

## Architecture Overview

### App Router + Pages Router Hybrid

- **App Router** (`src/app/`) - Used for layout, providers, and public pages
  - `(auth)` route group - Authentication pages
  - `(dashboard)` route group - Dashboard pages
  - `(public)` route group - Landing page
- **Pages Router** (`src/pages/`) - Used for individual page components
  - `Dashbaord/` - Verification step pages (note: directory name has typo)
  - `Auth/` - Authentication page components

### Component Organization

```
src/
  components/
    ui/           - Reusable UI primitives (TextInput, Button, SelectBox, etc.)
    Cards/        - Card components (InfoCard)
    OTPInput/     - OTP input component
    ToastProvider/ - Toast notification wrapper
    ResendTimer/  - Countdown timer for resend
    Loading/      - Loading spinner

  pages/
    Auth/         - Login, OTPVerify, SideBar
    Dashbaord/    - Verification step pages
      Profile/
        Profile.tsx          - Shell: header, sidebar nav, tab switch, data fetch
        shared/             - Reusable helpers scoped to the Profile view
          ProfileField.tsx
          ProfileInfoCard.tsx
          ProfileStatCard.tsx
          ProfileStatusStep.tsx
          ProfileEmptyState.tsx
        tabs/               - One component per tab
          ProfileTab.tsx           ({ user: UserDetailsType | null })
          EmploymentTab.tsx        ({ employment: LoanApplication["employmentDetails"] | undefined })
          BankDetailsTab.tsx       ({ bank: LoanApplication["bankDetails"] | undefined })
          TrackLoanTab.tsx         (no props, demo data)
          ApprovedDocsTab.tsx      (no props, demo data)
          EmiPayTab.tsx            (no props, demo data)
          LoanCompletionTab.tsx    (no props, demo data)
  lib/            - Utilities, toast helper
  hooks/          - Custom hooks (useCountdownTimer)
  store/          - Redux store configuration
  types/          - TypeScript type definitions
```

### Profile Tab Component Pattern

The Profile view is split so each tab is a self-contained presentational file:
- `Profile.tsx` owns the `TabKey` union, `tabs[]` config, all `useState`/`useEffect`, the `getDetails()` server-action call, the `fullName` memo, and the JSX shell (header card + sidebar nav + main panel).
- A `switch` in `renderContent()` returns the right tab component, falling back to `<ProfileEmptyState>` while `loading` is true.
- Tabs that read real data take typed props (`UserDetailsType`, `LoanApplication["employmentDetails"]`, `LoanApplication["bankDetails"]`).
- Tabs that only show hardcoded demo data take no props — easy to wire to real data later by adding props.
- Shared helpers in `Profile/shared/` are prefixed with `Profile` (e.g. `ProfileInfoCard`) to avoid colliding with the existing `src/components/Cards/InfoCard.tsx`, which has a different compact layout (title/description/icon vs section title/children/icon).
- The `maskAccount` helper used by `BankDetailsTab` lives inside that tab file (single call site).

### Profile Design Language (read-only data display)

The Profile page is read-only, so it deliberately avoids any input chrome. Convention:
- **Field** — `ProfileField` renders a label/value pair with a small `bg-primary` dot on the left. Label is `text-[11px] font-semibold uppercase tracking-wider text-text-muted-light`, value is `text-sm sm:text-base font-bold text-text-heading`. No border, no background. Matches the `LoanEligibility` review pattern, not the `TextInput` pattern.
- **Section card** — `ProfileInfoCard` uses the project's `SectionCard` shape: `rounded-2xl border border-border-light bg-surface p-5 space-y-5`, icon chip `h-9 w-9 rounded-xl bg-primary-muted text-primary`, title `text-base font-bold text-text-heading`. Supports an optional `rightSlot` for badges/pills.
- **Verified pill** — `VerifiedPill` is the standard way to show a `verified` boolean. Green (`border-home-green/20 bg-primary-muted text-primary` + `CheckCircle2`) when true, gray (`border-border-light bg-muted text-text-muted` + `Clock3`) when false. Always passed via the `ProfileInfoCard` `rightSlot` prop, not as a bottom banner.
- **Stat tile** — `ProfileStatCard` uses `border-border-light bg-surface`, icon chip `h-8 w-8 rounded-lg bg-primary-muted`, label `text-xs uppercase tracking-wider text-text-muted`, value `text-xl font-extrabold text-text-heading`.
- **Status timeline** — `ProfileStatusStep` matches `TrackApplicationV2` exactly: `h-5 w-5 rounded-full border-4` dot with a 4px halo (`shadow-[0px_0px_0px_4px_rgba(...)]`), `home-green` / `home-purple` / `border-medium` colors, `w-0.5` vertical line. The active step shows a bordered callout with a `Shield` icon. API is `state: "done" | "active" | "pending"` plus `isLast?: boolean`.
- **Primary CTA** — Use `<GradientButton>` (from `@/components/ui/GradientButton`) for any primary action, e.g. Pay EMI. Hand-rolled `bg-primary` buttons are not used inside tabs.
- **Soft banners** — Info / not-verified banners use `border border-border-light bg-surface-muted text-text-body` (the project-wide soft-card pattern).
- **Shell** — Top header name `font-bold`; sidebar active label `font-bold`; sidebar inactive `text-text-heading`; main panel `p-5 lg:p-7`; main header card `border-border-light bg-surface-muted` with `font-bold` title.

## Design Patterns

### Form Pattern

All form pages follow a consistent structure:

1. Local state for form values and errors
2. `handleChange` function that updates state and clears errors
3. `validate` function that returns error object
4. `handleSubmit` that validates, then submits (currently simulated)
5. `GradientButton` for submit action
6. `TextInput`/`SelectBox`/`CustomDatePicker` for fields

### Step Card Pattern

Dashboard steps use `StepCard` wrapper which provides:

- Consistent card styling with shadows and borders
- Optional back button
- Icon display area
- Title and subtitle
- Content area for form

### Stepper Pattern

`StepperAlt` component manages step states:

- `complete` - Green checkmark
- `progress` - Primary color highlight with indicator dot
- `pending` - Grayed out

### Toast Pattern

Centralized `showToast()` method in `src/lib/toast.ts`:

```ts
showToast({ message, type, position, duration, icon, style, className, onClose });
```

- Types: success, error, warning, info, loading, custom
- Default position: top-right
- Default duration: 3000ms

### Logging Pattern

Centralized logger in `src/lib/logger.ts` — works on both client and server:

```ts
logError("Failed to submit form", { step: "pan", errorCode: 500 });
logWarn("Rate limit approaching", { attempts: 4 });
logInfo("User started application", { step: "mobile" });
```

**Unified storage**: All logs (client + server) end up in `logs/YYYY-MM-DD.log` as JSON lines.

**Client flow**: `logger.ts` → `POST /api/log` → `route.ts` → writes to file
**Server flow**: `logger.ts` → writes to file directly

**Global error handlers**:
- `GlobalErrorHandler` — catches `window.onerror` + `unhandledrejection` on client
- `ErrorBoundary` — catches React render errors via `componentDidCatch`
- `app/error.tsx` — catches Next.js App Router errors

### Theme Pattern

- All CSS variables defined in `:root` with Tailwind CSS v4 `@theme inline` mapping

## Data Flow

```
User Input → Form Component → validate() → if valid → API call → redirect
                                         → if invalid → setErrors() → display
```

## State Management

- **Local state** - Form data and UI state via `useState`
- **Auth Context** (`AuthContext`) - Login state and user info, persisted to sessionStorage
- **Application Context** (`ApplicationContext`) - All application form data with derived selectors (completedSteps, stepStatuses, progressPercentage, currentStep), persisted to sessionStorage
- **Theme Context** (`ThemeContext`) - Dark/light mode with localStorage persistence

## CSS Variable Naming Convention

- `--primary*` - Primary brand color and variants
- `--secondary*` - Secondary brand color and variants
- `--surface*` - Background layers
- `--text-*` - Text color variants
- `--input-*` - Form input styling
- `--border*` - Border colors
- `--stepper-*` - Stepper component colors
- `--card-*` - Card component colors
- `--shadow-*` - Box shadow values
