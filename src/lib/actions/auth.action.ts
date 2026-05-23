"use server";

import { cookies } from "next/headers";
import { sendOTP, verifyOTP } from "@/lib/services/auth.service";
import { createSession } from "@/lib/session";
import { saveStepCookie } from "@/lib/step-cookie";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";
import { loginPayload, loginVerifyPayload } from "@/views/Auth/type";

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

export async function sendOTPAction(mobileNumber: string) {
  const payload: loginPayload = {
    mobileNumber,
    orgId: process.env.ORG_ID || "",
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
}

export async function verifyOTPAction(payload: loginVerifyPayload) {
  payload.orgId = process.env.ORG_ID || "";
  console.log("Verifying OTP with payload:", payload);
  try {
    const result = await verifyOTP(payload);
    console.log("verifyOTP result:", result);
    if (result?.code !== "0001" && result.data) {
      const token = result.data?.accessToken;
      await createSession(token);
      await saveStepCookie("mobile");
      await saveUserIdCookie(result.data.userId);
      return { success: true as const, data: result.data };
    }
    return { error: result.msg || result.message || "Failed to send OTP" };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Verification failed") };
  }
}
