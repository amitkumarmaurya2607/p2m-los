"use client";

import React from "react";
import { Check, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectApplication } from "@/features/application/applicationSlice";

function AccountVerified() {
  const router = useRouter();
  const application = useAppSelector(selectApplication);
  const bankData = application.bankDetails;

  const maskedAccount = bankData?.accountNumber
    ? `XXXX XXXX ${bankData.accountNumber.slice(-4)}`
    : "XXXX XXXX XXXX";

  const ifsc = bankData?.ifsc || "N/A";
  const accountType = bankData?.accountType || "N/A";

  return (
    <div
      className="w-full max-w-[576px] rounded-[40px] border border-[#F1F5F9] bg-white/90 px-[64px]
        py-[64px] shadow-[0px_40px_100px_-24px_rgba(0,0,0,0.15)]"
    >
      <div
        className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r
          from-[#00C89C] to-[#00A882] shadow-[0px_0px_60px_rgba(0,200,156,0.6)]"
      >
        <Check className="h-14 w-14 text-white" strokeWidth={4} />
      </div>

      <h2
        className="mt-8 text-center text-[36px] font-extrabold leading-10 tracking-[-0.9px]
          text-[#0F172B]"
      >
        Bank Account Verified!
      </h2>

      <p className="mt-4 text-center text-[18px] font-medium leading-[29px] text-[#62748E]">
        Your bank account has been successfully verified. Proceed to the next step.
      </p>

      <div className="mt-10 rounded-[24px] border border-[#E2E8F0] bg-[#F8FAFC] px-6 py-6">
        <div className="space-y-4">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.6px] text-[#90A1B9]">
              Account Number
            </p>
            <p className="mt-1 font-mono text-[20px] font-bold text-[#1D293D]">{maskedAccount}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.6px] text-[#90A1B9]">
                IFSC Code
              </p>
              <p className="mt-1 font-mono text-[16px] font-bold text-[#1D293D]">{ifsc}</p>
            </div>

            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.6px] text-[#90A1B9]">
                Account Type
              </p>
              <p className="mt-1 text-[16px] font-bold capitalize text-[#1D293D]">{accountType}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <button
          type="button"
          onClick={() => router.push("/selfie-capture")}
          className="flex h-[92px] w-full items-center justify-center gap-3 rounded-[16px]
            bg-gradient-to-r from-[#3737C1] to-[#2B2B9A] px-5 text-[18px] font-bold text-white
            shadow-[0px_12px_24px_-8px_rgba(55,55,193,0.4)]"
        >
          Next Step
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default AccountVerified;
