"use server";

import { verifyPAN } from "@/lib/services/pan.service";
import { sendAadhaarOTP, verifyAadhaarOTP } from "@/lib/services/aadhaar.service";
import { verifyBank } from "@/lib/services/bank.service";
import { submitEmployment } from "@/lib/services/employment.service";

export async function verifyPANAction(panNumber: string) {
  try {
    const result = await verifyPAN(panNumber);
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return { success: false, data: null, error: err instanceof Error ? err.message : "PAN verification failed" };
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
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : "Failed to verify Aadhaar OTP",
    };
  }
}

export async function verifyBankAction(accountNumber: string, ifsc: string, accountType: string) {
  try {
    const result = await verifyBank(accountNumber, ifsc, accountType);
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return { success: false, data: null, error: err instanceof Error ? err.message : "Bank verification failed" };
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
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : "Failed to submit employment details",
    };
  }
}
