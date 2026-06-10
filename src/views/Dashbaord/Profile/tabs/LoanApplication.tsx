"use client";

import {
    BadgeCheck,
    CalendarDays,
    CheckCircle2,
    Clock3,
    FileText,
    IndianRupee,
    Loader2,
    XCircle,
} from "lucide-react";
import { formatStatus } from "@/lib/utils";
import GradientButton from "@/components/ui/GradientButton";
import { useRouter } from "next/navigation";
import { useProfile } from "@/contexts/ProfileContext";


export default function LoanApplication() {


    const { status, loanData, errorMsg, currentStatus } = useProfile()

    const formatAmount = (amount?: number) => {
        if (!amount) return "₹0";

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (date?: string) => {
        if (!date) return "-";

        return new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(date));
    };

    const title = {
        loading: "Fetching Loan Status",
        approved: "Loan Application Approved",
        processing: "Application Under Review",
        rejected: "Application Rejected",
        due: "Payment Due Soon",
        error: "Unable to Fetch Status",
        active: "Loan Active",
    }[status];

    const description = {
        loading: "Please wait while we fetch your loan application details.",
        approved: "Your loan application has been approved successfully.",
        processing: "Your loan application is currently under review.",
        rejected: "Your loan application could not be approved at this time.",
        due: "Your loan repayment due date is approaching.",
        error: errorMsg || "Could not fetch loan application status.",
        active: "Your loan is active. Please check your repayment schedule.",
    }[status];

    const agreementStatus = loanData?.agreement;
    const router = useRouter();

    return (
        <div className="flex min-h-screen justify-center bg-background px-4 pb-4 pt-0">
            <div className="w-full max-w-[420px]">
                {/* TOP STATUS CARD */}

                {status === "active" ? <>
                    <GradientButton
                        onClick={() => router.push(`/profile/repayment/${loanData?.applicationId}`)}
                        leftIcon={<IndianRupee className="h-4 w-4" />}
                        className="w-full"
                    >
                        Pay Now
                    </GradientButton>
                </> :
                    <div className="relative h-[260px] overflow-hidden rounded-3xl border bg-black shadow-xl">
                        <div
                            className="relative flex h-[260px] items-center justify-center bg-gradient-to-br
            from-[#0F172A] via-[#111827] to-black"
                        >

                            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-green-500/20 blur-3xl" />


                            <div className="relative z-10 w-full px-5 text-center text-white">
                                <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center">
                                    <div className="absolute inset-0 animate-ping rounded-full border-4 border-green-500/30" />
                                    <div className="absolute inset-2 animate-pulse rounded-full border-4 border-primary/30" />

                                    <div
                                        className="relative flex h-16 w-16 items-center justify-center rounded-full
                  border border-white/20 bg-white/10 backdrop-blur-md"
                                    >
                                        {status === "loading" && (
                                            <Loader2 className="h-8 w-8 animate-spin text-green-400" />
                                        )}

                                        {status === "approved" && (
                                            <CheckCircle2 className="h-8 w-8 text-green-400" />
                                        )}

                                        {status === "processing" && (
                                            <Clock3 className="h-8 w-8 text-primary" />
                                        )}

                                        {status === "due" && (
                                            <CalendarDays className="h-8 w-8 text-yellow-400" />
                                        )}

                                        {(status === "rejected" || status === "error") && (
                                            <XCircle className="h-8 w-8 text-destructive" />
                                        )}
                                    </div>
                                </div>

                                <h2 className="mb-1 text-xl font-bold">{title}</h2>

                                <p className="mx-auto max-w-[300px] text-xs leading-5 text-white/70">
                                    {description}
                                </p>

                                <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium">
                                    {status === "loading" && (
                                        <span className="text-green-400">
                                            <Loader2 className="mr-1 inline h-3.5 w-3.5 animate-spin" />
                                            Fetching details...
                                        </span>
                                    )}

                                    {status === "approved" && (
                                        <span className="text-green-400">
                                            <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />
                                            Approved
                                        </span>
                                    )}
                                    {status === "processing" && (
                                        <span className="text-primary">
                                            <Clock3 className="mr-1 inline h-3.5 w-3.5" />
                                            Under review
                                        </span>
                                    )}

                                    {status === "due" && (
                                        <span className="text-yellow-400">
                                            <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
                                            Due date approaching
                                        </span>
                                    )}

                                    {(status === "rejected" || status === "error") && (
                                        <span className="text-destructive">
                                            <XCircle className="mr-1 inline h-3.5 w-3.5" />
                                            Failed
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>}

                {/* DETAILS CARD */}
                <div className="mt-4 rounded-3xl border bg-card p-4 shadow-sm">
                    <h3 className="mb-3 text-sm font-bold text-foreground">
                        Loan Application Status
                    </h3>

                    <div className="space-y-3">
                        {/* Application ID */}
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <FileText className="h-3.5 w-3.5 text-primary" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-foreground">
                                    Application ID
                                </p>
                                <p className="break-words text-[11px] text-muted-foreground">
                                    {status === "loading"
                                        ? "Fetching..."
                                        : loanData?.applicationId || "-"}
                                </p>
                            </div>
                        </div>

                        {/* Loan Amount */}
                        <div className="flex items-start gap-3">
                            <div
                                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${status === "rejected" || status === "error"
                                    ? "bg-muted"
                                    : "bg-green-100"
                                    }`}
                            >
                                <IndianRupee
                                    className={`h-3.5 w-3.5 ${status === "rejected" || status === "error"
                                        ? "text-muted-foreground"
                                        : "text-green-600"
                                        }`}
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-foreground">
                                    Loan Amount
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                    {status === "loading"
                                        ? "Fetching..."
                                        : formatAmount(loanData?.loanAmount)}
                                </p>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className="flex items-start gap-3">
                            <div
                                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${status === "due"
                                    ? "bg-yellow-100"
                                    : status === "rejected" || status === "error"
                                        ? "bg-muted"
                                        : "bg-primary/10"
                                    }`}
                            >
                                <CalendarDays
                                    className={`h-3.5 w-3.5 ${status === "due"
                                        ? "text-yellow-600"
                                        : status === "rejected" || status === "error"
                                            ? "text-muted-foreground"
                                            : "text-primary"
                                        }`}
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-foreground">
                                    Due Date
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                    {status === "loading"
                                        ? "Fetching..."
                                        : formatDate(loanData?.dueDate)}
                                </p>
                            </div>
                        </div>

                        {/* Agreement Status */}
                        <div className="flex items-start gap-3">
                            <div
                                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${agreementStatus === "SIGNED"
                                    ? "bg-green-100"
                                    : agreementStatus === "SEND"
                                        ? "bg-blue-100"
                                        : agreementStatus === "NOT_SEND"
                                            ? "bg-yellow-100"
                                            : "bg-muted"
                                    }`}
                            >
                                <FileText
                                    className={`h-3.5 w-3.5 ${agreementStatus === "SIGNED"
                                        ? "text-green-600"
                                        : agreementStatus === "SENT"
                                            ? "text-blue-600"
                                            : agreementStatus === "NOT_SENT"
                                                ? "text-yellow-600"
                                                : "text-muted-foreground"
                                        }`}
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-foreground">
                                    Agreement Status
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                    {status === "loading"
                                        ? "Fetching..."
                                        : agreementStatus === "SIGNED"
                                            ? "Signed"
                                            : agreementStatus === "SENT"
                                                ? "Sent"
                                                : agreementStatus === "NOT_SENT"
                                                    ? "Not Sent"
                                                    : "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Current Status */}
                        <div className="flex items-start gap-3">
                            <div
                                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${status === "approved"
                                    ? "bg-green-100"
                                    : status === "rejected" || status === "error"
                                        ? "bg-destructive/10"
                                        : status === "due"
                                            ? "bg-yellow-100"
                                            : "bg-primary/10"
                                    }`}
                            >
                                {status === "loading" && (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                                )}

                                {(status === "approved" || status === "active") && (
                                    <BadgeCheck className="h-3.5 w-3.5 text-green-600" />
                                )}

                                {status === "processing" && (
                                    <Clock3 className="h-3.5 w-3.5 text-primary" />
                                )}

                                {status === "due" && (
                                    <CalendarDays className="h-3.5 w-3.5 text-yellow-600" />
                                )}

                                {(status === "rejected" || status === "error") && (
                                    <XCircle className="h-3.5 w-3.5 text-destructive" />
                                )}
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-foreground">
                                    Current Status
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                    {/* {status === "loading" && status.toUpperCase()}
                                    {status === "approved" && "Approved"}
                                    {status === "processing" && "Processing"}
                                    {status === "rejected" && "Rejected"}
                                    {status === "due" && "Due"} */}
                                    {status === "error" ? "Unable to fetch application status." : formatStatus(currentStatus) || "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-muted/50 px-3 py-2">
                        <p className="text-center text-[11px] leading-4 text-muted-foreground">
                            {status === "loading" &&
                                "Please do not refresh or close this page while we fetch your loan status."}

                            {(status === "approved" || status === "active") &&
                                "Your loan details are updated. Please check your repayment schedule carefully."}

                            {status === "processing" &&
                                "We will update your status once verification is completed."}

                            {status === "due" &&
                                "Please complete your payment before the due date to avoid extra charges."}

                            {status === "rejected" &&
                                "You may contact support for more details about your application."}

                            {status === "error" &&
                                "Please try again after some time or contact support."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}