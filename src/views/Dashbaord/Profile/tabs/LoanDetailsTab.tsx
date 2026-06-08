"use client";

import { useEffect, useState } from "react";
import {
    CalendarDays,
    Check,
    ChevronDown,
    CircleDollarSign,
    Clock3,
    FileText,
    Info,
    Loader2,
    User,
    Wallet,
    X,
} from "lucide-react";
import { callSecure } from "@/lib/secure-action";
import { getLoanListAction, getLoanDetailsAction } from "@/lib/actions/apply.action";
import type { LoanDetailsResponse } from "@/lib/actions/action.type";

type LoanStatus = "Approved" | "Active" | "Rejected" | "Disbursed" | "Closed";

type DetailsEntry = {
    data?: LoanDetailsResponse;
    loading: boolean;
    error?: string;
};

const statusClass: Record<LoanStatus, string> = {

    Approved: "bg-green-100 text-green-700 border-green-200",
    Active: "bg-blue-100 text-blue-700 border-blue-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
    Disbursed: "bg-primary-muted text-primary border-primary/20",
    Closed: "bg-muted text-muted-foreground border-border",
};

const statusIcon: Record<LoanStatus, React.ReactNode> = {

    Approved: <CircleDollarSign className="h-3.5 w-3.5" />,
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
    if (upper === "DISBURSED") return "Disbursed";
    if (upper === "CLOSED") return "Closed";
    return value as LoanStatus | null;
}

const formatAmount = (value: number | string | undefined) => {
    if (value === undefined || value === null || value === "") return "-";
    const num = typeof value === "number" ? value : Number(value);
    if (Number.isNaN(num)) return String(value);
    return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(num)}`;
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
                setLoans(res?.success && res?.data ? (res.data as unknown as Record<string, unknown>[]) : []);
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
            if (!res?.success) throw new Error(res?.error || "Failed to fetch loan details");
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
        <section className="w-full bg-background px-4 py-6">
            {/* <div className="mx-auto w-full max-w-[1140px] rounded-3xl bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6"> */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-heading">
                    Loan Applications
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                    Review your current and past loan applications
                </p>
            </div>

            {loansLoading ? (
                <div className="flex items-center justify-center gap-2 rounded-3xl border bg-surface-muted px-6 py-12 text-sm text-text-muted">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    Loading loan applications...
                </div>
            ) : loans.length === 0 ? (
                <div className="rounded-3xl border bg-surface-muted px-6 py-12 text-center text-sm text-text-muted">
                    No loan applications found.
                </div>
            ) : (
                <div className="grid gap-5">
                    {loans.map((item, index) => {
                        const loanId = String(item.formattedLoanId);
                        const id = String(item.id);
                        const status = toLoanStatus(item.status);
                        const isOpen = openLoanId === id;
                        const details = detailsByLoanId[id];

                        return (
                            <div
                                key={loanId}
                                className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition-all hover:shadow-[var(--shadow-card)]"
                            >
                                <div className="p-5 sm:p-6">
                                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex min-w-0 items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-muted">
                                                <FileText className="h-6 w-6 text-primary" />
                                            </div>

                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="break-all font-mono text-base font-bold text-text-heading">
                                                        {loanId}
                                                    </h3>

                                                    {status && (
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusClass[status] || "bg-yellow-100 text-yellow-800 border-yellow-200"}`}
                                                        >
                                                            {statusIcon[status] || <Clock3 className="h-3.5 w-3.5" />}
                                                            {status}
                                                        </span>
                                                    )}
                                                </div>

                                                {typeof item.purpose === "string" && item.purpose && (
                                                    <p className="mt-1 text-sm text-text-secondary">
                                                        {item.purpose}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-0">
                                            <MiniInfo
                                                label="Amount"
                                                value={formatAmount(item.amount as number | string | undefined)}
                                                icon={<CircleDollarSign className="h-4 w-4" />}
                                            />

                                            <MiniInfo
                                                label="Applied On"
                                                value={formatDate(item.applicationDate as string | null | undefined)}
                                                icon={<CalendarDays className="h-4 w-4" />}
                                            />

                                            <MiniInfo
                                                label="Due Date"
                                                value={formatDate((item.loanDetails as any)?.dueDate as string | null | undefined)}
                                                icon={<Clock3 className="h-4 w-4" />}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5 flex flex-col gap-3 border-t border-border-light pt-4 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-xs leading-5 text-text-muted">
                                            Click "View Details" to see full loan information.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => handleToggleDetails(id)}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary-muted px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
                                        >
                                            {isOpen ? "Hide Details" : "View Details"}
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${isOpen
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="border-t border-border-light bg-surface-muted/70 p-5 sm:p-6">
                                            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                                                Additional Details
                                            </p>

                                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                                <DetailItem
                                                    icon={<User className="h-4 w-4" />}
                                                    label="Email"
                                                    value={(item as Record<string, unknown>)?.user
                                                        ? String((item as any).user.email ?? "-")
                                                        : "-"
                                                    }
                                                />

                                                <DetailItem
                                                    icon={<User className="h-4 w-4" />}
                                                    label="Phone"
                                                    value={(item as any)?.user?.phoneNumber
                                                        ? String((item as any).user.phoneNumber)
                                                        : "-"
                                                    }
                                                />

                                                <DetailItem
                                                    icon={<Clock3 className="h-4 w-4" />}
                                                    label="Duration"
                                                    value={(item as any)?.loanDetails?.durationDays
                                                        ? `${(item as any).loanDetails.durationDays} days`
                                                        : "-"
                                                    }
                                                />

                                                <DetailItem
                                                    icon={<CalendarDays className="h-4 w-4" />}
                                                    label="Created"
                                                    value={formatDate((item as any)?.createdAt as string | null | undefined)}
                                                />

                                                <DetailItem
                                                    icon={<Wallet className="h-4 w-4" />}
                                                    label="Disbursed Amount"
                                                    value={formatAmount(
                                                        (item as any)?.disbursement?.netAmount as
                                                        | number
                                                        | string
                                                        | undefined
                                                    )}
                                                />

                                                <DetailItem
                                                    icon={<CircleDollarSign className="h-4 w-4" />}
                                                    label="Total Obligation"
                                                    value={formatAmount(
                                                        (item as any)?.repayment?.totalObligation as
                                                        | number
                                                        | string
                                                        | undefined
                                                    )}
                                                />
                                            </div>

                                            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                                                Loan details (get-loan-details)
                                            </p>

                                            {details?.loading ? (
                                                <div className="space-y-3">
                                                    <div className="h-3 w-2/3 rounded bg-border-medium animate-pulse" />
                                                    <div className="h-3 w-1/2 rounded bg-border-medium animate-pulse" />
                                                    <div className="h-3 w-3/4 rounded bg-border-medium animate-pulse" />
                                                    <p className="pt-1 text-center text-xs text-text-muted">
                                                        Loading loan details…
                                                    </p>
                                                </div>
                                            ) : details?.error ? (
                                                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                                                    {details.error}
                                                </div>
                                            ) : details?.data ? (
                                                <LoanDetailsRenderer data={details.data as LoanDetailsResponse} />
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="mt-6 flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary-muted px-4 py-4 text-sm text-text-heading">
                <Info className="h-4 w-4 shrink-0 text-primary" />
                <p>
                    <span className="font-bold">Note:</span> Loan list is fetched on
                    load; full details are fetched once per loan and cached.
                </p>
            </div>
            {/* </div> */}
        </section>
    );
}

function DetailItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-border bg-surface p-4">
            <div className="mb-2 flex items-center gap-2 text-primary">
                {icon}
                <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
                    {label}
                </p>
            </div>

            <p className="break-words text-sm font-bold text-text-heading">{value}</p>
        </div>
    );
}

function MiniInfo({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-border bg-surface-muted px-4 py-3">
            <div className="mb-1 flex items-center gap-2 text-primary">
                {icon}
                <p className="text-[11px] font-bold uppercase tracking-wide text-text-muted">
                    {label}
                </p>
            </div>

            <p className="break-words text-sm font-bold text-text-heading">{value}</p>
        </div>
    );
}

// ─── Loan Details Renderer ─────────────────────────────────────────────────

function LoanDetailsRenderer({ data }: { data: LoanDetailsResponse }) {
    const interest = data.repayment?.feeBreakdowns?.find(
        (f) => f.type === "interest",
    )?.total;
    const earlyRepaymentAmount = data.earlyRepayment?.totalAmount;
    const simplePenalty = data.penalties?.[0];
    const processingDeduction = data.disbursement?.deductions?.find(
        (d) => d.type === "processing",
    );
    const gstTax = processingDeduction?.taxes?.find((t) => t.type === "GST");

    return (
        <div className="space-y-5">
            {/* ── Loan Information ── */}
            <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    Loan Information
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <DetailItem
                        icon={<CircleDollarSign className="h-4 w-4" />}
                        label="Loan Amount"
                        value={formatAmount(data.amount)}
                    />
                    <DetailItem
                        icon={<CalendarDays className="h-4 w-4" />}
                        label="Applied"
                        value={formatDate(data.applicationDate)}
                    />
                    <DetailItem
                        icon={<CalendarDays className="h-4 w-4" />}
                        label="Due Date"
                        value={formatDate(data.loanDetails?.dueDate ?? data.loan_due_date)}
                    />
                    <DetailItem
                        icon={<CalendarDays className="h-4 w-4" />}
                        label="Application Submitted"
                        value={formatDate(data.createdAt)}
                    />
                    <DetailItem
                        icon={<CalendarDays className="h-4 w-4" />}
                        label="Loan Approved"
                        value={formatDate(data.approvalDate)}
                    />
                </div>
            </div>

            {/* ── Repayment ── */}
            <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    Repayment
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <DetailItem
                        icon={<CircleDollarSign className="h-4 w-4" />}
                        label="Total Obligation"
                        value={formatAmount(data.repayment?.totalObligation)}
                    />
                    <DetailItem
                        icon={<CircleDollarSign className="h-4 w-4" />}
                        label="Total Fees"
                        value={formatAmount(data.repayment?.totalFees)}
                    />
                    <DetailItem
                        icon={<CircleDollarSign className="h-4 w-4" />}
                        label="Interest"
                        value={formatAmount(interest)}
                    />
                </div>
            </div>

            {/* ── Early Repayment & Penalties ── */}
            <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    Early Repayment & Penalties
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <DetailItem
                        icon={<Wallet className="h-4 w-4" />}
                        label="Early Repayment"
                        value={formatAmount(earlyRepaymentAmount)}
                    />
                    <DetailItem
                        icon={<Info className="h-4 w-4" />}
                        label={simplePenalty?.type ?? "SIMPLE"}
                        value={simplePenalty ? `${simplePenalty.chargeValue}%` : "-"}
                    />
                </div>
            </div>

            {/* ── Disbursement ── */}
            <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    Disbursement
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <DetailItem
                        icon={<CircleDollarSign className="h-4 w-4" />}
                        label="Gross Amount"
                        value={formatAmount(data.disbursement?.grossAmount)}
                    />
                    <DetailItem
                        icon={<CircleDollarSign className="h-4 w-4" />}
                        label="Total Deductions"
                        value={formatAmount(data.disbursement?.totalDeductions)}
                    />
                    <DetailItem
                        icon={<CircleDollarSign className="h-4 w-4" />}
                        label="Net Amount"
                        value={formatAmount(data.disbursement?.netAmount)}
                    />
                    <DetailItem
                        icon={<CircleDollarSign className="h-4 w-4" />}
                        label="Processing"
                        value={formatAmount(processingDeduction?.total ?? data.disbursement?.processing_fee)}
                    />
                    {gstTax && (
                        <DetailItem
                            icon={<CircleDollarSign className="h-4 w-4" />}
                            label={`GST (${gstTax.chargeValue}%) (Exc.)`}
                            value={formatAmount(gstTax.amount)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
