import { apiGet, apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

export async function getLoanPrograms(): Promise<ApiResponse<unknown[]>> {
  return apiGet<ApiResponse<unknown[]>>(API.loan.program);
}

export async function submitApplication(
  data: unknown,
): Promise<ApiResponse<{ applicationId: string; submitted: boolean }>> {
  return apiPost<ApiResponse<{ applicationId: string; submitted: boolean }>>(
    API.application.submit,
    data,
  );
}

export async function getApplicationStatus(
  id: string,
): Promise<ApiResponse<{ id: string; status: string; stage: string; updatedAt: string }>> {
  return apiGet<ApiResponse<{ id: string; status: string; stage: string; updatedAt: string }>>(
    API.application.status(id),
  );
}
