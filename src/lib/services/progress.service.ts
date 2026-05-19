import { apiGet } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

interface ProgressData {
  currentStep: string;
  completedSteps: string[];
}

export async function getProgress(): Promise<ApiResponse<ProgressData>> {
  return apiGet<ApiResponse<ProgressData>>(API.progress.get);
}
