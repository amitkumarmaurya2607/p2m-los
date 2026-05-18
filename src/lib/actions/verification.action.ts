"use server";

import { verifyPAN } from "@/lib/services/pan.service";
import { sendAadhaarOTP, verifyAadhaarOTP } from "@/lib/services/aadhaar.service";
import { verifyBank } from "@/lib/services/bank.service";
import { submitEmployment } from "@/lib/services/employment.service";
import { saveProgress } from "@/lib/services/progress.service";
import { saveStepCookie } from "@/lib/step-cookie";

export async function verifyPANAction(panNumber: string) {
  try {
    const result = await verifyPAN(panNumber);
    if (!result.success) return { error: result.message || "PAN verification failed" };
    await saveProgress("pan");
    await saveStepCookie("pan");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "PAN verification failed" };
  }
}

export async function sendAadhaarOTPAction(aadhaarNumber: string) {
  try {
    const result = await sendAadhaarOTP(aadhaarNumber);
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : "Failed to send Aadhaar OTP",
    };
  }
}

export async function verifyAadhaarOTPAction(aadhaarNumber: string, code: string) {
  try {
    const result = await verifyAadhaarOTP(aadhaarNumber, code);
    if (!result.success) return { error: result.message || "Aadhaar verification failed" };
    await saveProgress("aadhaar");
    await saveStepCookie("aadhaar");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to verify Aadhaar OTP" };
  }
}

export async function verifyBankAction(accountNumber: string, ifsc: string, accountType: string) {
  try {
    const result = await verifyBank(accountNumber, ifsc, accountType);
    if (!result.success) return { error: result.message || "Bank verification failed" };
    await saveProgress("bank");
    await saveStepCookie("bankDetails");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Bank verification failed" };
  }
}

export async function submitEmploymentAction(data: {
  companyName: string;
  designation: string;
  email: string;
  salary: string;
  salaryMode: string;
  joiningDate: string;
  uan: string;
  city: string;
  pincode: string;
}) {
  try {
    const result = await submitEmployment(data);
    if (!result.success) return { error: result.message || "Employment submission failed" };
    await saveProgress("employment");
    await saveStepCookie("employmentDetails");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to submit employment details" };
  }
}
