"use client";
import React, { useEffect, useState, use } from "react";
import {
  IndianRupee,
  CheckCircle2,
  Clock3,
  CreditCard,
  CalendarDays,
  Lightbulb,
  AlertTriangle,
  BriefcaseBusiness,
} from "lucide-react";
import StepCard from "@/views/Dashbaord/componants/StepCard";
import ProfileStatCard from "@/views/Dashbaord/Profile/shared/ProfileStatCard";
import ProfileEmptyState from "@/views/Dashbaord/Profile/shared/ProfileEmptyState";
import GradientButton from "@/components/ui/GradientButton";
import PulseDot from "@/components/PulseDot";
import { getCurrentRepaymentAction, getInitPaymentAction } from "@/lib/actions/apply.action";
import type { initpaymentType, RepaymentDetailsType } from "@/lib/actions/action.type";
import QrCode from "@/components/QrCode/QrCode";
import { InfoField } from "@/views/Dashbaord/Profile/componants/InfoField";
import WhiteInfoCard from "@/views/Dashbaord/Profile/componants/WhiteInfoCard";
import PageHeader from "@/views/Dashbaord/Profile/componants/PageHeader";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [repayment, setRepayment] = useState<RepaymentDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentData, setPaymentData] = useState<initpaymentType | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No loan ID provided");
      setLoading(false);
      return;
    }
    fetchRepayment(id);
  }, [id]);

  async function fetchRepayment(loanId: string) {
    try {
      setLoading(true);
      const res = await getCurrentRepaymentAction(loanId);

      if (!res?.success || !res?.data) {
        throw new Error(res?.error || "Failed to fetch repayment details");
      }

      setRepayment(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const formatAmount = (value?: string | number) => {
    if (value === undefined || value === null) return "₹0";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (Number.isNaN(num)) return "₹0";
    return `₹${new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(num)}`;
  };

  const formatDate = (date?: string) => {
    if (!date) return "-";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return String(date);
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  };

  const penaltyAmount = repayment?.totals?.totalPenalties
    ? parseFloat(repayment.totals.totalPenalties)
    : 0;

  if (loading) {
    return (
      <ProfileEmptyState
        title="Loading repayment details..."
        description="Please wait while we fetch your latest repayment information."
      />
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-text-heading md:text-3xl">Repayment Details</h1>
          <p className="mt-1 text-sm text-text-secondary">
            View your loan repayment information and make payments.
          </p>
        </div>

        <div
          className="flex items-start gap-3 rounded-2xl border border-destructive/20
            bg-destructive/5 px-5 py-4 text-sm"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <div>
            <p className="font-semibold text-destructive">Unable to load repayment details</p>
            <p className="mt-1 text-text-secondary">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!repayment) {
    return (
      <ProfileEmptyState
        title="No repayment data"
        description="We could not find any repayment information for your account."
      />
    );
  }

  async function generateLink() {
    try {
      setLoading(true);
      const res = await getInitPaymentAction(id);

      if (res?.success && res?.data) {
        setRepayment(res.data);
        return;
      }
      throw new Error(res?.error || "Failed to fetch repayment details");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
    setPaymentData({ qrcode: "ydyfy", upiUrl: "ihhhohi", transactionId: "" });
  }

  const timeover = () => {
    console.log("timeover");
  };
  return (
    <>

      <div className="w-full">
        <div
          className="flex flex-col gap-4  sm:flex-row sm:items-end
          sm:justify-between sm:gap-4 sm:pb-6"
        >
          <PageHeader
            title="Repayment Details"
            subtitle="View your loan repayment information and make payments."
            onButtonClick={generateLink}
            buttonText=" Pay EMI Now"

          />

        </div>

        <div
          className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_306px]
          lg:items-start"
        >

          {/* <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <ProfileStatCard
                label="Total Loan"
                value={formatAmount(repayment.principalAmount)}
                icon={IndianRupee}
              />
              <ProfileStatCard
                label="Total Due"
                value={formatAmount(repayment.totalRepayment)}
                icon={CreditCard}
              />

              {penaltyAmount > 0 && (
                <ProfileStatCard
                  label="Penalty"
                  value={formatAmount(penaltyAmount)}
                  icon={AlertTriangle}
                />
              )}

              <ProfileStatCard
                label="Status"
                value={repayment.isOverdue ? "Overdue" : "On Track"}
                icon={repayment.isOverdue ? Clock3 : CheckCircle2}
              />
            </div> */}
          {paymentData ?
            <div className="space-y-5 sm:space-y-8">
              <WhiteInfoCard
                title="Loan Details"
                icon={<BriefcaseBusiness className="h-4 w-4 text-[#3737C1] sm:h-5 sm:w-5" />}
              >
                <QrCode qrcode="8798" upiUrl="ytyt" timeover={timeover} />
              </WhiteInfoCard>
            </div>
            :

            <>
              <div className="space-y-5 sm:space-y-8">
                <WhiteInfoCard
                  title="Loan Details"
                  icon={<BriefcaseBusiness className="h-4 w-4 text-[#3737C1] sm:h-5 sm:w-5" />}
                >
                  <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:mt-6 sm:grid-cols-2 sm:gap-y-6">
                    <InfoField label="Loan ID" value={repayment?.loanId} />
                    <InfoField label="Due Date" value={formatDate(repayment?.dueDate)} />
                    <InfoField label="Repayment Date" value={formatDate(repayment?.repaymentDate)} />
                    {repayment?.daysAfterDue > 0 && <InfoField label="Days Overdue" value={`${repayment?.daysAfterDue} day${repayment.daysAfterDue !== 1 ? "s" : ""}`} />}
                    <InfoField label="  Status" value={repayment?.isOverdue ? "Overdue" : "On Track"} />
                  </div>
                </WhiteInfoCard>

                {repayment?.penaltyBreakdown?.length > 0 && (
                  <WhiteInfoCard
                    title="Penalty Details"
                    icon={
                      <BriefcaseBusiness className="h-4 w-4 text-[#3737C1] sm:h-5 sm:w-5" />
                    }
                  >
                    <div className="mt-5 space-y-4 sm:mt-6">
                      {repayment?.penaltyBreakdown?.map((penalty, index) => (
                        <div
                          key={penalty?.penaltyId || index}
                          className="rounded-2xl border border-border-light bg-surface-muted p-5"
                        >
                          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                            <InfoField label="Type" value={penalty?.penaltyType} />

                            <InfoField label="Rate" value={`${penalty?.penaltyRate}%`} />

                            <InfoField
                              label="Days Overdue"
                              value={`${penalty?.breakdown?.daysOverdue} day${penalty?.breakdown?.daysOverdue !== 1 ? "s" : ""
                                }`}
                              valueClassName="text-destructive"
                            />

                            <InfoField
                              label="Penalty Amount"
                              value={formatAmount(penalty?.summary?.penaltyAmount)}
                            />

                            <InfoField
                              label="Tax"
                              value={formatAmount(penalty?.summary?.taxAmount)}
                            />

                            <InfoField
                              label="Total Penalty"
                              value={formatAmount(penalty?.summary?.totalPenaltyAmount)}
                              valueClassName="text-destructive"
                            />
                          </div>

                          {penalty?.summary?.description && (
                            <p className="mt-4 text-xs leading-relaxed text-text-secondary">
                              {penalty.summary.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </WhiteInfoCard>
                )}

              </div>
              <PaymentSummary />
            </>

          }
        </div>
      </div>

    </>

  );
}


import { ArrowRight } from "lucide-react";

type PaymentSummaryProps = {
  totalPaid?: string;
  totalRemaining?: string;
  upcomingEmi?: string;
  dueDate?: string;
  onEmiClick?: () => void;
};

function PaymentSummary({
  totalPaid = "₹77,100",
  totalRemaining = "₹2,84,000",
  upcomingEmi = "₹12,850",
  dueDate = "15 Feb 2026",
  onEmiClick,
}: PaymentSummaryProps) {
  return (
    <div
      className="
        relative w-full max-w-[306px] overflow-hidden rounded-3xl
        bg-[linear-gradient(135deg,#0F172B_0%,#1D293D_100%)]
        px-6 py-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]
        sm:max-w-[306px] sm:px-8
      "
    >
      {/* Green Blur */}
      <div
        className="
          pointer-events-none absolute -right-10 -top-10 h-48 w-48
          rounded-full bg-[#00C89C]/10 blur-[64px]
        "
      />

      {/* Heading */}
      <div className="relative border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold leading-7 text-white">
          Payment Summary
        </h3>
      </div>

      {/* Content */}
      <div className="relative pt-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.6px] text-white/60">
            Total Amount Paid
          </p>
          <p className="mt-1 text-[30px] font-extrabold leading-9 text-[#00C89C]">
            {totalPaid}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.6px] text-white/60">
            Total Remaining
          </p>
          <p className="mt-1 text-2xl font-bold leading-8 text-white">
            {totalRemaining}
          </p>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-xs font-bold uppercase tracking-[0.6px] text-white/60">
            Upcoming EMI
          </p>

          <button
            type="button"
            onClick={onEmiClick}
            className="
              mt-2 flex h-[82px] w-full items-center justify-between rounded-2xl
              border border-white/10 bg-white/10 p-4 text-left
              transition-all duration-200 hover:bg-white/[0.14]
            "
          >
            <div>
              <p className="text-lg font-bold leading-7 text-white">
                {upcomingEmi}
              </p>
              <p className="mt-1 text-xs font-medium leading-4 text-white/70">
                Due on {dueDate}
              </p>
            </div>

            <span
              className="
                flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                bg-white text-[#3737C1]
              "
            >
              <ArrowRight size={20} strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}