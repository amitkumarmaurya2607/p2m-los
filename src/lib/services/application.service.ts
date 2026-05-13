import { apiGet, apiPost } from "@/lib/axios";
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

export async function submitApplication(data: unknown): Promise<ApiResponse<SubmitApplicationResponse>> {
  return apiPost<ApiResponse<SubmitApplicationResponse>>("/application/submit", data);
}

export async function getApplicationStatus(id: string): Promise<ApiResponse<ApplicationStatus>> {
  return apiGet<ApiResponse<ApplicationStatus>>(`/application/${id}/status`);
}
