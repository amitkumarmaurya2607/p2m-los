"use client";

import React from "react";
import {
  BadgeCheck,
  Banknote,
  Building2,
  CreditCard,
  Landmark,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import { useProfile } from "@/contexts/ProfileContext";
import ProfileEmptyState from "../shared/ProfileEmptyState";
import PageHeader from "../componants/PageHeader";
import { InfoField } from "../componants/InfoField";
import WhiteInfoCard from "../componants/WhiteInfoCard";


const formatValue = (value?: string | number | null) => {
  if (value === null || value === undefined || value === "") return "-";
  return value;
};

const maskAccountNumber = (accountNumber?: string | number | null) => {
  if (!accountNumber) return "-";

  const value = String(accountNumber);
  const last4 = value.slice(-4);

  return `XXXX XXXX ${last4}`;
};

const formatAmount = (amount?: number | string | null) => {
  if (amount === null || amount === undefined || amount === "") return "₹0";

  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) return "₹0";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

function SummaryCard({
  label,
  value,
  green = false,
}: {
  label: string;
  value?: string | number | null;
  green?: boolean;
}) {
  return (
    <div
      className="
        rounded-2xl border border-[#F1F5F9] bg-white
        p-4 shadow-[0px_4px_24px_-12px_rgba(0,0,0,0.05)]
        sm:p-5 lg:rounded-[20px] lg:p-6
      "
    >
      <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.45px] text-[#90A1B9] sm:text-xs sm:tracking-[0.6px]">
        {label}
      </p>

      <p
        className={`mt-1.5 break-words text-lg font-extrabold leading-6 sm:mt-2 sm:text-2xl sm:leading-8 ${green ? "text-[#00C89C]" : "text-[#3737C1]"
          }`}
      >
        {formatValue(value)}
      </p>
    </div>
  );
}

function BankVerifiedBadge() {
  return (
    <div className="flex h-[38px] w-full items-center justify-center gap-2 rounded-[14px] border border-[#00C89C]/20 bg-[#00C89C]/10 px-4 py-2 sm:w-fit">
      <ShieldCheck className="h-[18px] w-[18px] text-[#00A882]" />

      <span className="whitespace-nowrap text-sm font-bold leading-5 text-[#00A882]">
        Verified Bank
      </span>
    </div>
  );
}

function BankVerificationCard({ bank }: { bank: any }) {
  const isVerified =
    bank?.status === "VERIFIED" ||
    bank?.verificationStatus === "VERIFIED" ||
    bank?.isVerified === true;

  const verificationItems = [
    {
      label: "Account Verified",
      value: isVerified ? "Verified" : "Pending",
      verified: isVerified,
    },
    {
      label: "IFSC Verified",
      value: bank?.ifscCode || bank?.ifsc ? "Verified" : "Pending",
      verified: Boolean(bank?.ifscCode || bank?.ifsc),
    },
    {
      label: "Name Matched",
      value: bank?.nameMatchStatus || bank?.beneficiaryName ? "Matched" : "Pending",
      verified: Boolean(bank?.nameMatchStatus || bank?.beneficiaryName),
    },
  ];

  return (
    <aside
      className="
        w-full rounded-2xl border border-[#3737C1]/10 bg-[#3737C1]/5
        p-4 sm:rounded-3xl sm:p-6 lg:min-h-[420px] lg:max-w-[306px] lg:p-8
      "
    >
      <h3 className="text-base font-bold leading-6 text-[#0F172B] sm:text-lg sm:leading-7">
        Bank Verification
      </h3>

      <div className="mt-5 rounded-[14px] border border-[#F1F5F9] bg-white p-4 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] sm:mt-6 sm:p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#3737C1]/10">
          <Landmark className="h-5 w-5 text-[#3737C1]" />
        </div>

        <h4 className="mt-4 break-words text-sm font-bold leading-5 text-[#0F172B] sm:text-base sm:leading-6">
          {formatValue(bank?.bankName)}
        </h4>

        <p className="mt-2 break-words text-sm font-medium leading-6 text-[#45556C] sm:leading-[23px]">
          {formatValue(bank?.branchName || bank?.branch)}
        </p>
      </div>

      <div className="mt-5 space-y-3 sm:mt-6">
        {verificationItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-[#F1F5F9] bg-white px-3 py-3"
          >
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#1D293D] sm:text-sm">
                {item.label}
              </p>

              <p
                className={`mt-0.5 text-[11px] font-medium sm:text-xs ${item.verified ? "text-[#00A882]" : "text-[#90A1B9]"
                  }`}
              >
                {item.value}
              </p>
            </div>

            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${item.verified ? "bg-[#00C89C]/15" : "bg-[#E2E8F0]"
                }`}
            >
              <ShieldCheck
                className={`h-4 w-4 ${item.verified ? "text-[#00A882]" : "text-[#90A1B9]"
                  }`}
              />
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}

const BankDetailsTab = () => {
  const { profileData, loading } = useProfile();

  const bank =
    (profileData as any)?.bankDetails ||
    (profileData as any)?.bankAccount ||
    (profileData as any)?.bankInfo ||
    {};

  if (loading) {
    return (
      <ProfileEmptyState
        title="Loading bank details..."
        description="Please wait while we fetch your latest bank account details."
      />
    );
  }

  const accountNumber =
    bank?.accountNumber || bank?.bankAccountNumber || bank?.account_no;

  const accountType = bank?.accountType || bank?.type || "-";
  const bankName = bank?.bankName || "-";
  const ifscCode = bank?.ifscCode || bank?.ifsc || "-";
  const monthlyCredit = bank?.monthlyCredit || bank?.averageMonthlyCredit || 0;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 border-b border-[#E2E8F0] pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-6">
        <PageHeader
          title="Bank Details"
          subtitle="Manage your bank account and verification details."
          showButton={false}
          className="border-b-0 pb-0"
        />

        {/* <BankVerifiedBadge /> */}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        <SummaryCard label="Bank Name" value={bankName} />
        <SummaryCard label="Account Type" value={accountType} />
        <SummaryCard label="IFSC Code" value={ifscCode} />
        <SummaryCard
          label="Monthly Credit"
          value={formatAmount(monthlyCredit)}
          green
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_306px] lg:items-start">
        <div className="space-y-5 sm:space-y-8">
          <WhiteInfoCard
            title="Account Details"
            icon={<Landmark className="h-4 w-4 text-[#3737C1] sm:h-5 sm:w-5" />}

          >
            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:mt-6 sm:grid-cols-2 sm:gap-y-6">
              <InfoField
                label="Bank Name"
                value={formatValue(bankName)}
                icon={
                  <Building2 className="h-3.5 w-3.5 text-[#3737C1] sm:h-4 sm:w-4" />
                }
              />

              <InfoField
                label="Account Holder"
                value={formatValue(
                  bank?.accountHolderName ||
                  bank?.beneficiaryName ||
                  bank?.holderName
                )}
              />

              <InfoField
                label="Account Number"
                value={maskAccountNumber(accountNumber)}
                icon={
                  <CreditCard className="h-3.5 w-3.5 text-[#90A1B9] sm:h-4 sm:w-4" />
                }
              />

              <InfoField
                label="IFSC Code"
                value={formatValue(ifscCode)}
              />

              <InfoField
                label="Account Type"
                value={formatValue(accountType)}
              />

              <InfoField
                label="Branch"
                value={formatValue(bank?.branchName || bank?.branch)}
              />
            </div>
          </WhiteInfoCard>

          <WhiteInfoCard
            title="Financial Summary"
            icon={<WalletCards className="h-4 w-4 text-[#00C89C] sm:h-5 sm:w-5" />}

          >
            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:mt-6 sm:grid-cols-2 sm:gap-y-6">
              <InfoField
                label="Monthly Credit"
                value={formatAmount(monthlyCredit)}
                valueClassName="text-[#00C89C] text-lg sm:text-xl font-bold"
              />

              <InfoField
                label="Average Balance"
                value={formatAmount(bank?.averageBalance)}
              />

              <InfoField
                label="Statement Status"
                value={formatValue(
                  bank?.statementStatus || bank?.bankStatementStatus
                )}
              />

              <InfoField
                label="Verification Status"
                value={formatValue(bank?.verificationStatus || bank?.status)}
                icon={
                  <BadgeCheck className="h-3.5 w-3.5 text-[#00C89C] sm:h-4 sm:w-4" />
                }
              />
            </div>
          </WhiteInfoCard>
        </div>

        <BankVerificationCard bank={bank} />
      </div>
    </div>
  );
};

export default BankDetailsTab;