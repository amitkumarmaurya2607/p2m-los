"use server";

import { saveStepCookie } from "@/lib/step-cookie";

export async function submitAccountStatementAction() {
  try {
    await saveStepCookie("accountStatement");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save" };
  }
}

export async function submitAddressProofAction() {
  try {
    await saveStepCookie("addressProof");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save" };
  }
}

export async function submitAlternateMobileAction() {
  try {
    await saveStepCookie("alternateMobile");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save" };
  }
}
