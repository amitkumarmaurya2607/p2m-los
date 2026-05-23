import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

interface VerifyBankResponse {
  code: string;
  message?: string;
}

export async function verifyBank(data: {
  userId: string;
  orgId: string;
  accountNumber: string;
  ifscCode: string;
  benName: string;
}): Promise<ApiResponse<VerifyBankResponse>> {
  return apiPost<ApiResponse<VerifyBankResponse>>(API.bank.verify, data);
}
