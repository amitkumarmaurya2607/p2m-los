"use client";

import { useEffect, useRef } from "react";
import { useApplicationContext } from "@/context/ApplicationContext";
import { MOCK_APPLICATION_DATA } from "@/lib/mock/application-mock";

export default function MockDataInitializer() {
  const ran = useRef(false);
  const {
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
  } = useApplicationContext();

  useEffect(() => {
    if (ran.current) return;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("mock")) return;

    ran.current = true;

    setMobileData(MOCK_APPLICATION_DATA.mobile!);
    setGeoLocationData(MOCK_APPLICATION_DATA.geoLocation!);
    setPanData(MOCK_APPLICATION_DATA.pan!);
    setPersonalInfo(MOCK_APPLICATION_DATA.personalInfo!);
    setAadhaarData(MOCK_APPLICATION_DATA.aadhaar!);
    setBankDetails(MOCK_APPLICATION_DATA.bankDetails!);
    setAccountStatementData(MOCK_APPLICATION_DATA.accountStatement!);
    setEmploymentDetails(MOCK_APPLICATION_DATA.employmentDetails!);
    setSelfieData(MOCK_APPLICATION_DATA.selfie!);
    setAddressProofData(MOCK_APPLICATION_DATA.addressProof!);
    setAlternateMobileData(MOCK_APPLICATION_DATA.alternateMobile!);
    setLoanEligibilityData(MOCK_APPLICATION_DATA.loanEligibility!);

    window.history.replaceState({}, "", window.location.pathname);
  }, [
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
  ]);

  return null;
}
