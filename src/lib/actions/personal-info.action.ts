"use server";

import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import { saveStepCookie } from "@/lib/step-cookie";
import type { ApiResponse } from "@/types";

export async function sendEmailOTPAction(email: string) {
  try {
    const result = await apiPost<ApiResponse<{ otp: string }>>(API.email.sendOTP, { email });
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : "Failed to send email OTP",
    };
  }
}

function buildPayload(data: Record<string, unknown>) {
  return {
    fatherName: data.fatherName ?? "",
    pinCode: data.pincode ?? "",
    firstName: data.firstName ?? "",
    middleName: data.secondName ?? "",
    lastName: data.lastName ?? "",
    state: data.state ?? "",
    city: data.city ?? "",
    address: data.address ?? "",
    gender: data.gender ?? "",
    emailId: data.email ?? "",
  };
}

export async function submitPersonalInfoAction(data: Record<string, unknown>) {
  try {
    const result = await apiPost<ApiResponse<{ submitted: boolean }>>(
      API.personalInfo.submit,
      buildPayload(data),
    );
    if (result.code !== "0000") return { error: result.message || "Submission failed" };
    await saveStepCookie("personalInfo");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to submit personal info" };
  }
}
