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
    theme/        - Theme provider and toggle
  pages/
    Auth/         - Login, OTPVerify, SideBar
    Dashbaord/    - Verification step pages
  lib/            - Utilities, toast helper
  hooks/          - Custom hooks (useCountdownTimer)
  store/          - Redux store configuration
  types/          - TypeScript type definitions
```

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

- CSS variables defined in `:root` with `.dark` overrides
- Tailwind CSS v4 `@theme inline` maps variables to Tailwind utilities
- Theme toggle via `ThemeProvider` context
- Variables stored in `localStorage` for persistence

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
