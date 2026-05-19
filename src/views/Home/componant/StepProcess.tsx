import React from "react";
import { Smartphone, FileText, CheckCircle2, IndianRupee } from "lucide-react";
import Image from "next/image";

const leftSteps = [
  {
    title: "Visit our website",
    desc: "Available on Mobile & Laptop",
  },
  {
    title: "Verify KYC",
    desc: "Paperless digital process",
  },
  {
    title: "Check Limit",
    desc: "Instant eligibility check",
  },
  {
    title: "Get Funds",
    desc: "Direct to bank account",
  },
];

const rightSteps = [
  {
    title: "KYC Approved",
    desc: "Identity verified securely",
    icon: FileText,
  },
  {
    title: "Limit Ready",
    desc: "Eligible amount generated",
    icon: CheckCircle2,
  },
  {
    title: "Loan Approved",
    desc: "Fast approval process",
    icon: Smartphone,
  },
  {
    title: "Money Credited",
    desc: "Funds sent to bank",
    icon: IndianRupee,
  },
];

const StepProcess = () => {
  return (
    <section
      className="overflow-hidden bg-surface-accent px-5 py-10 font-[Inter] md:px-10 lg:px-[88px]
        lg:pt-14 lg:pb-0"
    >
      <div className="mx-auto max-w-[1264px]">
        {/* Heading */}
        <div className="text-center">
          <h2
            className="text-[32px] font-extrabold leading-tight text-dark-navy md:text-[44px]
              md:leading-[48px]"
          >
            Simple 4-Step Process
          </h2>

          <p className="mt-3 text-[16px] leading-7 text-home-muted md:text-[18px]">
            From download to disbursement in minutes.
          </p>
        </div>

        {/* Main Layout */}
        <div className="relative mt-10 grid items-center gap-8 lg:grid-cols-[340px_1fr_300px]">
          {/* Left Timeline */}
          <div className="relative pb-6">
            <div
              className="absolute left-7 top-[58px] h-[260px] w-[2px] bg-gradient-to-b
                from-accent-orange to-accent-orange"
            />

            <div className="space-y-8">
              {leftSteps.map((step, index) => (
                <div key={step.title} className="relative z-10 flex items-start gap-6">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl
                      border border-home-bg-orange-light bg-white text-[22px] font-black
                      text-accent-orange shadow-[var(--shadow-card)]"
                  >
                    {index + 1}
                  </div>

                  <div className="pt-1">
                    <h3 className="text-[18px] font-bold leading-7 text-dark-navy">{step.title}</h3>

                    <p className="mt-1 text-[14px] leading-6 text-home-muted">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Image */}
          <div className="relative hidden items-center justify-center lg:flex">
            <Image
              width={320}
              height={320}
              src="/images/img2.png"
              alt="Loan process"
              className="relative z-10 h-auto w-full max-w-[320px] object-contain"
            />
          </div>

          {/* Right Cards */}
          <div
            className="flex max-h-[340px] flex-col justify-between gap-3 h-full pb-6 lg:pl-[20px]"
          >
            {rightSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="flex min-h-[74px] items-center gap-3 rounded-2xl border
                    border-home-bg-gray-light bg-white px-4 py-3
                    shadow-[0px_10px_20px_rgba(0,0,0,0.05)] transition-all duration-300
                    hover:-translate-y-1 hover:shadow-[0px_16px_30px_rgba(0,0,0,0.08)]"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                      bg-surface-accent text-home-purple"
                  >
                    <Icon size={20} strokeWidth={2} />
                  </div>

                  <div>
                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.5px]
                        text-home-text-muted-light"
                    >
                      Step {index + 1}
                    </p>

                    <h4 className="mt-[2px] text-[14px] font-bold leading-5 text-dark-navy">
                      {step.title}
                    </h4>

                    <p className="mt-[2px] text-[12px] leading-4 text-home-muted">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepProcess;
