import { CheckCircle2, IndianRupee, CreditCard, Clock3, Download } from "lucide-react";
import ProfileInfoCard from "../shared/ProfileInfoCard";
import ProfileStatCard from "../shared/ProfileStatCard";

const LoanCompletionTab = () => (
  <div className="space-y-5">
    <ProfileInfoCard title="Loan Completion" icon={CheckCircle2}>
      <div className="rounded-2xl border border-border bg-background p-5 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-muted">
          <CheckCircle2 className="h-9 w-9 text-primary" />
        </div>

        <h3 className="text-xl font-semibold text-text-heading sm:text-2xl">
          Loan Completion Pending
        </h3>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-text-secondary sm:text-base">
          Once all EMIs are paid successfully, your loan completion certificate
          and NOC will be available here.
        </p>

        <button
          type="button"
          disabled
          className="mt-5 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl
          bg-muted px-5 py-3 text-sm font-semibold text-text-muted"
        >
          Download NOC
          <Download className="h-4 w-4" />
        </button>
      </div>
    </ProfileInfoCard>

    <div className="grid gap-4 sm:grid-cols-3">
      <ProfileStatCard label="Total Paid" value="₹4,850" icon={IndianRupee} />
      <ProfileStatCard
        label="Outstanding"
        value="₹48,500"
        icon={CreditCard}
      />
      <ProfileStatCard label="Closure Status" value="Pending" icon={Clock3} />
    </div>
  </div>
);

export default LoanCompletionTab;
