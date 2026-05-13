"use server";

import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
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

export async function submitPersonalInfoAction(data: Record<string, unknown>) {
  try {
    const result = await apiPost<ApiResponse<{ submitted: boolean }>>(API.personalInfo.submit, data);
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : "Failed to submit personal info",
    };
  }
}
