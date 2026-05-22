"use server";

import { getProgress as getProgressService } from "@/lib/services/progress.service";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";

export async function getProgressAction() {
  try {
    const result = await getProgressService();
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    rethrowIfRedirect(err);
    return { success: false, data: null, error: getErrorMessage(err, "Failed to fetch progress") };
  }
}
