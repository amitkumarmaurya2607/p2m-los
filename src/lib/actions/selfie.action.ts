"use server";

import { saveProgress } from "@/lib/services/progress.service";
import { saveStepCookie } from "@/lib/step-cookie";

export async function submitSelfieAction() {
  try {
    await saveProgress("selfie");
    await saveStepCookie("selfie");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save" };
  }
}
