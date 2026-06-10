import { apiGet, apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";
import type { PanVerificationData, PanVerificationResponse } from "@/lib/actions/action.type";
export async function submitPersonalInfo(
  data: Record<string, unknown>,
): Promise<ApiResponse<{ submitted: boolean }>> {
  return apiPost<ApiResponse<{ submitted: boolean }>>(API.personalInfo.submit, data);
}

export async function getPersonalInfo(): Promise<PanVerificationResponse> {
  return apiGet<PanVerificationResponse>(API.personalInfo.getDetails);
}
