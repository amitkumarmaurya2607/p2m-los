"use client";

import React, { useMemo, useState } from "react";
import { Calculator, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import StepCard from "../componants/StepCard";
import GradientButton from "@/components/ui/GradientButton";
import { submitLoanCalculatorAction } from "@/lib/actions/loan-calculator.action";

function LoanCalculator() {
  const router = useRouter();
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

  const handleLockPlan = async () => {
    await submitLoanCalculatorAction({
      loanAmount,
      tenure,
      interestRate,
      emi,
      totalPayable,
    });
    router.push("/review");
  };

  return (
    <StepCard
      title="Configure Loan"
      subtitle={`You are eligible for up to ₹${formatINR(maxEligible)}`}
      className="lg:w-[800px] mx-auto"
      steper={true}
      tips={{
        title: "Configure Your Loan",
        description:
          "Customize your loan amount and repayment tenure to find a plan that best suits your financial needs and monthly budget.",
        Icon: <Calculator className="w-5 h-5 text-primary" />,
        noteTitle: "Smart Borrowing Tips",
        noteDescription: (
          <ul className="space-y-2 text-sm leading-6">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Choose a loan amount based on your repayment capacity.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Longer repayment tenures may reduce your monthly EMI amount.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Review interest rates and EMI estimates carefully before proceeding.
            </li>
          </ul>
        ),
        NoteIcon: Lightbulb,
      }}
    >
      <div
        className="relative mt-8 overflow-hidden rounded-[24px] bg-gradient-to-br from-text-heading
          to-home-border-dark p-6 shadow-[var(--shadow-card)]"
      >
        <div className="absolute -right-2 -top-10 h-32 w-32 rounded-full bg-white/5 blur-[40px]" />

        <p className="text-[14px] font-semibold uppercase tracking-[0.7px] text-text-on-dark-muted">
          Estimated EMI
        </p>

        <div className="mt-1 flex items-end gap-1">
          <h3 className="text-[36px] font-extrabold leading-10 text-white">₹{formatINR(emi)}</h3>
          <span className="pb-1 text-[18px] font-medium leading-7 text-text-muted-light">/mo</span>
        </div>

        <div
          className="mt-4 flex items-center justify-between border-t border-white/10 pt-4
            text-[14px] font-medium leading-5 text-text-on-dark-muted"
        >
          <span>Interest Rate: {interestRate}% p.a.</span>
          <span>Total Payable: ₹{formatINR(totalPayable)}</span>
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-bold leading-6 text-text-dark-blue">Loan Amount</p>
            <p className="text-[20px] font-bold leading-7 text-home-purple">
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
            className="mt-7 h-2 w-full cursor-pointer appearance-none rounded-full bg-border-medium
              accent-home-purple"
          />

          <div
            className="mt-3 flex justify-between text-[12px] font-semibold leading-4
              text-text-muted-light"
          >
            <span>₹1L</span>
            <span>₹15L</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-bold leading-6 text-text-dark-blue">Tenure (Months)</p>
            <p className="text-[20px] font-bold leading-7 text-home-purple">{tenure} months</p>
          </div>

          <input
            type="range"
            min={12}
            max={60}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="mt-7 h-2 w-full cursor-pointer appearance-none rounded-full bg-border-medium
              accent-home-green"
          />

          <div
            className="mt-3 flex justify-between text-[12px] font-semibold leading-4
              text-text-muted-light"
          >
            <span>12m</span>
            <span>60m</span>
          </div>
        </div>
      </div>

      <GradientButton type="button" className="mt-6 w-full" onClick={handleLockPlan}>
        <span className="flex items-center justify-center gap-2">{"  Lock This Plan"}</span>
      </GradientButton>
    </StepCard>
  );
}

export default LoanCalculator;
