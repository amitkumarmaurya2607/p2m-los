"use server";

import { saveStepCookie } from "@/lib/step-cookie";

export async function submitSelfieAction(formData:any) {
  try {
    console.log("formData",formData)
    await saveStepCookie("selfie");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save" };
  }
}
