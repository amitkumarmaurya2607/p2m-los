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

export async function submitAddressProofAction(formData: FormData) {
  try {
    const result = await apiPost<{ code?: string; message?: string }>(
      API.addressProof.upload,
      formData,
    );
    if (result.code !== "0000") {
      return { error: result.message || "Upload failed" };
    }
    await saveStepCookie("addressProof");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to upload address proof" };
  }
}

export async function submitAlternateMobileAction(
  contact: { mobileNumber: string; name: string; relationType: string }
) {
  try {
    const result = await apiPost<{ code?: string; message?: string }>(
      API.alternateMobile.update,
      contact,
    );
    if (result.code !== "0000") {
      return { error: result.message || "Failed to save contact" };
    }
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save contact" };
  }
}

export async function saveAlternateMobileStepAction() {
  try {
    await saveStepCookie("alternateMobile");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save" };
  }
}
