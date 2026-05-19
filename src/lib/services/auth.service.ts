import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

interface SendOTPResponse {
  verified: boolean;
}

interface VerifyOTPResponse {
  verified: boolean;
  token?: string;
}

export async function sendOTP(phone: string): Promise<ApiResponse<SendOTPResponse>> {
  return apiPost<ApiResponse<SendOTPResponse>>(API.auth.sendOTP, { phone });
}

export async function verifyOTP(
  phone: string,
  code: string,
): Promise<ApiResponse<VerifyOTPResponse>> {
  return apiPost<ApiResponse<VerifyOTPResponse>>(API.auth.verifyOTP, { phone, code });
}
