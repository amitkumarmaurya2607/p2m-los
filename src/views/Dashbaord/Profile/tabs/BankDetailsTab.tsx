import { Landmark } from "lucide-react";
import type { LoanApplication } from "@/types";
import ProfileField from "../shared/ProfileField";
import ProfileInfoCard from "../shared/ProfileInfoCard";

type BankSlice = LoanApplication["bankDetails"];

const maskAccount = (acc?: string | null) => {
  if (!acc) return "-";
  return `XXXXXX${acc.slice(-4)}`;
};

const BankDetailsTab = ({ bank }: { bank: BankSlice | undefined }) => (
  <div className="space-y-5">
    <ProfileInfoCard title="Bank Account Information" icon={Landmark}>
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
        <ProfileField label="Account Holder Name" value={bank?.benName} />
        <ProfileField
          label="Account Number"
          value={maskAccount(bank?.accountNumber)}
        />
        <ProfileField label="IFSC Code" value={bank?.ifscCode} />
        <ProfileField label="Status" value={bank?.status} />
      </div>
    </ProfileInfoCard>

    <div
      className={`rounded-2xl border px-4 py-3 text-sm sm:p-5 ${
        bank?.verified
          ? "border-primary/20 bg-primary-muted text-primary"
          : "border-border bg-surface text-text-secondary"
      }`}
    >
      {bank?.verified
        ? "✓ Bank account verified"
        : "Bank account not verified yet"}
    </div>
  </div>
);

export default BankDetailsTab;
