# 04 - Tech Context

## Technologies

### Core
- **Next.js** 16.2.4 - React framework with App Router and Pages Router
- **React** 19.2.4 - UI library
- **TypeScript** 5.x - Type safety
- **Turbopack** - Next.js 16 bundler (default)

### Styling
- **Tailwind CSS** v4 - Utility-first CSS framework
- **PostCSS** - CSS processing
- **CSS Custom Properties** - Theme variables with dark mode

### State Management
- **Redux Toolkit** 2.11.2 - Global state management
- **React Redux** 9.2.0 - React bindings for Redux

### UI Libraries
- **lucide-react** 1.8.0 - Icon library
- **react-select** 5.10.2 - Advanced select dropdowns
- **react-datepicker** 9.1.0 - Date picker component
- **react-hot-toast** 2.6.0 - Toast notifications
- **clsx** 2.1.1 - Conditional className utility
- **tailwind-merge** 3.5.0 - Merge Tailwind classes
- **tailwindcss-animate** 1.0.7 - Animation utilities

### Development
- **ESLint** 9.x - Linting
- **eslint-config-next** 16.2.4 - Next.js ESLint rules

## Development Setup

### Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment
- Windows (win32)
- Node.js with npm
- Working directory: `D:\loan\p2m-los`

## Project Structure
```
p2m-los/
  src/
    app/                    # Next.js App Router
      (auth)/              # Auth route group
      (dashboard)/         # Dashboard route group
      (public)/            # Public route group
      layout.tsx           # Root layout
      providers.tsx        # App providers wrapper
      globals.css          # Global styles + CSS variables
    components/
      ui/                  # Reusable UI components
      Cards/               # Card components
      OTPInput/            # OTP input
      ToastProvider/       # Toast wrapper
      ResendTimer/         # Resend countdown
      theme/               # Theme context
    pages/
      Auth/                # Auth page components
      Dashbaord/           # Dashboard page components (typo in dir name)
    lib/                   # Utilities
      utils.ts             # Helper functions (cn, validations)
      toast.ts             # Toast helper
    hooks/                 # Custom hooks
    store/                 # Redux store
    types/                 # TypeScript types
  memory-bank/             # Project documentation
  .claude-code/            # AI assistant config
```

## Technical Constraints
- Tailwind CSS v4 uses `@theme inline` instead of `tailwind.config.js`
- Next.js 16 has breaking changes from v14/v15 - APIs and file structure differ
- Hybrid App Router + Pages Router requires careful import patterns
- Windows environment means PowerShell commands, not bash

## Build Status
- **Turbopack compilation**: Passes
- **TypeScript type-check**: Fails due to pre-existing errors in:
  - `src/pages/Home/Home.tsx` - Not a module (empty export)
  - `src/pages/VerifyOtpPage.tsx/VerifyOtpPage.tsx` - Directory structure issue

## Known Technical Debt
1. Directory name typo: `Dashbaord` instead of `Dashboard`
2. `VerifyOtpPage.tsx` is a directory containing `VerifyOtpPage.tsx` (invalid for Pages Router)
3. `Home/Home.tsx` has no proper export
4. Redux configured but only has counter slice (unused)
5. Many commented-out code blocks across files
