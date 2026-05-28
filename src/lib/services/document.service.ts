import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";

export async function uploadAccountStatement(
  formData: FormData,
): Promise<{ code?: string; message?: string }> {
  return apiPost<{ code?: string; message?: string }>(API.bank.uploadStatement, formData);
}

export async function uploadAddressProof(
  formData: FormData,
): Promise<{ code?: string; message?: string }> {
  return apiPost<{ code?: string; message?: string }>(API.addressProof.upload, formData);
}

export async function updateAlternateMobile(contact: {
  mobileNumber: string;
  name: string;
  relationType: string;
}): Promise<{ code?: string; message?: string }> {
  return apiPost<{ code?: string; message?: string }>(API.alternateMobile.update, contact);
}
