"use server";

import { submitContact } from "@/lib/services/contact.service";

export async function submitContactAction(data: { name: string; email: string; message: string }) {
  try {
    const result = await submitContact(data);
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : "Failed to send message",
    };
  }
}
