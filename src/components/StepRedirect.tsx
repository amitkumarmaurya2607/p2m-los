"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useApplicationContext } from "@/context/ApplicationContext";
import { steps as allSteps } from "@/lib/sessionStorage";

const bypassRoutes = ["/track-application", "/profile", "/review"];

const stepRouteMap: Record<string, string> = {
  mobile: "/apply",
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
  const { completedSteps } = useApplicationContext();

  useEffect(() => {
    if (bypassRoutes.includes(pathname)) return;

    const allComplete = allSteps.every((step) => completedSteps.has(step.key));

    if (allComplete) {
      if (pathname !== "/track-application") {
        router.replace("/track-application");
      }
      return;
    }

    const nextPending = allSteps.find((step) => !completedSteps.has(step.key));
    if (nextPending) {
      const targetRoute = stepRouteMap[nextPending.key];
      if (targetRoute && pathname !== targetRoute) {
        router.replace(targetRoute);
      }
    }
  }, [pathname, completedSteps, router]);

  return <>{children}</>;
}
