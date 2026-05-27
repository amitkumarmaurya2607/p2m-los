"use server";

import { saveStepCookie } from "@/lib/step-cookie";
import { apiPost } from "@/lib/axios";
import { API } from "@/lib/api/urls";

export async function submitAccountStatementAction(formData: FormData) {
  try {
    const result = await apiPost<{ success?: boolean; message?: string }>(
      API.bank.uploadStatement,
      formData,
    );
    if (result.success === false) {
      return { error: result.message || "Upload failed" };
    }
    await saveStepCookie("accountStatement");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to upload" };
  }
}

export async function submitAddressProofAction() {
  try {
    await saveStepCookie("addressProof");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save" };
  }
}

export async function submitAlternateMobileAction() {
  try {
    await saveStepCookie("alternateMobile");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save" };
  }
}
