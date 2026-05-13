import { apiPost } from "@/lib/axios";
import type { ApiResponse } from "@/types";

interface SendOTPResponse {
  verified: boolean;
}

interface VerifyOTPResponse {
  verified: boolean;
}

export async function sendOTP(phone: string): Promise<ApiResponse<SendOTPResponse>> {
  return apiPost<ApiResponse<SendOTPResponse>>("/auth/send-otp", { phone });
}

export async function verifyOTP(phone: string, code: string): Promise<ApiResponse<VerifyOTPResponse>> {
  return apiPost<ApiResponse<VerifyOTPResponse>>("/auth/verify-otp", { phone, code });
}
