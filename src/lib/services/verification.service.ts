import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

export async function verifyPAN(panNumber: string): Promise<
  ApiResponse<{ number?: string; fullName?: string; verified?: boolean }>
> {
  return apiPost<ApiResponse<{ number?: string; fullName?: string; verified?: boolean }>>(
    API.pan.verify,
    { pan: panNumber },
  );
}

export async function digiLockerApi(): Promise<ApiResponse<unknown>> {
  return apiPost<ApiResponse<unknown>>(API.aadhaar.digiLocker, {});
}

export async function sendAadhaarOTP(
  aadhaarNumber: string,
): Promise<ApiResponse<{ verified: boolean }>> {
  return apiPost<ApiResponse<{ verified: boolean }>>(API.aadhaar.sendOTP, {
    aadhaar: aadhaarNumber,
  });
}

export async function verifyAadhaarOTP(
  aadhaarNumber: string,
  code: string,
): Promise<ApiResponse<{ verified: boolean; number: string }>> {
  return apiPost<ApiResponse<{ verified: boolean; number: string }>>(API.aadhaar.verifyOTP, {
    aadhaar: aadhaarNumber,
    code,
  });
}

export async function verifyBank(data: {
  userId: string;
  orgId: string;
  accountNumber: string;
  ifscCode: string;
  benName: string;
}): Promise<ApiResponse<{ code: string; message?: string }>> {
  return apiPost<ApiResponse<{ code: string; message?: string }>>(API.bank.verify, data);
}

export async function submitEmployment(
  data: Record<string, unknown>,
): Promise<ApiResponse<{ submitted: boolean }>> {
  return apiPost<ApiResponse<{ submitted: boolean }>>(API.employment.submit, data);
}
