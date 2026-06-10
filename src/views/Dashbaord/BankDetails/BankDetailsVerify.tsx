"use client";

import GradientButton from "@/components/ui/GradientButton";
import type { BankDetailsReaponce } from "@/lib/actions/action.type";
import {
  Banknote,
  CheckCircle2,
  CircleAlert,
  CreditCard,
  Landmark,
  ShieldCheck,
  UserRound,
} from "lucide-react";

function maskAccountNumber(accountNumber: string) {
  if (!accountNumber) return "-";
  return `XXXX XXXX ${accountNumber.slice(-4)}`;
}

function formatBankName(name: string) {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function BankDetailsVerify({ bankDetails }: { bankDetails: BankDetailsReaponce }) {
  return (
    <div className="min-h-screen bg-background px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-[576px]">
        <div className="rounded-3xl border bg-card p-5 sm:p-6 shadow-sm">
          {/* HEADER */}
          <div className="text-center">
            <div
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full
                bg-green-100"
            >
              <ShieldCheck className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-foreground">Bank Details Verified</h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Your bank account details have been successfully verified. Please review the
              information before moving to the next step.
            </p>
          </div>

          {/* STATUS CARD */}
          <div className="mt-6 rounded-2xl border bg-green-50 p-4">
            <div className="flex items-start gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                  bg-green-100"
              >
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-green-700">Verification Successful</h2>

                <p className="mt-1 text-xs leading-5 text-green-700/80">
                  Bank verification status is marked as{" "}
                  <span className="font-semibold">{bankDetails.verificationStatus}</span>.
                </p>
              </div>
            </div>
          </div>

          {/* BANK DETAILS */}
          <div className="mt-6 space-y-3">
            <DetailItem
              icon={<UserRound className="h-5 w-5" />}
              label="Account Holder Name"
              value={bankDetails.accountHolderName}
            />

            <DetailItem
              icon={<CreditCard className="h-5 w-5" />}
              label="Account Number"
              value={maskAccountNumber(bankDetails.accountNumber)}
            />

            <DetailItem
              icon={<Banknote className="h-5 w-5" />}
              label="IFSC Code"
              value={bankDetails.ifscCode}
            />


          </div>

          {/* WARNING / NOTE */}
          {!bankDetails.isVerified && (
            <div className="mt-5 rounded-2xl bg-muted/50 p-4">
              <div className="flex items-start gap-3">
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                <p className="text-xs leading-5 text-muted-foreground">
                  Your bank verification response is completed, but user data status is{" "}
                  <span className="font-semibold text-foreground">
                    {bankDetails.userDataStatus}
                  </span>
                  . Please continue to complete the remaining verification steps.
                </p>
              </div>
            </div>
          )}

          <GradientButton
            onClick={() => (window.location.href = "/selfie-capture")}
            type="button"
            className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-home-purple to-home-purple-dark"
          >
            Next Step
          </GradientButton>
        </div>
      </div>
    </div>
  );
}

type DetailItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-background p-4">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10
          text-primary"
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 truncate text-sm font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
