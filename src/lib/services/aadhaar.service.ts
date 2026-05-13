import { apiPost } from "@/lib/axios";
import type { ApiResponse } from "@/types";

interface SendAadhaarOTPResponse {
  verified: boolean;
}

interface VerifyAadhaarOTPResponse {
  verified: boolean;
  number: string;
}

export async function sendAadhaarOTP(aadhaarNumber: string): Promise<ApiResponse<SendAadhaarOTPResponse>> {
  return apiPost<ApiResponse<SendAadhaarOTPResponse>>("/aadhaar/send-otp", { aadhaar: aadhaarNumber });
}

export async function verifyAadhaarOTP(
  aadhaarNumber: string,
  code: string,
): Promise<ApiResponse<VerifyAadhaarOTPResponse>> {
  return apiPost<ApiResponse<VerifyAadhaarOTPResponse>>("/aadhaar/verify-otp", { aadhaar: aadhaarNumber, code });
}
