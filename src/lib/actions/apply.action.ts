"use server";

import {
  getLoanPrograms,
  submitApplication,
  getApplicationStatus,
} from "@/lib/services/apply.service";
import { saveStepCookie } from "@/lib/step-cookie";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";

export async function getLoanProgramsAction() {
  try {
    const result = await getLoanPrograms();
    if (result.code !== "0000") return { error: result.message || "Failed to fetch loan programs" };
    return { success: true as const, data: result.data ?? [] };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to fetch loan programs") };
  }
}

export async function submitApplicationAction(data: unknown) {
  try {
    const result = await submitApplication(data);
    if (result.code !== "0000") return { error: result.message || "Submission failed" };
    await saveStepCookie("loanEligibility");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to submit application") };
  }
}

export async function getApplicationStatusAction(id: string) {
  try {
    const result = await getApplicationStatus(id);
    if (result.code !== "0000")
      return { error: result.message || "Failed to fetch application status" };
    return { success: true as const, data: result.data };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to fetch application status") };
  }
}
