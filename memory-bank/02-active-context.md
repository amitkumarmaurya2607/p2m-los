# 02 - Active Context

## Current Date

May 4, 2026

## Current Focus

Foundation phase - Core UI components, theming system, and authentication flow are being established.

## Recent Changes

1. **Toast System** - Implemented `react-hot-toast` with centralized `showToast()` method in `src/lib/toast.ts`
   - Supports: success, error, warning, info, loading, custom types
   - Configurable: position, duration, icon, style, className, onClose callback
   - Integrated into Login and OTP verification flows

2. **CSS Variables / Theming** - Replaced ALL hardcoded colors with CSS custom properties
   - Updated `globals.css` with 40+ CSS variables
   - Full dark mode support with corresponding dark variables
   - Updated 20+ component files to use theme variables
   - Tailwind CSS v4 `@theme inline` directive maps all variables

3. **Component Updates** - All UI components now use CSS variables:
   - `TextInput`, `OTPInput`, `SelectBox`, `CustomDatePicker` - form inputs
   - `GradientButton` - primary CTA with secondary gradient
   - `ToastProvider` - toast notifications with theme colors
   - `Login`, `OTPVerify` - authentication pages
   - `SideBar`, `InfoCard` - auth sidebar
   - `StepCard`, `Header`, `Stepper`, `ProgressBar` - dashboard components
   - `SelfieCapture`, `PersonalInfo`, `BankDetails`, `AadhaarDetails` - verification pages
   - `ResendTimer` - OTP resend with timer

## Active Decisions

- CSS variables used instead of Tailwind hardcoded colors for maintainability
- `react-hot-toast` chosen over custom toast for reliability and bundle size
- Tailwind CSS v4 native approach (no tailwind.config.js)

## Next Steps

1. Fix pre-existing TypeScript errors in `src/pages/Home/Home.tsx` and `src/pages/VerifyOtpPage.tsx/VerifyOtpPage.tsx`
2. Wire up actual API endpoints for OTP send/verify
3. Complete remaining verification page integrations
4. Add form submission handlers with backend communication
5. Implement proper routing between steps after verification

## Blockers

- Pre-existing TypeScript errors in `Home/Home.tsx` and `VerifyOtpPage.tsx` directory structure prevent clean build
- No API endpoints connected yet - all verification flows use simulated delays

## Notes

- Build compiles successfully in Turbopack, fails only on TypeScript type-checking for pre-existing files
- All new code follows CSS variable patterns
