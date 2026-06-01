import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import { loginPayload, loginVerifyPayload } from "@/views/Auth/type";

export interface SendOTPResponse {
  code: string;
  message?: string;
  data?: {
    mobileNumber: string;
    id: string;
  };
  msg?: string;
  errorCodeList?: unknown[];
}
interface VerifyOTPResponse {
  code: string;
  message?: string;
  data?: {
    mobileNumber: string;
    id: string;
    refreshToken: string;
    accessToken: string;
  };
  msg?: string;
  errorCodeList?: unknown[];
}

export async function sendOTP(payload: loginPayload): Promise<SendOTPResponse> {
  return apiPost<SendOTPResponse>(API.auth.sendOTP, payload);
}

export async function verifyOTP(payload: loginVerifyPayload): Promise<VerifyOTPResponse> {
  return apiPost<VerifyOTPResponse>(API.auth.verifyOTP, payload);
}
