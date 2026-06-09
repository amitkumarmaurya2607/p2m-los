'use client'
import React, { useEffect, useState, use } from "react";
import {
  IndianRupee,
  CheckCircle2,
  Clock3,
  CreditCard,
  CalendarDays,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
import StepCard from "@/views/Dashbaord/componants/StepCard";
import ProfileStatCard from "@/views/Dashbaord/Profile/shared/ProfileStatCard";
import ProfileEmptyState from "@/views/Dashbaord/Profile/shared/ProfileEmptyState";
import GradientButton from "@/components/ui/GradientButton";
import PulseDot from "@/components/PulseDot";
import { getCurrentRepaymentAction, getInitPaymentAction } from "@/lib/actions/apply.action";
import type { RepaymentDetailsType } from "@/lib/actions/action.type";
import QrCode from "@/components/QrCode/QrCode";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [repayment, setRepayment] = useState<RepaymentDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentData, setPaymentData] = useState<{ qrcode: string; upiUrl: string, transactionId: string } | null>(null);

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
          <h1 className="text-2xl font-bold text-text-heading md:text-3xl">
            Repayment Details
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            View your loan repayment information and make payments.
          </p>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-4 text-sm">
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

  async function generateLink(loanId: string) {
    // try {
    //   setLoading(true);
    //   const res = await getInitPaymentAction(loanId);

    //   if (!res?.success || !res?.data) {
    //     throw new Error(res?.error || "Failed to fetch repayment details");
    //   }

    //   setRepayment(res.data);
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : "Something went wrong");
    // } finally {
    //   setLoading(false);
    // }
    setPaymentData({ qrcode: "ydyfy", upiUrl: "ihhhohi" });
  }



  const timeover = () => {
    console.log("timeover")
  }
  return (
    <StepCard
      title="Repayment Details"
      subtitle="View your loan repayment information and make payments."
      icon={<IndianRupee className="w-6 h-6 text-primary" />}
      className="lg:w-[800px] mx-auto"
      tips={{
        title: "Repayment Tips",
        description:
          "Timely repayments improve your credit score and make future loan applications smoother.",
        Icon: <CreditCard className="w-5 h-5 text-primary" />,
        noteTitle: "Why Pay on Time?",
        noteDescription: (
          <ul className="space-y-2 text-sm leading-6">
            <li className="flex items-start gap-2">
              <PulseDot />
              Avoid late payment penalties and extra charges
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              Maintain a healthy credit score for future loans
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              Set up auto-pay reminders to never miss a due date
            </li>
          </ul>
        ),
        NoteIcon: Lightbulb,
      }}
    >
      {
        paymentData ?
          <QrCode qrcode="8798" upiUrl="ytyt" timeover={timeover} />
          :
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <ProfileStatCard label="Total Loan" value={formatAmount(repayment.principalAmount)} icon={IndianRupee} />
              <ProfileStatCard label="Total Due" value={formatAmount(repayment.totalRepayment)} icon={CreditCard} />

              {penaltyAmount > 0 && (
                <ProfileStatCard label="Penalty" value={formatAmount(penaltyAmount)} icon={AlertTriangle} />
              )}

              <ProfileStatCard
                label="Status"
                value={repayment.isOverdue ? "Overdue" : "On Track"}
                icon={repayment.isOverdue ? Clock3 : CheckCircle2}
              />
            </div>

            {/* Loan Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Loan ID</p>
                  <p className="mt-0.5 font-semibold text-text-heading">{repayment.loanId}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Due Date</p>
                  <p className="mt-0.5 font-semibold text-text-heading">{formatDate(repayment.dueDate)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Repayment Date</p>
                  <p className="mt-0.5 font-semibold text-text-heading">{formatDate(repayment.repaymentDate)}</p>
                </div>
                {repayment.daysAfterDue > 0 && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Days Overdue</p>
                    <p className="mt-0.5 font-semibold text-destructive">
                      {repayment.daysAfterDue} day{repayment.daysAfterDue !== 1 ? "s" : ""}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Status</p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-medium ${repayment.isOverdue
                      ? "bg-destructive/10 text-destructive"
                      : "bg-success/10 text-success"
                      }`}
                  >
                    {repayment.isOverdue ? "Overdue" : "On Track"}
                  </span>
                </div>
              </div>
            </div>

            {/* Penalty Details */}
            {repayment.penaltyBreakdown?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Penalty Details</h3>
                {repayment.penaltyBreakdown.map((penalty, index) => (
                  <div key={penalty.penaltyId || index} className="rounded-2xl border border-border-light bg-surface-muted p-5 mb-4 last:mb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Type</p>
                        <p className="mt-0.5 font-semibold text-text-heading">{penalty.penaltyType}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Rate</p>
                        <p className="mt-0.5 font-semibold text-text-heading">{penalty.penaltyRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Days Overdue</p>
                        <p className="mt-0.5 font-semibold text-destructive">{penalty.breakdown.daysOverdue} day{penalty.breakdown.daysOverdue !== 1 ? "s" : ""}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Penalty Amount</p>
                        <p className="mt-0.5 font-semibold text-text-heading">{formatAmount(penalty.summary.penaltyAmount)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Tax</p>
                        <p className="mt-0.5 font-semibold text-text-heading">{formatAmount(penalty.summary.taxAmount)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Total Penalty</p>
                        <p className="mt-0.5 font-semibold text-destructive">{formatAmount(penalty.summary.totalPenaltyAmount)}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-text-secondary leading-relaxed">{penalty.summary.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Payment CTA */}
            {Number(repayment.totalRepayment) > 0 && (
              <div className="rounded-2xl border border-border-light bg-surface-muted p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Amount Due
                </p>
                <h3 className="mt-1 text-3xl font-extrabold text-text-heading">
                  {formatAmount(repayment.totalRepayment)}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {repayment.isOverdue
                    ? `Overdue since ${formatDate(repayment.dueDate)}`
                    : `Pay before ${formatDate(repayment.dueDate)} to avoid late charges.`}
                </p>
                <GradientButton
                  onClick={generateLink}
                  leftIcon={<IndianRupee className="h-4 w-4" />}
                  className="mt-5"
                >
                  Pay Now
                </GradientButton>
              </div>
            )}
          </div>
      }

    </StepCard>
  );
}
