"use server";

import { submitContact } from "@/lib/services/contact.service";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";

export async function submitContactAction(data: { name: string; email: string; message: string }) {
  try {
    const result = await submitContact(data);
    return { success: result.success, data: result.data, error: null };
  } catch (err) {
    rethrowIfRedirect(err);
    return { success: false, data: null, error: getErrorMessage(err, "Failed to send message") };
  }
}
