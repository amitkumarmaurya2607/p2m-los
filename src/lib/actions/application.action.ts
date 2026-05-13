"use server";

import { submitApplication, getApplicationStatus } from "@/lib/services/application.service";

export async function submitApplicationAction(data: unknown) {
  try {
    const result = await submitApplication(data);
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : "Failed to submit application",
    };
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
