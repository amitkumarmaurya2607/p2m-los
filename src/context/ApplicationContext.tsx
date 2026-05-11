"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import { steps, type StepItem, type StepStatus } from "@/lib/sessionStorage";

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
type BankDetailsData = { accountNumber: string; ifsc: string; accountType: string };
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

interface ApplicationContextValue {
  application: ApplicationState;
  setMobileData: (data: MobileData) => void;
  setPanData: (data: PanData) => void;
  setPersonalInfo: (data: PersonalInfoData) => void;
  setAadhaarData: (data: AadhaarData) => void;
  setBankDetails: (data: BankDetailsData) => void;
  setSelfieData: (data: SelfieData) => void;
  setEmploymentDetails: (data: EmploymentData) => void;
  setLoanCalculatorData: (data: LoanCalculatorData) => void;
  setReviewData: (data: ReviewData) => void;
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

function loadApplication(): ApplicationState {
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
}

function saveApplication(state: ApplicationState) {
  try {
    sessionStorage.setItem("p2m-loan-application", JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function computeSelectors(state: ApplicationState) {
  const completed = new Set<string>();
  for (const step of steps) {
    if (state[step.key as keyof ApplicationState]) completed.add(step.key);
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

  const progressPercentage = completed.size === 0 ? 0 : Math.round((completed.size / steps.length) * 100);

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
  const [state, setState] = useState<ApplicationState>(loadApplication);

  const updateState = useCallback((updater: (prev: ApplicationState) => ApplicationState) => {
    setState((prev) => {
      const next = updater(prev);
      saveApplication(next);
      return next;
    });
  }, []);

  const setMobileData = useCallback(
    (data: MobileData) => updateState((prev) => ({ ...prev, mobile: data })),
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
  const setSelfieData = useCallback(
    (data: SelfieData) => updateState((prev) => ({ ...prev, selfie: data })),
    [updateState],
  );
  const setEmploymentDetails = useCallback(
    (data: EmploymentData) => updateState((prev) => ({ ...prev, employmentDetails: data })),
    [updateState],
  );
  const setLoanCalculatorData = useCallback(
    (data: LoanCalculatorData) => updateState((prev) => ({ ...prev, loanCalculator: data })),
    [updateState],
  );
  const setReviewData = useCallback(
    (data: ReviewData) => updateState((prev) => ({ ...prev, review: data })),
    [updateState],
  );
  const resetApplication = useCallback(() => {
    const defaultState = getDefaultState();
    setState(defaultState);
    saveApplication(defaultState);
  }, []);

  const { completed: completedSteps, ...restSelectors } = useMemo(() => computeSelectors(state), [state]);

  const value = useMemo<ApplicationContextValue>(
    () => ({
      application: state,
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
      completedSteps,
      ...restSelectors,
    }),
    [
      state,
      completedSteps,
      restSelectors,
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
    ],
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}
