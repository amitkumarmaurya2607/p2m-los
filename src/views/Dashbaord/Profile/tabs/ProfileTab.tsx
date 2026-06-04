import { ShieldCheck, User } from "lucide-react";
import type { UserDetailsType } from "@/types";
import ProfileField from "../shared/ProfileField";
import ProfileInfoCard from "../shared/ProfileInfoCard";

const formatDate = (date?: string | null) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ProfileTab = ({ user }: { user: UserDetailsType | null }) => {
  const fullName = [user?.firstName, user?.middleName, user?.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-8">
      <ProfileInfoCard title="Personal Details" icon={User}>
        <div className="grid min-w-0 grid-cols-1 gap-x-16 sm:grid-cols-2">
          <ProfileField label="Full Name" value={fullName} />
          <ProfileField label="Father Name" value={user?.fathersName} />

          <ProfileField label="Date of Birth" value={formatDate(user?.dateOfBirth)} />
          <ProfileField label="Gender" value={user?.gender} />

          <ProfileField label="Credit Score" value={user?.creditScore} />
        </div>
      </ProfileInfoCard>

      <ProfileInfoCard title="Address Information" icon={ShieldCheck}>
        <div className="grid min-w-0 grid-cols-1 gap-x-16 sm:grid-cols-2">
          <ProfileField label="State" value={user?.state} />
          <ProfileField label="City" value={user?.city} />

          <ProfileField label="Pincode" value={user?.pincode} />
          <ProfileField label="Country" value="India" />

          <ProfileField label="Address" value={user?.address} full />
        </div>
      </ProfileInfoCard>
    </div>
  );
};

export default ProfileTab;