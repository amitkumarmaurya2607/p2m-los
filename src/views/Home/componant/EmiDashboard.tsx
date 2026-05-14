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

  const { emi, totalAmount, interestAmount, principalPercent, interestPercent } =
    useMemo(() => {
      const monthlyRate = annualRate / 12 / 100;
      const emiValue =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1);

      const total = emiValue * tenure;
      const interest = total - loanAmount;

      return {
        emi: Math.round(emiValue),
        totalAmount: Math.round(total),
        interestAmount: Math.round(interest),
        principalPercent: (loanAmount / total) * 100,
        interestPercent: (interest / total) * 100,
      };
    }, [loanAmount, tenure]);

  const circleStyle = {
    background: `conic-gradient(#00C89C 0% ${principalPercent}%, #3737C1 ${principalPercent}% 100%)`,
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#EEF2FF] px-4 py-14 sm:px-6 lg:px-[91px] lg:py-24">
      <div className="absolute -right-[160px] -top-[250px] h-[500px] w-[500px] rounded-full bg-white/40 blur-[64px]" />

      <div className="relative mx-auto flex max-w-[1257px] flex-col items-center justify-between gap-12 lg:flex-row lg:gap-16">
        <div className="w-full max-w-[584px]">
          <div className="flex h-16 w-16 rotate-[3deg] items-center justify-center rounded-2xl bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <Calculator className="h-8 w-8 text-[#3737C1]" />
          </div>

          <h2 className="mt-7 text-[42px] font-extrabold leading-[52px] text-[#0F172A] sm:text-[48px] sm:leading-[60px]">
            Smart EMI <br />
            <span className="bg-[linear-gradient(90deg,#3737C1_0%,#3546C0_7.14%,#3252BF_14.29%,#305EBD_21.43%,#2D69BB_28.57%,#2A73B9_35.71%,#277DB7_42.86%,#2487B5_50%,#2091B2_57.14%,#1C9AB0_64.29%,#18A3AC_71.43%,#14ADA9_78.57%,#0EB6A5_85.71%,#07BFA1_92.86%,#00C89C_100%)] bg-clip-text text-transparent">
              Planning
            </span>
          </h2>

          <p className="mt-6 max-w-[448px] text-[18px] leading-7 text-[#4A5565]">
            Plan your finances with our interactive EMI calculator. Transparent
            pricing with absolutely no hidden charges.
          </p>

          <div className="mt-8 flex max-w-[448px] flex-col gap-4">
            <div className="flex h-[76px] items-center gap-4 rounded-[14px] bg-white p-4 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C89C1A]">
                <ShieldCheck className="h-5 w-5 text-[#00C89C]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0F172A]">
                  Zero Pre-closure Charges
                </h4>
                <p className="text-sm text-[#6A7282]">
                  Pay off early without penalties
                </p>
              </div>
            </div>

            <div className="flex h-[76px] items-center gap-4 rounded-[14px] bg-white p-4 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF9F1C1A]">
                <SlidersHorizontal className="h-5 w-5 text-[#FF9F1C]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0F172A]">
                  Flexible Tenure
                </h4>
                <p className="text-sm text-[#6A7282]">
                  Choose from 6 to 60 months
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-[584px] rounded-[32px] border border-white bg-white p-6 shadow-[0px_24px_48px_rgba(0,0,0,0.06)] sm:p-[33px]">
          <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-6">
            <h3 className="text-xl font-bold text-[#0F172A]">
              Repayment Plan
            </h3>
            <span className="rounded-full bg-[#F0FDF4] px-3 py-1 text-sm font-bold text-[#00C89C]">
              {annualRate}% p.a.
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[243px_243px]">
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-semibold text-[#6A7282]">
                    Loan Amount
                  </label>
                  <span className="text-base font-bold text-[#3737C1]">
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
                  className="mt-5 h-2 w-full cursor-pointer accent-[#3737C1]"
                />

                <div className="mt-2 flex justify-between text-xs text-[#99A1AF]">
                  <span>₹50K</span>
                  <span>₹10L</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-semibold text-[#6A7282]">
                    Tenure (Months)
                  </label>
                  <span className="text-base font-bold text-[#00C89C]">
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
                  className="mt-5 h-2 w-full cursor-pointer accent-[#00C89C]"
                />

                <div className="mt-2 flex justify-between text-xs text-[#99A1AF]">
                  <span>6m</span>
                  <span>60m</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#F3F4F6] bg-[#F9FAFB] px-6 py-6">
                <p className="text-sm text-[#6A7282]">Monthly EMI</p>
                <h4 className="mt-1 text-[30px] font-black leading-9 text-[#0F172A]">
                  {formatINR(emi)}
                </h4>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div
                className="relative flex h-40 w-40 items-center justify-center rounded-full"
                style={circleStyle}
              >
                <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full bg-white">
                  <p className="text-xs font-medium text-[#6A7282]">
                    Total Amount
                  </p>
                  <h4 className="text-lg font-bold text-[#0F172A]">
                    ₹{(totalAmount / 100000).toFixed(1)}L
                  </h4>
                </div>
              </div>

              <div className="mt-10 flex gap-4 text-xs font-semibold text-[#4A5565]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#00C89C]" />
                  Principal
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#3737C1]" />
                  Interest
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-[#6A7282]">
                Interest: {formatINR(interestAmount)}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-7 -right-6 rotate-[26.91deg] rounded-[14px] bg-[#FF9F1C] px-6 py-4 text-sm font-bold text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
            Save 2% Now!
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmiDashboard;