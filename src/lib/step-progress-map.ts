export const stepProgressOrder = [
  { serverKey: "MOBILE_NUM_VERIFY", route: "/apply-now" },
  { serverKey: "GEO_LOCATION", route: "/geo-location" },
  { serverKey: "PAN_VERIFY", route: "/pan-details" },
  { serverKey: "PERSONAL_DETAIL", route: "/personal-info" },
  { serverKey: "AADHAAR_VERIFY", route: "/aadhar-details" },
  { serverKey: "BANK_VERIFY", route: "/bank-details" },
  { serverKey: "BANK_STATEMENT_OR_CONSENT", route: "/account-statement" },
  { serverKey: "SAVE_EMP_INFO", route: "/employment-details" },
  { serverKey: "MEDIA_UPLOAD", route: "/selfie-capture" },
  { serverKey: "LOCAL_ADD_PROOF", route: "/address-proof" },
  { serverKey: "ALTERNATE_MOB_NUM", route: "/alternate-mobile" },
  { serverKey: "LOAN_APPLY", route: "/loan-eligibility" },
] as const;

export type StepProgressItem = (typeof stepProgressOrder)[number];

const DEVICE_SAVE = "DEVICE_SAVE";

const serverKeyToOrderIndex: Record<string, number> = Object.fromEntries(
  stepProgressOrder.map((item, index) => [item.serverKey, index]),
);

export function buildOrderedStepStatuses(
  steps: Array<{ step: string; status: string; completedAt: string | null }>,
): string[] {
  const result = new Array(stepProgressOrder.length).fill("PENDING");
  for (const s of steps) {
    if (s.step === DEVICE_SAVE) continue;
    const idx = serverKeyToOrderIndex[s.step];
    if (idx !== undefined) {
      result[idx] = s.status;
    }
  }
  return result;
}

const routeIndexMap: Record<string, number> = Object.fromEntries(
  stepProgressOrder.map((item, index) => [item.route, index]),
);

export function getCurrentStepIndex(pathname: string): number {
  return routeIndexMap[pathname] ?? -1;
}

export function getStepRoute(index: number): string | undefined {
  return stepProgressOrder[index]?.route;
}
