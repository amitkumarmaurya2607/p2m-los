import { apiPost } from "@/lib/axios";
import type { ApiResponse } from "@/types";

interface VerifyPANResponse {
  number: string;
  fullName?: string;
  verified: boolean;
}

export async function verifyPAN(panNumber: string): Promise<ApiResponse<VerifyPANResponse>> {
  return apiPost<ApiResponse<VerifyPANResponse>>("/pan/verify", { pan: panNumber });
}
