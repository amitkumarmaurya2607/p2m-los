import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

interface VerifyBankResponse {
  accountNumber: string;
  ifsc: string;
  accountType: string;
  verified: boolean;
}

export async function verifyBank(
  accountNumber: string,
  ifsc: string,
  accountType: string,
): Promise<ApiResponse<VerifyBankResponse>> {
  return apiPost<ApiResponse<VerifyBankResponse>>(API.bank.verify, { accountNumber, ifsc, accountType });
}
