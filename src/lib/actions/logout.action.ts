"use server";

import { cookies } from "next/headers";
import { deleteSession } from "@/lib/session";
import { deleteStepCookie } from "@/lib/step-cookie";

export async function logoutAction() {
  await deleteSession();
  await deleteStepCookie();
  const cookieStore = await cookies();
  cookieStore.delete("p2m-lat");
  cookieStore.delete("p2m-lng");
  cookieStore.delete("p2m-city");
  cookieStore.delete("p2m-country");
  cookieStore.delete("p2m-region");
}
