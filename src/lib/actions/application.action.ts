"use server";

import { submitApplication, getApplicationStatus } from "@/lib/services/application.service";
import { saveStepCookie } from "@/lib/step-cookie";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";

export async function submitApplicationAction(data: unknown) {
  try {
    const result = await submitApplication(data);
    if (!result.success) return { error: result.message || "Submission failed" };
    await saveStepCookie("loanEligibility");
    return { success: true as const, data: result.data };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to submit application") };
  }
}

export async function getApplicationStatusAction(id: string) {
  try {
    const result = await getApplicationStatus(id);
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    rethrowIfRedirect(err);
    return { success: false, data: null, error: getErrorMessage(err, "Failed to fetch application status") };
  }
}
