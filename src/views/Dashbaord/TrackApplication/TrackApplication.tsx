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
          <h1 className="text-[36px] font-extrabold leading-10 tracking-[-0.9px] text-text-heading">
            Track Application
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <span
              className="rounded-full bg-[#FEF3C6] px-3 py-1 text-[12px] font-bold uppercase
                tracking-[1.2px] text-[#E17100]"
            >
              In Progress
            </span>
            <span className="text-[16px] font-medium text-text-muted-dark">ID: APP-9874-FX21</span>
          </div>
        </div>

        <button
          className="flex h-12 items-center gap-2 rounded-[16px] bg-home-purple/10 px-6 text-[16px]
            font-bold text-home-purple"
        >
          <Headphones className="h-5 w-5" />
          Support
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[672px_320px]">
        <div
          className="rounded-[32px] border border-border-light bg-white px-[48px] py-[48px]
            shadow-[0px_32px_80px_-24px_rgba(0,0,0,0.1)]"
        >
          <div className="flex items-center gap-3">
            <Clock3 className="h-7 w-7 text-home-purple" />
            <h2 className="text-[20px] font-bold text-text-heading">Application Timeline</h2>
          </div>

          <div className="mt-8 border-l-2 border-border-medium pl-8 space-y-12">
            {steps.map((step) => (
              <div key={step.title} className="relative">
                <span
                  className={`absolute -left-[43px] top-1 h-5 w-5 rounded-full border-4 ${
                    step.status === "done"
                      ? `border-home-green/20 bg-home-green
                        shadow-[0px_0px_0px_4px_rgba(0,200,156,0.2)]`
                      : step.status === "active"
                        ? `border-home-purple/20 bg-[#3737C1]
                          shadow-[0px_0px_0px_4px_rgba(55,55,193,0.2)]`
                        : "border-white bg-text-on-dark-muted"
                  }`}
                />

                <h3
                  className={`text-[16px] font-bold leading-7 ${
                    step.status === "active"
                      ? "text-home-purple"
                      : step.status === "pending"
                        ? "text-text-muted-light"
                        : "text-[#1D293D]"
                  }`}
                >
                  {step.title}
                </h3>

                {step.status === "active" ? (
                  <div
                    className="mt-4 flex items-center gap-2 rounded-[14px] border
                      border-border-light bg-surface-muted px-4 py-4 text-[16px] font-medium
                      text-text-body"
                  >
                    <Info className="h-4 w-4 text-home-purple" />
                    {step.desc}
                  </div>
                ) : (
                  <p className="mt-2 text-[16px] font-medium text-text-muted-dark">{step.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div
            className="relative overflow-hidden rounded-[32px] border border-white/10
              bg-gradient-to-br from-text-heading to-home-border-dark p-8
              shadow-[var(--shadow-dark-card)]"
          >
            <div
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-[40px]"
            />

            <div className="border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="h-6 w-2 rounded-full bg-home-green" />
                <h3 className="text-[20px] font-bold text-white">Loan Amount</h3>
              </div>
            </div>

            <h2 className="mt-7 text-[36px] font-extrabold tracking-[-0.9px] text-white">
              ₹5,00,000
            </h2>

            <p className="mt-2 text-[16px] font-medium text-text-muted-light">
              @ 10.5% p.a. for 36 months
            </p>

            <div
              className="mt-9 rounded-[16px] border border-home-purple/50 bg-home-purple/30 px-4
                py-4"
            >
              <p
                className="text-[12px] font-bold uppercase tracking-[0.6px] text-text-on-dark-muted"
              >
                Est. EMI
              </p>
              <p className="mt-1 text-[24px] font-extrabold text-home-green">
                ₹16,500 <span className="text-[14px] text-text-muted-light">/mo</span>
              </p>
            </div>
          </div>

          <div
            className="rounded-[32px] border border-border-light bg-white p-8
              shadow-[0px_16px_40px_-12px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-home-purple" />
              <h3 className="text-[18px] font-bold text-text-heading">Submitted Docs</h3>
            </div>

            <div className="mt-6 space-y-4">
              {docs.map((doc) => (
                <div
                  key={doc}
                  className="flex items-center justify-between rounded-[16px] border
                    border-border-light bg-surface-muted px-4 py-4"
                >
                  <span className="text-[16px] font-semibold text-text-dark-blue">{doc}</span>
                  <CheckCircle className="h-5 w-5 text-home-green" />
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
