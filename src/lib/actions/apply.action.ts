"use server";

import {
  getLoanPrograms,
  submitApplication,
  getLoansCredibility,
  getLoanList,
  getLoanDetails,
  getCurrentRepayment,
  getInitPayment,
} from "@/lib/services/apply.service";
import { saveStepCookie } from "@/lib/step-cookie";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";
import { withDecryption } from "@/lib/secure-action";

export async function getLoanProgramsAction() {
  try {
    const result = await getLoanPrograms();
    if (result.code !== "0000") return { error: result.message || "Failed to fetch loan programs" };
    return { success: true as const, data: result.data ?? null };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to fetch loan programs") };
  }
}

export async function getLoansCredibilityAction() {
  try {
    const result = await getLoansCredibility();
    if (result.code !== "0000") return { error: result.message || "Failed to fetch loans credibility" };
    return { success: true as const, data: result.data ?? null };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to fetch loans credibility") };
  }
}

export async function getLoanListAction() {
  try {
    const result = await getLoanList();
    if (result.code !== "0000") return { error: result.message || "Failed to fetch loans" };
    return { success: true as const, data: result.data ?? [] };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to fetch loans") };
  }
}

export const getLoanDetailsAction = withDecryption(
  async function getLoanDetailsAction(loanId: string) {
    try {
      const result = await getLoanDetails(loanId);
      if (result.code !== "0000") {
        return { error: result.message || "Failed to fetch loan details" };
      }
      return { success: true as const, data: result.data ?? null };
    } catch (err) {
      rethrowIfRedirect(err);
      return { error: getErrorMessage(err, "Failed to fetch loan details") };
    }
  },
);

export const submitApplicationAction = withDecryption(async function submitApplicationAction(
  data: unknown,
) {
  try {
    const result = await submitApplication(data);
    if (result.code !== "0000") return { error: result.message || "Submission failed" };
    await saveStepCookie("loanEligibility");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to submit application") };
  }
});


export const getCurrentRepaymentAction = withDecryption(
  async function getCurrentRepaymentAction(loanId: string) {
    try {
      const result = await getCurrentRepayment(loanId);
      if (result.code !== "0000") {
        return { error: result.message || "Failed to fetch loan details" };
      }
      return { success: true as const, data: result.data ?? null };
    } catch (err) {
      rethrowIfRedirect(err);
      return { error: getErrorMessage(err, "Failed to fetch loan details") };
    }
  },
);
export const getInitPaymentAction = withDecryption(
  async function getInitPaymentAction(loanId: string) {
    try {
      const result = await getInitPayment(loanId);
      if (result.code !== "0000") {
        return { error: result.message || "Failed to fetch loan details" };
      }
      return { success: true as const, data: result.data ?? null };
    } catch (err) {
      rethrowIfRedirect(err);
      return { error: getErrorMessage(err, "Failed to fetch loan details") };
    }
  },
);