"use server";

import { saveStepCookie } from "@/lib/step-cookie";
import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";

export async function submitSelfieAction(formData: FormData) {
  try {
    const result = await apiPost<{ code?: string; message?: string }>(
      API.selfie.upload,
      formData,
    );
    if (result.code !== "0000") {
      return { error: result.message || "Upload failed" };
    }
    await saveStepCookie("selfie");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to upload selfie" };
  }
}
