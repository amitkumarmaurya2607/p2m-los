import { apiGet, apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

interface ProgressData {
  currentStep: string;
  completedSteps: string[];
}

export async function saveProgress(
  step: string,
  data?: unknown,
): Promise<ApiResponse<ProgressData>> {
  return apiPost<ApiResponse<ProgressData>>(API.progress.save, { step, data });
}

export async function getProgress(): Promise<ApiResponse<ProgressData>> {
  return apiGet<ApiResponse<ProgressData>>(API.progress.get);
}
