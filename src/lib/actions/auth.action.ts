"use server";

import { sendOTP, verifyOTP } from "@/lib/services/auth.service";

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
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return { success: false, data: null, error: err instanceof Error ? err.message : "Failed to verify OTP" };
  }
}
