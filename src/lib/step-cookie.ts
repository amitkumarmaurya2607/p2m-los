import "server-only";
import { cookies } from "next/headers";

const STEP_COOKIE_NAME = "p2m-step";
const STEP_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export async function saveStepCookie(step: string) {
  const cookieStore = await cookies();
  const existing = cookieStore.get(STEP_COOKIE_NAME)?.value;
  const steps = existing ? existing.split(",") : [];
  if (!steps.includes(step)) {
    steps.push(step);
  }
  const isDev = process.env.NODE_ENV === "development";
  cookieStore.set(STEP_COOKIE_NAME, steps.join(","), {
    httpOnly: true,
    secure: !isDev,
    sameSite: isDev ? undefined : "lax",
    path: "/",
    maxAge: STEP_COOKIE_MAX_AGE,
  });
}

export async function getCompletedSteps(): Promise<string[]> {
  const cookieStore = await cookies();
  const value = cookieStore.get(STEP_COOKIE_NAME)?.value;
  if (!value) return [];
  return value.split(",").filter(Boolean);
}

export async function deleteStepCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(STEP_COOKIE_NAME);
}
