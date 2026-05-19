import { apiGet, apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

interface SubmitApplicationResponse {
  applicationId: string;
  submitted: boolean;
}

interface ApplicationStatus {
  id: string;
  status: string;
  stage: string;
  updatedAt: string;
}

export async function submitApplication(
  data: unknown,
): Promise<ApiResponse<SubmitApplicationResponse>> {
  return apiPost<ApiResponse<SubmitApplicationResponse>>(API.application.submit, data);
}

export async function getApplicationStatus(id: string): Promise<ApiResponse<ApplicationStatus>> {
  return apiGet<ApiResponse<ApplicationStatus>>(API.application.status(id));
}
