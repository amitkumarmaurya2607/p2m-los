"use server";

import { submitContact } from "@/lib/services/contact.service";
import { rethrowIfRedirect, getErrorMessage } from "@/lib/redirect-error";
import { withDecryption } from "@/lib/secure-action";

export const submitContactAction = withDecryption(async function submitContactAction(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const result = await submitContact(data);
    if (result.code !== "0000") return { error: result.message || "Failed to send message" };
    return { success: true as const };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to send message") };
  }
});
