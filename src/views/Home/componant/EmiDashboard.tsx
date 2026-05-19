"use client";

import React, { useMemo, useState } from "react";
import { Calculator, ShieldCheck, SlidersHorizontal } from "lucide-react";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const EmiDashboard = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(24);

  const annualRate = 12.5;

  const { emi, totalAmount, interestAmount, principalPercent } = useMemo(() => {
    const monthlyRate = annualRate / 12 / 100;

    let emiValue = 0;

    if (monthlyRate === 0) {
      emiValue = loanAmount / tenure;
    } else {
      emiValue =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1);
    }

    const total = emiValue * tenure;
    const interest = total - loanAmount;

    return {
      emi: Math.round(emiValue),
      totalAmount: Math.round(total),
      interestAmount: Math.round(interest),
      principalPercent: total ? (loanAmount / total) * 100 : 0,
    };
  }, [loanAmount, tenure, annualRate]);

  const circleStyle: React.CSSProperties = {
    background: `conic-gradient(#00C89C 0% ${principalPercent}%, #3737C1 ${principalPercent}% 100%)`,
  };

  return (
    <section
      id="emi-calculator"
      className="relative w-full overflow-hidden bg-surface-accent px-4 py-14 sm:px-6 lg:px-[91px] lg:py-24"
    >
      <div className="absolute -right-[160px] -top-[250px] h-[500px] w-[500px] rounded-full bg-white/40 blur-[64px]" />

      <div className="relative mx-auto flex max-w-[1257px] flex-col items-center justify-between gap-12 lg:flex-row lg:gap-16">
        <div className="w-full max-w-[584px]">
          <div className="flex h-16 w-16 rotate-[3deg] items-center justify-center rounded-2xl bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <Calculator className="h-8 w-8 text-home-purple" />
          </div>

          <h2 className="mt-7 text-[42px] font-extrabold leading-[52px] text-dark-navy sm:text-[48px] sm:leading-[60px]">
            Smart LOS <br />
            <span className="bg-gradient-to-r from-home-purple to-home-green bg-clip-text text-transparent">
              Loan Planning
            </span>
          </h2>

          <p className="mt-6 max-w-[448px] text-[18px] leading-7 text-home-text-medium">
            Manage loan applications, verification steps, eligibility checks,
            and repayment planning from one smart LOS dashboard.
          </p>

          <div className="mt-8 flex max-w-[448px] flex-col gap-4">
            <div className="flex h-[76px] items-center gap-4 rounded-[14px] bg-white p-4 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_14px_35px_rgba(0,0,0,0.12)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-home-green/10">
                <ShieldCheck className="h-5 w-5 text-home-green" />
              </div>

              <div>
                <h4 className="text-base font-bold text-dark-navy">
                  Secure Verification
                </h4>
                <p className="text-sm text-home-muted">
                  PAN, Aadhaar, bank and document checks
                </p>
              </div>
            </div>

            <div className="flex h-[76px] items-center gap-4 rounded-[14px] bg-white p-4 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_14px_35px_rgba(0,0,0,0.12)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-orange/10">
                <SlidersHorizontal className="h-5 w-5 text-accent-orange" />
              </div>

              <div>
                <h4 className="text-base font-bold text-dark-navy">
                  Flexible Workflow
                </h4>
                <p className="text-sm text-home-muted">
                  Track every stage from login to approval
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-[584px] rounded-[32px] border border-white bg-white p-6 shadow-[0px_24px_48px_rgba(0,0,0,0.06)] sm:p-[33px]">
          <div className="group absolute -bottom-[38px] -right-6 z-20 rotate-[6deg] rounded-[14px] text-sm font-bold text-white">
            <div className="relative overflow-hidden rounded-[16px] bg-gradient-to-r from-home-purple to-home-green px-6 py-4 shadow-[0px_16px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:rotate-[6deg] hover:scale-105 hover:shadow-[0px_22px_45px_rgba(0,0,0,0.24)]">
              <div className="absolute inset-0 overflow-hidden rounded-[14px]">
                <div className="animate-[shine_3s_linear_infinite] absolute top-0 h-full w-10 rotate-[20deg] bg-white/20 blur-md" />
              </div>

              <style jsx>{`
                @keyframes shine {
                  0% {
                    left: -60%;
                  }
                  100% {
                    left: 140%;
                  }
                }
              `}</style>

              <div className="relative flex flex-col">
                <h4 className="mt-1 text-[18px] font-extrabold leading-5 text-white">
                  Fast Loan Approval
                </h4>

                <p className="mt-1 text-[12px] font-medium text-white/80">
                  Smart onboarding & verification
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-muted pb-6">
            <h3 className="text-xl font-bold text-dark-navy">
              Repayment Plan
            </h3>

            <span className="rounded-full bg-home-bg-green-light px-3 py-1 text-sm font-bold text-home-green">
              {annualRate}% p.a.
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[243px_243px]">
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-semibold text-home-muted">
                    Loan Amount
                  </label>

                  <span className="text-base font-bold text-home-purple">
                    {formatINR(loanAmount)}
                  </span>
                </div>

                <input
                  type="range"
                  min={50000}
                  max={1000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="mt-5 h-2 w-full cursor-pointer accent-home-purple"
                />

                <div className="mt-2 flex justify-between text-xs text-home-text-muted-light">
                  <span>₹50K</span>
                  <span>₹10L</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-semibold text-home-muted">
                    Tenure (Months)
                  </label>

                  <span className="text-base font-bold text-home-green">
                    {tenure} Months
                  </span>
                </div>

                <input
                  type="range"
                  min={6}
                  max={60}
                  step={1}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="mt-5 h-2 w-full cursor-pointer accent-home-green"
                />

                <div className="mt-2 flex justify-between text-xs text-home-text-muted-light">
                  <span>6m</span>
                  <span>60m</span>
                </div>
              </div>

              <div className="rounded-2xl border border-muted bg-home-bg-gray-light px-6 py-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_14px_35px_rgba(0,0,0,0.1)]">
                <p className="text-sm text-home-muted">Monthly EMI</p>

                <h4 className="mt-1 text-[30px] font-black leading-9 text-dark-navy">
                  {formatINR(emi)}
                </h4>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div
                className="relative flex h-40 w-40 items-center justify-center rounded-full transition-all duration-300 hover:scale-105"
                style={circleStyle}
              >
                <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full bg-white">
                  <p className="text-xs font-medium text-home-muted">
                    Total Amount
                  </p>

                  <h4 className="text-lg font-bold text-dark-navy">
                    ₹{(totalAmount / 100000).toFixed(1)}L
                  </h4>
                </div>
              </div>

              <div className="mt-10 flex gap-4 text-xs font-semibold text-home-text-medium">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-home-green" />
                  Principal
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-home-purple" />
                  Interest
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-home-muted">
                Interest: {formatINR(interestAmount)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmiDashboard;  