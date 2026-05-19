"use server";

import { submitApplication, getApplicationStatus } from "@/lib/services/application.service";
import { saveStepCookie } from "@/lib/step-cookie";

export async function submitApplicationAction(data: unknown) {
  try {
    const result = await submitApplication(data);
    if (!result.success) return { error: result.message || "Submission failed" };
    await saveStepCookie("review");
    return { success: true as const, data: result.data };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to submit application" };
  }
}

export async function getApplicationStatusAction(id: string) {
  try {
    const result = await getApplicationStatus(id);
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : "Failed to fetch application status",
    };
  }
}
