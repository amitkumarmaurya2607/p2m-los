"use client";

import { useEffect, useRef } from "react";
import { useApplicationContext } from "@/context/ApplicationContext";
import { MOCK_APPLICATION_DATA } from "@/lib/mock/application-mock";

export default function MockDataInitializer() {
  const ran = useRef(false);
  const {
    setMobileData,
    setPanData,
    setPersonalInfo,
    setAadhaarData,
    setBankDetails,
    setSelfieData,
    setEmploymentDetails,
    setLoanCalculatorData,
    setReviewData,
  } = useApplicationContext();

  useEffect(() => {
    if (ran.current) return;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("mock")) return;

    ran.current = true;

    setMobileData(MOCK_APPLICATION_DATA.mobile!);
    setPanData(MOCK_APPLICATION_DATA.pan!);
    setPersonalInfo(MOCK_APPLICATION_DATA.personalInfo!);
    setAadhaarData(MOCK_APPLICATION_DATA.aadhaar!);
    setBankDetails(MOCK_APPLICATION_DATA.bankDetails!);
    setSelfieData(MOCK_APPLICATION_DATA.selfie!);
    setEmploymentDetails(MOCK_APPLICATION_DATA.employmentDetails!);
    setLoanCalculatorData(MOCK_APPLICATION_DATA.loanCalculator!);
    setReviewData(MOCK_APPLICATION_DATA.review!);

    window.history.replaceState({}, "", window.location.pathname);
  }, [
    setMobileData,
    setPanData,
    setPersonalInfo,
    setAadhaarData,
    setBankDetails,
    setSelfieData,
    setEmploymentDetails,
    setLoanCalculatorData,
    setReviewData,
  ]);

  return null;
}
