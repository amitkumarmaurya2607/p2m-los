import { apiGet, apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";
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
export interface VerifyOTPResponse {
    accessToken: string;
    user:{
        brandId: string;
  email: string | null;
  emailVerified: boolean;
  employmentId: string;
  googleId: string | null;
  id: string;
  onboardingStep: number;
  phoneNumber: string;
  phoneVerified: boolean;
  userDetailsId: string;
  whatsappVerified: boolean;

    }

}

export async function sendOTP(payload: loginPayload): Promise<SendOTPResponse> {
  return apiPost<SendOTPResponse>(API.auth.sendOTP, payload);
}

export async function verifyOTP(payload: loginVerifyPayload): Promise<ApiResponse<VerifyOTPResponse>> {
  return apiPost<ApiResponse<VerifyOTPResponse>>(API.auth.verifyOTP, payload);
}

export type OnboardingProgress = {
  userId: string;
  steps: OnboardingStep[];
  completed: number;
  failed: number;
  pending: number;
  nextStep: OnboardingStepKey | string | null;
};

export type OnboardingStep = {
  step: OnboardingStepKey | string;
  status: OnboardingStepStatus;
  completedAt: string | null;
};

export type OnboardingStepStatus = "COMPLETED" | "PENDING" | "FAILED" | string;

export type OnboardingStepKey =
  | "MOBILE_NUM_VERIFY"
  | "PAN_VERIFY"
  | "PERSONAL_DETAIL"
  | "AADHAAR_VERIFY"
  | "BANK_VERIFY"
  | "BANK_STATEMENT_OR_CONSENT"
  | "DEVICE_SAVE"
  | "SAVE_EMP_INFO"
  | "MEDIA_UPLOAD"
  | "GEO_LOCATION"
  | "ALTERNATE_MOB_NUM"
  | "LOCAL_ADD_PROOF"
  | "LOAN_APPLY";

export type StepProgressResponse = ApiResponse<OnboardingProgress>;

export async function getStepProgress(): Promise<StepProgressResponse> {
  return apiGet<StepProgressResponse>(API.others.stepProgress);
}
