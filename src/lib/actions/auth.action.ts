"use server";

import { cookies } from "next/headers";
import { sendOTP, verifyOTP, getStepProgress } from "@/lib/services/auth.service";
import { createSession } from "@/lib/session";
import { saveStepCookie } from "@/lib/step-cookie";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";
import { loginPayload, loginVerifyPayload } from "@/views/Auth/type";
import { withDecryption } from "@/lib/secure-action";

export async function saveUserIdCookie(userId: string) {
  const cookieStore = await cookies();
  const isDev = process.env.NODE_ENV === "development";
  cookieStore.set("p2m-user-id", userId, {
    httpOnly: false,
    secure: !isDev,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export const sendOTPAction = withDecryption(async function sendOTPAction(mobileNumber: string) {
  const payload: loginPayload = {
    mobileNumber: `+91${mobileNumber}`,
    brandId: process.env.ORG_ID || "",
  };
  try {
    const result = await sendOTP(payload);
    console.log("sendOTP result:", result);
    if (result.code !== "0001" && result.data) {
      return { success: true as const, data: result.data };
    }
    return { error: result.msg || result.message || "Failed to send OTP" };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to send OTP") };
  }
});

export const verifyOTPAction = withDecryption(async function verifyOTPAction(
  payload: loginVerifyPayload,
) {
  payload.brandId = process.env.ORG_ID || "";
  console.log("Verifying OTP with payload:", payload);
  try {
    const result = await verifyOTP(payload);
    console.log("verifyOTP result:", result);
    if (result?.code !== "0001" && result.data) {
      const token = result.data?.accessToken;
      await createSession(token);
      await saveUserIdCookie(result.data?.user?.id);
      return { success: true as const, data: result.data };
    }
    return { error: result.msg || result.message || "Failed to send OTP" };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Verification failed") };
  }
});

export async function getStepProgressAction() {
  try {
    const result = await getStepProgress();
    if (result.code !== "0000") return { error: result.message || "Failed to fetch progress" };
    return { success: true as const, data: result.data };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to fetch progress") };
  }
}
