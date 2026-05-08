import React from "react";
import {
  Smartphone,
  FileText,
  CheckCircle2,
  IndianRupee,
} from "lucide-react";

const steps = [
  {
    title: "Download App",
    desc: "Get it on iOS or Android",
    icon: Smartphone,
  },
  {
    title: "Verify KYC",
    desc: "Paperless digital process",
    icon: FileText,
  },
  {
    title: "Check Limit",
    desc: "Instant eligibility check",
    icon: CheckCircle2,
  },
  {
    title: "Get Funds",
    desc: "Direct to bank account",
    icon: IndianRupee,
  },
];

const StepProcess = () => {
  return (
    <>
      <section className="bg-[#EEF2FF] px-5 py-16 font-[Inter] md:px-10 lg:px-[88px] lg:py-32">
        <div className="mx-auto max-w-[1217px]">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-[36px] font-extrabold leading-tight text-[#0F172A] md:text-[48px] md:leading-[48px]">
              Simple 4-Step Process
            </h2>

            <p className="mt-4 text-[18px] leading-7 text-[#6A7282]">
              From download to disbursement in minutes.
            </p>
          </div>

          {/* Content */}
          <div className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1fr_420px_1fr]">
            {/* Left Steps */}
            <div className="relative space-y-10">
              <div className="absolute left-8 top-10 h-[calc(100%-80px)] w-[2px] bg-[linear-gradient(180deg,#FF9F1C_0%,rgba(0,0,0,0)_100%)]" />

              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative z-10 flex gap-8"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#FFF7ED] bg-white text-[24px] font-black text-[#FF9F1C] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
                    {index + 1}
                  </div>

                  <div className="pt-2">
                    <h3 className="text-[24px] font-bold leading-8 text-[#0F172A]">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-[18px] leading-7 text-[#6A7282]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Phone Image */}
            <div className="flex justify-center">
              <img
                src="/images/phone-step.png"
                alt="App process preview"
                className="phone-float w-full max-w-[340px] object-contain"
              />
            </div>

            {/* Right Cards */}
            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="flex min-h-[98px] items-center gap-4 rounded-2xl border border-[#F9FAFB] bg-white p-6 shadow-[0px_12px_24px_rgba(0,0,0,0.06)] lg:w-[280px]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[#3737C1]">
                      <Icon size={24} strokeWidth={2} />
                    </div>

                    <div>
                      <p className="text-[12px] font-semibold uppercase leading-4 tracking-[0.6px] text-[#99A1AF]">
                        Step {index + 1} Complete
                      </p>

                      <h4 className="mt-1 text-[16px] font-bold leading-6 text-[#0F172A]">
                        {step.title} Verified
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes phoneFloat {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-14px);
          }
        }

        .phone-float {
          animation: phoneFloat 4s
            cubic-bezier(0.45, 0, 0.55, 1)
            infinite;
          will-change: transform;
        }
      `}</style>
    </>
  );
};

export default StepProcess;