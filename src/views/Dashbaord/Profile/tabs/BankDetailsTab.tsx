import { Landmark } from "lucide-react";
import type { LoanApplication } from "@/types";
import ProfileField from "../shared/ProfileField";
import ProfileInfoCard from "../shared/ProfileInfoCard";
import VerifiedPill from "../shared/VerifiedPill";

type BankSlice = LoanApplication["bankDetails"];

const maskAccount = (acc?: string | null) => {
  if (!acc) return "-";
  return `XXXXXX${acc.slice(-4)}`;
};

const BankDetailsTab = ({ bank }: { bank?: BankSlice | undefined }) => (
  <div className="space-y-5">
    <ProfileInfoCard
      title="Bank Account Information"
      icon={Landmark}
      rightSlot={<VerifiedPill verified={bank?.verified} />}
    >
      <div className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <ProfileField label="Account Holder Name" value={bank?.benName} />
        <ProfileField
          label="Account Number"
          value={maskAccount(bank?.accountNumber)}
        />
        <ProfileField label="IFSC Code" value={bank?.ifscCode} />
        <ProfileField label="Status" value={bank?.status} />
      </div>
    </ProfileInfoCard>
  </div>
);

export default BankDetailsTab;
