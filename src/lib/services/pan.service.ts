import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

interface VerifyPANResponse {
  number?: string;
  fullName?: string;
  verified?: boolean;
}

export async function verifyPAN(panNumber: string): Promise<ApiResponse<VerifyPANResponse>> {
  return apiPost<ApiResponse<VerifyPANResponse>>(API.pan.verify, { pan: panNumber });
}
