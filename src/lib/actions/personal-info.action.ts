"use server";

import {
  getPersonalInfo,
  sendEmailOTP,
  submitPersonalInfo,
} from "@/lib/services/personal-info.service";
import { saveStepCookie } from "@/lib/step-cookie";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";
import { withDecryption } from "@/lib/secure-action";

export const sendEmailOTPAction = withDecryption(async function sendEmailOTPAction(email: string) {
  try {
    const result = await sendEmailOTP(email);
    if (result.code !== "0000") return { error: result.message || "Failed to send email OTP" };
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to send email OTP") };
  }
});

function buildPayload(data: Record<string, unknown>) {
  return {
    fathersName: data.fatherName ?? "",
    pinCode: data.pincode ?? "",
    firstName: data.firstName ?? "",
    middleName: data.secondName ?? "",
    lastName: data.lastName ?? "",
    state: data.state ?? "",
    city: data.city ?? "",
    address: data.address ?? "",
    dateOfBirth: data.dob ?? "",
    email: data.email ?? "",
    // gender: data.gender ?? "",
  };
}

export const submitPersonalInfoAction = withDecryption(async function submitPersonalInfoAction(
  data: Record<string, unknown>,
) {
  try {
    const result = await submitPersonalInfo(buildPayload(data));
    if (result.code !== "0000") return { error: result.message || "Submission failed" };
    await saveStepCookie("personalInfo");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to submit personal info") };
  }
});

export async function getPersonalInfoAction() {
  try {
    const result = await getPersonalInfo();
    if (result.code !== "0000") return { error: result.message || "Failed to fetch progress" };
    return { success: true as const, data: result.data };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to fetch progress") };
  }
}
