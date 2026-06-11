"use client";

import React from "react";
import { CreditCard, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";
import ProfileEmptyState from "../shared/ProfileEmptyState";
import { InfoField, InfoItemType } from "../componants/InfoField";
import WhiteInfoCard from "../componants/WhiteInfoCard";
import PageHeader from "../componants/PageHeader";
import EmploymentSkeleton from "./EmploymentSkeleton";

const formatDate = (date?: string | null) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const maskAadhaar = (aadhaar?: string | null) => {
  if (!aadhaar) return "-";

  const last4 = aadhaar.slice(-4);
  return `XXXX XXXX ${last4}`;
};

function PersonalInformationCard({ user }: { user: any }) {
  const fullName = [user?.firstName, user?.middleName, user?.lastName].filter(Boolean).join(" ");

  const items: InfoItemType[] = [
    {
      label: "Full Name",
      value: fullName,
    },
    {
      label: "Father's Name",
      value: user?.fathersName,
    },
    {
      label: "Gender",
      value: user?.gender,
    },
    {
      label: "DOB",
      value: formatDate(user?.dateOfBirth),
    },
    {
      label: "Marital Status",
      value: user?.maritalStatus,
    },
  ];

  return (
    <WhiteInfoCard
      title="Personal Information"
      icon={<UserRound className="h-4 w-4 text-[#00C89C] sm:h-5 sm:w-5" />}
    >
      <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:mt-6 sm:grid-cols-2 sm:gap-y-6">
        {items.map((item) => (
          <InfoField key={item.label} {...item} />
        ))}
      </div>
    </WhiteInfoCard>
  );
}

function IdentityContactCard({ user }: { user: any }) {
  const aadhaarNumber = user?.linkedAadhaarNumberByDigiLocker || user?.linkedAadhaarNumberByPanPlus;

  const items: InfoItemType[] = [
    {
      label: "PAN Name",
      value: user?.pan_name,
    },
    {
      label: "Aadhaar Name",
      value: user?.aAdharName,
    },
    {
      label: "Aadhaar Number",
      value: maskAadhaar(aadhaarNumber),
    },
    {
      label: "User Status",
      value: user?.userDataStatus,
    },
    {
      label: "Mobile",
      value: "-",
      icon: <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
    },
    {
      label: "Email",
      value: "-",
      icon: <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
    },
  ];

  return (
    <WhiteInfoCard
      title="Identity & Contact"
      icon={<CreditCard className="h-4 w-4 text-[#3737C1] sm:h-5 sm:w-5" />}
    >
      <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:mt-6 sm:grid-cols-2 sm:gap-y-6">
        {items.map((item) => (
          <InfoField key={item.label} {...item} />
        ))}
      </div>
    </WhiteInfoCard>
  );
}

function AddressInformationCard({ user }: { user: any }) {
  const addressLines = [user?.address, user?.city, user?.state, user?.pincode, "India"].filter(
    Boolean,
  );

  return (
    <WhiteInfoCard
      title="Address Information"
      icon={<MapPin className="h-4 w-4 text-[#FE9A00] sm:h-5 sm:w-5" />}
    >
      <div className="mt-5 rounded-2xl border border-[#F1F5F9] bg-[#F8FAFC] p-4 sm:mt-6 sm:p-5">
        <p
          className="whitespace-pre-line break-words text-sm font-medium leading-6 text-[#314158]
            sm:text-base sm:leading-7"
        >
          {addressLines.length ? addressLines.join("\n") : "-"}
        </p>
      </div>
    </WhiteInfoCard>
  );
}

function VerificationItem({ label, verified }: { label: string; verified: boolean }) {
  return (
    <div
      className="flex min-h-[44px] items-center justify-between rounded-xl border border-white/10
        bg-white/[0.05] px-3 py-2.5 sm:min-h-[50px] sm:rounded-[14px] sm:p-3"
    >
      <span className="text-xs font-medium leading-5 text-[#CAD5E2] sm:text-sm">{label}</span>

      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${verified ? "bg-[#00C89C]/20" : "bg-white/10"
          }`}
      >
        <ShieldCheck className={`h-4 w-4 ${verified ? "text-[#00C89C]" : "text-[#90A1B9]"}`} />
      </span>
    </div>
  );
}

function VerificationSummaryCard({ user }: { user: any }) {
  const panVerified = Boolean(user?.pan_name || user?.pan_dob);
  const aadhaarVerified = Boolean(user?.aAdharName || user?.aAdharDOB);
  const mobileVerified = user?.userDataStatus === "VERIFIED";
  const emailVerified = user?.userDataStatus === "VERIFIED";
  const faceVerified = Boolean(user?.face_match_score || user?.profile_photo_key);

  return (
    <aside
      className="w-full rounded-2xl border border-white/10
        bg-[linear-gradient(135deg,#0F172B_0%,#1D293D_100%)] p-4
        shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:rounded-3xl sm:p-6 lg:sticky lg:top-6
        lg:max-w-[306px] lg:p-8"
    >
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <ShieldCheck className="h-4 w-4 text-[#00C89C] sm:h-5 sm:w-5" />

        <h3 className="text-base font-bold leading-6 text-white sm:text-lg sm:leading-7">
          Verification Summary
        </h3>
      </div>

      <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
        <VerificationItem label="PAN Verified" verified={panVerified} />
        <VerificationItem label="Aadhaar Verified" verified={aadhaarVerified} />
        <VerificationItem label="Mobile Verified" verified={mobileVerified} />
        <VerificationItem label="Email Verified" verified={emailVerified} />
        <VerificationItem label="Face Verified" verified={faceVerified} />
      </div>

      <div className="mt-6 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
        <p
          className="text-[10px] font-bold uppercase leading-4 tracking-[0.6px] text-[#90A1B9]
            sm:text-xs"
        >
          Credit Score
        </p>

        <div className="mt-2 flex flex-wrap items-end gap-2">
          <span
            className="text-3xl font-extrabold leading-9 text-[#00C89C] sm:text-4xl sm:leading-10"
          >
            {user?.creditScore || "-"}
          </span>

          {user?.creditScore ? (
            <span className="pb-1 text-xs font-medium uppercase text-[#90A1B9] sm:text-sm">
              {user.creditScore >= 750 ? "Excellent" : user.creditScore >= 650 ? "Good" : "Average"}
            </span>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

const ProfileTab = () => {
  const { profileData: user, loading } = useProfile();

  if (loading) {
    return <EmploymentSkeleton />;
  }

  if (!user) {
    return (
      <ProfileEmptyState
        title="No profile found"
        description="We could not find your profile details."
      />
    );
  }

  return (
    <>
      <PageHeader
        loading={loading}
        title="Profile Details"
        showButton={false}
        subtitle="Manage your personal and contact information."
      />
      <div
        className="grid w-full grid-cols-1 mt-8 gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_306px]
          lg:items-start"
      >
        <div className="space-y-5 sm:space-y-8">
          <PersonalInformationCard user={user} />
          <IdentityContactCard user={user} />
          <AddressInformationCard user={user} />
        </div>

        <VerificationSummaryCard user={user} />
      </div>
    </>
  );
};

export default ProfileTab;
