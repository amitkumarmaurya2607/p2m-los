import { Briefcase } from "lucide-react";
import type { LoanApplication } from "@/types";
import ProfileField from "../shared/ProfileField";
import ProfileInfoCard from "../shared/ProfileInfoCard";

type EmploymentSlice = LoanApplication["employmentDetails"];

const EmploymentTab = ({
  employment,
}: {
  employment: EmploymentSlice | undefined;
}) => (
  <div className="space-y-5">
    <ProfileInfoCard title="Employment Information" icon={Briefcase}>
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <ProfileField label="Company Name" value={employment?.companyName} />
        <ProfileField label="Designation" value={employment?.designation} />
        <ProfileField label="Official Email" value={employment?.email} />
        <ProfileField label="Salary Mode" value={employment?.salaryMode} />
        <ProfileField label="Joining Date" value={employment?.joiningDate} />
        <ProfileField label="UAN Number" value={employment?.uan} />
        <ProfileField label="Company State" value={employment?.state} />
        <ProfileField label="Company City" value={employment?.city} />
        <ProfileField label="Company Pincode" value={employment?.pincode} />
      </div>
    </ProfileInfoCard>

    <div
      className={`rounded-2xl border px-4 py-3 text-sm sm:p-5 ${
        employment?.verified
          ? "border-primary/20 bg-primary-muted text-primary"
          : "border-border bg-surface text-text-secondary"
      }`}
    >
      {employment?.verified
        ? "✓ Employment details verified"
        : "Employment details not verified yet"}
    </div>
  </div>
);

export default EmploymentTab;
