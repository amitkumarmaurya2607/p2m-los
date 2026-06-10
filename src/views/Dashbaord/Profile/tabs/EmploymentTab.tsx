"use client";

import React, { useEffect, useState } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Mail,
  ReceiptText,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import ProfileEmptyState from "../shared/ProfileEmptyState";
import PageHeader from "../componants/PageHeader";
import WhiteInfoCard from "../componants/WhiteInfoCard";
import { InfoField } from "../componants/InfoField";

import { getEmploymentAction } from "@/lib/actions/apply.action";
import type { EmploymentDetailsType } from "@/lib/actions/action.type";
import { showToast } from "@/lib/toast";

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

const formatDate = (date?: string | null) => {
  if (!date) return "-";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatValue = (value?: string | number | boolean | null) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";

  return String(value).replaceAll("_", " ");
};

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-slate-200/80 ${className}`} />
  );
}

function EmploymentSkeleton() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 border-b border-[#E2E8F0] pb-5 sm:pb-6">
        <SkeletonBlock className="h-8 w-full max-w-[260px]" />
        <SkeletonBlock className="h-4 w-full max-w-[360px]" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#F1F5F9] bg-white p-4 shadow-[0px_4px_24px_-12px_rgba(0,0,0,0.05)] sm:p-5 lg:rounded-[20px] lg:p-6"
          >
            <SkeletonBlock className="h-3 w-[70%] max-w-[110px]" />
            <SkeletonBlock className="mt-3 h-6 w-[85%] max-w-[150px] sm:h-8" />
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_306px] lg:items-start">
        <div className="space-y-5 sm:space-y-8">
          {Array.from({ length: 2 }).map((_, cardIndex) => (
            <div
              key={cardIndex}
              className="rounded-2xl border border-[#F1F5F9] bg-white p-4 shadow-[0px_8px_32px_-12px_rgba(0,0,0,0.05)] sm:rounded-3xl sm:p-6 lg:p-8"
            >
              <div className="flex items-center gap-3 border-b border-[#F1F5F9] pb-4">
                <SkeletonBlock className="h-9 w-9 rounded-xl" />
                <SkeletonBlock className="h-5 w-44" />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:mt-6 sm:grid-cols-2 sm:gap-y-6">
                {Array.from({ length: cardIndex === 0 ? 6 : 4 }).map(
                  (_, index) => (
                    <div key={index}>
                      <SkeletonBlock className="h-3 w-28" />
                      <SkeletonBlock className="mt-2 h-5 w-[80%] max-w-[180px]" />
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full rounded-2xl border border-[#3737C1]/10 bg-[#3737C1]/5 p-4 sm:rounded-3xl sm:p-6 lg:min-h-[578px] lg:max-w-[306px] lg:p-8">
          <SkeletonBlock className="h-6 w-40" />

          <div className="mt-5 rounded-[14px] border border-[#F1F5F9] bg-white p-4 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] sm:mt-6 sm:p-6">
            <SkeletonBlock className="h-10 w-10 rounded-[10px]" />
            <SkeletonBlock className="mt-4 h-5 w-40" />
            <SkeletonBlock className="mt-3 h-4 w-full" />
            <SkeletonBlock className="mt-2 h-4 w-[75%]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function IncomeCard({
  label,
  value,
  green = false,
}: {
  label: string;
  value?: number | string | null;
  green?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#F1F5F9] bg-white p-4 shadow-[0px_4px_24px_-12px_rgba(0,0,0,0.05)] sm:p-5 lg:rounded-[20px] lg:p-6">
      <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.45px] text-[#90A1B9] sm:text-xs sm:tracking-[0.6px]">
        {label}
      </p>

      <p
        className={`mt-1.5 break-words text-lg font-extrabold leading-6 sm:mt-2 sm:text-2xl sm:leading-8 ${green ? "text-[#00A882]" : "text-[#3737C1]"
          }`}
      >
        {value}
      </p>
    </div>
  );
}

function EmployeeStatusBadge({
  status,
}: {
  status?: string | null;
}) {
  const isVerified = status === "VERIFIED";

  return (
    <div
      className={`flex h-[38px] w-full items-center justify-center gap-2 rounded-[14px] border px-4 py-2 sm:w-fit ${isVerified
        ? "border-[#00C89C]/20 bg-[#00C89C]/10"
        : "border-[#FE9A00]/20 bg-[#FE9A00]/10"
        }`}
    >
      <ShieldCheck
        className={`h-[18px] w-[18px] ${isVerified ? "text-[#00A882]" : "text-[#FE9A00]"
          }`}
      />

      <span
        className={`whitespace-nowrap text-sm font-bold leading-5 ${isVerified ? "text-[#00A882]" : "text-[#FE9A00]"
          }`}
      >
        {isVerified ? "Verified Employee" : "Not Verified"}
      </span>
    </div>
  );
}

function OfficeAddressCard({
  employment,
}: {
  employment: EmploymentDetailsType | null;
}) {
  const companyName = employment?.companyName || "-";

  const officeAddress = [
    employment?.companyAddress,
    employment?.pinCode ? `PIN - ${employment.pinCode}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <aside className="w-full rounded-2xl border border-[#3737C1]/10 bg-[#3737C1]/5 p-4 sm:rounded-3xl sm:p-6 lg:min-h-[578px] lg:max-w-[306px] lg:p-8">
      <h3 className="text-base font-bold leading-6 text-[#0F172B] sm:text-lg sm:leading-7">
        Office Address
      </h3>

      <div className="mt-5 rounded-[14px] border border-[#F1F5F9] bg-white p-4 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] sm:mt-6 sm:p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#3737C1]/10">
          <Building2 className="h-5 w-5 text-[#3737C1]" />
        </div>

        <h4 className="mt-4 break-words text-sm font-bold leading-5 text-[#0F172B] sm:text-base sm:leading-6">
          {companyName}
        </h4>

        <p className="mt-2 whitespace-pre-line break-words text-sm font-medium leading-6 text-[#45556C] sm:leading-[23px]">
          {officeAddress || "-"}
        </p>
      </div>

      {/* <div className="mt-5 rounded-[14px] border border-[#F1F5F9] bg-white p-4 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] sm:p-5">
        <InfoField
          icon={<BadgeCheck className="h-4 w-4 text-[#3737C1]" />}
          label="Status"
          value={formatValue(employment?.userDataStatus)}
        />
      </div> */}
    </aside>
  );
}

const EmploymentTab = () => {
  const [loading, setLoading] = useState(true);
  const [employment, setEmployment] = useState<EmploymentDetailsType | null>(
    null
  );

  const getDetails = async () => {
    try {
      setLoading(true);

      const result = await getEmploymentAction("");

      if (result?.success && result?.data) {
        setEmployment(result.data as EmploymentDetailsType);
        return;
      }

      setEmployment(null);

      showToast({
        message: result?.error || "Employment details not found",
        type: "error",
      });
    } catch (err) {
      console.log("err", err);

      setEmployment(null);

      showToast({
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (loading) {
    return <EmploymentSkeleton />;
  }

  if (!employment) {
    return (
      <ProfileEmptyState
        title="No employment details found"
        description="We could not find your employment details."
      />
    );
  }

  const monthlyIncome = employment.salary || 0;
  const annualIncome = Number(monthlyIncome || 0) * 12;
  const payslipCount = employment.payslips?.length || 0;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 border-b border-[#E2E8F0] pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-6">
        <PageHeader
          title="Employment Info"
          subtitle="Your professional and income details."
          showButton={false}
          className="border-b-0 pb-0"
        />

        {/* <EmployeeStatusBadge status={employment.userDataStatus} /> */}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        <IncomeCard
          label="Monthly Salary"
          value={formatAmount(monthlyIncome)}
          green
        />

        <IncomeCard
          label="Annual Income"
          value={formatAmount(annualIncome)}
        />

        <IncomeCard
          label="Salary Date"
          value={`${employment.expectedDateOfSalary || "-"}${employment.expectedDateOfSalary ? "th" : ""}`}
        />

        <IncomeCard
          label="Payslips"
          value={`${payslipCount}`}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_306px] lg:items-start">
        <div className="space-y-5 sm:space-y-8">
          <WhiteInfoCard
            title="Professional Details"
            icon={
              <BriefcaseBusiness className="h-4 w-4 text-[#3737C1] sm:h-5 sm:w-5" />
            }
          >
            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:mt-6 sm:grid-cols-2 sm:gap-y-6">
              <InfoField
                label="Employment Type"
                value={formatValue(employment.employmenttype)}
              />

              <InfoField
                label="Company"
                value={formatValue(employment.companyName)}
                icon={
                  <Building2 className="h-3.5 w-3.5 text-[#3737C1] sm:h-4 sm:w-4" />
                }
              />

              <InfoField
                label="Designation"
                value={formatValue(employment.designation)}
              />

              <InfoField
                label="Joining Date"
                value={formatDate(employment.joiningDate)}
                icon={
                  <CalendarDays className="h-3.5 w-3.5 text-[#90A1B9] sm:h-4 sm:w-4" />
                }
              />

              <InfoField
                label="Official Email"
                value={formatValue(employment.officialEmail)}
                icon={
                  <Mail className="h-3.5 w-3.5 text-[#90A1B9] sm:h-4 sm:w-4" />
                }
              />

              {/* <InfoField
                label="Employee Status"
                value={formatValue(employment.userDataStatus)}
                icon={
                  <ShieldCheck className="h-3.5 w-3.5 text-[#00A882] sm:h-4 sm:w-4" />
                }
              /> */}
            </div>
          </WhiteInfoCard>

          <WhiteInfoCard
            title="Salary & Financial"
            icon={
              <WalletCards className="h-4 w-4 text-[#00C89C] sm:h-5 sm:w-5" />
            }
          >
            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:mt-6 sm:grid-cols-2 sm:gap-y-6">
              <InfoField
                label="Monthly Salary"
                value={formatAmount(employment.salary)}
                valueClassName="text-[#00C89C] text-lg sm:text-xl font-bold"
              />

              <InfoField
                label="Mode of Salary"
                value={formatValue(employment.modeOfSalary)}
              />

              <InfoField
                label="Expected Salary Date"
                value={
                  employment.expectedDateOfSalary
                    ? `${employment.expectedDateOfSalary}th of every month`
                    : "-"
                }
              />

              <InfoField
                label="Salary Exceeds Base"
                value={formatValue(employment.salaryExceedsBase)}
              />

              <InfoField
                label="UAN Number"
                value={formatValue(employment.uanNumber)}
                valueClassName="tracking-[0.6px]"
              />

              <InfoField
                label="Payslips Uploaded"
                value={`${payslipCount}`}
                icon={
                  <ReceiptText className="h-3.5 w-3.5 text-[#3737C1] sm:h-4 sm:w-4" />
                }
              />
            </div>
          </WhiteInfoCard>
        </div>

        <OfficeAddressCard employment={employment} />
      </div>
    </div>
  );
};

export default EmploymentTab;