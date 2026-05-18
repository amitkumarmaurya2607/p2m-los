"use client";

import React, { useState } from "react";
import { CheckCircle, ClipboardList, Edit3, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApplicationContext } from "@/context/ApplicationContext";
import { submitApplicationAction } from "@/lib/actions/application.action";

const ReviewField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[12px] font-bold uppercase tracking-[0.6px] text-text-muted-light">{label}</p>
    <p className="mt-1 text-[16px] font-semibold leading-6 text-[#1D293D]">{value}</p>
  </div>
);

const ReviewSection = ({
  title,
  fields,
}: {
  title: string;
  fields: { label: string; value: string }[];
}) => (
  <div
    className="rounded-[24px] border border-border-medium bg-white/80 p-6
      shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)]"
  >
    <div className="flex items-center justify-between border-b border-border-light pb-4">
      <div className="flex items-center gap-3">
        <span className="h-6 w-2 rounded-full bg-home-purple" />
        <h3 className="text-[18px] font-bold text-[#1D293D]">{title}</h3>
      </div>

      <button type="button" className="rounded-xl p-2">
        <Edit3 className="h-[18px] w-[18px] text-home-purple" />
      </button>
    </div>

    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
      {fields.map((item) => (
        <ReviewField key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  </div>
);

function ReviewApplication() {
  const router = useRouter();
  const { application: data, setReviewData } = useApplicationContext();
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);


  const loanData = data.loanCalculator;

  const personalFields = [
    { label: "Name", value: data.personalInfo?.fullName || "N/A" },
    { label: "PAN", value: data.pan?.number || "N/A" },
    {
      label: "DOB",
      value: data.personalInfo?.dob ? new Date(data.personalInfo.dob).toLocaleDateString() : "N/A",
    },
  ];

  const employmentFields = [
    { label: "Type", value: data.personalInfo?.employmentType || "N/A" },
    { label: "Company", value: data.employmentDetails?.companyName || "N/A" },
    {
      label: "Income",
      value: data.employmentDetails?.salary
        ? `₹${Number(data.employmentDetails.salary).toLocaleString("en-IN")}/mo`
        : "N/A",
    },
  ];

  const bankFields = [
    {
      label: "Account",
      value: data.bankDetails?.accountNumber
        ? `XXXX XXXX ${data.bankDetails.accountNumber.slice(-4)}`
        : "N/A",
    },
    { label: "IFSC", value: data.bankDetails?.ifsc || "N/A" },
  ];

  const handleSubmit = async () => {
    if (!agree) return;

    setLoading(true);

    const result = await submitApplicationAction(data);

    if (result?.error) {
      setLoading(false);
      return;
    }

    setReviewData({ submitted: true });
    router.push("/track-application");
  };

  return (
    <div className="w-full max-w-[896px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_277px] gap-8 items-start">
        <div>
          <div className="mb-9">
            <h2 className="text-[30px] font-extrabold leading-9 tracking-[-0.75px] text-text-heading">
              Review Application
            </h2>
            <p className="mt-2 text-[16px] font-medium leading-6 text-text-muted-dark">
              Please verify your details before final submission.
            </p>
          </div>

          <div className="space-y-6">
            <ReviewSection title="Personal Details" fields={personalFields} />

            <ReviewSection title="Employment & Income" fields={employmentFields} />

            <ReviewSection title="Bank Information" fields={bankFields} />
          </div>
        </div>

        <div
          className="rounded-[32px] border border-white/10 bg-gradient-to-br from-text-heading
            to-home-border-dark px-7 py-8 shadow-[var(--shadow-dark-card)]"
        >
          <div className="inline-flex items-center gap-3 rounded-[16px] bg-white/10 px-3 py-3">
            <ClipboardList className="h-5 w-5 text-home-green" />
            <span className="text-[14px] font-bold uppercase tracking-[0.7px] text-white">
              Loan Summary
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-end justify-between border-b border-white/10 pb-4">
              <p className="text-[16px] font-medium text-text-muted-light">
                Loan <br /> Amount
              </p>
              <p className="text-[24px] font-extrabold text-white">
                ₹{loanData?.loanAmount ? Number(loanData.loanAmount).toLocaleString("en-IN") : "5,00,000"}
              </p>
            </div>

            <div className="flex items-end justify-between border-b border-white/10 pb-4">
              <p className="text-[16px] font-medium text-text-muted-light">Tenure</p>
              <p className="text-[20px] font-bold text-white">
                {loanData?.tenure || 36} Months
              </p>
            </div>

            <div className="flex items-end justify-between pb-2">
              <p className="text-[16px] font-medium text-text-muted-light">EMI</p>
              <p className="text-[30px] font-extrabold text-home-green">
                ₹{loanData?.emi ? Number(loanData.emi).toLocaleString("en-IN") : "16,500"}
              </p>
            </div>
          </div>

          <label
            className="mt-7 flex cursor-pointer gap-3 rounded-[16px] border border-home-purple/30
              bg-home-purple/20 p-4"
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 h-4 w-4 accent-home-purple"
            />
            <span className="text-[12px] font-medium leading-5 text-text-on-dark-muted">
              I agree to the <span className="text-home-green">Terms & Conditions</span> and consent
              to fetch my credit report from CICs.
            </span>
          </label>

          <button
            type="button"
            disabled={!agree || loading}
            onClick={handleSubmit}
            className="mt-8 flex h-[86px] w-full items-center justify-center gap-4 rounded-[16px]
              bg-gradient-to-r from-home-green to-home-green-dark px-6 text-[18px] font-bold leading-7
              text-white shadow-[0px_12px_24px_-8px_rgba(0,200,156,0.4)] disabled:cursor-not-allowed
              disabled:opacity-60"
          >
            <Shield className="h-5 w-5" />
            {loading ? "Submitting..." : "e-Sign & Submit"}
          </button>

          <div
            className="mt-5 flex items-center justify-center gap-1 text-[12px] font-semibold
              text-text-muted-light"
          >
            <CheckCircle className="h-3.5 w-3.5 text-home-green" />
            256-bit SSL Encrypted
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewApplication;
