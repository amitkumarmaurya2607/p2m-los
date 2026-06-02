const losService = "/los-service";
export const API = {
  auth: {
    sendOTP: `${losService}/api/web-proxy/send-otp`,
    verifyOTP: `${losService}/api/web-proxy/verify-otp`,
    
  },
  pan: {
    verify: `${losService}/api/web-proxy/pan/verify`,
  },
  personalInfo: {
    getDetails: `${losService}/api/web-proxy/user-profile`,
    submit: `${losService}/api/web-proxy/personal-detail`,
  },
  aadhaar: {
    sendOTP: "/aadhaar/send-otp",
    verifyOTP: "/aadhaar/verify-otp",
    digiLocker: `${losService}/api/web-proxy/aadhar/generate`,
    verifyCallback: `${losService}/api/web-proxy/aadhar/verify-callback`,
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
  loan: {
    program: `${losService}/api/loan/program`,
  },
  others: {
    stepProgress: `${losService}/api/web-proxy/user-progress`,
    geoLocation: `${losService}/api/web-proxy/geo-location`,
    userProfile: `${losService}/api/web-proxy/user-profile`,
    save: "/application/progress",
    get: "/application/progress",
  
  },
} as const;
