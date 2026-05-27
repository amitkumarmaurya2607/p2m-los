
const losService = '/los-service';
export const API = {
  auth: {
    sendOTP: `${losService}/api/mobile/genOtp`,
    verifyOTP: `${losService}/api/mobile/verify`,
  },
  pan: {
    verify: `${losService}/api/kyc/pan/verify`,
  },
    personalInfo: {
    submit: `${losService}/api/kyc/update/personalDetail`,
  },
  aadhaar: {
    sendOTP: "/aadhaar/send-otp",
    verifyOTP: "/aadhaar/verify-otp",
    digiLocker: `${losService}/api/kyc/digiLocker`,
  },
  bank: {
    verify: `${losService}/api/kyc/bank/verify`,
    uploadStatement: `${losService}/api/kyc/upload/statement`,
    initiateFetch: `${losService}/api/kyc/statement/initiate`,
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

  lookup: {
    schemes: "/lookup/schemes",
  },
  progress: {
    save: "/application/progress",
    get: "/application/progress",
  },
} as const;
