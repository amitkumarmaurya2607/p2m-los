"use client";

import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useLoanApp } from "@/contexts/LoanAppContext";

const Field = ({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) => (
  <div className={full ? "sm:col-span-2 min-w-0" : "min-w-0"}>
    <label className="mb-2 block text-sm font-medium text-text-muted">{label}</label>

    <div
      className="min-h-11 w-full max-w-full overflow-hidden break-words rounded-xl border
        border-border bg-surface px-4 py-2.5 text-sm text-text-heading sm:text-base"
    >
      {value}
    </div>
  </div>
);

const TabContent = ({
  title,
  description,
  danger = false,
}: {
  title: string;
  description: string;
  danger?: boolean;
}) => (
  <div
    className="flex min-h-[260px] flex-col items-center justify-center px-3 py-10 text-center
      sm:px-4"
  >
    <h3
      className={`mb-3 text-xl font-semibold sm:text-2xl ${
        danger ? "text-destructive" : "text-text-heading"
      }`}
    >
      {title}
    </h3>
    <p className="max-w-md text-sm leading-6 text-text-secondary sm:text-base">{description}</p>
  </div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const { application, refreshApp } = useLoanApp();
  const pi = application?.personalInfo;

  useEffect(() => {
    refreshApp();
  }, [refreshApp]);

  const menuItems = ["Profile", "Security", "Billing", "Terms", "Notifications", "Delete Account"];

  const renderContent = () => {
    if (activeTab === "Security") {
      return (
        <TabContent
          title="Security"
          description="Manage your password, two-factor authentication, and active login sessions."
        />
      );
    }

    if (activeTab === "Billing") {
      return (
        <TabContent
          title="Billing"
          description="View your payment methods, invoices, and subscription details."
        />
      );
    }

    if (activeTab === "Terms") {
      return (
        <TabContent
          title="Terms & Conditions"
          description="Review the terms and conditions governing your use of this platform."
        />
      );
    }

    if (activeTab === "Notifications") {
      return (
        <TabContent
          title="Notifications"
          description="Configure your email, SMS, and push notification preferences."
        />
      );
    }

    if (activeTab === "Delete Account") {
      return (
        <TabContent
          title="Delete Account"
          danger
          description="This action is permanent and cannot be undone. All your data will be removed from our servers."
        />
      );
    }

    return (
      <>
        <h2 className="mb-5 text-xl font-semibold text-text-heading sm:text-2xl">My Profile</h2>

        <section
          className="mb-5 w-full max-w-full overflow-hidden rounded-2xl border border-border
            bg-surface p-4 sm:p-5"
        >
          <h3 className="mb-5 text-lg font-semibold text-text-heading sm:text-xl">
            Personal Information
          </h3>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="First Name" value={pi?.firstName ?? ""} />
            <Field label="Middle Name" value={pi?.middleName ?? ""} />
            <Field label="Last Name" value={pi?.lastName ?? ""} />
            <Field label="Father Name" value={pi?.fatherName ?? ""} />
            <Field label="Email Address" value={pi?.emailId ?? ""} />
            <Field label="Date of Birth" value={pi?.dob ?? ""} />
            <Field label="Gender" value={pi?.gender ?? ""} />
            <Field label="Salary" value={pi?.salary ?? ""} />
          </div>
        </section>

        <section
          className="w-full max-w-full overflow-hidden rounded-2xl border border-border bg-surface
            p-4 sm:p-5"
        >
          <h3 className="mb-5 text-lg font-semibold text-text-heading sm:text-xl">
            Professional Information
          </h3>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="State" value={pi?.state ?? ""} />
            <Field label="City" value={pi?.city ?? ""} />
            <Field label="Pincode" value={pi?.pinCode ?? ""} />
            <Field label="Address" value={pi?.address ?? ""} full />
          </div>
        </section>
      </>
    );
  };

  return (
    <div
      className="min-h-screen w-full max-w-full overflow-x-hidden px-3 py-5 text-text-heading
        sm:px-6 sm:py-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl overflow-hidden">
        <div className="mb-6 min-w-0">
          <h1 className="break-words text-2xl font-semibold text-text-heading sm:text-3xl">
            Profile Settings
          </h1>
          <p className="mt-1 break-words text-sm text-text-secondary sm:text-base">
            Manage your account information and preferences
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-5 lg:flex-row">
          <aside
            className="w-full max-w-full rounded-2xl border border-border-light bg-surface p-3
              shadow-[var(--shadow-card)] lg:w-[240px] lg:shrink-0"
          >
            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-col">
              {menuItems.map((item) => {
                const isActive = item === activeTab;
                const isDelete = item === "Delete Account";

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setActiveTab(item)}
                    className={`min-w-0 rounded-xl px-3 py-2.5 text-left text-xs font-medium
                    transition-all sm:text-sm lg:w-full ${
                      isActive
                        ? `bg-primary-muted text-primary
                          shadow-[inset_0px_0px_8px_rgba(73,55,156,0.08)]`
                        : isDelete
                          ? "text-destructive hover:bg-destructive/5"
                          : "text-text-secondary hover:bg-muted"
                    }`}
                  >
                    <span className="block truncate">{item}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <main
            className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-border-light
              bg-surface p-3 shadow-[var(--shadow-card)] sm:p-6 lg:p-8"
          >
            <section
              className="mb-5 w-full max-w-full overflow-hidden rounded-2xl border border-border
                bg-surface p-4 sm:p-5"
            >
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full
                    bg-primary-muted sm:h-24 sm:w-24"
                >
                  <User className="h-9 w-9 text-primary sm:h-10 sm:w-10" />
                </div>

                <div className="min-w-0">
                  <h3 className="break-words text-xl font-semibold text-text-heading">
                    {pi?.firstName ? `${pi.firstName} ${pi.lastName}`.trim() : "User"}
                  </h3>
                  <p className="mt-1 max-w-full break-all text-sm text-text-secondary">
                    {pi?.emailId || "user@example.com"}
                  </p>
                  <p className="mt-1 break-words text-sm text-text-secondary">
                    {pi?.address || ""}
                  </p>
                </div>
              </div>
            </section>

            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
