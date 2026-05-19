"use client";

import React, { useState } from "react";
import { Check, Copy, ExternalLink, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

function ApplicationSubmitted() {
  const router = useRouter();
  const applicationId = "APP-9874-FX21";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      className="w-full max-w-[576px] rounded-[40px] border border-border-light bg-white/90
        px-[64px] py-[64px] shadow-[0px_40px_100px_-24px_rgba(0,0,0,0.15)]"
    >
      <div
        className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r
          from-home-green to-home-green-dark shadow-[var(--shadow-green-glow)]"
      >
        <Check className="h-14 w-14 text-white" strokeWidth={4} />
      </div>

      <h2
        className="mt-8 text-center text-[36px] font-extrabold leading-10 tracking-[-0.9px]
          text-text-heading"
      >
        Application Submitted!
      </h2>

      <p className="mt-4 text-center text-[18px] font-medium leading-[29px] text-text-muted-dark">
        Your loan application is under review. We typically process approvals within 2 hours.
      </p>

      <div
        className="mt-10 rounded-[24px] border border-border-medium bg-surface-muted px-6 py-6
          text-center"
      >
        <p className="text-[12px] font-bold uppercase tracking-[0.6px] text-text-muted-light">
          Application ID
        </p>

        <div className="mt-2 flex items-center justify-center gap-2">
          <p className="font-mono text-[24px] font-bold leading-8 text-[#1D293D]">
            {applicationId}
          </p>

          <button type="button" onClick={handleCopy} className="rounded-xl p-2">
            <Copy className="h-5 w-5 text-home-purple" />
          </button>
        </div>

        {copied && <p className="mt-1 text-xs font-semibold text-home-green-dark">Copied</p>}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-[193px_1fr]">
        <button
          type="button"
          onClick={() => router.push("/track-status")}
          className="flex h-[92px] items-center justify-center gap-3 rounded-[16px] bg-gradient-to-r
            from-home-purple to-home-purple-dark px-5 text-[18px] font-bold text-white
            shadow-[var(--shadow-purple-button)]"
        >
          <ShieldCheck className="h-5 w-5" />
          Track Status
        </button>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="flex h-[92px] items-center justify-center gap-3 rounded-[16px] border-2
            border-border-medium bg-white px-6 text-[18px] font-bold text-text-dark-blue shadow-sm"
        >
          Go to Dashboard
          <ExternalLink className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default ApplicationSubmitted;
