import {
  FileCheck2,
  ShieldCheck,
  IndianRupee,
  CalendarDays,
  Clock3,
} from "lucide-react";
import ProfileInfoCard from "../shared/ProfileInfoCard";
import ProfileStatCard from "../shared/ProfileStatCard";
import ProfileStatusStep from "../shared/ProfileStatusStep";

const TrackLoanTab = () => (
  <div className="space-y-5">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <ProfileStatCard
        label="Application ID"
        value="LOS-20260526-001"
        icon={FileCheck2}
      />
      <ProfileStatCard
        label="Current Status"
        value="Document Approved"
        icon={ShieldCheck}
      />
      <ProfileStatCard
        label="Approved Amount"
        value="₹50,000"
        icon={IndianRupee}
      />
      <ProfileStatCard
        label="Expected Disbursal"
        value="Within 24 Hours"
        icon={CalendarDays}
      />
    </div>

    <ProfileInfoCard title="Loan Application Progress" icon={Clock3}>
      <div>
        <ProfileStatusStep
          completed
          title="Mobile Verification"
          description="Your mobile number has been verified successfully."
        />
        <ProfileStatusStep
          completed
          title="KYC & PAN Verification"
          description="PAN, Aadhaar, and basic KYC checks are completed."
        />
        <ProfileStatusStep
          completed
          title="Document Approved"
          description="Your uploaded documents have been reviewed and approved."
        />
        <ProfileStatusStep
          active
          title="Loan Disbursal"
          description="Your loan amount is being processed for bank transfer."
        />
        <ProfileStatusStep
          title="EMI Schedule Active"
          description="EMI schedule will be activated after disbursal."
        />
      </div>
    </ProfileInfoCard>
  </div>
);

export default TrackLoanTab;
