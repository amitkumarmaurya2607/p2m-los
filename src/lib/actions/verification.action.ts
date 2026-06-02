"use server";

import {
  verifyPAN,
  digiLockerApi,
  verifyBank,
  submitEmployment,
  saveGeoLocation,
} from "@/lib/services/verification.service";
import { saveStepCookie } from "@/lib/step-cookie";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";
import { withDecryption } from "@/lib/secure-action";

export async function handleDigiLockerCallbackAction() {
  try {
    await saveStepCookie("aadhaar");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to save progress") };
  }
}

export const verifyPANAction = withDecryption(async function verifyPANAction(panNumber: string) {
  try {
    const result = await verifyPAN(panNumber);
    if (result.code !== "0000") return { error: result.message || "PAN verification failed" };
    await saveStepCookie("pan");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "PAN verification failed") };
  }
});

export async function digiLockerAction() {
  try {
    const result = await digiLockerApi();
    if (result.code !== "0000")
      return { error: result.message || "digiLocker verification failed" };
    return { success: true as const, data: result.data };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "digiLocker failed") };
  }
}

export const verifyBankAction = withDecryption(async function verifyBankAction(data: {
  accountType: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}) {
  try {
    const result = await verifyBank(data);
    if (result.code !== "0000") return { error: result.message || "Bank verification failed" };
    await saveStepCookie("bankDetails");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Bank verification failed") };
  }
});

export const saveGeoLocationAction = withDecryption(async function saveGeoLocationAction(_data: {
  latitude: number;
  longitude: number;
  accuracy: number;
}) {
  try {
    const result = await saveGeoLocation({
      geoLatitude: _data.latitude,
      geoLongitude: _data.longitude,
    });
    if (result.code !== "0000") return { error: result.message || "Failed to save geo location" };
    await saveStepCookie("geoLocation");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to save geo location") };
  }
});

export const saveLocationCookiesAction = withDecryption(async function saveLocationCookiesAction(data: { latitude: number; longitude: number }) {
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
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to save location cookies") };
  }
});

export const submitEmploymentAction = withDecryption(async function submitEmploymentAction(data: Record<string, unknown>) {
  try {
    const modeMap: Record<string, string> = {
      "Bank Transfer": "BANK_TRANSFER",
      Cash: "CASH",
      Cheque: "CHEQUE",
    };

    const payload = {
      companyName: (data.companyName as string) ?? "",
      designation: (data.designation as string) ?? "",
      officialEmail: (data.officialEmail as string) ?? "",
      joiningDate: (data.joiningDate as string) ?? "",
      salary: Number(data.salary) || 0,
      companyAddress: [data.city, data.state].filter(Boolean).join(", "),
      pinCode: (data.pinCode as string) ?? "",
      uanNumber: (data.uanNumber as string) ?? "",
      expectedDateOfSalary: Number(data.expectedDateOfSalary) || 0,
      modeOfSalary: modeMap[String(data.modeOfSalary)] || String(data.modeOfSalary),
    };

    const result = await submitEmployment(payload);
    if (result.code !== "0000") return { error: result.message || "Submission failed" };
    await saveStepCookie("employmentDetails");
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to submit employment details") };
  }
});
