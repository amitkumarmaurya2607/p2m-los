"use server";

import { verifyPAN } from "@/lib/services/pan.service";
import { digiLockerApi, sendAadhaarOTP, verifyAadhaarOTP } from "@/lib/services/aadhaar.service";
import { verifyBank } from "@/lib/services/bank.service";
import { submitEmployment } from "@/lib/services/employment.service";
import { saveStepCookie } from "@/lib/step-cookie";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";

export async function verifyPANAction(panNumber: string) {
  try {
    const result = await verifyPAN(panNumber);
    console.log("PAN verification result:", result);
    if (result.code !== "0000") return { error: result.message || "PAN verification failed" };
    await saveStepCookie("pan");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "PAN verification failed") };
  }
}

export async function digiLockerAction() {
  try {
    const result = await digiLockerApi();
     if (result.code !== "0000") return { error: result.message || "digiLocker verification failed" };
    return { success: true, data: result.data, response: result?.data };
  } catch (err) {
    rethrowIfRedirect(err);
    return { success: false, error: getErrorMessage(err, "digiLocker failed") };
  }
}

export async function sendAadhaarOTPAction(aadhaarNumber: string) {
  try {
    const result = await sendAadhaarOTP(aadhaarNumber);
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    rethrowIfRedirect(err);
    return { success: false, data: null, error: getErrorMessage(err, "Failed to send Aadhaar OTP") };
  }
}

export async function verifyAadhaarOTPAction(aadhaarNumber: string, code: string) {
  try {
    const result = await verifyAadhaarOTP(aadhaarNumber, code);
    if (!result.success) return { error: result.message || "Aadhaar verification failed" };
    await saveStepCookie("aadhaar");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to verify Aadhaar OTP") };
  }
}

export async function verifyBankAction(data: {
  userId: string;
  accountNumber: string;
  ifscCode: string;
  benName: string;
}) {
  try {
    const result = await verifyBank({
      ...data,
      orgId: process.env.ORG_ID?.trim() || "",
    });
     if (result.code !== "0000") return { error: result.message || "Bank verification failed" };
   
    await saveStepCookie("bankDetails");
    return { success: true as const, data: result.data };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Bank verification failed") };
  }
}

export async function saveGeoLocationAction(data: {
  latitude: number;
  longitude: number;
  accuracy: number;
}) {
  try {
    await saveStepCookie("geoLocation");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to save geo location") };
  }
}

export async function saveLocationCookiesAction(data: {
  latitude: number;
  longitude: number;
  accuracy: number;
}) {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const isDev = process.env.NODE_ENV === "development";
    const opts = {
      httpOnly: true,
      secure: !isDev,
      sameSite: "lax" as const,
      path: "/" as const,
      maxAge: 60 * 60 * 24 * 7,
    };
    cookieStore.set("p2m-lat", String(data.latitude), opts);
    cookieStore.set("p2m-lng", String(data.longitude), opts);
    cookieStore.set("p2m-acc", String(data.accuracy), opts);
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to save location cookies") };
  }
}

export async function submitEmploymentAction(data: {
  companyName: string;
  designation: string;
  email: string;
  salaryMode: string;
  joiningDate: string;
  uan: string;
  state: string;
  city: string;
  pincode: string;
}) {
  try {
    const result = await submitEmployment(data);
    if (!result.success) return { error: result.message || "Employment submission failed" };
    await saveStepCookie("employmentDetails");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to submit employment details") };
  }
}
