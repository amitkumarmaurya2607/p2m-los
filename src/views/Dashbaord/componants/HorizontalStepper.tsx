"use client";

import React from "react";
import { Check } from "lucide-react";
import { useApplicationSteps } from "@/hooks/useApplicationSteps";
import { steps as allSteps } from "@/lib/sessionStorage";

const HorizontalStepper = () => {
  const { stepStatuses, goToStep } = useApplicationSteps();

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center min-w-max px-2 md:min-w-full md:px-0">
        {allSteps.map((step, index) => {
          const isLast = index === allSteps.length - 1;
          const status = stepStatuses.get(step.key) || "pending";

          return (
            <div key={step.id} className="flex items-center flex-shrink-0 md:flex-1">
              {/* Step */}
              <div
                className={` flex flex-col items-center text-center min-w-[70px] md:min-w-[100px]
                ${status !== "pending" ? "cursor-pointer" : ""} `}
                onClick={() => status !== "pending" && goToStep(index)}
              >
                {/* Circle */}
                <div
                  className={` w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full
                  text-xs md:text-sm font-semibold ${
                    status === "complete"
                      ? "bg-stepper-complete text-white"
                      : status === "progress"
                        ? "bg-stepper-progress text-white"
                        : "bg-stepper-pending text-stepper-pending-text"
                  } `}
                >
                  {status === "complete" ? <Check size={14} className="md:w-4 md:h-4" /> : step.id}
                </div>

                {/* Title */}
                <p
                  className={` mt-1 md:mt-2 text-[10px] md:text-xs font-semibold whitespace-nowrap
                  ${
                    status === "progress"
                      ? "text-primary"
                      : status === "complete"
                        ? "text-text-heading"
                        : "text-stepper-pending-text"
                  } `}
                >
                  {step.title}
                </p>
              </div>

              {/* Line */}
              {!isLast && (
                <div
                  className={` h-[2px] mx-2 w-8 md:w-full
                  ${status === "complete" ? "bg-stepper-complete" : "bg-border"} `}
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
