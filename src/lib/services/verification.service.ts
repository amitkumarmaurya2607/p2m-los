import { apiGet, apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse, UserDetailsType } from "@/types";
import type {
  VerifyPANResponse,
  BankDetailsReaponce,
  KycUnifiedUrlResponse,
  modelType,
} from "@/lib/actions/action.type";
export async function verifyPAN(
  panNumber: string,
): Promise<ApiResponse<VerifyPANResponse>> {
  return apiPost<ApiResponse<VerifyPANResponse>>(
    API.pan.verify,
    { pan: panNumber },
  );
}

export async function digiLockerApi(): Promise<ApiResponse<KycUnifiedUrlResponse>> {
  return apiPost<ApiResponse<KycUnifiedUrlResponse>>(API.aadhaar.digiLocker, {});
}

export async function verifyBank(data: {
  accountType: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}): Promise<ApiResponse<BankDetailsReaponce>> {
  return apiPost<ApiResponse<BankDetailsReaponce>>(API.bank.verify, data);
}

export async function verifyDigiLockerCallback(
  token: string,
): Promise<ApiResponse<{ verified: boolean }>> {
  return apiPost<ApiResponse<{ verified: boolean }>>(API.aadhaar.verifyCallback, { token });
}

export async function saveGeoLocation(data: {
  geoLatitude: number;
  geoLongitude: number;
}): Promise<ApiResponse<UserDetailsType>> {
  return apiPost<ApiResponse<UserDetailsType>>(API.others.geoLocation, data);
}

export async function submitEmployment(
  data: Record<string, unknown>,
): Promise<ApiResponse<{ submitted: boolean }>> {
  return apiPost<ApiResponse<{ submitted: boolean }>>(API.employment.submit, data);
}

export async function triggerDigiLockerWebhook(
  txnId: string,
): Promise<ApiResponse<{ response: string }>> {
  return apiGet<ApiResponse<{ response: string }>>(API.webhook.digiLocker, {
    params: { txnId, success: true },
  });
}

export async function checkAadhaarStatus(
  transactionId: string,
): Promise<ApiResponse<{ status: string }>> {
  return apiPost<ApiResponse<{ status: string }>>(API.aadhaar.status, {
    transactionId,
  });
}
