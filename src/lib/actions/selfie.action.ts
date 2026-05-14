"use server";

import { saveProgress } from "@/lib/services/progress.service";

export async function submitSelfieAction() {
  try {
    await saveProgress("selfie");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save" };
  }
}
