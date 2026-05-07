import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { steps, type StepStatus } from "@/lib/sessionStorage";

type MobileData = { number: string; verified: boolean };
type PanData = { number: string };
type PersonalInfoData = {
  fullName: string;
  fatherName: string;
  email: string;
  dob: string;
  gender: string;
  salary: string;
  employmentType: string;
  address1: string;
  address2: string;
  pincode: string;
  city: string;
  state: string;
};
type AadhaarData = { number: string; verified: boolean };
type BankDetailsData = {
  accountNumber: string;
  ifsc: string;
  accountType: string;
};
type SelfieData = { captured: boolean };
type EmploymentData = {
  companyName: string;
  designation: string;
  email: string;
  salary: string;
  salaryMode: string;
  joiningDate: string;
  uan: string;
  city: string;
  pincode: string;
};
type LoanCalculatorData = {
  viewed: boolean;
  loanAmount: number;
  tenure: number;
  interestRate: number;
  emi: number;
  totalPayable: number;
};
type ReviewData = { submitted: boolean };

export interface ApplicationState {
  mobile: MobileData | null;
  pan: PanData | null;
  personalInfo: PersonalInfoData | null;
  aadhaar: AadhaarData | null;
  bankDetails: BankDetailsData | null;
  selfie: SelfieData | null;
  employmentDetails: EmploymentData | null;
  loanCalculator: LoanCalculatorData | null;
  review: ReviewData | null;
}

const getInitialState = (): ApplicationState => {
  if (typeof window === "undefined") return getDefaultState();
  try {
    const raw = sessionStorage.getItem("p2m-loan-application");
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        mobile: parsed.mobile ?? null,
        pan: parsed.pan ?? null,
        personalInfo: parsed.personalInfo ?? null,
        aadhaar: parsed.aadhaar ?? null,
        bankDetails: parsed.bankDetails ?? null,
        selfie: parsed.selfie ?? null,
        employmentDetails: parsed.employmentDetails ?? null,
        loanCalculator: parsed.loanCalculator ?? null,
        review: parsed.review ?? null,
      };
    }
  } catch {
    /* ignore */
  }
  return getDefaultState();
};

function getDefaultState(): ApplicationState {
  return {
    mobile: null,
    pan: null,
    personalInfo: null,
    aadhaar: null,
    bankDetails: null,
    selfie: null,
    employmentDetails: null,
    loanCalculator: null,
    review: null,
  };
}

const initialState: ApplicationState = getInitialState();

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setMobileData: (state, action: PayloadAction<MobileData>) => {
      state.mobile = action.payload;
    },
    setPanData: (state, action: PayloadAction<PanData>) => {
      state.pan = action.payload;
    },
    setPersonalInfo: (state, action: PayloadAction<PersonalInfoData>) => {
      state.personalInfo = action.payload;
    },
    setAadhaarData: (state, action: PayloadAction<AadhaarData>) => {
      state.aadhaar = action.payload;
    },
    setBankDetails: (state, action: PayloadAction<BankDetailsData>) => {
      state.bankDetails = action.payload;
    },
    setSelfieData: (state, action: PayloadAction<SelfieData>) => {
      state.selfie = action.payload;
    },
    setEmploymentDetails: (state, action: PayloadAction<EmploymentData>) => {
      state.employmentDetails = action.payload;
    },
    setLoanCalculatorData: (state, action: PayloadAction<LoanCalculatorData>) => {
      state.loanCalculator = action.payload;
    },
    setReviewData: (state, action: PayloadAction<ReviewData>) => {
      state.review = action.payload;
    },
    resetApplication: (state) => {
      state.mobile = null;
      state.pan = null;
      state.personalInfo = null;
      state.aadhaar = null;
      state.bankDetails = null;
      state.selfie = null;
      state.employmentDetails = null;
      state.loanCalculator = null;
      state.review = null;
    },
  },
});

export const {
  setMobileData,
  setPanData,
  setPersonalInfo,
  setAadhaarData,
  setBankDetails,
  setSelfieData,
  setEmploymentDetails,
  setLoanCalculatorData,
  setReviewData,
  resetApplication,
} = applicationSlice.actions;

export default applicationSlice.reducer;

export const selectApplication = (state: { application: ApplicationState }) => state.application;

export const selectCompletedSteps = (state: { application: ApplicationState }): Set<string> => {
  const data = state.application;
  const completed = new Set<string>();
  for (const step of steps) {
    if (data[step.key]) completed.add(step.key);
  }
  return completed;
};

export const selectStepStatus =
  (key: string) =>
  (state: { application: ApplicationState }): StepStatus => {
    const completed = selectCompletedSteps(state);
    if (completed.has(key)) return "complete";
    const stepIndex = steps.findIndex((s) => s.key === key);
    const allPreviousComplete = steps.slice(0, stepIndex).every((s) => completed.has(s.key));
    if (allPreviousComplete && !completed.has(key)) return "progress";
    return "pending";
  };

export const selectProgressPercentage = (state: { application: ApplicationState }): number => {
  const completed = selectCompletedSteps(state);
  if (completed.size === 0) return 0;
  return Math.round((completed.size / steps.length) * 100);
};

export const selectCurrentStep = (state: { application: ApplicationState }) => {
  const completed = selectCompletedSteps(state);
  for (let i = 0; i < steps.length; i++) {
    if (!completed.has(steps[i].key)) {
      return steps[i];
    }
  }
  return steps[steps.length - 1];
};
