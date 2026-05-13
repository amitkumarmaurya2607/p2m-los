"use client";

import React from "react";
import { Check } from "lucide-react";
import { useApplicationSteps } from "@/hooks/useApplicationSteps";
import { steps as allSteps } from "@/lib/sessionStorage";

const HorizontalStepper = ({ version = "v1" }: { version?: "v1" | "v2" }) => {
  const { stepStatuses, goToStep } = useApplicationSteps();

 if (version === "v2") {
  return (
    <div className="hidden sm:flex w-full items-center gap-3 mb-16">
      {allSteps.map((step, index) => {
        const isLast = index === allSteps.length - 1;
        const status = stepStatuses.get(step.key) || "pending";

        return (
          <React.Fragment key={step.id}>
            <div className="relative group flex items-center justify-center">
              <span
                onClick={() => status !== "pending" && goToStep(index)}
                className={`h-2 w-2 rounded-full transition-all
                  ${status !== "pending" ? "cursor-pointer" : ""}
                  ${
                    status === "progress"
                      ? "border-2 border-primary bg-white"
                      : status === "complete"
                        ? "bg-primary"
                        : "bg-slate-300"
                  }
                `}
              />

              {/* Tooltip */}
              <div
                className="
                  pointer-events-none absolute -top-10 left-1/2 z-20
                  -translate-x-1/2 whitespace-nowrap rounded-lg
                  bg-slate-900 px-3 py-1.5 text-[11px] font-medium
                  text-white opacity-0 shadow-lg transition-all duration-200
                  group-hover:opacity-100 group-hover:-translate-y-1
                "
              >
                {step.title}
              </div>
            </div>

            {!isLast && (
              <span
                className={`h-px flex-1 ${
                  status === "complete" ? "bg-primary" : "bg-slate-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center min-w-max px-2 md:min-w-full md:px-0">
        {allSteps.map((step, index) => {
          const isLast = index === allSteps.length - 1;
          const status = stepStatuses.get(step.key) || "pending";

          return (
            <div key={step.id} className="flex items-center flex-shrink-0 md:flex-1">
              <div
                className={`flex flex-col items-center text-center min-w-[70px] md:min-w-[100px]
                ${status !== "pending" ? "cursor-pointer" : ""}`}
                onClick={() => status !== "pending" && goToStep(index)}
              >
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full
                  text-xs md:text-sm font-semibold ${
                    status === "complete"
                      ? "bg-stepper-complete text-white"
                      : status === "progress"
                        ? "bg-stepper-progress text-white"
                        : "bg-stepper-pending text-stepper-pending-text"
                  }`}
                >
                  {status === "complete" ? (
                    <Check size={14} className="md:w-4 md:h-4" />
                  ) : (
                    step.id
                  )}
                </div>

                <p
                  className={`mt-1 md:mt-2 text-[10px] md:text-xs font-semibold whitespace-nowrap
                  ${
                    status === "progress"
                      ? "text-primary"
                      : status === "complete"
                        ? "text-text-heading"
                        : "text-stepper-pending-text"
                  }`}
                >
                  {step.title}
                </p>
              </div>

              {!isLast && (
                <div
                  className={`h-[2px] mx-2 w-8 md:w-full
                  ${status === "complete" ? "bg-stepper-complete" : "bg-border"}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalStepper;