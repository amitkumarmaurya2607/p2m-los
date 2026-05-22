import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";
import { loginPayload, loginVerifyPayload } from "@/views/Auth/type";

export interface SendOTPResponse {
  code: string;
  message?: string;
  data?: {
    mobileNumber: string;
    userId: string;
  };
  msg?: string;
  errorCodeList?: unknown[];
}
interface VerifyOTPResponse {
  code: string;
  message?: string;
  data?: {
    mobileNumber: string;
    userId: string;
    refreshToken: string;
    accessToken: string;
   
  };
  msg?: string;
  errorCodeList?: unknown[];
}

export async function sendOTP(payload:loginPayload): Promise<SendOTPResponse> {
  return apiPost<SendOTPResponse>(API.auth.sendOTP, payload);
}

export async function verifyOTP(
  payload: loginVerifyPayload
): Promise<VerifyOTPResponse> {
  return apiPost<VerifyOTPResponse>(API.auth.verifyOTP, payload);
}
