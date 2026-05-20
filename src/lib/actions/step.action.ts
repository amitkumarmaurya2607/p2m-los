"use server";

import { getCompletedSteps } from "@/lib/step-cookie";

export async function getCompletedStepsAction(): Promise<string[]> {
  return getCompletedSteps();
}
