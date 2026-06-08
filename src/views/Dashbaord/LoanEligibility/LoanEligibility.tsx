"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, BadgeCheckIcon, IndianRupee } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import { showToast } from "@/lib/toast";
import { submitApplicationAction, getLoanProgramsAction } from "@/lib/actions/apply.action";
import { callSecure } from "@/lib/secure-action";
import StepCard from "../componants/StepCard";
import PulseDot from "@/components/PulseDot";
import type { LoanEligibilityRuleResponce } from "@/lib/actions/action.type";

const SectionCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-border-light bg-surface p-5 space-y-4">
    <div className="flex items-center gap-2">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-muted
          text-primary"
      >
        {icon}
      </div>
      <h3 className="text-base font-bold text-text-heading">{title}</h3>
    </div>
    {children}
  </div>
);

function LoanEligibility() {
  const router = useRouter();
  const [loanAmount, setLoanAmount] = useState(0);
  const [tenureDays, setTenureDays] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [programs, setPrograms] = useState<LoanEligibilityRuleResponce | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    getLoanProgramsAction()
      .then((res) => {
        if ("error" in res) {
          showToast({ message: res.error || "Something went wrong", type: "error" });
          return;
        }
        console.log("Loan Programs:", JSON.stringify(res.data, null, 2));
        setPrograms(res.data);
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (programs && !initialized) {
      setLoanAmount(programs.suggestedAmount ?? programs.minAmount);
      setTenureDays(programs.tenures.minTermDays);
      setInitialized(true);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [programs, initialized]);

  const interestRate = programs?.interest ?? 10.2;
  const processingFee = programs?.processingFee ?? 0;
  const minAmount = programs?.minAmount ?? 0;
  const maxAmount = programs?.maxAmount ?? 0;
  const minTermDays = programs?.tenures.minTermDays ?? 0;
  const maxTermDays = programs?.tenures.maxTermDays ?? 0;

  const amountStep = useMemo(() => {
    const range = maxAmount - minAmount;
    if (range <= 0) return 1000;
    return Math.max(500, Math.round(range / 100));
  }, [minAmount, maxAmount]);

  const { interest, totalPayable, dailyEmi } = useMemo(() => {
    const i = loanAmount * (interestRate / 100) * (tenureDays / 365);
    const total = loanAmount + i + processingFee;
    const daily = tenureDays > 0 ? Math.round(total / tenureDays) : 0;
    return { interest: i, totalPayable: total, dailyEmi: daily };
  }, [loanAmount, tenureDays, interestRate, processingFee]);

  const formatINR = (value: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value);

  const handleSubmit = async () => {
    if (!agreed) {
      showToast({ message: "Please agree to the terms and conditions", type: "error" });
      return;
    }
    if (!programs) {
      showToast({ message: "Loan offer is still loading. Please try again.", type: "error" });
      return;
    }
    if (!programs.isAllowed) {
      showToast({ message: "You are not eligible to apply right now.", type: "error" });
      return;
    }

    setSubmitting(true);
    const result = await callSecure(submitApplicationAction, {
      loanAmount,
      remark: "test",
      programId: programs.tenures.id,
      dueDate: new Date(Date.now() + tenureDays * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    });
    if (result.success) {
      showToast({ message: "Application submitted successfully!", type: "success" });
      router.push("/profile");
    } else {
      showToast({ message: result.error || "Submission failed", type: "error" });
    }
    setSubmitting(false);
  };

  return (
    <>
      <StepCard
        title="Loan Eligibility & Application"
        subtitle={`   Review your loan eligibility, customize your plan, and submit your application`}
        className="lg:w-[800px] mx-auto"
        steper={true}
        icon={<BadgeCheckIcon className="w-6 h-6 text-primary" />}
        tips={{
          title: "Review Your Loan Offer",
          description:
            "Review your eligible loan amount, select a suitable repayment plan, and submit your application with confidence. Ensure all details are accurate before proceeding.",

          Icon: <BadgeCheckIcon className="w-5 h-5 text-primary" />,

          noteTitle: "Application Tips",

          noteDescription: (
            <ul className="space-y-2 text-sm leading-6">
              <li className="flex items-start gap-2">
                <PulseDot />
                Borrow only the amount you genuinely need to keep repayments manageable.
              </li>

              <li className="flex items-start gap-2">
                <PulseDot />
                Compare different loan amounts and repayment tenures to find the most suitable EMI.
              </li>

              <li className="flex items-start gap-2">
                <PulseDot />
                Carefully review all application details before final submission.
              </li>

              <li className="flex items-start gap-2">
                <PulseDot />
                Ensure your bank account and personal information are accurate to avoid processing
                delays.
              </li>

              <li className="flex items-start gap-2">
                <PulseDot />
                Approval and eligible loan amount may vary based on verification and lending
                criteria.
              </li>
            </ul>
          ),
        }}
      >
        <div className="flex flex-col gap-6">
          <div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-text-heading
              to-home-border-dark p-6 shadow-card"
          >
            <div className="absolute -right-2 -top-10 h-32 w-32 rounded-full bg-white/5 blur-[40px]" />
            <p className="text-xs font-semibold uppercase tracking-wider text-text-on-dark-muted">
              You are eligible for up to
            </p>
            <h2 className="mt-1 text-3xl font-extrabold text-white">
              {programs ? `₹${formatINR(maxAmount)}` : "—"}
            </h2>
            <div
              className="mt-4 flex items-center justify-between border-t border-white/10 pt-4
                text-xs text-text-on-dark-muted"
            >
              <span>
                Interest Rate: {interestRate ? `${interestRate}% p.a.` : "Contact support"}
              </span>
              <span>Daily Repayment: ₹{formatINR(dailyEmi)}</span>
            </div>
          </div>
          <SectionCard title="Choose Loan Amount" icon={<IndianRupee className="w-4 h-4" />}>
            {!programs ? (
              <div className="space-y-4">
                <div className="h-5 w-40 rounded bg-border-medium animate-pulse" />
                <div className="h-2 w-full rounded-full bg-border-medium animate-pulse" />
                <div className="h-5 w-40 rounded bg-border-medium animate-pulse" />
                <div className="h-2 w-full rounded-full bg-border-medium animate-pulse" />
                <div className="h-20 w-full rounded-xl bg-border-medium animate-pulse" />
                <p className="text-center text-xs text-text-muted">Loading loan offer…</p>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-text-dark-blue">Loan Amount</span>
                    <span className="text-lg font-bold text-primary">₹{formatINR(loanAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min={minAmount}
                    max={maxAmount}
                    step={amountStep}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border-medium
                      accent-primary"
                  />
                  <div className="mt-2 flex justify-between text-xs font-semibold text-text-muted-light">
                    <span>₹{formatINR(minAmount)}</span>
                    <span>₹{formatINR(maxAmount)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-text-dark-blue">Tenure (Days)</span>
                    <span className="text-lg font-bold text-secondary">{tenureDays} days</span>
                  </div>
                  <input
                    type="range"
                    min={minTermDays}
                    max={maxTermDays}
                    step={1}
                    value={tenureDays}
                    onChange={(e) => setTenureDays(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border-medium
                      accent-secondary"
                  />
                  <div className="mt-2 flex justify-between text-xs font-semibold text-text-muted-light">
                    <span>{minTermDays}d</span>
                    <span>{maxTermDays}d</span>
                  </div>
                </div>

                <div
                  className="mt-4 grid grid-cols-2 gap-4 rounded-xl bg-white p-4 border
                    border-border-medium"
                >
                  <div>
                    <p className="text-xs text-text-muted">Daily Repayment</p>
                    <p className="text-xl font-extrabold text-text-heading">₹{formatINR(dailyEmi)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Total Payable</p>
                    <p className="text-xl font-extrabold text-text-heading">
                      ₹{formatINR(totalPayable)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Interest</p>
                    <p className="text-xl font-extrabold text-text-heading">₹{formatINR(interest)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Processing Fee</p>
                    <p className="text-xl font-extrabold text-text-heading">
                      ₹{formatINR(processingFee)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </SectionCard>

          {/* <SectionCard title="Review Your Information" icon={<Edit3 className="w-4 h-4" />}>
            <ReviewField label="Mobile Number" value="-" />
            <ReviewField label="PAN Number" value="-" />
            <ReviewField label="Full Name" value="-" />
            <ReviewField label="Email" value="-" />
            <ReviewField label="DOB" value="-" />
            <ReviewField label="Aadhaar" value="-" />
            <ReviewField label="Bank Account" value="-" />
            <ReviewField label="Employment" value="-" />
          </SectionCard> */}

          <div
            className="flex items-start gap-3 rounded-2xl border border-border-light bg-surface p-5"
          >
            <Shield className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-text-heading">
                I confirm that all the information provided is true and correct
              </p>
              <p className="mt-1 text-xs text-text-muted">
                By submitting, you agree to our terms and conditions and authorize us to verify your
                information.
              </p>
              <label className="mt-3 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-5 w-5 rounded border-border-medium accent-primary"
                />
                <span className="text-sm font-medium text-text-heading">
                  I agree to the Terms & Conditions
                </span>
              </label>
            </div>
          </div>

          <GradientButton
            type="button"
            onClick={handleSubmit}
            disabled={!agreed || submitting || !programs || !programs.isAllowed}
            className="w-full h-14 text-lg"
          >
            {submitting ? "Submitting Application..." : "Submit Application"}
          </GradientButton>
        </div>
      </StepCard>
    </>
  );
}

export default LoanEligibility;
