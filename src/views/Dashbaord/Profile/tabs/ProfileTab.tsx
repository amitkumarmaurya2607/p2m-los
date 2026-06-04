import { User, ShieldCheck } from "lucide-react";
import type { UserDetailsType } from "@/types";
import ProfileField from "../shared/ProfileField";
import ProfileInfoCard from "../shared/ProfileInfoCard";

const ProfileTab = ({ user }: { user: UserDetailsType | null }) => (
  <div className="space-y-5">
    <ProfileInfoCard title="Personal Information" icon={User}>
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <ProfileField label="First Name" value={user?.firstName} />
        <ProfileField label="Middle Name" value={user?.middleName} />
        <ProfileField label="Last Name" value={user?.lastName} />
        <ProfileField label="Father Name" value={user?.fathersName} />
        <ProfileField label="Date of Birth" value={user?.dateOfBirth} />
        <ProfileField label="Gender" value={user?.gender} />
        <ProfileField
          label="Credit Score"
          value={user?.creditScore ? String(user.creditScore) : ""}
        />
      </div>
    </ProfileInfoCard>

    <ProfileInfoCard title="Address Information" icon={ShieldCheck}>
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <ProfileField label="State" value={user?.state} />
        <ProfileField label="City" value={user?.city} />
        <ProfileField label="Pincode" value={user?.pincode} />
        <ProfileField label="Address" value={user?.address} full />
      </div>
    </ProfileInfoCard>
  </div>
);

export default ProfileTab;
