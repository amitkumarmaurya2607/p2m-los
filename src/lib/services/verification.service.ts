import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse } from "@/types";

export async function verifyPAN(
  panNumber: string,
): Promise<ApiResponse<{ number?: string; fullName?: string; verified?: boolean }>> {
  return apiPost<ApiResponse<{ number?: string; fullName?: string; verified?: boolean }>>(
    API.pan.verify,
    { pan: panNumber },
  );
}

export async function digiLockerApi(): Promise<ApiResponse<unknown>> {
  return apiPost<ApiResponse<unknown>>(API.aadhaar.digiLocker, {});
}

export async function verifyBank(data: {
  accountType: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}): Promise<ApiResponse<{ code: string; message?: string }>> {
  return apiPost<ApiResponse<{ code: string; message?: string }>>(API.bank.verify, data);
}

export async function verifyDigiLockerCallback(
  token: string,
): Promise<ApiResponse<{ verified: boolean }>> {
  return apiPost<ApiResponse<{ verified: boolean }>>(API.aadhaar.verifyCallback, { token });
}

export async function saveGeoLocation(data: {
  geoLatitude: number;
  geoLongitude: number;
}): Promise<ApiResponse<{ success: boolean }>> {
  return apiPost<ApiResponse<{ success: boolean }>>(API.others.geoLocation, data);
}

export async function submitEmployment(
  data: Record<string, unknown>,
): Promise<ApiResponse<{ submitted: boolean }>> {
  return apiPost<ApiResponse<{ submitted: boolean }>>(API.employment.submit, data);
}
