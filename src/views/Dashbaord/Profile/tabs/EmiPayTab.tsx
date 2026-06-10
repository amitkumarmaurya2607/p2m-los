import { IndianRupee, CalendarDays, Clock3, CreditCard, ChevronRight } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import ProfileInfoCard from "../shared/ProfileInfoCard";
import ProfileStatCard from "../shared/ProfileStatCard";

const emiRows = [
  { month: "June", amount: "₹4,850", date: "05 Jun 2026", status: "Paid" },
  { month: "July", amount: "₹4,850", date: "05 Jul 2026", status: "Due" },
  {
    month: "August",
    amount: "₹4,850",
    date: "05 Aug 2026",
    status: "Upcoming",
  },
];

const EmiPayTab = () => (
  <div className="space-y-5">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <ProfileStatCard label="Monthly EMI" value="₹4,850" icon={IndianRupee} />
      <ProfileStatCard label="Next Due Date" value="05 July 2026" icon={CalendarDays} />
      <ProfileStatCard label="Total Tenure" value="12 Months" icon={Clock3} />
      <ProfileStatCard label="Remaining EMI" value="11" icon={CreditCard} />
    </div>

    <ProfileInfoCard title="Pay Your EMI" icon={CreditCard}>
      <div
        className="flex flex-col gap-5 rounded-2xl border border-border-light bg-surface-muted p-5
          mt-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Amount Due
          </p>
          <h3 className="mt-1 text-3xl font-extrabold text-text-heading">₹4,850</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Pay before due date to avoid late charges.
          </p>
        </div>

        <GradientButton
          type="button"
          className="h-12 w-full px-6 sm:w-auto"
          rightIcon={<ChevronRight className="h-4 w-4" />}
        >
          Pay EMI Now
        </GradientButton>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-light mb-6">
        <div
          className="grid grid-cols-4 bg-surface-muted px-4 py-3 text-xs font-semibold uppercase
            tracking-wider text-text-muted sm:text-sm"
        >
          <span>Month</span>
          <span>Amount</span>
          <span>Due Date</span>
          <span>Status</span>
        </div>

        {emiRows.map((emi) => (
          <div
            key={emi.month}
            className="grid grid-cols-4 border-t border-border-light px-4 py-3 text-xs
              text-text-heading sm:text-sm"
          >
            <span>{emi.month}</span>
            <span>{emi.amount}</span>
            <span>{emi.date}</span>
            <span
              className={
                emi.status === "Paid"
                  ? "font-medium text-primary"
                  : emi.status === "Due"
                    ? "font-medium text-destructive"
                    : "text-text-secondary"
              }
            >
              {emi.status}
            </span>
          </div>
        ))}
      </div>
    </ProfileInfoCard>
  </div>
);

export default EmiPayTab;
