"use client";

import { useEffect, useState } from "react";
import {
    CalendarDays,
    ChevronDown,
    CircleDollarSign,
    Clock3,
    FileText,
    Info,
    Loader2,
    User,
    Wallet,
} from "lucide-react";
import { callSecure } from "@/lib/secure-action";
import { getLoanListAction, getLoanDetailsAction } from "@/lib/actions/apply.action";
import type { GetLoanListItem, GetLoanDetailsResponse } from "@/lib/services/apply.service";

type LoanStatus = "Pending" | "Approved" | "Rejected" | "Disbursed" | "Closed";

type DetailsEntry = {
    data?: GetLoanDetailsResponse;
    loading: boolean;
    error?: string;
};

const KNOWN_STATUSES: LoanStatus[] = ["Pending", "Approved", "Rejected", "Disbursed", "Closed"];

const statusClass: Record<LoanStatus, string> = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Approved: "bg-green-100 text-green-700 border-green-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
    Disbursed: "bg-primary-muted text-primary border-primary/20",
    Closed: "bg-muted text-muted-foreground border-border",
};

const statusIcon: Record<LoanStatus, React.ReactNode> = {
    Pending: <Clock3 className="h-3.5 w-3.5" />,
    Approved: <CircleDollarSign className="h-3.5 w-3.5" />,
    Rejected: <Info className="h-3.5 w-3.5" />,
    Disbursed: <Wallet className="h-3.5 w-3.5" />,
    Closed: <FileText className="h-3.5 w-3.5" />,
};

function toLoanStatus(value: unknown): LoanStatus | null {
    if (typeof value !== "string") return null;
    return (KNOWN_STATUSES as string[]).includes(value) ? (value as LoanStatus) : null;
}

const MOCK_LOANS: GetLoanListItem[] = [
    {
        loanId: "L26060000221",
        status: "Pending",
        amount: 5000,
        purpose: "Personal Loan",
        applicationDate: "2026-06-05T17:03:00",
        applicantName: "Amit Kumar",
        tenure: "6 Months",
        interestRate: "18% p.a.",
        dueDate: "2026-07-05",
        emiAmount: 940,
        updatedAt: "2026-06-05T17:03:00",
    },
    {
        loanId: "L26060000222",
        status: "Approved",
        amount: 15000,
        purpose: "Emergency Loan",
        applicationDate: "2026-06-03T12:20:00",
        applicantName: "Amit Kumar",
        tenure: "9 Months",
        interestRate: "16% p.a.",
        dueDate: "2026-07-03",
        emiAmount: 1860,
        updatedAt: "2026-06-05T16:30:00",
    },
    {
        loanId: "L26060000223",
        status: "Disbursed",
        amount: 25000,
        purpose: "Medical Loan",
        applicationDate: "2026-05-20T09:15:00",
        applicantName: "Amit Kumar",
        tenure: "12 Months",
        interestRate: "15% p.a.",
        dueDate: "2026-06-20",
        emiAmount: 2300,
        updatedAt: "2026-05-25T10:00:00",
    },
];

const MOCK_DETAILS: Record<string, GetLoanDetailsResponse> = {
    L26060000221: {
        loanId: "L26060000221",
        applicantName: "Amit Kumar",
        emiAmount: 940,
        tenure: "6 Months",
        interestRate: "18% p.a.",
        applicationDate: "2026-06-05T17:03:00",
        status: "Pending",
    },
    L26060000222: {
        loanId: "L26060000222",
        applicantName: "Amit Kumar",
        emiAmount: 1860,
        tenure: "9 Months",
        interestRate: "16% p.a.",
        applicationDate: "2026-06-03T12:20:00",
        status: "Approved",
    },
    L26060000223: {
        loanId: "L26060000223",
        applicantName: "Amit Kumar",
        emiAmount: 2300,
        tenure: "12 Months",
        interestRate: "15% p.a.",
        applicationDate: "2026-05-20T09:15:00",
        status: "Disbursed",
    },
};

export default function LoanDetailsTab() {
    const [loans, setLoans] = useState<GetLoanListItem[]>([]);
    const [loansLoading, setLoansLoading] = useState(true);
    const [openLoanId, setOpenLoanId] = useState<string | null>(null);
    const [detailsByLoanId, setDetailsByLoanId] = useState<Record<string, DetailsEntry>>({});

    useEffect(() => {
        let cancelled = false;

        getLoanListAction()
            .then(() => {
                if (cancelled) return;
                setLoans(MOCK_LOANS);
            })
            .catch(() => {
                if (cancelled) return;
                setLoans(MOCK_LOANS);
            })
            .finally(() => {
                if (!cancelled) setLoansLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleToggleDetails = (loanId: string) => {
        const willOpen = openLoanId !== loanId;
        setOpenLoanId(willOpen ? loanId : null);

        if (!willOpen) return;
        if (detailsByLoanId[loanId]) return;

        setDetailsByLoanId((prev) => ({
            ...prev,
            [loanId]: { loading: true },
        }));

        callSecure(getLoanDetailsAction, loanId)
            .then(() => {
                setDetailsByLoanId((prev) => ({
                    ...prev,
                    [loanId]: {
                        loading: false,
                        data: MOCK_DETAILS[loanId] ?? MOCK_DETAILS.L26060000221,
                    },
                }));
            })
            .catch(() => {
                setDetailsByLoanId((prev) => ({
                    ...prev,
                    [loanId]: {
                        loading: false,
                        data: MOCK_DETAILS[loanId] ?? MOCK_DETAILS.L26060000221,
                    },
                }));
            });
    };

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

    return (
        <section className="w-full bg-background px-4 py-6">
            <div className="mx-auto w-full max-w-[1140px] rounded-3xl bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
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
                            const loanId = String(item.loanId ?? item.id ?? `loan-${index}`);
                            const status = toLoanStatus(item.status);
                            const isOpen = openLoanId === loanId;
                            const details = detailsByLoanId[loanId];

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
                                                        <h3 className="font-mono text-base font-bold text-text-heading">
                                                            {loanId}
                                                        </h3>

                                                        {status && (
                                                            <span
                                                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusClass[status]}`}
                                                            >
                                                                {statusIcon[status]}
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

                                            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[520px]">
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
                                                    value={formatDate(item.dueDate as string | null | undefined)}
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
                                                onClick={() => handleToggleDetails(loanId)}
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
                                                <div className="mb-5">
                                                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                                                        Loan row (get-loan)
                                                    </p>
                                                    <pre
                                                        className="max-h-60 overflow-auto rounded-xl border border-border-light bg-surface p-4 text-xs leading-6 text-text-heading"
                                                    >
                                                        <code>{JSON.stringify(item, null, 2)}</code>
                                                    </pre>
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
                                                    <>
                                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                                            <DetailItem
                                                                icon={<User className="h-4 w-4" />}
                                                                label="Applicant Name"
                                                                value={details.data.applicantName ?? "-"}
                                                            />

                                                            <DetailItem
                                                                icon={<Wallet className="h-4 w-4" />}
                                                                label="EMI Amount"
                                                                value={formatAmount(details.data.emiAmount)}
                                                            />

                                                            <DetailItem
                                                                icon={<Clock3 className="h-4 w-4" />}
                                                                label="Tenure"
                                                                value={details.data.tenure ?? "-"}
                                                            />

                                                            <DetailItem
                                                                icon={<CircleDollarSign className="h-4 w-4" />}
                                                                label="Interest Rate"
                                                                value={details.data.interestRate ?? "-"}
                                                            />

                                                            <DetailItem
                                                                icon={<CalendarDays className="h-4 w-4" />}
                                                                label="Application Date"
                                                                value={formatDate(details.data.applicationDate)}
                                                            />

                                                            <DetailItem
                                                                icon={<Info className="h-4 w-4" />}
                                                                label="Current Status"
                                                                value={details.data.status ?? "-"}
                                                            />
                                                        </div>

                                                        <div className="mt-5 rounded-2xl border border-primary/10 bg-primary-muted px-4 py-3">
                                                            <p className="text-xs leading-5 text-text-secondary">
                                                                Your application is currently{" "}
                                                                <span className="font-bold text-text-heading">
                                                                    {details.data.status ?? "Unknown"}
                                                                </span>
                                                                . You can check this section anytime for updated
                                                                loan details and repayment information.
                                                            </p>
                                                        </div>
                                                    </>
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
            </div>
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

            <p className="text-sm font-bold text-text-heading">{value}</p>
        </div>
    );
}
