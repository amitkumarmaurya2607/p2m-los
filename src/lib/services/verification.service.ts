import { apiGet, apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import type { ApiResponse, UserDetailsType } from "@/types";


type VerifyPANResponse = {
  success: boolean;
  dob: string;
  name: string;
  address: string;
  fathersName: string | null;
  message: string;
  provider: "DIGITAP" | string;
  raw: Record<string, unknown>;
};

 export type BankDetailsReaponce = {
  id: string;
  userId: string;

  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountType: "SAVINGS" | "CURRENT" | string;

  isVerified: boolean;
  verificationMethod: string | null;
  verificationStatus: "VERIFIED" | "NOT_VERIFIED" | "PENDING" | "FAILED" | string;
  verifiedAt: string | null;

  createdAt: string;
  updatedAt: string;

  userDataStatus: "VERIFIED" | "NOT_VERIFIED" | "PENDING" | "FAILED" | string;
  isPrimary: boolean;

  pennyDropResponse: unknown | null;
  pennyDropStatus: string | null;
  pennyVerifiedName: string | null;

  beneficiary_name: string | null;
  name_match_percentage: number | null;
  verification_provider: string | null;
};

export type KycUnifiedUrlResponse = {
  success: boolean;
  message: string;
  url: string;
  id: string;
  uniqueId: string;
  provider: "DIGITAP" | string;
  raw: {
    code: string;
    model: modelType;
  };
};

export type modelType =  {
      url: string;
      transactionId: string;
      kycUrl: string;
    }
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
