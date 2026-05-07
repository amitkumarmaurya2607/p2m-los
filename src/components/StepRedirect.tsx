"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectCompletedSteps } from "@/features/application/applicationSlice";
import { steps as allSteps } from "@/lib/sessionStorage";

const bypassRoutes = ["/track-application", "/profile"];

const stepRouteMap: Record<string, string> = {
  mobile: "/login",
  pan: "/pan-details",
  personalInfo: "/personal-info",
  aadhaar: "/aadhar-details",
  bankDetails: "/bank-details",
  selfie: "/selfie-capture",
  employmentDetails: "/employment-details",
  loanCalculator: "/loan-calculator",
  review: "/review",
};

export default function StepRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const completedSteps = useAppSelector(selectCompletedSteps);
  const hasRedirected = useRef(false);

  useEffect(() => {
    for (const bypass of bypassRoutes) {
      if (pathname === bypass || pathname?.startsWith(bypass)) {
        return;
      }
    }

    if (pathname === "/review" || pathname === "/track-application") {
      return;
    }

    const allComplete = allSteps.every((step) => completedSteps.has(step.key));

    if (allComplete) {
      if (pathname !== "/track-application" && !hasRedirected.current) {
        hasRedirected.current = true;
        router.replace("/track-application");
      }
      return;
    }

    const nextPending = allSteps.find((step) => !completedSteps.has(step.key));

    if (nextPending) {
      const targetRoute = stepRouteMap[nextPending.key];
      if (targetRoute && pathname !== targetRoute && !hasRedirected.current) {
        hasRedirected.current = true;
        router.replace(targetRoute);
      }
    }
  }, [pathname, completedSteps, router]);

  return <>{children}</>;
}
