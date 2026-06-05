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

type LoanStatus = "Pending" | "Approved" | "Rejected" | "Disbursed" | "Closed";

type LoanApplication = {
    loanId: string;
    status: LoanStatus;
    amount: number;
    purpose: string;
    applicationDate: string;
    applicantName?: string;
    tenure?: string;
    interestRate?: string;
    dueDate?: string;
    emiAmount?: number;
    updatedAt?: string;
};

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

export default function LoanDetailsTab() {
    const [applications, setApplications] = useState<LoanApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [openLoanId, setOpenLoanId] = useState<string | null>(null);

    useEffect(() => {
        getLoanApplications();
    }, []);

    async function getLoanApplications() {
        try {
            setLoading(true);

            // Replace with your real API/server action
            // const res = await getLoanApplicationsAction();

            const res = {
                success: true,
                data: [
                    {
                        loanId: "L26060000221",
                        status: "Pending" as LoanStatus,
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
                        status: "Approved" as LoanStatus,
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
                ],
            };

            if (res.success) {
                setApplications(res.data);
            }
        } catch (error) {
            console.log("Failed to fetch loan applications:", error);
        } finally {
            setLoading(false);
        }
    }

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(date));
    };

    const formatDateTime = (date?: string) => {
        if (!date) return "-";

        return new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }).format(new Date(date));
    };

    const lastUpdated =
        applications[0]?.updatedAt ||
        applications[0]?.applicationDate ||
        new Date().toISOString();

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

                {loading ? (
                    <div className="flex items-center justify-center gap-2 rounded-3xl border bg-surface-muted px-6 py-12 text-sm text-text-muted">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        Loading loan applications...
                    </div>
                ) : applications.length === 0 ? (
                    <div className="rounded-3xl border bg-surface-muted px-6 py-12 text-center text-sm text-text-muted">
                        No loan applications found.
                    </div>
                ) : (
                    <div className="grid gap-5">
                        {applications.map((item) => {
                            const isOpen = openLoanId === item.loanId;

                            return (
                                <div
                                    key={item.loanId}
                                    className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition-all hover:shadow-[var(--shadow-card)]"
                                >
                                    {/* Main Card */}
                                    <div className="p-5 sm:p-6">
                                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                            <div className="flex min-w-0 items-start gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-muted">
                                                    <FileText className="h-6 w-6 text-primary" />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h3 className="font-mono text-base font-bold text-text-heading">
                                                            {item.loanId}
                                                        </h3>

                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusClass[item.status]}`}
                                                        >
                                                            {statusIcon[item.status]}
                                                            {item.status}
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 text-sm text-text-secondary">
                                                        {item.purpose}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[520px]">
                                                <MiniInfo
                                                    label="Amount"
                                                    value={`₹${formatAmount(item.amount)}`}
                                                    icon={<CircleDollarSign className="h-4 w-4" />}
                                                />

                                                <MiniInfo
                                                    label="Applied On"
                                                    value={formatDate(item.applicationDate)}
                                                    icon={<CalendarDays className="h-4 w-4" />}
                                                />

                                                <MiniInfo
                                                    label="Due Date"
                                                    value={item.dueDate ? formatDate(item.dueDate) : "-"}
                                                    icon={<Clock3 className="h-4 w-4" />}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-5 flex flex-col gap-3 border-t border-border-light pt-4 sm:flex-row sm:items-center sm:justify-between">
                                            <p className="text-xs leading-5 text-text-muted">
                                                Last updated:{" "}
                                                <span className="font-semibold text-text-heading">
                                                    {formatDateTime(item.updatedAt)}
                                                </span>
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenLoanId(isOpen ? null : item.loanId)
                                                }
                                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary-muted px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
                                            >
                                                {isOpen ? "Hide Details" : "View Details"}
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Accordion */}
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="border-t border-border-light bg-surface-muted/70 p-5 sm:p-6">
                                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                                    <DetailItem
                                                        icon={<User className="h-4 w-4" />}
                                                        label="Applicant Name"
                                                        value={item.applicantName || "-"}
                                                    />

                                                    <DetailItem
                                                        icon={<Wallet className="h-4 w-4" />}
                                                        label="EMI Amount"
                                                        value={
                                                            item.emiAmount
                                                                ? `₹${formatAmount(item.emiAmount)}`
                                                                : "-"
                                                        }
                                                    />

                                                    <DetailItem
                                                        icon={<Clock3 className="h-4 w-4" />}
                                                        label="Tenure"
                                                        value={item.tenure || "-"}
                                                    />

                                                    <DetailItem
                                                        icon={<CircleDollarSign className="h-4 w-4" />}
                                                        label="Interest Rate"
                                                        value={item.interestRate || "-"}
                                                    />

                                                    <DetailItem
                                                        icon={<CalendarDays className="h-4 w-4" />}
                                                        label="Application Date"
                                                        value={formatDate(item.applicationDate)}
                                                    />

                                                    <DetailItem
                                                        icon={<Info className="h-4 w-4" />}
                                                        label="Current Status"
                                                        value={item.status}
                                                    />
                                                </div>

                                                <div className="mt-5 rounded-2xl border border-primary/10 bg-primary-muted px-4 py-3">
                                                    <p className="text-xs leading-5 text-text-secondary">
                                                        Your application is currently{" "}
                                                        <span className="font-bold text-text-heading">
                                                            {item.status}
                                                        </span>
                                                        . You can check this section anytime for updated
                                                        loan details and repayment information.
                                                    </p>
                                                </div>
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
                        <span className="font-bold">Last updated:</span>{" "}
                        {formatDateTime(lastUpdated)} · Updates every 15 minutes
                    </p>
                </div>
            </div>
        </section>
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