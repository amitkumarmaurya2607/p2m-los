import React from "react";
import { Check } from "lucide-react";

type StepStatus = "pending" | "progress" | "complete";

type Step = {
  id: number;
  title: string;
  status: StepStatus;
};

const steps: Step[] = [
  { id: 1, title: "Mobile", status: "complete" },
  { id: 2, title: "PAN", status: "complete" },
  { id: 3, title: "Personal", status: "progress" },
  { id: 5, title: "Aadhaar", status: "pending" },
  { id: 6, title: "Bank", status: "pending" },
  { id: 7, title: "Selfie", status: "pending" },
];

const HorizontalStepper = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center min-w-max px-2 md:min-w-full md:px-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-shrink-0 md:flex-1">

              {/* Step */}
              <div className="flex flex-col items-center text-center min-w-[70px] md:min-w-[100px]">

                {/* Circle */}
                <div
                  className={`
                  w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-xs md:text-sm font-semibold
                  ${step.status === "complete"
                      ? "bg-stepper-complete text-white"
                      : step.status === "progress"
                        ? "bg-stepper-progress text-white"
                        : "bg-stepper-pending text-stepper-pending-text"
                    }
                `}
                >
                  {step.status === "complete" ? (
                    <Check size={14} className="md:w-4 md:h-4" />
                  ) : (
                    step.id
                  )}
                </div>

                {/* Title */}
                <p
                  className={`
                  mt-1 md:mt-2 text-[10px] md:text-xs font-semibold whitespace-nowrap
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
              </div>

              {/* Line */}
              {!isLast && (
                <div
                  className={`
                  h-[2px] mx-2 w-8 md:w-full
                  ${step.status === "complete"
                      ? "bg-stepper-complete"
                      : "bg-border"
                    }
                `}
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