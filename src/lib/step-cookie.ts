import "server-only";
import { cookies } from "next/headers";

const STEP_COOKIE_NAME = "p2m-step";
const STEP_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export async function saveStepCookie(step: string) {
  const cookieStore = await cookies();
  cookieStore.set(STEP_COOKIE_NAME, step, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: STEP_COOKIE_MAX_AGE,
  });
}

export async function getStepCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(STEP_COOKIE_NAME)?.value;
}

export async function deleteStepCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(STEP_COOKIE_NAME);
}
