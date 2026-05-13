export const API = {
  auth: {
    sendOTP: "/auth/send-otp",
    verifyOTP: "/auth/verify-otp",
  },
  pan: {
    verify: "/pan/verify",
  },
  aadhaar: {
    sendOTP: "/aadhaar/send-otp",
    verifyOTP: "/aadhaar/verify-otp",
  },
  bank: {
    verify: "/bank/verify",
  },
  employment: {
    submit: "/employment/submit",
  },
  application: {
    submit: "/application/submit",
    status: (id: string) => `/application/${id}/status`,
  },
  contact: {
    submit: "/contact/submit",
  },
  email: {
    sendOTP: "/email/send-otp",
  },
  personalInfo: {
    submit: "/personal-info/submit",
  },
  lookup: {
    schemes: "/lookup/schemes",
  },
} as const;
