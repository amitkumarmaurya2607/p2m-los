"use server";

import { fetchStatementUrl } from "@/lib/services/statement.service";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";

export async function fetchStatementUrlAction() {
  try {
    const result = await fetchStatementUrl();
    if (!result.tempUrl) {
      return { error: "Failed to fetch statement URL" };
    }
    return { success: true as const, data: result };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to fetch statement URL") };
  }
}
