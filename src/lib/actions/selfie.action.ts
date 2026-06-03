"use server";

import { saveStepCookie } from "@/lib/step-cookie";
import { uploadSelfie } from "@/lib/services/selfie.service";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";
import { withDecryption } from "@/lib/secure-action";

export const submitSelfieAction = withDecryption(async function submitSelfieAction(
  formData: FormData,
) {
  try {
    const result = await uploadSelfie(formData);
    if (result.code !== "0000") {
      return { error: result.message || "Upload failed" };
    }
    await saveStepCookie("selfie");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to upload selfie") };
  }
});
