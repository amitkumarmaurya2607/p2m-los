"use server";

import { saveProgress as saveProgressService, getProgress as getProgressService } from "@/lib/services/progress.service";

export async function saveProgressAction(step: string, data?: unknown) {
  try {
    const result = await saveProgressService(step, data);
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : "Failed to save progress",
    };
  }
}

export async function getProgressAction() {
  try {
    const result = await getProgressService();
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : "Failed to fetch progress",
    };
  }
}
