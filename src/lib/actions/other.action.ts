"use server";
import { getErrorMessage, rethrowIfRedirect } from "../redirect-error";
import { getProfileData } from "../services/other.service";

export async function getProfileDataAction() {
  try {
    const result = await getProfileData();
    if (result.code !== "0000") return { error: result.message || "Failed to fetch profile data" };
    return { success: true as const, data: result.data };
  } catch (err) {
    rethrowIfRedirect(err);
    return { error: getErrorMessage(err, "Failed to fetch profile data") };
  }
}
