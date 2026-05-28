"use server";

import { saveStepCookie } from "@/lib/step-cookie";
import { uploadAccountStatement, uploadAddressProof, updateAlternateMobile } from "@/lib/services/document.service";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";

export async function submitAccountStatementAction(formData: FormData) {
  try {
    const result = await uploadAccountStatement(formData);
    if (result.code !== "0000") {
      return { error: result.message || "Upload failed" };
    }
    await saveStepCookie("accountStatement");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to upload account statement") };
  }
}

export async function submitAddressProofAction(formData: FormData) {
  try {
    const result = await uploadAddressProof(formData);
    if (result.code !== "0000") {
      return { error: result.message || "Upload failed" };
    }
    await saveStepCookie("addressProof");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to upload address proof") };
  }
}

export async function submitAlternateMobileAction(
  contact: { mobileNumber: string; name: string; relationType: string }
) {
  try {
    const result = await updateAlternateMobile(contact);
    if (result.code !== "0000") {
      return { error: result.message || "Failed to save contact" };
    }
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to save contact") };
  }
}

export async function saveAlternateMobileStepAction() {
  try {
    await saveStepCookie("alternateMobile");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to save step") };
  }
}
