"use server";

import { sendOTP, verifyOTP } from "@/lib/services/auth.service";
import { createSession } from "@/lib/session";
import { saveProgress } from "@/lib/services/progress.service";

export async function sendOTPAction(phone: string) {
  try {
    const result = await sendOTP(phone);
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return { success: false, data: null, error: err instanceof Error ? err.message : "Failed to send OTP" };
  }
}

export async function verifyOTPAction(phone: string, code: string) {
  try {
    const result = await verifyOTP(phone, code);
    if (!result.success) return { error: result.message || "Verification failed" };

    const token = result.data?.token || crypto.randomUUID();
    await createSession(token);
    await saveProgress("mobile");

    return { success: true as const, data: result.data };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Verification failed" };
  }
}
