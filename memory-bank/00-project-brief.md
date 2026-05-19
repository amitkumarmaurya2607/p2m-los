# 00 - Project Brief

## Project Name

P2M LOS (Loan Origination System)

## Description

A digital loan origination platform for FinSetu that enables users to complete a multi-step verification and application process entirely online. The system guides users through identity verification (PAN, Aadhaar), personal information collection, bank account verification, and selfie capture.

## Core Requirements

### Authentication

- Mobile number or email-based OTP authentication
- OTP verification with resend capability
- Session management

### Multi-Step Onboarding Flow

1. **Mobile/Email Verification** - OTP-based identity confirmation
2. **Geo Location** - GPS location capture and verification
3. **PAN Verification** - PAN card details capture and validation
4. **Personal Information** - Full name, DOB, gender, employment, salary, address
5. **Aadhaar Verification** - 12-digit Aadhaar with OTP verification
6. **Bank Details** - Account number, IFSC, account type with verification
7. **Account Statement Upload** - Bank statement file upload (PDF/JPG/PNG)
8. **Employment Details** - Company, designation, salary, experience
9. **Selfie / Video Verification** - Photo or video verification via webcam
10. **Local Address Proof Upload** - Address proof document upload
11. **Alternate Mobile Number** - Secondary contact number with OTP verification
12. **Loan Eligibility & Application** - Eligibility display, plan configuration, review, and submit

### Dashboard

- Step-by-step progress tracking via stepper component
- Auto-save functionality
- Form validation with real-time error feedback
- Responsive design for mobile and desktop

### Design System

- Primary color: `#3737C1` (Blue-Purple)
- Secondary color: `#00C89C` (Teal-Green)
- All colors managed via CSS custom properties
- Dark mode support
- Consistent input, button, and card components

## Constraints

- Must be fully digital with no paper-based processes
- All form data validated before submission
- Responsive across all screen sizes
- Accessible and performant

## Success Metrics

- Users complete onboarding in under 5 minutes
- Zero validation errors reach the server
- Consistent design across all pages and components
