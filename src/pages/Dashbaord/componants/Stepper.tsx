import React from "react";
import { Check } from "lucide-react";

type StepStatus = "pending" | "progress" | "complete";

type Step = {
  id: number;
  title: string;
  description?: string;
  status: StepStatus;
};

const steps: Step[] = [
  { id: 1, title: "Mobile Verification", status: "complete" },
  { id: 2, title: "PAN Verification", status: "complete" },
  { id: 3, title: "Personal Details", status: "progress" },
  { id: 5, title: "Aadhaar Verification", status: "pending" },
  { id: 6, title: "Bank Details", status: "pending" },
  { id: 7, title: "Selfie Verification", status: "pending" },
];

export const StepperAlt = () => {
  return (
    <div className="w-[300px] bg-surface border-r border-border p-4">
      <div className="flex flex-col gap-3">
        {steps.map((step) => {
          return (
            <div
              key={step.id}
              className={`
              flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
              ${step.status === "progress"
                  ? "bg-primary-muted border border-primary/20"
                  : "hover:bg-muted"
                }
            `}
            >
              <div
                className={`
                w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium
                ${step.status === "complete"
                    ? "bg-stepper-complete text-primary-foreground"
                    : step.status === "progress"
                      ? "bg-stepper-progress text-primary-foreground"
                      : "bg-stepper-pending text-stepper-pending-text"
                  }
              `}
              >
                {step.status === "complete" ? (
                  <Check size={16} />
                ) : (
                  step.id
                )}
              </div>

              <div className="flex-1">
                <p
                  className={`
                  text-sm font-semibold
                  ${step.status === "progress"
                      ? "text-primary"
                      : step.status === "complete"
                        ? "text-text-heading"
                        : "text-stepper-pending-text"
                    }
                `}
                >
                  {step.title}
                </p>

                <p className="text-xs text-stepper-pending-text">
                  Step {step.id}
                </p>
              </div>

              {step.status === "progress" && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepperAlt;
