import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

export async function sendEmailOTP(email: string): Promise<ApiResponse<{ otp: string }>> {
  return apiPost<ApiResponse<{ otp: string }>>(API.email.sendOTP, { email });
}

export async function submitPersonalInfo(
  data: Record<string, unknown>,
): Promise<ApiResponse<{ submitted: boolean }>> {
  return apiPost<ApiResponse<{ submitted: boolean }>>(API.personalInfo.submit, data);
}
