"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import { steps, type StepItem, type StepStatus } from "@/lib/sessionStorage";
import { getProgressAction } from "@/lib/actions/progress.action";

type MobileData = { number: string; verified: boolean };
type PanData = { number: string };
type PersonalInfoData = {
  firstName: string;
  secondName: string;
  lastName: string;
  fatherName: string;
  email: string;
  dob: string;
  salary: string;
  state: string;
  city: string;
  pincode: string;
};
type AadhaarData = { number: string; verified: boolean };
type BankDetailsData = { accountNumber: string; ifsc: string; accountType: string };
type SelfieData = { captured: boolean };
type EmploymentData = {
  companyName: string;
  designation: string;
  email: string;
  salaryMode: string;
  joiningDate: string;
  uan: string;
  state: string;
  city: string;
  pincode: string;
};
type GeoLocationData = {
  latitude: number;
  longitude: number;
  accuracy: number;
  capturedAt: string;
};
type AccountStatementData = { uploaded: boolean; fileName?: string };
type AddressProofData = { uploaded: boolean; fileName?: string };
type AlternateMobileData = { number1: string; relation1: string; number2: string; relation2: string };
type EligibilityData = {
  eligibleAmount: number;
  selectedAmount: number;
  tenure: number;
  interestRate: number;
  emi: number;
  agreed: boolean;
  submitted: boolean;
};

export interface ApplicationState {
  mobile: MobileData | null;
  geoLocation: GeoLocationData | null;
  pan: PanData | null;
  personalInfo: PersonalInfoData | null;
  aadhaar: AadhaarData | null;
  bankDetails: BankDetailsData | null;
  accountStatement: AccountStatementData | null;
  employmentDetails: EmploymentData | null;
  selfie: SelfieData | null;
  addressProof: AddressProofData | null;
  alternateMobile: AlternateMobileData | null;
  loanEligibility: EligibilityData | null;
}

interface ApplicationContextValue {
  application: ApplicationState;
  setMobileData: (data: MobileData) => void;
  setGeoLocationData: (data: GeoLocationData) => void;
  setPanData: (data: PanData) => void;
  setPersonalInfo: (data: PersonalInfoData) => void;
  setAadhaarData: (data: AadhaarData) => void;
  setBankDetails: (data: BankDetailsData) => void;
  setAccountStatementData: (data: AccountStatementData) => void;
  setEmploymentDetails: (data: EmploymentData) => void;
  setSelfieData: (data: SelfieData) => void;
  setAddressProofData: (data: AddressProofData) => void;
  setAlternateMobileData: (data: AlternateMobileData) => void;
  setLoanEligibilityData: (data: EligibilityData) => void;
  setLoanCalculatorData: (data: { viewed: boolean; loanAmount: number; tenure: number; interestRate: number; emi: number; totalPayable: number }) => void;
  setReviewData: (data: { submitted: boolean }) => void;
  resetApplication: () => void;
  completedSteps: Set<string>;
  stepStatuses: Map<string, StepStatus>;
  progressPercentage: number;
  currentStep: StepItem;
}

const ApplicationContext = createContext<ApplicationContextValue | null>(null);

function getDefaultState(): ApplicationState {
  return {
    mobile: null,
    geoLocation: null,
    pan: null,
    personalInfo: null,
    aadhaar: null,
    bankDetails: null,
    accountStatement: null,
    employmentDetails: null,
    selfie: null,
    addressProof: null,
    alternateMobile: null,
    loanEligibility: null,
  };
}

const apiStepKeyToContextKey: Record<string, string> = {
  mobile: "mobile",
  "geo-location": "geoLocation",
  pan: "pan",
  "personal-info": "personalInfo",
  aadhaar: "aadhaar",
  bank: "bankDetails",
  "account-statement": "accountStatement",
  employment: "employmentDetails",
  selfie: "selfie",
  "address-proof": "addressProof",
  "alternate-mobile": "alternateMobile",
  "loan-eligibility": "loanEligibility",
};

const contextStepOrder = steps.map((s) => s.key);

function computeSelectors(completedFromApi: Set<string>, inMemoryState: ApplicationState) {
  const completed = new Set(completedFromApi);

  for (const key of contextStepOrder) {
    if (inMemoryState[key as keyof ApplicationState]) {
      completed.add(key);
    }
  }

  const stepStatuses = new Map<string, StepStatus>();
  for (const step of steps) {
    if (completed.has(step.key)) {
      stepStatuses.set(step.key, "complete");
    } else {
      const stepIndex = steps.findIndex((s) => s.key === step.key);
      const allPreviousComplete = steps.slice(0, stepIndex).every((s) => completed.has(s.key));
      stepStatuses.set(step.key, allPreviousComplete ? "progress" : "pending");
    }
  }

  const progressPercentage =
    completed.size === 0 ? 0 : Math.round((completed.size / steps.length) * 100);

  let currentStep = steps[steps.length - 1];
  for (let i = 0; i < steps.length; i++) {
    if (!completed.has(steps[i].key)) {
      currentStep = steps[i];
      break;
    }
  }

  return { completed, stepStatuses, progressPercentage, currentStep };
}

export function useApplicationContext() {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error("useApplicationContext must be used within ApplicationProvider");
  return ctx;
}

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ApplicationState>(getDefaultState);
  const [completedFromApi, setCompletedFromApi] = useState<Set<string>>(new Set());

  useEffect(() => {
    getProgressAction().then((result) => {
      if (result.success && result.data?.completedSteps) {
        const mapped = new Set<string>();
        for (const step of result.data.completedSteps) {
          const contextKey = apiStepKeyToContextKey[step];
          if (contextKey) mapped.add(contextKey);
        }
        setCompletedFromApi(mapped);
      }
    });
  }, []);

  const updateState = useCallback((updater: (prev: ApplicationState) => ApplicationState) => {
    setState((prev) => updater(prev));
  }, []);

  const setMobileData = useCallback(
    (data: MobileData) => updateState((prev) => ({ ...prev, mobile: data })),
    [updateState],
  );
  const setGeoLocationData = useCallback(
    (data: GeoLocationData) => updateState((prev) => ({ ...prev, geoLocation: data })),
    [updateState],
  );
  const setPanData = useCallback(
    (data: PanData) => updateState((prev) => ({ ...prev, pan: data })),
    [updateState],
  );
  const setPersonalInfo = useCallback(
    (data: PersonalInfoData) => updateState((prev) => ({ ...prev, personalInfo: data })),
    [updateState],
  );
  const setAadhaarData = useCallback(
    (data: AadhaarData) => updateState((prev) => ({ ...prev, aadhaar: data })),
    [updateState],
  );
  const setBankDetails = useCallback(
    (data: BankDetailsData) => updateState((prev) => ({ ...prev, bankDetails: data })),
    [updateState],
  );
  const setAccountStatementData = useCallback(
    (data: AccountStatementData) => updateState((prev) => ({ ...prev, accountStatement: data })),
    [updateState],
  );
  const setEmploymentDetails = useCallback(
    (data: EmploymentData) => updateState((prev) => ({ ...prev, employmentDetails: data })),
    [updateState],
  );
  const setSelfieData = useCallback(
    (data: SelfieData) => updateState((prev) => ({ ...prev, selfie: data })),
    [updateState],
  );
  const setAddressProofData = useCallback(
    (data: AddressProofData) => updateState((prev) => ({ ...prev, addressProof: data })),
    [updateState],
  );
  const setAlternateMobileData = useCallback(
    (data: AlternateMobileData) => updateState((prev) => ({ ...prev, alternateMobile: data })),
    [updateState],
  );
  const setLoanEligibilityData = useCallback(
    (data: EligibilityData) => updateState((prev) => ({ ...prev, loanEligibility: data })),
    [updateState],
  );
  const setLoanCalculatorData = useCallback(
    (data: { viewed: boolean; loanAmount: number; tenure: number; interestRate: number; emi: number; totalPayable: number }) => updateState((prev) => ({ ...prev, loanCalculator: data })),
    [updateState],
  );
  const setReviewData = useCallback(
    (data: { submitted: boolean }) => updateState((prev) => ({ ...prev, review: data })),
    [updateState],
  );
  const resetApplication = useCallback(() => {
    setState(getDefaultState());
  }, []);

  const { completed: completedSteps, ...restSelectors } = useMemo(
    () => computeSelectors(completedFromApi, state),
    [state, completedFromApi],
  );

  const value = useMemo<ApplicationContextValue>(
    () => ({
      application: state,
      setMobileData,
      setGeoLocationData,
      setPanData,
      setPersonalInfo,
      setAadhaarData,
      setBankDetails,
      setAccountStatementData,
      setEmploymentDetails,
      setSelfieData,
      setAddressProofData,
      setAlternateMobileData,
      setLoanEligibilityData,
      setLoanCalculatorData,
      setReviewData,
      resetApplication,
      completedSteps,
      ...restSelectors,
    }),
    [
      state,
      completedSteps,
      restSelectors,
      setMobileData,
      setGeoLocationData,
      setPanData,
      setPersonalInfo,
      setAadhaarData,
      setBankDetails,
      setAccountStatementData,
      setEmploymentDetails,
      setSelfieData,
      setAddressProofData,
      setAlternateMobileData,
      setLoanEligibilityData,
      setLoanCalculatorData,
      setReviewData,
      resetApplication,
    ],
  );

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
}
