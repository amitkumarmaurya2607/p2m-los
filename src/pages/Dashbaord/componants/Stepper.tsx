// import React from "react";
// import { Check } from "lucide-react";

// type StepStatus = "pending" | "progress" | "complete";

// type Step = {
//   id: number;
//   title: string;
//   description?: string;
//   status: StepStatus;
// };


// const steps = [
//   { id: 1, title: "Mobile Verification", status: "complete" },
//   { id: 2, title: "PAN Verification", status: "complete" },
//   { id: 3, title: "Personal Details", status: "progress" },
//   { id: 4, title: "Email Verification", status: "pending" },
//   { id: 5, title: "Aadhaar Verification", status: "pending" },
//   { id: 6, title: "Bank Details", status: "pending" },
//   { id: 7, title: "Selfie Verification", status: "pending" },
// ];
// const Stepper = () => {
//   return (
//     <div className="w-[280px] bg-white border-r border-slate-200 p-4">
//       <div className="flex flex-col gap-6">
//         {steps.map((step, index) => {
//           const isLast = index === steps.length - 1;

//           return (
//             <div key={step.id} className="flex items-start gap-3">
//               {/* Icon + Line */}
//               <div className="flex flex-col items-center">
//                 {/* Circle */}
//                 <div
//                   className={`
//                   w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium
//                   ${
//                     step.status === "complete"
//                       ? "bg-green-500 text-white"
//                       : step.status === "progress"
//                       ? "bg-indigo-600 text-white"
//                       : "bg-slate-200 text-slate-500"
//                   }
//                 `}
//                 >
//                   {step.status === "complete" ? (
//                     <Check size={16} />
//                   ) : (
//                     step.id
//                   )}
//                 </div>

//                 {/* Vertical Line */}
//                 {!isLast && (
//                   <div
//                     className={`
//                     w-[2px] flex-1 mt-1
//                     ${
//                       step.status === "complete"
//                         ? "bg-green-500"
//                         : "bg-slate-200"
//                     }
//                   `}
//                     style={{ minHeight: "40px" }}
//                   />
//                 )}
//               </div>

//               {/* Content */}
//               <div>
//                 <p
//                   className={`
//                   text-sm font-medium
//                   ${
//                     step.status === "progress"
//                       ? "text-indigo-600"
//                       : step.status === "complete"
//                       ? "text-slate-800"
//                       : "text-slate-400"
//                   }
//                 `}
//                 >
//                   {step.title}
//                 </p>

//                 {step.description && (
//                   <p className="text-xs text-slate-400 mt-1">
//                     {step.description}
//                   </p>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Stepper;

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
  { id: 4, title: "Email Verification", status: "pending" },
  { id: 5, title: "Aadhaar Verification", status: "pending" },
  { id: 6, title: "Bank Details", status: "pending" },
  { id: 7, title: "Selfie Verification", status: "pending" },
];

export const StepperAlt = () => {
  return (
    <div className="w-[300px] bg-white border-r border-slate-200 p-4">
      <div className="flex flex-col gap-3">
        {steps.map((step) => {
          return (
            <div
              key={step.id}
              className={`
              flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
              ${
                step.status === "progress"
                  ? "bg-indigo-50 border border-indigo-200"
                  : "hover:bg-slate-50"
              }
            `}
            >
              {/* Icon */}
              <div
                className={`
                w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium
                ${
                  step.status === "complete"
                    ? "bg-green-500 text-white"
                    : step.status === "progress"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }
              `}
              >
                {step.status === "complete" ? (
                  <Check size={16} />
                ) : (
                  step.id
                )}
              </div>

              {/* Text */}
              <div className="flex-1">
                <p
                  className={`
                  text-sm font-semibold
                  ${
                    step.status === "progress"
                      ? "text-indigo-600"
                      : step.status === "complete"
                      ? "text-slate-800"
                      : "text-slate-400"
                  }
                `}
                >
                  {step.title}
                </p>

                <p className="text-xs text-slate-400">
                  Step {step.id}
                </p>
              </div>

              {/* Right indicator */}
              {step.status === "progress" && (
                <div className="w-2 h-2 rounded-full bg-indigo-600" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

  