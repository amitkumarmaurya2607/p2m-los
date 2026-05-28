
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
    submit: `${losService}/api/kyc/upsertEmployment`,
  },
  addressProof: {
    upload: `${losService}/api/kyc/upload/localAddProof`,
  },
  alternateMobile: {
    update: `${losService}/api/kyc/update/alternateMobNum`,
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

  selfie: {
    upload: `${losService}/api/kyc/upload/media`,
  },
  lookup: {
    schemes: "/lookup/schemes",
  },
  progress: {
    save: "/application/progress",
    get: "/application/progress",
  },
} as const;
