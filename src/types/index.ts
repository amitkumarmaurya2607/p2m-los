export interface User {
  id: string;
  name: string;
  email: string;
}

export type LogLevel = "error" | "warn" | "info";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  source: "client" | "server";
  stack?: string;
  context?: Record<string, unknown>;
  url?: string;
}

export interface ApiResponse<T> {
  data?: T;
  success?: boolean;
  msg?: string;
  errorCodeList?: unknown[];
  code: string;
  message?: string;
}

export interface LoanApplication {
  applicationId: string;
  sanction: boolean;
  currentStep: { key: string; id: number | null };
  mobileVerification: {
    status: string;
    mobileNumber: string;
    userId: string;
    completedAt: string | null;
  };
  geoLocation: {
    status: string;
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
    completedAt: string | null;
  };
  panDetails: {
    status: string;
    pan: string;
    fullName: string;
    verified: boolean;
    completedAt: string | null;
  };
  personalInfo: {
    status: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fatherName: string;
    emailId: string;
    dob: string;
    salary: string;
    gender: string;
    state: string;
    city: string;
    address: string;
    pinCode: string;
    completedAt: string | null;
  };
  aadhaarDetails: {
    status: string;
    aadhaar: string;
    verified: boolean;
    completedAt: string | null;
  };
  bankDetails: {
    status: string;
    accountNumber: string;
    ifscCode: string;
    benName: string;
    verified: boolean;
    completedAt: string | null;
  };
  accountStatement: {
    status: string;
    fileName: string;
    uploadedAt: string | null;
    completedAt: string | null;
  };
  selfie: {
    status: string;
    url: string;
    mode: string;
    completedAt: string | null;
  };
  employmentDetails: {
    status: string;
    companyName: string;
    designation: string;
    email: string;
    salaryMode: string;
    joiningDate: string;
    uan: string;
    state: string;
    city: string;
    pincode: string;
    verified: boolean;
    completedAt: string | null;
  };
  addressProof: {
    status: string;
    docType: string;
    fileName: string;
    uploadedAt: string | null;
    completedAt: string | null;
  };
  alternateMobile: {
    status: string;
    name1: string;
    number1: string;
    relation1: string;
    name2: string;
    number2: string;
    relation2: string;
    completedAt: string | null;
  };
  applyLoan: {
    status: string;
    loanAmount: number | null;
    tenure: number | null;
    interestRate: number | null;
    emi: number | null;
    totalPayable: number | null;
    submitted: boolean;
    completedAt: string | null;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
}


export type UserDetailsType = {
  id: string;
  userId: string;

  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  age: number | null;

  fathersName: string | null;
  mothersName: string | null;
  maritalStatus: string | null;
  spouseName: string | null;
  religion: string | null;

  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  residenceType: "OWNED" | "RENTED" | string | null;
  isCommunicationAddress: boolean;

  profilePicUrl: string | null;
  profileVideoUrl: string | null;

  userDataStatus: "VERIFIED" | "NOT_VERIFIED" | "PENDING" | "FAILED" | string;

  filePrivateKey: string | null;
  addressProofType: string | null;

  creditScore: number;

  aAdharName: string | null;
  aAdharDOB: string | null;
  aadhar_fathername: string | null;

  pan_name: string | null;
  pan_fathername: string | null;
  pan_dob: string | null;

  userBlockAlert: string | null;

  geoLatitude: number | null;
  geoLongitude: number | null;
  geolocation_pincode: string | null;

  isFraudulentByCMS: boolean;
  isGoaAndPanMatching: boolean;
  isServicablePinCodesByCMS: boolean;
  aadhaarPanLinkedByPanPlus: boolean;

  linkedAadhaarNumberByPanPlus: string | null;
  linkedAadhaarNumberByDigiLocker: string | null;

  aadhaar_digilocker_gz_key: string | null;
  aadhaar_digilocker_pdf_key: string | null;
  aadhaar_digilocker_photo_key: string | null;
  aadhaar_digilocker_xml_key: string | null;

  pan_details_gz_key: string | null;
  profile_photo_key: string | null;
  profile_video_key: string | null;

  face_match_score: number | null;

  createdAt: string;
  updatedAt: string;
};