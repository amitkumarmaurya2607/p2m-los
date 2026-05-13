import { apiPost } from "@/lib/axios";
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
  return apiPost<ApiResponse<VerifyBankResponse>>("/bank/verify", { accountNumber, ifsc, accountType });
}
