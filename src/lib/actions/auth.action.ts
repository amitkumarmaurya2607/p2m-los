"use server";

import { sendOTP, verifyOTP } from "@/lib/services/auth.service";
import { createSession } from "@/lib/session";
import { saveStepCookie } from "@/lib/step-cookie";
import { loginPayload, loginVerifyPayload } from "@/views/Auth/type";

export async function sendOTPAction(mobileNumber: string) {
  const payload: loginPayload = {
    mobileNumber,
    orgId: process.env.ORG_ID || "",
  };  try {
    const result = await sendOTP(payload);
    console.log("sendOTP result:", result); // Debugging line
    if (result.code !== "0001" && result.data) {
      return { success: true as const, data: result.data };
    }
    return { error: result.msg || result.message || "Failed to send OTP" };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to send OTP" };
  }
}

export async function verifyOTPAction(payload: loginVerifyPayload) {
  payload.orgId = process.env.ORG_ID || "";
  console.log("Verifying OTP with payload:", payload); // Debugging line
  try {
    const result = await verifyOTP(payload);
    console.log("verifyOTP result:", result); // Debugging line 
  if (result?.code !== "0001" && result.data) {
      const token = result.data?.accessToken;
    await createSession(token);
    await saveStepCookie("mobile");
      return { success: true as const, data: result.data };
    }
    return { error: result.msg || result.message || "Failed to send OTP" };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Verification failed" };
  }
}
