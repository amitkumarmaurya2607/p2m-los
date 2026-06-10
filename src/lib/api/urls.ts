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
    digiLocker: `${losService}/api/web-proxy/aadhar/generate`,
    verifyCallback: `${losService}/api/web-proxy/aadhar/verify-callback`,
    status: `${losService}/api/web-proxy/aadhar/status`,
  },
  bank: {
    verify: `${losService}/api/web-proxy/bank/verify`,
    uploadStatement: `${losService}/api/web-proxy/bank/statement`,
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
    submit: `${losService}/api/web-proxy/apply-loan`,
  },
  contact: {
    submit: "/contact/submit",
  },

  selfie: {
    upload: `${losService}/api/web-proxy/media/upload`,
  },
 
  loan: {
    program: `${losService}/api/web-proxy/program`,
    credibility: `${losService}/api/web-proxy/loans-credibility`,
    getLoan: `${losService}/api/web-proxy/get-loans`,
    getLoanDetails: `${losService}/api/web-proxy/get-loan-details`,
    currentRepayment: `${losService}/api/web-proxy/current-repayment`,
    employment: `${losService}/api/web-proxy/employment`,
    documentByuser: `${losService}/api/web-proxy/documents/by-user`,
    initPayment: `${losService}/api/web-proxy/payment/create`,
  },
  others: {
    stepProgress: `${losService}/api/web-proxy/user-progress`,
    geoLocation: `${losService}/api/web-proxy/geo-location`,
    userProfile: `${losService}/api/web-proxy/user-profile`,
  },
  webhook: {
    digiLocker: `${losService}/api/webhook/digiLocker`,
  },
} as const;
