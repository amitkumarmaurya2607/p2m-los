"use client";

import React from "react";
import { CheckCircle, Clock3, FileText, Headphones, Info } from "lucide-react";

const docs = ["PAN Card", "Aadhaar Card", "Bank Statement", "Video KYC"];

const steps = [
  {
    title: "Application Submitted",
    desc: "15 Oct, 10:45 AM",
    status: "done",
  },
  {
    title: "Document Verification",
    desc: "Under manual review by our team",
    status: "active",
  },
  {
    title: "Credit Assessment",
    desc: "Pending",
    status: "pending",
  },
  {
    title: "Final Approval",
    desc: "Pending",
    status: "pending",
  },
  {
    title: "Disbursal",
    desc: "Pending",
    status: "pending",
  },
];

function TrackApplication() {
  return (
    <div className="w-full max-w-[1024px]">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="text-[36px] font-extrabold leading-10 tracking-[-0.9px] text-[#0F172B]">
            Track Application
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-[#FEF3C6] px-3 py-1 text-[12px] font-bold uppercase tracking-[1.2px] text-[#E17100]">
              In Progress
            </span>
            <span className="text-[16px] font-medium text-[#62748E]">ID: APP-9874-FX21</span>
          </div>
        </div>

        <button className="flex h-12 items-center gap-2 rounded-[16px] bg-[#3737C1]/10 px-6 text-[16px] font-bold text-[#3737C1]">
          <Headphones className="h-5 w-5" />
          Support
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[672px_320px]">
        <div className="rounded-[32px] border border-[#F1F5F9] bg-white px-[48px] py-[48px] shadow-[0px_32px_80px_-24px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-3">
            <Clock3 className="h-7 w-7 text-[#3737C1]" />
            <h2 className="text-[20px] font-bold text-[#0F172B]">Application Timeline</h2>
          </div>

          <div className="mt-8 border-l-2 border-[#E2E8F0] pl-8 space-y-12">
            {steps.map((step) => (
              <div key={step.title} className="relative">
                <span
                  className={`absolute -left-[43px] top-1 h-5 w-5 rounded-full border-4 ${
                    step.status === "done"
                      ? "border-[#00C89C]/20 bg-[#00C89C] shadow-[0px_0px_0px_4px_rgba(0,200,156,0.2)]"
                      : step.status === "active"
                        ? "border-[#3737C1]/20 bg-[#3737C1] shadow-[0px_0px_0px_4px_rgba(55,55,193,0.2)]"
                        : "border-white bg-[#CAD5E2]"
                  }`}
                />

                <h3
                  className={`text-[16px] font-bold leading-7 ${
                    step.status === "active"
                      ? "text-[#3737C1]"
                      : step.status === "pending"
                        ? "text-[#90A1B9]"
                        : "text-[#1D293D]"
                  }`}
                >
                  {step.title}
                </h3>

                {step.status === "active" ? (
                  <div className="mt-4 flex items-center gap-2 rounded-[14px] border border-[#F1F5F9] bg-[#F8FAFC] px-4 py-4 text-[16px] font-medium text-[#45556C]">
                    <Info className="h-4 w-4 text-[#3737C1]" />
                    {step.desc}
                  </div>
                ) : (
                  <p className="mt-2 text-[16px] font-medium text-[#62748E]">{step.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172B] to-[#1D293D] p-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-[40px]" />

            <div className="border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="h-6 w-2 rounded-full bg-[#00C89C]" />
                <h3 className="text-[20px] font-bold text-white">Loan Amount</h3>
              </div>
            </div>

            <h2 className="mt-7 text-[36px] font-extrabold tracking-[-0.9px] text-white">
              ₹5,00,000
            </h2>

            <p className="mt-2 text-[16px] font-medium text-[#90A1B9]">
              @ 10.5% p.a. for 36 months
            </p>

            <div className="mt-9 rounded-[16px] border border-[#3737C1]/50 bg-[#3737C1]/30 px-4 py-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.6px] text-[#CAD5E2]">
                Est. EMI
              </p>
              <p className="mt-1 text-[24px] font-extrabold text-[#00C89C]">
                ₹16,500 <span className="text-[14px] text-[#90A1B9]">/mo</span>
              </p>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#F1F5F9] bg-white p-8 shadow-[0px_16px_40px_-12px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#3737C1]" />
              <h3 className="text-[18px] font-bold text-[#0F172B]">Submitted Docs</h3>
            </div>

            <div className="mt-6 space-y-4">
              {docs.map((doc) => (
                <div
                  key={doc}
                  className="flex items-center justify-between rounded-[16px] border border-[#F1F5F9] bg-[#F8FAFC] px-4 py-4"
                >
                  <span className="text-[16px] font-semibold text-[#314158]">{doc}</span>
                  <CheckCircle className="h-5 w-5 text-[#00C89C]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackApplication;
