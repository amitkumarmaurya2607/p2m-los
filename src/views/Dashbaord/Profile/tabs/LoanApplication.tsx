"use client";

import React from "react";
import {
    AlertCircle,
    CheckCircle2,
    Clock3,
    IndianRupee,
    Loader2,
    XCircle,
} from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import { useProfile } from "@/contexts/ProfileContext";
import { formatStatus } from "@/lib/utils";
import PageHeader from "../componants/PageHeader";

type TrackerStatus = "completed" | "active" | "pending";

type ProgressStep = {
    title: string;
    statusText: string;
    status: TrackerStatus;
};

const formatAmount = (amount?: number | null) => {
    if (!amount) return "₹0";

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
};

const formatDate = (date?: string | null) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
};

const getAgreementLabel = (status?: string | null) => {
    if (status === "SIGNED") return "Signed";
    if (status === "SENT") return "Sent";
    if (status === "NOT_SENT") return "Not Sent";
    return "N/A";
};

const getLoanDisplayStatus = (status?: string) => {
    if (status === "loading") return "Fetching...";
    if (status === "approved") return "Approved";
    if (status === "active") return "Active";
    if (status === "processing") return "Under Review";
    if (status === "due") return "Payment Due";
    if (status === "rejected") return "Rejected";
    if (status === "error") return "Failed";
    return "Under Review";
};

const getTrackerSteps = (status?: string): ProgressStep[] => {
    const isRejected = status === "rejected" || status === "error";
    const isApproved = status === "approved" || status === "active";
    const isProcessing = status === "processing" || status === "loading";

    return [
        {
            title: "Application Submitted",
            statusText: "Completed",
            status: "completed",
        },
        {
            title: "KYC Verification",
            statusText: isRejected ? "Failed" : "Completed",
            status: isRejected ? "active" : "completed",
        },
        {
            title: "Credit Assessment",
            statusText: isRejected ? "Pending" : "Completed",
            status: isRejected ? "pending" : "completed",
        },
        {
            title: "Underwriting Review",
            statusText: isApproved ? "Completed" : isProcessing ? "Active" : "Pending",
            status: isApproved ? "completed" : isProcessing ? "active" : "pending",
        },
        {
            title: "Final Approval",
            statusText: isApproved ? "Completed" : "Pending",
            status: isApproved ? "completed" : "pending",
        },
        {
            title: "Disbursal",
            statusText: status === "active" ? "Completed" : "Pending",
            status: status === "active" ? "completed" : "pending",
        },
    ];
};

function LoanApplicationCard({
    status,
    loanData,
    currentStatus,
    errorMsg,
}: {
    status: string;
    loanData: any;
    currentStatus?: string;
    errorMsg?: string;
}) {
    const applicationId =
        loanData?.applicationId || loanData?.formattedLoanId || loanData?.id || "-";

    const loanAmount = loanData?.loanAmount || loanData?.amount || 0;

    const appliedDate =
        loanData?.applicationDate || loanData?.createdAt || loanData?.appliedDate;

    const expectedDisbursal =
        loanData?.disbursementDate ||
        loanData?.dueDate ||
        loanData?.loanDetails?.expectedDisbursalDate;

    const agreementStatus =
        typeof loanData?.agreement === "string"
            ? loanData?.agreement
            : loanData?.agreement?.status;

    const statusLabel =
        status === "error"
            ? "Unable to fetch"
            : formatStatus(currentStatus || "") || getLoanDisplayStatus(status);

    const isRejected = status === "rejected" || status === "error";
    const isLoading = status === "loading";
    const isActive = status === "active";
    const isApproved = status === "approved";

    return (
        <div className="w-full min-w-0">
            {isActive && (
                <div className="mb-4 sm:mb-6">
                    <GradientButton
                        leftIcon={<IndianRupee className="h-4 w-4" />}
                        className="w-full sm:w-fit"
                    >
                        Pay Now
                    </GradientButton>
                </div>
            )}

            <div className="rounded-2xl border border-[#F1F5F9] bg-white p-4 shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)] sm:rounded-3xl sm:p-6 lg:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="w-fit max-w-full rounded-[10px] border border-[rgba(55,55,193,0.2)] bg-[rgba(55,55,193,0.1)] px-3 py-1.5 sm:px-4 sm:py-2">
                        <span className="break-all text-[11px] font-bold uppercase leading-4 tracking-[1px] text-[#3737C1] sm:text-sm sm:leading-5 sm:tracking-[1.4px]">
                            {isLoading ? "Fetching..." : applicationId}
                        </span>
                    </div>

                    <div
                        className={`flex w-fit items-center gap-1.5 rounded-[10px] px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2 ${isRejected
                            ? "bg-red-50"
                            : isApproved || isActive
                                ? "bg-green-50"
                                : "bg-[rgba(255,200,87,0.1)]"
                            }`}
                    >
                        {isLoading && (
                            <Loader2 size={16} className="animate-spin text-[#3737C1] sm:size-[18px]" />
                        )}

                        {(status === "processing" || status === "due") && (
                            <Clock3 size={16} className="text-[#FFC857] sm:size-[18px]" />
                        )}

                        {(isApproved || isActive) && (
                            <CheckCircle2 size={16} className="text-[#009966] sm:size-[18px]" />
                        )}

                        {isRejected && (
                            <XCircle size={16} className="text-red-600 sm:size-[18px]" />
                        )}

                        <span
                            className={`text-xs font-bold leading-5 sm:text-sm ${isRejected
                                ? "text-red-600"
                                : isApproved || isActive
                                    ? "text-[#009966]"
                                    : "text-[#FFC857]"
                                }`}
                        >
                            {getLoanDisplayStatus(status)}
                        </span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:mt-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-3">
                    <InfoBlock
                        label="Loan Amount"
                        value={isLoading ? "Fetching..." : formatAmount(loanAmount)}
                        large
                    />

                    <InfoBlock
                        label="Applied Date"
                        value={isLoading ? "Fetching..." : formatDate(appliedDate)}
                    />

                    <InfoBlock
                        label="Expected Disbursal"
                        value={isLoading ? "Fetching..." : formatDate(expectedDisbursal)}
                    />

                    <InfoBlock
                        label="Agreement Status"
                        value={isLoading ? "Fetching..." : getAgreementLabel(agreementStatus)}
                        success={agreementStatus === "SIGNED"}
                    />

                    <InfoBlock
                        label="Verification"
                        value={isRejected ? "Failed" : isLoading ? "Fetching..." : "Completed"}
                        success={!isRejected && !isLoading}
                        danger={isRejected}
                    />

                    <InfoBlock
                        label="Current Status"
                        value={statusLabel}
                        success={isApproved || isActive}
                        danger={isRejected}
                    />
                </div>
            </div>

            <StatusNotice status={status} errorMsg={errorMsg} />
        </div>
    );
}

function InfoBlock({
    label,
    value,
    large = false,
    success = false,
    danger = false,
}: {
    label: string;
    value: string;
    large?: boolean;
    success?: boolean;
    danger?: boolean;
}) {
    return (
        <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.45px] text-[#90A1B9] sm:text-xs sm:tracking-[0.6px]">
                {label}
            </p>

            {success || danger ? (
                <div className="mt-1 flex min-w-0 items-center gap-1">
                    {success && <CheckCircle2 size={14} className="shrink-0 text-[#009966] sm:size-4" />}
                    {danger && <XCircle size={14} className="shrink-0 text-red-600 sm:size-4" />}

                    <span
                        className={`min-w-0 break-words text-xs font-bold leading-5 sm:text-sm ${danger ? "text-red-600" : "text-[#009966]"
                            }`}
                    >
                        {value}
                    </span>
                </div>
            ) : (
                <p
                    className={`mt-1 break-words font-bold ${large
                        ? "text-lg font-extrabold leading-6 text-[#0F172B] sm:text-2xl sm:leading-8"
                        : "text-sm leading-5 text-[#1D293D] sm:text-lg sm:leading-7"
                        }`}
                >
                    {value}
                </p>
            )}
        </div>
    );
}

function StatusNotice({
    status,
    errorMsg,
}: {
    status: string;
    errorMsg?: string;
}) {
    const notice =
        {
            loading: {
                title: "Fetching application status",
                desc: "Please do not refresh or close this page while we fetch your loan status.",
                className: "border-[#BFDBFE] bg-blue-50",
                iconClass: "text-blue-600",
                titleClass: "text-blue-900",
                descClass: "text-blue-700",
            },
            approved: {
                title: "Application approved",
                desc: "Your loan application has been approved successfully.",
                className: "border-green-200 bg-green-50",
                iconClass: "text-green-600",
                titleClass: "text-green-900",
                descClass: "text-green-700",
            },
            active: {
                title: "Loan active",
                desc: "Your loan is active. Please check your repayment schedule carefully.",
                className: "border-green-200 bg-green-50",
                iconClass: "text-green-600",
                titleClass: "text-green-900",
                descClass: "text-green-700",
            },
            processing: {
                title: "Underwriting in progress",
                desc: "Our team is reviewing your application manually. Last synced: 2 minutes ago.",
                className: "border-[#FEE685] bg-[#FFFBEB]",
                iconClass: "text-[#FE9A00]",
                titleClass: "text-[#973C00]",
                descClass: "text-[#E17100]",
            },
            due: {
                title: "Payment due soon",
                desc: "Please complete your payment before the due date to avoid extra charges.",
                className: "border-[#FEE685] bg-[#FFFBEB]",
                iconClass: "text-[#FE9A00]",
                titleClass: "text-[#973C00]",
                descClass: "text-[#E17100]",
            },
            rejected: {
                title: "Application rejected",
                desc: "You may contact support for more details about your application.",
                className: "border-red-200 bg-red-50",
                iconClass: "text-red-600",
                titleClass: "text-red-900",
                descClass: "text-red-700",
            },
            error: {
                title: "Unable to fetch status",
                desc: errorMsg || "Please try again after some time or contact support.",
                className: "border-red-200 bg-red-50",
                iconClass: "text-red-600",
                titleClass: "text-red-900",
                descClass: "text-red-700",
            },
        }[status] || {
            title: "Underwriting in progress",
            desc: "Our team is reviewing your application manually.",
            className: "border-[#FEE685] bg-[#FFFBEB]",
            iconClass: "text-[#FE9A00]",
            titleClass: "text-[#973C00]",
            descClass: "text-[#E17100]",
        };

    return (
        <div
            className={`mt-4 flex items-start gap-2.5 rounded-2xl border p-3 sm:mt-6 sm:gap-3 sm:p-4 ${notice.className}`}
        >
            <AlertCircle
                size={18}
                className={`mt-0.5 shrink-0 sm:size-5 ${notice.iconClass}`}
            />

            <div className="min-w-0">
                <p className={`text-xs font-semibold leading-5 sm:text-sm ${notice.titleClass}`}>
                    {notice.title}
                </p>

                <p className={`pt-0.5 text-[11px] font-medium leading-4 sm:text-xs ${notice.descClass}`}>
                    {notice.desc}
                </p>
            </div>
        </div>
    );
}

function ProgressTracker({ status }: { status: string }) {
    const steps = getTrackerSteps(status);

    return (
        <div className="w-full rounded-2xl border border-[#F1F5F9] bg-white p-4 shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)] sm:rounded-3xl sm:p-6 lg:max-w-[306px] lg:p-8">
            <h3 className="border-b border-[#F1F5F9] pb-3 text-base font-bold leading-6 text-[#0F172B] sm:pb-4 sm:text-lg sm:leading-7">
                Progress Tracker
            </h3>

            <div className="mt-6 border-l-2 border-[#F1F5F9] pl-5 sm:mt-8 sm:pl-6">
                {steps.map((step) => {
                    const dotClass =
                        step.status === "completed"
                            ? "border-[rgba(0,200,156,0.2)] bg-[#00C89C] shadow-[0px_0px_0px_4px_rgba(0,200,156,0.1)]"
                            : step.status === "active"
                                ? "border-[rgba(55,55,193,0.2)] bg-[#3737C1] shadow-[0px_0px_0px_4px_rgba(55,55,193,0.1)]"
                                : "border-white bg-[#E2E8F0]";

                    const titleClass =
                        step.status === "completed"
                            ? "text-[#1D293D]"
                            : step.status === "active"
                                ? "text-[#3737C1]"
                                : "text-[#90A1B9]";

                    const statusClass =
                        step.status === "active"
                            ? "text-[rgba(55,55,193,0.7)]"
                            : step.status === "pending"
                                ? "text-[#90A1B9]"
                                : "text-[#62748E]";

                    return (
                        <div key={step.title} className="relative pb-6 last:pb-0 sm:pb-8">
                            <span
                                className={`absolute -left-[29px] top-0 h-3.5 w-3.5 rounded-full border-[3px] sm:-left-[33px] sm:h-4 sm:w-4 sm:border-4 ${dotClass}`}
                            />

                            <p className={`text-sm font-bold leading-5 sm:text-base sm:leading-6 ${titleClass}`}>
                                {step.title}
                            </p>

                            <p className={`pt-0.5 text-[11px] font-medium leading-4 sm:pt-1 sm:text-xs ${statusClass}`}>
                                {step.statusText}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function LoanApplication() {
    const { status, loanData, errorMsg, currentStatus, getDetails, loading } =
        useProfile();

    return (

        <div className="mx-auto w-full ">
            <PageHeader
                loading={loading || status === "loading"}
                onButtonClick={getDetails}
            />

            <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_306px] lg:items-start">
                <LoanApplicationCard
                    status={status}
                    loanData={loanData}
                    currentStatus={currentStatus}
                    errorMsg={errorMsg}
                />

                <ProgressTracker status={status} />
            </div>
        </div>

    );
}