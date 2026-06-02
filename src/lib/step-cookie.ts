import "server-only";
import { cookies } from "next/headers";

const STEP_COOKIE_NAME = "p2m-step";
const STEP_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const stepOrder: string[] = [
  "mobile",
  "geoLocation",
  "pan",
  "personalInfo",
  "aadhaar",
  "bankDetails",
  "accountStatement",
  "employmentDetails",
  "selfie",
  "addressProof",
  "alternateMobile",
  "loanEligibility",
];

export async function saveStepCookie(step: string) {
  const cookieStore = await cookies();
  const stepId = stepOrder.indexOf(step) + 1;
  if (stepId === 0) return;
  const isDev = process.env.NODE_ENV === "development";
  cookieStore.set(STEP_COOKIE_NAME, `step${stepId}`, {
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
  const match = value.match(/^step(\d+)$/);
  if (!match) return [];
  return stepOrder.slice(0, parseInt(match[1]));
}

export async function deleteStepCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(STEP_COOKIE_NAME);
}

export { stepOrder };
