import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

interface SendAadhaarOTPResponse {
  verified: boolean;
}

interface VerifyAadhaarOTPResponse {
  verified: boolean;
  number: string;
}

export async function sendAadhaarOTP(aadhaarNumber: string): Promise<ApiResponse<SendAadhaarOTPResponse>> {
  return apiPost<ApiResponse<SendAadhaarOTPResponse>>(API.aadhaar.sendOTP, { aadhaar: aadhaarNumber });
}

export async function verifyAadhaarOTP(
  aadhaarNumber: string,
  code: string,
): Promise<ApiResponse<VerifyAadhaarOTPResponse>> {
  return apiPost<ApiResponse<VerifyAadhaarOTPResponse>>(API.aadhaar.verifyOTP, { aadhaar: aadhaarNumber, code });
}
