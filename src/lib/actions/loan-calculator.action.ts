"use server";

import { saveProgress } from "@/lib/services/progress.service";
import { saveStepCookie } from "@/lib/step-cookie";

export async function submitLoanCalculatorAction(data: {
  loanAmount: number;
  tenure: number;
  interestRate: number;
  emi: number;
  totalPayable: number;
}) {
  try {
    await saveProgress("loanCalculator", data);
    await saveStepCookie("loanCalculator");
    return { success: true as const };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save loan details" };
  }
}
