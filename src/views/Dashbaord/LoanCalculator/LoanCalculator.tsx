"use client";

import React, { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(36);

  const interestRate = 10.5;
  const maxEligible = 1500000;

  const emi = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const value =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);

    return Math.round(value);
  }, [loanAmount, tenure]);

  const totalPayable = emi * tenure;

  const formatINR = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value);

  const handleLockPlan = () => {
    console.log({
      loanAmount,
      tenure,
      interestRate,
      emi,
      totalPayable,
    });
  };

  return (
    <div className="w-full max-w-[576px] rounded-[32px] border border-[#F1F5F9] bg-white/90 px-[48px] py-[48px] shadow-[0px_32px_80px_-24px_rgba(0,0,0,0.15)]">
      <div>
        <h2 className="text-[30px] font-extrabold leading-9 tracking-[-0.75px] text-[#0F172B]">
          Configure Loan
        </h2>
        <p className="mt-2 text-[16px] font-medium leading-6 text-[#62748E]">
          You are eligible for up to ₹{formatINR(maxEligible)}
        </p>
      </div>

      <div className="relative mt-8 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0F172B] to-[#1D293D] p-6 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
        <div className="absolute -right-2 -top-10 h-32 w-32 rounded-full bg-white/5 blur-[40px]" />

        <p className="text-[14px] font-semibold uppercase tracking-[0.7px] text-[#CAD5E2]">
          Estimated EMI
        </p>

        <div className="mt-1 flex items-end gap-1">
          <h3 className="text-[36px] font-extrabold leading-10 text-white">₹{formatINR(emi)}</h3>
          <span className="pb-1 text-[18px] font-medium leading-7 text-[#90A1B9]">/mo</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-[14px] font-medium leading-5 text-[#CAD5E2]">
          <span>Interest Rate: {interestRate}% p.a.</span>
          <span>Total Payable: ₹{formatINR(totalPayable)}</span>
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-bold leading-6 text-[#314158]">Loan Amount</p>
            <p className="text-[20px] font-bold leading-7 text-[#3737C1]">
              ₹{formatINR(loanAmount)}
            </p>
          </div>

          <input
            type="range"
            min={100000}
            max={1500000}
            step={10000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="mt-7 h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E2E8F0] accent-[#3737C1]"
          />

          <div className="mt-3 flex justify-between text-[12px] font-semibold leading-4 text-[#90A1B9]">
            <span>₹1L</span>
            <span>₹15L</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-bold leading-6 text-[#314158]">Tenure (Months)</p>
            <p className="text-[20px] font-bold leading-7 text-[#3737C1]">{tenure} months</p>
          </div>

          <input
            type="range"
            min={12}
            max={60}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="mt-7 h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E2E8F0] accent-[#00C89C]"
          />

          <div className="mt-3 flex justify-between text-[12px] font-semibold leading-4 text-[#90A1B9]">
            <span>12m</span>
            <span>60m</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleLockPlan}
        className="mt-10 flex h-[60px] w-full items-center justify-center gap-2 rounded-[16px] bg-[#3737C1] text-[18px] font-bold leading-7 text-white shadow-[0px_12px_24px_-8px_rgba(55,55,193,0.4)]"
      >
        Lock This Plan
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default LoanCalculator;
