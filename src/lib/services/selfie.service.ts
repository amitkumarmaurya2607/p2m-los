import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";

export async function uploadSelfie(
  formData: FormData,
): Promise<{ code?: string; message?: string }> {
  return apiPost<{ code?: string; message?: string }>(API.selfie.upload, formData ,{
    headers: { "Content-Type": "multipart/form-data" },
  });
}
