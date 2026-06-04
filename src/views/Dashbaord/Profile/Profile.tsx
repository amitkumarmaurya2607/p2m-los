"use client";

import { useEffect, useMemo, useState } from "react";
import {
  User,
  ShieldCheck,
  FileCheck2,
  CreditCard,
  CheckCircle2,
  Clock3,
  IndianRupee,
  CalendarDays,
  Download,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { getProfileDataAction } from "@/lib/actions/other.action";
import { showToast } from "@/lib/toast";
import { UserDetailsType } from "@/types";

type TabKey =
  | "profile"
  | "trackLoan"
  | "approvedDocs"
  | "emiPay"
  | "loanCompletion";

const tabs: {
  key: TabKey;
  label: string;
  icon: React.ElementType;
  description: string;
}[] = [
    {
      key: "profile",
      label: "Profile",
      icon: User,
      description: "View your personal and address details",
    },
    {
      key: "trackLoan",
      label: "Track Loan Status",
      icon: Clock3,
      description: "Check your loan application progress",
    },
    {
      key: "approvedDocs",
      label: "Approved Documents",
      icon: FileCheck2,
      description: "Documents after approval",
    },
    {
      key: "emiPay",
      label: "EMI Pay",
      icon: CreditCard,
      description: "Pay and track your EMI",
    },
    {
      key: "loanCompletion",
      label: "Loan Completion",
      icon: CheckCircle2,
      description: "Final loan closure status",
    },
  ];

const Field = ({
  label,
  value,
  full = false,
}: {
  label: string;
  value?: string | number | null;
  full?: boolean;
}) => (
  <div className={full ? "sm:col-span-2 min-w-0" : "min-w-0"}>
    <label className="mb-2 block text-sm font-medium text-text-muted">
      {label}
    </label>

    <div
      className="min-h-11 w-full max-w-full overflow-hidden break-words rounded-xl border
      border-border bg-background px-4 py-2.5 text-sm text-text-heading sm:text-base"
    >
      {value ? String(value) : "-"}
    </div>
  </div>
);

const InfoCard = ({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
}) => (
  <section className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-muted">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-text-heading sm:text-xl">
        {title}
      </h3>
    </div>

    {children}
  </section>
);

const StatusStep = ({
  title,
  description,
  completed,
  active,
}: {
  title: string;
  description: string;
  completed?: boolean;
  active?: boolean;
}) => (
  <div className="relative flex gap-4">
    <div className="flex flex-col items-center">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold
        ${completed
            ? "border-primary bg-primary text-white"
            : active
              ? "border-primary bg-primary-muted text-primary"
              : "border-border bg-background text-text-muted"
          }`}
      >
        {completed ? <CheckCircle2 className="h-5 w-5" /> : active ? "•" : ""}
      </div>
      <div className="h-full min-h-10 w-px bg-border" />
    </div>

    <div className="pb-6">
      <h4 className="text-sm font-semibold text-text-heading sm:text-base">
        {title}
      </h4>
      <p className="mt-1 text-sm leading-6 text-text-secondary">
        {description}
      </p>
    </div>
  </div>
);

const StatCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) => (
  <div className="rounded-2xl border border-border bg-background p-4">
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-muted">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <p className="text-sm text-text-secondary">{label}</p>
    <h4 className="mt-1 break-words text-lg font-semibold text-text-heading">
      {value}
    </h4>
  </div>
);

const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-4 py-10 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-muted">
      <AlertTriangle className="h-7 w-7 text-primary" />
    </div>
    <h3 className="text-lg font-semibold text-text-heading sm:text-xl">
      {title}
    </h3>
    <p className="mt-2 max-w-md text-sm leading-6 text-text-secondary sm:text-base">
      {description}
    </p>
  </div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserDetailsType | null>(null);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      setLoading(true);

      const result = await getProfileDataAction();

      if (result?.success && result?.data) {
        setProfileData(result.data as UserDetailsType);
        return;
      }

      showToast({
        message: result?.error || "Submission failed",
        type: "error",
      });
    } catch (err) {
      console.log("err", err);

      showToast({
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const fullName = useMemo(() => {
    const name = [
      profileData?.firstName,
      profileData?.middleName,
      profileData?.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    return name || "User";
  }, [profileData]);

  const activeTabData = tabs.find((tab) => tab.key === activeTab);

  const renderProfileTab = () => (
    <div className="space-y-5">
      <InfoCard title="Personal Information" icon={User}>
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="First Name" value={profileData?.firstName} />
          <Field label="Middle Name" value={profileData?.middleName} />
          <Field label="Last Name" value={profileData?.lastName} />
          <Field label="Father Name" value={profileData?.fathersName} />
          <Field label="Date of Birth" value={profileData?.dateOfBirth} />
          <Field label="Gender" value={profileData?.gender} />
          <Field
            label="Credit Score"
            value={profileData?.creditScore ? String(profileData.creditScore) : ""}
          />
        </div>
      </InfoCard>

      <InfoCard title="Address Information" icon={ShieldCheck}>
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="State" value={profileData?.state} />
          <Field label="City" value={profileData?.city} />
          <Field label="Pincode" value={profileData?.pincode} />
          <Field label="Address" value={profileData?.address} full />
        </div>
      </InfoCard>
    </div>
  );

  const renderTrackLoanTab = () => (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Application ID" value="LOS-20260526-001" icon={FileCheck2} />
        <StatCard label="Current Status" value="Document Approved" icon={ShieldCheck} />
        <StatCard label="Approved Amount" value="₹50,000" icon={IndianRupee} />
        <StatCard label="Expected Disbursal" value="Within 24 Hours" icon={CalendarDays} />
      </div>

      <InfoCard title="Loan Application Progress" icon={Clock3}>
        <div>
          <StatusStep
            completed
            title="Mobile Verification"
            description="Your mobile number has been verified successfully."
          />
          <StatusStep
            completed
            title="KYC & PAN Verification"
            description="PAN, Aadhaar, and basic KYC checks are completed."
          />
          <StatusStep
            completed
            title="Document Approved"
            description="Your uploaded documents have been reviewed and approved."
          />
          <StatusStep
            active
            title="Loan Disbursal"
            description="Your loan amount is being processed for bank transfer."
          />
          <StatusStep
            title="EMI Schedule Active"
            description="EMI schedule will be activated after disbursal."
          />
        </div>
      </InfoCard>
    </div>
  );

  const renderApprovedDocsTab = () => (
    <div className="space-y-5">
      <InfoCard title="Approved Documents" icon={FileCheck2}>
        <div className="space-y-3">
          {[
            "PAN Card Verification",
            "Aadhaar Verification",
            "Bank Details",
            "Account Statement",
            "Selfie Verification",
            "Address Proof",
          ].map((doc) => (
            <div
              key={doc}
              className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4
              sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-muted">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>

                <div className="min-w-0">
                  <h4 className="break-words text-sm font-semibold text-text-heading sm:text-base">
                    {doc}
                  </h4>
                  <p className="mt-1 text-sm text-text-secondary">
                    Approved and verified
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border
                px-4 py-2 text-sm font-medium text-text-heading transition hover:bg-muted"
              >
                <Download className="h-4 w-4" />
                View
              </button>
            </div>
          ))}
        </div>
      </InfoCard>

      <div className="rounded-2xl border border-primary/20 bg-primary-muted p-4 text-sm leading-6 text-primary sm:p-5">
        Your documents are approved. Please review your loan agreement before final
        disbursal.
      </div>
    </div>
  );

  const renderEmiPayTab = () => (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Monthly EMI" value="₹4,850" icon={IndianRupee} />
        <StatCard label="Next Due Date" value="05 July 2026" icon={CalendarDays} />
        <StatCard label="Total Tenure" value="12 Months" icon={Clock3} />
        <StatCard label="Remaining EMI" value="11" icon={CreditCard} />
      </div>

      <InfoCard title="Pay Your EMI" icon={CreditCard}>
        <div className="rounded-2xl border border-border bg-background p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-text-secondary">Amount Due</p>
              <h3 className="mt-1 text-2xl font-bold text-text-heading sm:text-3xl">
                ₹4,850
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                Pay before due date to avoid late charges.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary
              px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
            >
              Pay EMI Now
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-4 bg-background px-4 py-3 text-xs font-semibold text-text-muted sm:text-sm">
            <span>Month</span>
            <span>Amount</span>
            <span>Due Date</span>
            <span>Status</span>
          </div>

          {[
            {
              month: "June",
              amount: "₹4,850",
              date: "05 Jun 2026",
              status: "Paid",
            },
            {
              month: "July",
              amount: "₹4,850",
              date: "05 Jul 2026",
              status: "Due",
            },
            {
              month: "August",
              amount: "₹4,850",
              date: "05 Aug 2026",
              status: "Upcoming",
            },
          ].map((emi) => (
            <div
              key={emi.month}
              className="grid grid-cols-4 border-t border-border px-4 py-3 text-xs text-text-heading sm:text-sm"
            >
              <span>{emi.month}</span>
              <span>{emi.amount}</span>
              <span>{emi.date}</span>
              <span
                className={
                  emi.status === "Paid"
                    ? "font-medium text-primary"
                    : emi.status === "Due"
                      ? "font-medium text-destructive"
                      : "text-text-secondary"
                }
              >
                {emi.status}
              </span>
            </div>
          ))}
        </div>
      </InfoCard>
    </div>
  );

  const renderLoanCompletionTab = () => (
    <div className="space-y-5">
      <InfoCard title="Loan Completion" icon={CheckCircle2}>
        <div className="rounded-2xl border border-border bg-background p-5 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-muted">
            <CheckCircle2 className="h-9 w-9 text-primary" />
          </div>

          <h3 className="text-xl font-semibold text-text-heading sm:text-2xl">
            Loan Completion Pending
          </h3>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-text-secondary sm:text-base">
            Once all EMIs are paid successfully, your loan completion certificate
            and NOC will be available here.
          </p>

          <button
            type="button"
            disabled
            className="mt-5 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl
            bg-muted px-5 py-3 text-sm font-semibold text-text-muted"
          >
            Download NOC
            <Download className="h-4 w-4" />
          </button>
        </div>
      </InfoCard>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Paid" value="₹4,850" icon={IndianRupee} />
        <StatCard label="Outstanding" value="₹48,500" icon={CreditCard} />
        <StatCard label="Closure Status" value="Pending" icon={Clock3} />
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <EmptyState
          title="Loading profile..."
          description="Please wait while we fetch your latest account details."
        />
      );
    }

    if (activeTab === "profile") return renderProfileTab();
    if (activeTab === "trackLoan") return renderTrackLoanTab();
    if (activeTab === "approvedDocs") return renderApprovedDocsTab();
    if (activeTab === "emiPay") return renderEmiPayTab();
    if (activeTab === "loanCompletion") return renderLoanCompletionTab();

    return null;
  };

  return (
    <div
      className="min-h-screen w-full max-w-full overflow-x-hidden bg-background px-3 py-5
      text-text-heading sm:px-6 sm:py-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6">
          <h1 className="break-words text-2xl font-semibold text-text-heading sm:text-3xl">
            Profile Settings
          </h1>
          <p className="mt-1 break-words text-sm text-text-secondary sm:text-base">
            Manage your profile, loan status, EMI payments, and documents.
          </p>
        </div>

        <section
          className="mb-5 rounded-3xl border border-border-light bg-surface p-4 shadow-[var(--shadow-card)]
          sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-muted sm:h-24 sm:w-24">
                <User className="h-9 w-9 text-primary sm:h-10 sm:w-10" />
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-xl font-semibold text-text-heading sm:text-2xl">
                  {fullName}
                </h2>
                <p className="mt-1 break-words text-sm text-text-secondary">
                  {profileData?.address || "Loan account user"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary-muted px-4 py-3">
              <p className="text-xs font-medium text-primary">Loan Status</p>
              <p className="mt-1 text-sm font-semibold text-primary">
                Document Approved
              </p>
            </div>
          </div>
        </section>

        <div className="flex min-w-0 flex-col gap-5 lg:flex-row">
          <aside
            className="w-full rounded-3xl border border-border-light bg-surface p-3
            shadow-[var(--shadow-card)] lg:w-[300px] lg:shrink-0"
          >
            <nav className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-col">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.key === activeTab;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`group flex min-w-0 items-start gap-3 rounded-2xl px-3 py-3 text-left
                    transition-all ${isActive
                        ? "bg-primary-muted text-primary shadow-[inset_0px_0px_8px_rgba(73,55,156,0.08)]"
                        : "text-text-secondary hover:bg-muted"
                      }`}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                      ${isActive
                          ? "bg-primary text-white"
                          : "bg-background text-text-secondary group-hover:text-text-heading"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">
                        {tab.label}
                      </span>
                      <span className="mt-0.5 hidden text-xs leading-5 text-text-secondary lg:block">
                        {tab.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <main
            className="min-w-0 flex-1 rounded-3xl border border-border-light bg-surface p-3
            shadow-[var(--shadow-card)] sm:p-5 lg:p-6"
          >
            <div className="mb-5 rounded-2xl border border-border bg-background p-4">
              <h2 className="text-xl font-semibold text-text-heading sm:text-2xl">
                {activeTabData?.label}
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                {activeTabData?.description}
              </p>
            </div>

            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;