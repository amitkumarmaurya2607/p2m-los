import React from "react";
import { ArrowRight, Check, FileCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const routeStepMap: Record<string, string> = {
  "/apply-now": "mobile",
  "/pan-details": "pan",
  "/personal-info": "personalInfo",
  "/aadhar-details": "aadhaar",
  "/bank-details": "bankDetails",
  "/selfie-capture": "selfie",
  "/employment-details": "employmentDetails",
  "/loan-calculator": "loanCalculator",
  "/review": "review",
};

type FinalCTAProps = {
  version?: "v1" | "v2";
};

const FinalCTA = ({ version = "v2" }: FinalCTAProps) => {
  const stepCount = Object.keys(routeStepMap).length;

  if (version === "v2") {
    return (
      <div className="relative">
        <section
          className="relative overflow-hidden bg-[#0F172A] px-5 py-8 font-[Inter] md:px-10 lg:px-20
            lg:py-10"
        >
          <div
            className="absolute -left-[220px] -top-[267px] h-[800px] w-[800px] rounded-full
              bg-home-green/20 opacity-50 blur-[64px]"
          />
          {/* TOP RIGHT GLOW */}
          <div
            className="absolute -right-[220px] -top-[267px] h-[800px] w-[800px] rounded-full
              bg-home-green/20 opacity-50 blur-[64px]"
          />

          {/* BOTTOM LEFT GLOW */}
          <div
            className="absolute -left-[220px] bottom-[-267px] h-[800px] w-[800px] rounded-full
              bg-dark-navy/20 opacity-50 blur-[64px]"
          />

          {/* BOTTOM RIGHT GLOW */}
          <div
            className="absolute -right-[220px] bottom-[-267px] h-[800px] w-[800px] rounded-full
              bg-dark-navy/10 opacity-50 blur-[64px]"
          />

          <div
            className="relative mx-auto overflow-hidden rounded-[32px] border border-white/15
              bg-white/[0.06] px-5 py-6 shadow-[var(--shadow-dark-card)] backdrop-blur-xl
              lg:max-w-[1217px] lg:px-8 lg:py-8"
          >
            {/* HEADING */}
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full border border-home-green/30
                    bg-home-green/10 px-4 py-2"
                >
                  <FileCheck2 className="h-4 w-4 text-home-green" />

                  <span className="text-[11px] font-bold uppercase tracking-[1.4px] text-home-green">
                    LOS APPLICATION FLOW
                  </span>
                </div>

                <h2
                  className="mt-4 text-[30px] font-extrabold leading-[38px] text-white
                    md:text-[42px] md:leading-[50px]"
                >
                  Complete your loan in{" "}
                  <span className="text-home-green">{stepCount} simple steps</span>
                </h2>

                <p className="mt-3 max-w-[700px] text-[15px] leading-6 text-white/70 md:text-[16px]">
                  Complete mobile, PAN, Aadhaar, bank verification, employment details and final
                  review using our guided LOS flow.
                </p>
              </div>
            </div>

            {/* STEP CARDS */}
            <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.values(routeStepMap).map((step, index) => (
                <div
                  key={step}
                  className="group flex w-full items-center gap-3 rounded-xl border border-white/10
                    bg-white/[0.05] px-3 py-3 transition-all duration-300 hover:-translate-y-1
                    hover:border-home-green/40 hover:bg-home-green/10"
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                      bg-home-green/15 text-[13px] font-black text-home-green"
                  >
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold capitalize text-white">
                      {step.replace(/([A-Z])/g, " $1")}
                    </p>

                    <p className="mt-0.5 text-[11px] text-white/50">Verification step</p>
                  </div>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/apply-now"
                className="flex h-[52px] items-center justify-center gap-2 rounded-[14px] border-2
                  border-home-green bg-home-green px-7 text-[14px] font-semibold text-white
                  shadow-[0px_10px_15px_-3px_rgba(0,200,156,0.2)] transition-all duration-300
                  hover:-translate-y-1 hover:bg-home-green/90"
              >
                Start Application
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/review"
                className="flex h-[52px] items-center justify-center rounded-[14px] border-2
                  border-white/20 px-7 text-[14px] font-semibold text-white transition-all
                  duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Review Details
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="relative">
      <section
        className="relative overflow-hidden bg-home-purple px-5 py-16 font-[Inter] md:px-10 lg:px-20
          lg:py-24"
      >
        <div
          className="absolute -right-[220px] -top-[267px] h-[800px] w-[800px] rounded-full
            bg-home-green/20 opacity-50 blur-[64px]"
        />

        <div
          className="absolute -left-[156px] bottom-[-200px] h-[600px] w-[600px] rounded-full
            bg-home-orange-badge/20 opacity-30 blur-[64px]"
        />

        <div
          className="relative mx-auto max-w-[1217px] rounded-[48px] border border-white/20
            bg-white/10 px-8 py-12 shadow-[var(--shadow-dark-card)] md:px-14 lg:min-h-[492px]
            lg:px-[81px] lg:py-[81px]"
        >
          <div className="max-w-[525px]">
            <h2
              className="text-[42px] font-extrabold leading-[52px] text-white md:text-[60px]
                md:leading-[75px]"
            >
              Ready to take the <span className="text-home-green">next big step?</span>
            </h2>

            <p className="mt-6 max-w-[512px] text-[18px] leading-7 text-white/80 md:text-[20px]">
              Join over 2 million Indians who have chosen RinSetu for their financial needs. Get
              approved in minutes.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/apply-now"
                className="flex h-[60px] items-center justify-center gap-2 rounded-[14px] border-2
                  border-home-green bg-home-green px-8 text-[16px] font-semibold text-white
                  shadow-[0px_10px_15px_-3px_rgba(0,200,156,0.2),0px_4px_6px_-4px_rgba(0,200,156,0.2)]
                  transition-all duration-300 hover:-translate-y-1 hover:bg-home-green/90"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/apply-now"
                className="flex h-[60px] items-center justify-center rounded-[14px] border-2
                  border-white/30 px-8 text-[16px] font-semibold text-white transition-all
                  duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Check Eligibility
              </Link>
            </div>
          </div>

          <div
            className="mt-12 flex justify-center lg:absolute lg:right-[82px] lg:top-[102px] lg:mt-0"
          >
            <div className="relative">
              <div
                className="h-[240px] w-[240px] rounded-full border-[8px] border-white/20 p-2
                  shadow-[var(--shadow-dark-card)] md:h-[288px] md:w-[288px]"
              >
                <Image
                  src="/images/img1.png"
                  alt="Happy user"
                  width={240}
                  height={240}
                  className="h-full w-full rounded-full object-contain
                    drop-shadow-[-2px_3px_14px_rgba(0,0,0,0.25)]"
                />
              </div>

              <div
                className="absolute -bottom-1 -left-12 flex h-[74px] w-[151px] items-center gap-3
                  rounded-2xl border border-border-light bg-white px-4 shadow-[var(--shadow-card)]"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full
                    bg-home-green/20"
                >
                  <Check className="h-5 w-5 text-home-green" />
                </div>

                <div>
                  <p className="text-[14px] font-bold leading-5 text-dark-navy">Approved</p>
                  <p className="text-[12px] leading-4 text-text-muted-dark">₹2,00,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinalCTA;
