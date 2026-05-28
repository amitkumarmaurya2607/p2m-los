"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  Lightbulb,
  CheckCircle,
  Edit3,
  Shield,
  BadgeCheckIcon,
  IndianRupee,
} from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import { showToast } from "@/lib/toast";
import { submitApplicationAction, getLoanProgramsAction } from "@/lib/actions/apply.action";
import StepCard from "../componants/StepCard";
import PulseDot from "@/components/PulseDot";

const ReviewField = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between border-b border-border-light pb-3">
    <span className="text-sm text-text-muted">{label}</span>
    <span className="text-sm font-semibold text-text-heading">{value}</span>
  </div>
);

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
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(36);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [programs, setPrograms] = useState<unknown[]>([]);

  useEffect(() => {
    getLoanProgramsAction()
      .then((res) => {
        if ("error" in res) {
          showToast({ message: res.error || "Something went wrong", type: "error" });
          return;
        }
        setPrograms(res.data);
      })
      .catch(() => {});
  }, []);

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
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

  const handleSubmit = async () => {
    if (!agreed) {
      showToast({ message: "Please agree to the terms and conditions", type: "error" });
      return;
    }

    setSubmitting(true);
    const result = await submitApplicationAction({
      loanAmount,
      tenure,
      interestRate,
      emi,
      totalPayable,
    });
    if (result.success) {
      showToast({ message: "Application submitted successfully!", type: "success" });
      router.push("/track-application");
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
            <h2 className="mt-1 text-3xl font-extrabold text-white">₹{formatINR(maxEligible)}</h2>
            <div
              className="mt-4 flex items-center justify-between border-t border-white/10 pt-4
                text-xs text-text-on-dark-muted"
            >
              <span>Interest Rate: {interestRate}% p.a.</span>
              <span>Estimated EMI: ₹{formatINR(emi)}/mo</span>
            </div>
          </div>
          <SectionCard title="Choose Loan Amount" icon={<IndianRupee className="w-4 h-4" />}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-text-dark-blue">Loan Amount</span>
                <span className="text-lg font-bold text-primary">₹{formatINR(loanAmount)}</span>
              </div>
              <input
                type="range"
                min={100000}
                max={maxEligible}
                step={10000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border-medium
                  accent-primary"
              />
              <div className="mt-2 flex justify-between text-xs font-semibold text-text-muted-light">
                <span>₹1L</span>
                <span>₹{formatINR(maxEligible)}</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-text-dark-blue">Tenure (Months)</span>
                <span className="text-lg font-bold text-secondary">{tenure} months</span>
              </div>
              <input
                type="range"
                min={12}
                max={60}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border-medium
                  accent-secondary"
              />
              <div className="mt-2 flex justify-between text-xs font-semibold text-text-muted-light">
                <span>12m</span>
                <span>60m</span>
              </div>
            </div>

            <div
              className="mt-4 grid grid-cols-2 gap-4 rounded-xl bg-white p-4 border
                border-border-medium"
            >
              <div>
                <p className="text-xs text-text-muted">Monthly EMI</p>
                <p className="text-xl font-extrabold text-text-heading">₹{formatINR(emi)}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Total Payable</p>
                <p className="text-xl font-extrabold text-text-heading">
                  ₹{formatINR(totalPayable)}
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Review Your Information" icon={<Edit3 className="w-4 h-4" />}>
            <ReviewField label="Mobile Number" value="-" />
            <ReviewField label="PAN Number" value="-" />
            <ReviewField label="Full Name" value="-" />
            <ReviewField label="Email" value="-" />
            <ReviewField label="DOB" value="-" />
            <ReviewField label="Aadhaar" value="-" />
            <ReviewField label="Bank Account" value="-" />
            <ReviewField label="Employment" value="-" />
          </SectionCard>

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
            disabled={!agreed || submitting}
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
