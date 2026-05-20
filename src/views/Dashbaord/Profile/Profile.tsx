"use client";
import React, { useState } from "react";
import { User } from "lucide-react";

const Field = ({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="mb-3 block text-base font-normal text-text-muted">{label}</label>
    <div
      className="h-10 rounded-xl border border-border bg-surface px-4 text-base leading-10
        text-text-heading"
    >
      {value}
    </div>
  </div>
);

const TabContent = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <h3 className="mb-3 text-2xl font-normal text-text-heading">{title}</h3>
    <p className="max-w-md text-base text-text-secondary">{description}</p>
  </div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const menuItems = ["Profile", "Security", "Billing", "Terms", "Notifications", "Delete Account"];

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <>
            <h2 className="mb-7 text-2xl font-normal text-text-heading">My Profile</h2>

            <section className="mb-[18px] rounded-xl border border-border bg-surface p-4 sm:p-5">
              <div className="mb-8 flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-text-heading">Personal Information</h3>
              </div>

              <div className="grid gap-x-4 gap-y-[18px] md:grid-cols-2">
                <Field label="First Name" value="John" />
                <Field label="Last Name" value="Doe" />
                <Field label="Email Address" value="john.doe@example.com" />
                <Field label="Phone Number" value="+1 (555) 123-4567" />
              </div>
            </section>

            <section className="rounded-xl border border-border bg-surface p-4 sm:p-5">
              <div className="mb-8 flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-text-heading">
                  Professional Information
                </h3>
              </div>

              <div className="grid gap-x-4 gap-y-[18px] md:grid-cols-2">
                <Field label="Company" value="Acme Corporation" />
                <Field label="Job Title" value="Marketing Director" />
                <Field label="Website" value="https://johndoe.com" full />
              </div>
            </section>
          </>
        );

      case "Security":
        return (
          <TabContent
            title="Security"
            description="Manage your password, two-factor authentication, and active login sessions."
          />
        );

      case "Billing":
        return (
          <TabContent
            title="Billing"
            description="View your payment methods, invoices, and subscription details."
          />
        );

      case "Terms":
        return (
          <TabContent
            title="Terms & Conditions"
            description="Review the terms and conditions governing your use of this platform."
          />
        );

      case "Notifications":
        return (
          <TabContent
            title="Notifications"
            description="Configure your email, SMS, and push notification preferences."
          />
        );

      case "Delete Account":
        return (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h3 className="mb-3 text-2xl font-normal text-destructive">Delete Account</h3>
            <p className="max-w-md text-base text-text-secondary">
              This action is permanent and cannot be undone. All your data will be removed from our
              servers.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="mx-auto min-h-screen w-full max-w-[var(--max-width-section)] px-5 text-text-heading
        md:px-8 lg:px-0"
    >
      <div className="mb-7">
        <h1 className="text-3xl font-normal text-text-heading">Profile Settings</h1>
        <p className="mt-1 text-base text-text-secondary">
          Manage your account information and preferences
        </p>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">
        <aside
          className="w-full rounded-2xl border border-border-light bg-surface p-5
            shadow-[var(--shadow-card)] lg:h-[292px] lg:w-[202px]"
        >
          <nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-1 lg:overflow-visible">
            {menuItems.map((item) => {
              const isActive = item === activeTab;
              const isDelete = item === "Delete Account";
              return (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`whitespace-nowrap rounded-lg px-3 py-[9px] text-left text-base
                  leading-[22px] transition-colors lg:w-full ${
                    isActive
                      ? `bg-primary-muted text-primary
                        shadow-[inset_0px_0px_8px_rgba(73,55,156,0.08)]`
                      : isDelete
                        ? "font-medium text-destructive hover:bg-destructive/5"
                        : "text-text-secondary hover:bg-muted"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </aside>

        <main
          className="flex-1 rounded-2xl border border-border-light bg-surface px-4 py-6
            shadow-[var(--shadow-card)] sm:px-6 lg:px-10"
        >
          <section
            className="mb-[18px] rounded-xl border border-border bg-surface px-4 py-4 sm:px-5"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-[100px] w-[100px] items-center justify-center rounded-full
                    bg-primary-muted"
                >
                  <User className="h-10 w-10 text-primary" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-text-heading">John Doe</h3>
                  <p className="mt-1 text-sm text-text-secondary">john.doe@example.com</p>
                  <p className="mt-1 text-sm text-text-secondary">123 Main Street</p>
                </div>
              </div>
            </div>
          </section>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Profile;
