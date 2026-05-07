"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import {
  selectCompletedSteps,
  selectProgressPercentage,
  selectCurrentStep,
  selectApplication,
} from "@/features/application/applicationSlice";
import { steps as allSteps, type StepStatus } from "@/lib/sessionStorage";

export function useApplicationSteps() {
  const router = useRouter();

  const completedSteps = useAppSelector(selectCompletedSteps);
  const currentStep = useAppSelector(selectCurrentStep);
  const progress = useAppSelector(selectProgressPercentage);
  const application = useAppSelector(selectApplication);

  const stepStatuses = useCallback(() => {
    const map = new Map<string, StepStatus>();
    for (const step of allSteps) {
      if (completedSteps.has(step.key)) {
        map.set(step.key, "complete");
      } else {
        const stepIndex = allSteps.findIndex((s) => s.key === step.key);
        const allPreviousComplete = allSteps
          .slice(0, stepIndex)
          .every((s) => completedSteps.has(s.key));
        map.set(step.key, allPreviousComplete ? "progress" : "pending");
      }
    }
    return map;
  }, [completedSteps]);

  const goToStep = useCallback(
    (index: number) => {
      const step = allSteps[index];
      if (step) {
        if (step.key === "mobile") {
          router.push("/login");
        } else {
          const routeMap: Record<string, string> = {
            pan: "/pan-details",
            personalInfo: "/personal-info",
            aadhaar: "/aadhar-details",
            bankDetails: "/bank-details",
            selfie: "/selfie-capture",
            employmentDetails: "/employment-details",
            loanCalculator: "/loan-calculator",
            review: "/review",
          };
          const route = routeMap[step.key];
          if (route) router.push(route);
        }
      }
    },
    [router],
  );

  const getStepIndex = useCallback((currentKey: string) => {
    return allSteps.findIndex((s) => s.key === currentKey);
  }, []);

  return {
    completedSteps,
    currentStep,
    progress,
    stepStatuses: stepStatuses(),
    goToStep,
    application,
    steps: allSteps,
    getStepIndex,
  };
}
