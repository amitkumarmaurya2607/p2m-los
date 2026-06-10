import { apiGet, apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";
import { loginPayload, loginVerifyPayload } from "@/views/Auth/type";
import type {
  SendOTPResponse,
  VerifyOTPResponse,
  StepProgressResponse,
} from "@/lib/actions/action.type";

export async function sendOTP(payload: loginPayload): Promise<SendOTPResponse> {
  return apiPost<SendOTPResponse>(API.auth.sendOTP, payload);
}

export async function verifyOTP(
  payload: loginVerifyPayload,
): Promise<ApiResponse<VerifyOTPResponse>> {
  return apiPost<ApiResponse<VerifyOTPResponse>>(API.auth.verifyOTP, payload);
}

export async function getStepProgress(): Promise<StepProgressResponse> {
  return apiGet<StepProgressResponse>(API.others.stepProgress);
}
