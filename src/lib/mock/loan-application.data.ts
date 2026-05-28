import type { LoanApplication } from "@/types";

export const blankLoanApplication: LoanApplication = {
  applicationId: "",
  sanction: false,
  currentStep: { key: "", id: null },

  mobileVerification: {
    status: "pending",
    mobileNumber: "",
    userId: "",
    completedAt: null,
  },

  geoLocation: {
    status: "pending",
    latitude: null,
    longitude: null,
    accuracy: null,
    completedAt: null,
  },

  panDetails: {
    status: "pending",
    pan: "",
    fullName: "",
    verified: false,
    completedAt: null,
  },

  personalInfo: {
    status: "pending",
    firstName: "",
    middleName: "",
    lastName: "",
    fatherName: "",
    emailId: "",
    dob: "",
    salary: "",
    gender: "",
    state: "",
    city: "",
    address: "",
    pinCode: "",
    completedAt: null,
  },

  aadhaarDetails: {
    status: "pending",
    aadhaar: "",
    verified: false,
    completedAt: null,
  },

  bankDetails: {
    status: "pending",
    accountNumber: "",
    ifscCode: "",
    benName: "",
    verified: false,
    completedAt: null,
  },

  accountStatement: {
    status: "pending",
    fileName: "",
    uploadedAt: null,
    completedAt: null,
  },

  selfie: {
    status: "pending",
    url: "",
    mode: "",
    completedAt: null,
  },

  employmentDetails: {
    status: "pending",
    companyName: "",
    designation: "",
    email: "",
    salaryMode: "",
    joiningDate: "",
    uan: "",
    state: "",
    city: "",
    pincode: "",
    verified: false,
    completedAt: null,
  },

  addressProof: {
    status: "pending",
    docType: "",
    fileName: "",
    uploadedAt: null,
    completedAt: null,
  },

  alternateMobile: {
    status: "pending",
    name1: "",
    number1: "",
    relation1: "",
    name2: "",
    number2: "",
    relation2: "",
    completedAt: null,
  },

  applyLoan: {
    status: "pending",
    loanAmount: null,
    tenure: null,
    interestRate: null,
    emi: null,
    totalPayable: null,
    submitted: false,
    completedAt: null,
  },
};

export async function getMockLoanApplication(): Promise<LoanApplication> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return { ...blankLoanApplication };
}
