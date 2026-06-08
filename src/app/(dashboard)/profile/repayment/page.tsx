'use client'
import React, { useState, useEffect } from "react";
import {
  IndianRupee,
  CheckCircle2,
  Clock3,
  CreditCard,
  CalendarDays,
  Lightbulb,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import StepCard from "@/views/Dashbaord/componants/StepCard";
import ProfileStatCard from "@/views/Dashbaord/Profile/shared/ProfileStatCard";
import ProfileEmptyState from "@/views/Dashbaord/Profile/shared/ProfileEmptyState";
import GradientButton from "@/components/ui/GradientButton";
import PulseDot from "@/components/PulseDot";
import {
  getCurrentRepaymentAction,
  getLoansCredibilityAction,
} from "@/lib/actions/apply.action";
import type { RepaymentDetailsType } from "@/lib/actions/action.type";

function Page() {
  const [repayment, setRepayment] = useState<RepaymentDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRepaymentData();
  }, []);

  async function fetchRepaymentData() {
    try {
      const credRes = await getLoansCredibilityAction();

      if (!credRes?.success || !credRes?.data?.loan?.id) {
        throw new Error("No active loan found");
      }

      const res = await getCurrentRepaymentAction(credRes.data.loan.id);

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

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-text-secondary">Loading repayment details...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-4 text-sm">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <div>
            <p className="font-semibold text-destructive">Unable to load repayment details</p>
            <p className="mt-1 text-text-secondary">{error}</p>
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

    return (
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
                <p className="mt-0.5 font-semibold text-destructive">{repayment.daysAfterDue} day{repayment.daysAfterDue !== 1 ? "s" : ""}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Status</p>
              <span
                className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                  repayment.isOverdue
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
              leftIcon={<IndianRupee className="h-4 w-4" />}
              className="mt-5"
            >
              Pay Now
            </GradientButton>
          </div>
        )}
      </div>
    );
  };

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
      {renderContent()}
    </StepCard>
  );
}

export default Page;
