"use server";

import { deleteSession } from "@/lib/session";
import { deleteStepCookie } from "@/lib/step-cookie";

export async function logoutAction() {
  await deleteSession();
  await deleteStepCookie();
}
