"use client";

import React from "react";
import { Check } from "lucide-react";
import { steps as allSteps, type StepStatus } from "@/lib/sessionStorage";

const StepperAlt = () => {
  const getStepStatus = (stepKey: string): StepStatus => {
    return "progress";
    const stepIndex = allSteps.findIndex((s) => s.key === stepKey);
    const allPreviousComplete = allSteps
      .slice(0, stepIndex)
      .every((s) => completedSteps.has(s.key));
    return allPreviousComplete ? "progress" : "pending";
  };

  return (
    <div className="w-[300px] bg-surface border-r border-border p-4">
      <div className="flex flex-col gap-3">
        {allSteps.map((step) => {
          const status = getStepStatus(step.key);

          return (
            <div
              key={step.id}
              className={` flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                status === "progress"
                  ? "bg-primary-muted border border-primary/20"
                  : "hover:bg-muted"
              } `}
            >
              <div
                className={` w-9 h-9 flex items-center justify-center rounded-full text-sm
                font-medium ${
                  status === "complete"
                    ? "bg-stepper-complete text-primary-foreground"
                    : status === "progress"
                      ? "bg-stepper-progress text-primary-foreground"
                      : "bg-stepper-pending text-stepper-pending-text"
                } `}
              >
                {status === "complete" ? <Check size={16} /> : step.id}
              </div>

              <div className="flex-1">
                <p
                  className={` text-sm font-semibold ${
                    status === "progress"
                      ? "text-primary"
                      : status === "complete"
                        ? "text-text-heading"
                        : "text-stepper-pending-text"
                  } `}
                >
                  {step.fullTitle}
                </p>

                <p className="text-xs text-stepper-pending-text">Step {step.id}</p>
              </div>

              {status === "progress" && <div className="w-2 h-2 rounded-full bg-primary" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepperAlt;
