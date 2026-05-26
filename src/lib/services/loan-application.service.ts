import { getMockLoanApplication } from "@/lib/mock/loan-application.data";
import type { LoanApplication } from "@/types";

export async function fetchLoanApplication(): Promise<LoanApplication> {
  return getMockLoanApplication();
}
