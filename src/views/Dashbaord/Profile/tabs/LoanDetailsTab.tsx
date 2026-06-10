"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  FileSearch,
  FileText,
  Info,
  ReceiptText,
  ShieldAlert,
  User,
  Wallet,
} from "lucide-react";

import { callSecure } from "@/lib/secure-action";
import { getLoanDetailsAction, getLoanListAction } from "@/lib/actions/apply.action";
import type { LoanDetailsResponse } from "@/lib/actions/action.type";
import { formatStatus } from "@/lib/utils";

import PageHeader from "../componants/PageHeader";
import { InfoField } from "../componants/InfoField";

type LoanStatus = "Approved" | "Active" | "Rejected" | "Disbursed" | "Closed" | "Pending";

type DetailsEntry = {
  data?: LoanDetailsResponse;
  loading: boolean;
  error?: string;
};

const statusClass: Record<LoanStatus, string> = {
  Approved: "border-green-200 bg-green-50 text-green-700",
  Pending: "border-green-200 bg-green-50 text-green-700",
  Active: "border-blue-200 bg-blue-50 text-blue-700",
  Rejected: "border-red-200 bg-red-50 text-red-700",
  Disbursed: "border-[#3737C1]/20 bg-[#3737C1]/10 text-[#3737C1]",
  Closed: "border-[#E2E8F0] bg-[#F8FAFC] text-[#62748E]",
};

const statusIcon: Record<LoanStatus, React.ReactNode> = {
  Approved: <CircleDollarSign className="h-3.5 w-3.5" />,
  Pending: <CircleDollarSign className="h-3.5 w-3.5" />,
  Active: <CircleDollarSign className="h-3.5 w-3.5" />,
  Rejected: <Info className="h-3.5 w-3.5" />,
  Disbursed: <Wallet className="h-3.5 w-3.5" />,
  Closed: <FileText className="h-3.5 w-3.5" />,
};

function toLoanStatus(value: unknown): LoanStatus | null {
  if (typeof value !== "string") return null;

  const upper = value.toUpperCase();

  if (upper === "APPROVED") return "Approved";
  if (upper === "ACTIVE") return "Active";
  if (upper === "REJECTED") return "Rejected";
  if (upper === "PENDING") return "Pending";
  if (upper === "DISBURSED") return "Disbursed";
  if (upper === "CLOSED") return "Closed";

  return null;
}

const formatAmount = (value?: number | string | null) => {
  if (value === undefined || value === null || value === "") return "-";

  const num = typeof value === "number" ? value : Number(value);

  if (Number.isNaN(num)) return String(value);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
};

const formatDate = (date?: string | null) => {
  if (!date) return "-";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) return String(date);

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
};

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-slate-200/80 ${className}`} />;
}

function LoanListSkeleton() {
  return (
    <div className="mt-5 space-y-5 sm:mt-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-[#F1F5F9] bg-white p-4
            shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)] sm:rounded-3xl sm:p-6 lg:p-8"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-3 sm:gap-4">
              <SkeletonBlock className="h-11 w-11 shrink-0 rounded-2xl sm:h-12 sm:w-12" />

              <div className="min-w-0 flex-1">
                <SkeletonBlock className="h-5 w-40 sm:w-56" />
                <SkeletonBlock className="mt-2 h-4 w-28" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[460px]">
              <SkeletonBlock className="h-16 rounded-2xl" />
              <SkeletonBlock className="h-16 rounded-2xl" />
              <SkeletonBlock className="h-16 rounded-2xl" />
            </div>
          </div>

          <div
            className="mt-5 flex flex-col gap-3 border-t border-[#F1F5F9] pt-4 sm:flex-row
              sm:items-center sm:justify-between"
          >
            <SkeletonBlock className="h-4 w-full max-w-[280px]" />
            <SkeletonBlock className="h-10 w-full rounded-xl sm:w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyLoanApplications() {
  return (
    <div
      className="mt-5 rounded-2xl border border-[#F1F5F9] bg-white p-6 text-center
        shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)] sm:mt-8 sm:rounded-3xl sm:p-10"
    >
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3737C1]/10
          sm:h-16 sm:w-16"
      >
        <FileSearch className="h-7 w-7 text-[#3737C1] sm:h-8 sm:w-8" />
      </div>

      <h2 className="mt-5 text-lg font-extrabold leading-7 text-[#0F172B] sm:text-2xl sm:leading-8">
        No loan applications found
      </h2>

      <p
        className="mx-auto mt-2 max-w-[420px] text-sm font-medium leading-6 text-[#62748E]
          sm:text-base"
      >
        Your loan applications will appear here once you apply for a loan.
      </p>
    </div>
  );
}

function SummaryMiniCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#F1F5F9] bg-[#F8FAFC] px-4 py-3">
      <div className="mb-1 flex items-center gap-2 text-[#3737C1]">
        {icon}

        <p
          className="text-[10px] font-bold uppercase leading-4 tracking-[0.45px] text-[#90A1B9]
            sm:text-[11px]"
        >
          {label}
        </p>
      </div>

      <p
        className="break-words text-sm font-bold leading-5 text-[#1D293D] sm:text-base sm:leading-6"
      >
        {value}
      </p>
    </div>
  );
}

function LoanDetailsLoading() {
  return (
    <div className="space-y-3 rounded-2xl border border-[#F1F5F9] bg-white p-4">
      <SkeletonBlock className="h-3 w-2/3" />
      <SkeletonBlock className="h-3 w-1/2" />
      <SkeletonBlock className="h-3 w-3/4" />

      <p className="pt-1 text-center text-xs font-medium text-[#62748E]">Loading loan details…</p>
    </div>
  );
}

export default function LoanDetailsTab() {
  const [loans, setLoans] = useState<Record<string, unknown>[]>([]);
  const [loansLoading, setLoansLoading] = useState(true);
  const [openLoanId, setOpenLoanId] = useState<string | null>(null);
  const [detailsByLoanId, setDetailsByLoanId] = useState<Record<string, DetailsEntry>>({});

  useEffect(() => {
    let cancelled = false;

    async function fetchLoans() {
      try {
        setLoansLoading(true);

        const res = await getLoanListAction();

        if (cancelled) return;

        setLoans(
          res?.success && res?.data ? (res.data as unknown as Record<string, unknown>[]) : [],
        );
      } catch {
        if (!cancelled) setLoans([]);
      } finally {
        if (!cancelled) setLoansLoading(false);
      }
    }

    fetchLoans();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleToggleDetails = async (loanId: string) => {
    const willOpen = openLoanId !== loanId;

    setOpenLoanId(willOpen ? loanId : null);

    if (!willOpen) return;
    if (detailsByLoanId[loanId]) return;

    setDetailsByLoanId((prev) => ({
      ...prev,
      [loanId]: { loading: true },
    }));

    try {
      const res = await callSecure(getLoanDetailsAction, loanId);

      if (!res?.success) {
        throw new Error(res?.error || "Failed to fetch loan details");
      }

      setDetailsByLoanId((prev) => ({
        ...prev,
        [loanId]: {
          loading: false,
          data: res?.data as LoanDetailsResponse,
          error: res?.error,
        },
      }));
    } catch (err) {
      setDetailsByLoanId((prev) => ({
        ...prev,
        [loanId]: {
          loading: false,
          error: err instanceof Error ? err.message : "Failed to load details",
        },
      }));
    }
  };

  return (
    <div className="mx-auto w-full">
      <PageHeader
        title="Loan Applications"
        subtitle="Review your current and past loan applications."
        showButton={false}
      />

      {loansLoading ? (
        <LoanListSkeleton />
      ) : loans.length === 0 ? (
        <EmptyLoanApplications />
      ) : (
        <div className="mt-5 grid gap-5 sm:mt-8 sm:gap-6">
          {loans.map((item) => {
            const loanId = String(item.formattedLoanId || item.id || "-");
            const id = String(item.id || loanId);
            const status = toLoanStatus(item.status);
            const isOpen = openLoanId === id;
            const details = detailsByLoanId[id];

            return (
              <div
                key={id}
                className="overflow-hidden rounded-2xl border border-[#F1F5F9] bg-white
                  shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)] transition-all
                  hover:shadow-[0px_16px_40px_-18px_rgba(0,0,0,0.18)] sm:rounded-3xl"
              >
                <div className="p-4 sm:p-6 lg:p-8">
                  <div
                    className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl
                          bg-[#3737C1]/10 sm:h-12 sm:w-12"
                      >
                        <FileText className="h-5 w-5 text-[#3737C1] sm:h-6 sm:w-6" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            className="break-all font-mono text-sm font-extrabold leading-5
                              text-[#0F172B] sm:text-base"
                          >
                            {loanId}
                          </h3>

                          {status && (
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border
                                px-2.5 py-1 text-[11px] font-bold leading-4 sm:px-3 sm:text-xs ${
                                  statusClass[status] ||
                                  "border-yellow-200 bg-yellow-50 text-yellow-800"
                                }`}
                            >
                              {statusIcon[status] || <Clock3 className="h-3.5 w-3.5" />}
                              {formatStatus(status)}
                            </span>
                          )}
                        </div>

                        {typeof item.purpose === "string" && item.purpose && (
                          <p
                            className="mt-1 text-xs font-medium leading-5 text-[#62748E] sm:text-sm"
                          >
                            {item.purpose}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 lg:w-[460px]">
                      <SummaryMiniCard
                        label="Amount"
                        value={formatAmount(item.amount as number | string | undefined)}
                        icon={<CircleDollarSign className="h-4 w-4" />}
                      />

                      <SummaryMiniCard
                        label="Applied On"
                        value={formatDate(item.applicationDate as string | null | undefined)}
                        icon={<CalendarDays className="h-4 w-4" />}
                      />

                      <SummaryMiniCard
                        label="Due Date"
                        value={formatDate(
                          (item.loanDetails as any)?.dueDate as string | null | undefined,
                        )}
                        icon={<Clock3 className="h-4 w-4" />}
                      />
                    </div>
                  </div>

                  <div
                    className="mt-5 flex flex-col gap-3 border-t border-[#F1F5F9] pt-4 sm:flex-row
                      sm:items-center sm:justify-between"
                  >
                    <p className="text-xs font-medium leading-5 text-[#62748E]">
                      Click “View Details” to see full loan information.
                    </p>

                    <button
                      type="button"
                      onClick={() => handleToggleDetails(id)}
                      className="inline-flex h-10 w-full items-center justify-center gap-2
                        rounded-xl border border-[#3737C1]/20 bg-[#3737C1]/10 px-4 text-sm font-bold
                        text-[#3737C1] transition hover:bg-[#3737C1] hover:text-white sm:w-fit"
                    >
                      {isOpen ? "Hide Details" : "View Details"}

                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#F1F5F9] bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
                      <DetailSection
                        title="Additional Details"
                        description="Basic borrower and loan summary information."
                        icon={<User className="h-4 w-4 text-[#3737C1]" />}
                      >
                        <InfoField
                          icon={<User className="h-4 w-4 text-[#3737C1]" />}
                          label="Email"
                          value={
                            (item as any)?.user?.email ? String((item as any).user.email) : "-"
                          }
                        />

                        <InfoField
                          icon={<User className="h-4 w-4 text-[#3737C1]" />}
                          label="Phone"
                          value={
                            (item as any)?.user?.phoneNumber
                              ? String((item as any).user.phoneNumber)
                              : "-"
                          }
                        />

                        <InfoField
                          icon={<Clock3 className="h-4 w-4 text-[#3737C1]" />}
                          label="Duration"
                          value={
                            (item as any)?.loanDetails?.durationDays
                              ? `${(item as any).loanDetails.durationDays} days`
                              : "-"
                          }
                        />

                        <InfoField
                          icon={<CalendarDays className="h-4 w-4 text-[#3737C1]" />}
                          label="Created"
                          value={formatDate((item as any)?.createdAt)}
                        />

                        <InfoField
                          icon={<Wallet className="h-4 w-4 text-[#3737C1]" />}
                          label="Disbursed Amount"
                          value={formatAmount((item as any)?.disbursement?.netAmount)}
                        />

                        <InfoField
                          icon={<CircleDollarSign className="h-4 w-4 text-[#3737C1]" />}
                          label="Total Obligation"
                          value={formatAmount((item as any)?.repayment?.totalObligation)}
                        />
                      </DetailSection>

                      <div className="mt-5 sm:mt-6">
                        {details?.loading ? (
                          <LoanDetailsLoading />
                        ) : details?.error ? (
                          <div
                            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm
                              font-semibold text-red-700"
                          >
                            {details.error}
                          </div>
                        ) : details?.data ? (
                          <LoanDetailsRenderer data={details.data} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div
        className="mt-5 flex items-start gap-2 rounded-2xl border border-[#3737C1]/20
          bg-[#3737C1]/10 px-4 py-4 text-sm font-medium leading-6 text-[#1D293D] sm:mt-6"
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#3737C1]" />

        <p>
          <span className="font-bold">Note:</span> Loan list is fetched on load. Full details are
          fetched once per loan and cached.
        </p>
      </div>
    </div>
  );
}

function LoanDetailsRenderer({ data }: { data: LoanDetailsResponse }) {
  const interest = data.repayment?.feeBreakdowns?.find((f) => f.type === "interest")?.total;

  const earlyRepaymentAmount = data.earlyRepayment?.totalAmount;

  const simplePenalty = data.penalties?.[0];

  const processingDeduction = data.disbursement?.deductions?.find((d) => d.type === "processing");

  const gstTax = processingDeduction?.taxes?.find((t) => t.type === "GST");

  return (
    <div className="space-y-5 sm:space-y-6">
      <DetailSection
        title="Loan Information"
        description="Application amount, dates, and approval timeline."
        icon={<FileText className="h-4 w-4 text-[#3737C1]" />}
      >
        <InfoField
          icon={<CircleDollarSign className="h-4 w-4 text-[#3737C1]" />}
          label="Loan Amount"
          value={formatAmount(data.amount)}
        />

        <InfoField
          icon={<CalendarDays className="h-4 w-4 text-[#3737C1]" />}
          label="Applied"
          value={formatDate(data.applicationDate)}
        />

        <InfoField
          icon={<CalendarDays className="h-4 w-4 text-[#3737C1]" />}
          label="Due Date"
          value={formatDate(data.loanDetails?.dueDate ?? data.loan_due_date)}
        />

        <InfoField
          icon={<CalendarDays className="h-4 w-4 text-[#3737C1]" />}
          label="Application Submitted"
          value={formatDate(data.createdAt)}
        />

        <InfoField
          icon={<CalendarDays className="h-4 w-4 text-[#3737C1]" />}
          label="Loan Approved"
          value={formatDate(data.approvalDate)}
        />
      </DetailSection>

      <DetailSection
        title="Repayment"
        description="Total payable amount, fees, and interest breakup."
        icon={<Wallet className="h-4 w-4 text-[#00A882]" />}
      >
        <InfoField
          icon={<CircleDollarSign className="h-4 w-4 text-[#00A882]" />}
          label="Total Obligation"
          value={formatAmount(data.repayment?.totalObligation)}
        />

        <InfoField
          icon={<CircleDollarSign className="h-4 w-4 text-[#00A882]" />}
          label="Total Fees"
          value={formatAmount(data.repayment?.totalFees)}
        />

        <InfoField
          icon={<CircleDollarSign className="h-4 w-4 text-[#00A882]" />}
          label="Interest"
          value={formatAmount(interest)}
        />
      </DetailSection>

      <DetailSection
        title="Early Repayment & Penalties"
        description="Early closure amount and penalty configuration."
        icon={<ShieldAlert className="h-4 w-4 text-[#FE9A00]" />}
      >
        <InfoField
          icon={<Wallet className="h-4 w-4 text-[#FE9A00]" />}
          label="Early Repayment"
          value={formatAmount(earlyRepaymentAmount)}
        />

        <InfoField
          icon={<Info className="h-4 w-4 text-[#FE9A00]" />}
          label={simplePenalty?.type ?? "SIMPLE"}
          value={simplePenalty ? `${simplePenalty.chargeValue}%` : "-"}
        />
      </DetailSection>

      <DetailSection
        title="Disbursement"
        description="Gross amount, deductions, processing fee, GST, and net payout."
        icon={<ReceiptText className="h-4 w-4 text-[#3737C1]" />}
      >
        <InfoField
          icon={<CircleDollarSign className="h-4 w-4 text-[#3737C1]" />}
          label="Gross Amount"
          value={formatAmount(data.disbursement?.grossAmount)}
        />

        <InfoField
          icon={<CircleDollarSign className="h-4 w-4 text-[#3737C1]" />}
          label="Total Deductions"
          value={formatAmount(data.disbursement?.totalDeductions)}
        />

        <InfoField
          icon={<CircleDollarSign className="h-4 w-4 text-[#3737C1]" />}
          label="Net Amount"
          value={formatAmount(data.disbursement?.netAmount)}
        />

        <InfoField
          icon={<CircleDollarSign className="h-4 w-4 text-[#3737C1]" />}
          label="Processing"
          value={formatAmount(processingDeduction?.total ?? data.disbursement?.processing_fee)}
        />

        {gstTax && (
          <InfoField
            icon={<CircleDollarSign className="h-4 w-4 text-[#3737C1]" />}
            label={`GST (${gstTax.chargeValue}%)`}
            value={formatAmount(gstTax.amount)}
          />
        )}
      </DetailSection>
    </div>
  );
}

function DetailSection({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-2xl border border-[#E2E8F0] bg-white p-4
        shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)] sm:rounded-3xl sm:p-5 lg:p-6"
    >
      <div
        className="mb-5 flex flex-col gap-3 border-b border-[#F1F5F9] pb-4 sm:flex-row
          sm:items-center sm:justify-between"
      >
        <div className="flex min-w-0 items-start gap-3">
          {icon && (
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                bg-[#3737C1]/10"
            >
              {icon}
            </div>
          )}

          <div className="min-w-0">
            <h3
              className="text-sm font-extrabold leading-5 text-[#0F172B] sm:text-base sm:leading-6"
            >
              {title}
            </h3>

            {description && (
              <p className="mt-0.5 text-xs font-medium leading-5 text-[#62748E]">{description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}
