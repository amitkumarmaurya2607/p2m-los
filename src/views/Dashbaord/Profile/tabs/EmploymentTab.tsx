"use client";

import React from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Mail,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import { useProfile } from "@/contexts/ProfileContext";
import ProfileEmptyState from "../shared/ProfileEmptyState";
import PageHeader from "../componants/PageHeader";
import WhiteInfoCard from "../componants/WhiteInfoCard";
import { InfoField } from "../componants/InfoField";


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

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatValue = (value?: string | number | null) => {
  if (value === null || value === undefined || value === "") return "-";
  return value;
};

function IncomeCard({
  label,
  value,
}: {
  label: string;
  value?: number | string | null;
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

      <p className="mt-1.5 break-words text-lg font-extrabold leading-6 text-[#3737C1] sm:mt-2 sm:text-2xl sm:leading-8">
        {formatAmount(value)}
      </p>
    </div>
  );
}

// function EmployeeBadge() {
//   return (
//     <div className="flex h-[38px] w-full items-center justify-center gap-2 rounded-[14px] border border-[#00C89C]/20 bg-[#00C89C]/10 px-4 py-2 sm:w-fit">
//       <ShieldCheck className="h-[18px] w-[18px] text-[#00A882]" />

//       <span className="whitespace-nowrap text-sm font-bold leading-5 text-[#00A882]">
//         Verified Employee
//       </span>
//     </div>
//   );
// }

function OfficeAddressCard({ employment }: { employment: any }) {
  const companyName =
    employment?.companyName ||
    employment?.company ||
    employment?.employerName ||
    "-";

  const officeAddress =
    employment?.officeAddress ||
    employment?.companyAddress ||
    [
      employment?.officeAddressLine1,
      employment?.officeAddressLine2,
      employment?.officeCity,
      employment?.officeState,
      employment?.officePincode,
    ]
      .filter(Boolean)
      .join(", ");

  return (
    <aside
      className="
        w-full rounded-2xl border border-[#3737C1]/10 bg-[#3737C1]/5
        p-4 sm:rounded-3xl sm:p-6 lg:min-h-[578px] lg:max-w-[306px] lg:p-8
      "
    >
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
    </aside>
  );
}

const EmploymentTab = () => {
  const { profileData, loading } = useProfile();

  const employment =
    (profileData as any)?.employmentDetails ||
    (profileData as any)?.employment ||
    (profileData as any)?.employmentInfo ||
    {};

  if (loading) {
    return (
      <ProfileEmptyState
        title="Loading employment info..."
        description="Please wait while we fetch your latest employment details."
      />
    );
  }

  const monthlyIncome =
    employment?.monthlyIncome ||
    employment?.monthlySalary ||
    employment?.salary ||
    0;

  const annualIncome =
    employment?.annualIncome || Number(monthlyIncome || 0) * 12 || 0;

  const bonusIncome = employment?.bonusIncome || 0;
  const otherIncome = employment?.otherIncome || 0;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 border-b border-[#E2E8F0] pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-6">
        <PageHeader
          title="Employment Info"
          subtitle="Your professional and income details."
          showButton={false}
          className="border-b-0 pb-0"
        />

        {/* <EmployeeBadge /> */}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        <IncomeCard label="Monthly Income" value={monthlyIncome} />
        <IncomeCard label="Annual Income" value={annualIncome} />
        <IncomeCard label="Bonus Income" value={bonusIncome} />
        <IncomeCard label="Other Income" value={otherIncome} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_306px] lg:items-start">
        <div className="space-y-5 sm:space-y-8">
          <WhiteInfoCard
            title="Professional Details"
            icon={<BriefcaseBusiness className="h-4 w-4 text-[#3737C1] sm:h-5 sm:w-5" />}


          >
            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:mt-6 sm:grid-cols-2 sm:gap-y-6">
              <InfoField
                label="Employment Status"
                value={formatValue(employment?.employmentStatus || employment?.type)}
              />

              <InfoField
                label="Company"
                value={formatValue(
                  employment?.companyName ||
                  employment?.company ||
                  employment?.employerName
                )}
                icon={<Building2 className="h-3.5 w-3.5 text-[#3737C1] sm:h-4 sm:w-4" />}
              />

              <InfoField
                label="Designation"
                value={formatValue(employment?.designation || employment?.jobTitle)}
              />

              <InfoField
                label="Joining Date"
                value={formatDate(employment?.joiningDate)}
                icon={<CalendarDays className="h-3.5 w-3.5 text-[#90A1B9] sm:h-4 sm:w-4" />}
              />

              <InfoField
                label="Work Experience"
                value={formatValue(
                  employment?.workExperience ||
                  employment?.experience ||
                  employment?.totalExperience
                )}
              />

              <InfoField
                label="Official Email"
                value={formatValue(
                  employment?.officialEmail ||
                  employment?.companyEmail ||
                  employment?.workEmail
                )}
                icon={<Mail className="h-3.5 w-3.5 text-[#90A1B9] sm:h-4 sm:w-4" />}
              />
            </div>
          </WhiteInfoCard>

          <WhiteInfoCard
            title="Salary & Financial"
            icon={<WalletCards className="h-4 w-4 text-[#00C89C] sm:h-5 sm:w-5" />}

          >
            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:mt-6 sm:grid-cols-2 sm:gap-y-6">
              <InfoField
                label="Monthly Salary"
                value={formatAmount(monthlyIncome)}
                valueClassName="text-[#00C89C] text-lg sm:text-xl font-bold"
              />

              <InfoField
                label="Mode of Salary"
                value={formatValue(
                  employment?.salaryMode ||
                  employment?.modeOfSalary ||
                  employment?.salaryPaymentMode
                )}
              />

              <InfoField
                label="UAN Number"
                value={formatValue(employment?.uanNumber || employment?.uan)}
                valueClassName="tracking-[0.6px]"
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