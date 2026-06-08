"use client";

import { useEffect, useMemo, useState } from "react";
import {
  User,
  FileCheck2,
  CreditCard,
  CheckCircle2,
  Briefcase,
  Landmark,
} from "lucide-react";
import { getProfileDataAction } from "@/lib/actions/other.action";
import { showToast } from "@/lib/toast";
import { UserDetailsType } from "@/types";
import { useLoanApp } from "@/contexts/LoanAppContext";
import ProfileEmptyState from "./shared/ProfileEmptyState";
import ProfileTab from "./tabs/ProfileTab";
import EmploymentTab from "./tabs/EmploymentTab";
import BankDetailsTab from "./tabs/BankDetailsTab";
import ApprovedDocsTab from "./tabs/ApprovedDocsTab";
import EmiPayTab from "./tabs/EmiPayTab";
import LoanCompletionTab from "./tabs/LoanCompletionTab";
import LoanApplication from "./tabs/LoanApplication";
import LoanDetailsTab from "./tabs/LoanDetailsTab";

type TabKey =
  | "LoanApplication"
  | "profile"
  | "employment"
  | "bankDetails"
  | "trackLoan"
  | "approvedDocs"
  | "emiPay"
  | "loanDetails"
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
      key: "employment",
      label: "Employment Details",
      icon: Briefcase,
      description: "View your employment and income information",
    },
    {
      key: "bankDetails",
      label: "Bank Details",
      icon: Landmark,
      description: "View your verified bank account",
    },
    {
      key: "loanDetails",
      label: "Loan Details",
      icon: Landmark,
      description: "View your loan information and status",
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

const Profile = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("LoanApplication");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserDetailsType | null>(null);
  const { application } = useLoanApp();
  const employment = application?.employmentDetails;
  const bank = application?.bankDetails;

  const getDetails = async () => {
    try {
      setLoading(true);

      const result = await getProfileDataAction();

      if (result?.success && result?.data) {
        const data = result.data;
        const name = [data.firstName, data.middleName, data.lastName]
          .filter(Boolean)
          .join(" ");
        localStorage.setItem("Profile", JSON.stringify({ name: name || "User", img: data?.profilePicUrl || "" }));
        setProfileData(data as UserDetailsType);
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

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    getDetails();
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

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

  const renderContent = () => {
    if (loading) {
      return (
        <ProfileEmptyState
          title="Loading profile..."
          description="Please wait while we fetch your latest account details."
        />
      );
    }

    switch (activeTab) {
      case "LoanApplication":
        return <LoanApplication />;
      case "profile":
        return <ProfileTab user={profileData} />;
      case "employment":
        return <EmploymentTab employment={employment} />;
      case "bankDetails":
        return <BankDetailsTab bank={bank} />;
      case "loanDetails":
        return <LoanDetailsTab />;
      case "approvedDocs":
        return <ApprovedDocsTab />;
      case "emiPay":
        return <EmiPayTab />;
      case "loanCompletion":
        return <LoanCompletionTab />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen w-full max-w-full overflow-x-hidden bg-background px-3
      text-text-heading sm:px-6  lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* <div className="mb-6">
          <h1 className="break-words text-2xl font-semibold text-text-heading sm:text-3xl">
            Profile Settings
          </h1>
          <p className="mt-1 break-words text-sm text-text-secondary sm:text-base">
            Manage your profile, loan status, EMI payments, and documents.
          </p>
        </div> */}

        {/* <section
          className="mb-5 rounded-3xl border border-border-light bg-surface p-4 shadow-[var(--shadow-card)]
          sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-muted sm:h-24 sm:w-24">
                <User className="h-9 w-9 text-primary sm:h-10 sm:w-10" />
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-xl font-bold text-text-heading sm:text-2xl">
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
        </section> */}

        <div className="flex min-w-0 flex-col gap-5 lg:flex-row">
          <aside
            className="w-full rounded-3xl border border-border-light bg-surface p-3
  shadow-[var(--shadow-card)] lg:w-[300px] lg:shrink-0"
          >
            {/* USER SUMMARY */}
            <div className="mb-3 rounded-2xl border border-border bg-background p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-muted text-primary">
                  {profileData?.profilePicUrl ? (
                    <img
                      src={profileData.profilePicUrl}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-text-heading">
                    {fullName}
                  </h3>

                  {/* <p className="mt-0.5 truncate text-xs text-text-secondary">
                    Application ID: {"-"}
                  </p> */}
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-primary-muted px-3 py-2">
                <p className="text-xs font-medium text-text-secondary">Loan Status</p>

                <p className="mt-0.5 text-sm font-bold text-primary">
                  {"In Progress"}
                </p>
              </div>
            </div>

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
                        : "text-text-heading hover:bg-muted"
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
                      <span className="block truncate text-sm font-bold">
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
            className="min-w-0 flex-1"
          //rounded-3xl border border-border-light bg-surface p-5
          //  shadow-[var(--shadow-card)] sm:p-6 lg:p-7"
          >
            {/* <div className="mb-5 rounded-2xl border border-border-light bg-surface-muted p-4 sm:p-5">
              <h2 className="text-xl font-bold text-text-heading sm:text-2xl">
                {activeTabData?.label}
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                {activeTabData?.description}
              </p>
            </div> */}

            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
