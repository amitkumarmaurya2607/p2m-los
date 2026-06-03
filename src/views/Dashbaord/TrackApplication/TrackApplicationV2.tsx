"use client";

import React from "react";
import Link from "next/link";
import { Clock3, Headphones, Shield, BadgeCheck, Activity, User } from "lucide-react";
import StepCard from "../componants/StepCard";
import PulseDot from "@/components/PulseDot";

const timeline = [
  {
    title: "Application Submitted",
    desc: "15 Oct, 10:45 AM",
    status: "done" as const,
  },
  {
    title: "Document Verification",
    desc: "Under manual review by our team",
    status: "active" as const,
  },
  {
    title: "Credit Assessment",
    desc: "Pending",
    status: "pending" as const,
  },
  {
    title: "Final Approval",
    desc: "Pending",
    status: "pending" as const,
  },
  {
    title: "Disbursal",
    desc: "Pending",
    status: "pending" as const,
  },
];

const statusColors = {
  done: {
    dot: "border-home-green/20 bg-home-green shadow-[0px_0px_0px_4px_rgba(0,200,156,0.2)]",
    text: "text-home-green",
    line: "bg-home-green",
  },
  active: {
    dot: "border-home-purple/20 bg-[#3737C1] shadow-[0px_0px_0px_4px_rgba(55,55,193,0.2)]",
    text: "text-home-purple",
    line: "bg-home-purple/30",
  },
  pending: {
    dot: "border-white bg-text-on-dark-muted",
    text: "text-text-muted-light",
    line: "bg-border-medium",
  },
};

const SectionCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-border-light bg-surface p-5 space-y-4">
    <div className="flex items-center gap-2">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-muted
          text-primary"
      >
        {icon}
      </div>
      <h3 className="text-base font-bold text-text-heading">{title}</h3>
    </div>
    {children}
  </div>
);

const TimelineItem = ({ step, isLast }: { step: (typeof timeline)[number]; isLast: boolean }) => {
  const colors = statusColors[step.status];

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`h-5 w-5 rounded-full border-4 ${colors.dot}`} />
        {!isLast && <div className={`mt-1 w-0.5 flex-1 ${colors.line}`} />}
      </div>
      <div className="pb-8 flex-1">
        <h4 className={`text-sm font-bold ${colors.text}`}>{step.title}</h4>
        {step.status === "active" ? (
          <div
            className="mt-2 flex items-center gap-2 rounded-xl border border-border-light
              bg-surface-muted px-4 py-3 text-sm font-medium text-text-body"
          >
            <Shield className="h-4 w-4 text-home-purple shrink-0" />
            {step.desc}
          </div>
        ) : (
          <p className="mt-1 text-sm font-medium text-text-muted-dark">{step.desc}</p>
        )}
      </div>
    </div>
  );
};

function TrackApplicationV2() {
  return (
    <StepCard
      title="Track Application"
      subtitle="Monitor the progress of your loan application in real-time"
      className="lg:w-[800px] mx-auto"
      icon={<Activity className="w-5 h-5 text-primary" />}
      tips={{
        title: "Application Tracking",
        description:
          "Track your loan application status, view submitted documents, and stay updated on each stage of the process.",
        Icon: <BadgeCheck className="w-5 h-5 text-primary" />,
        noteTitle: "What to Expect",
        noteDescription: (
          <ul className="space-y-2 text-sm leading-6">
            <li className="flex items-start gap-2">
              <PulseDot />
              Application review typically takes 24-48 hours
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              You will be notified via SMS and email on each update
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              Contact support if you have any questions
            </li>
          </ul>
        ),
        NoteIcon: BadgeCheck,
      }}
    >
      <div className="space-y-6">
        <div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-text-heading
            to-home-border-dark p-6 shadow-card"
        >
          <div className="absolute -right-2 -top-10 h-32 w-32 rounded-full bg-white/5 blur-[40px]" />
          <div className="flex items-center justify-between">
            <div>
              <span
                className="rounded-full bg-[#FEF3C6] px-3 py-1 text-[11px] font-bold uppercase
                  tracking-[1px] text-[#E17100]"
              >
                In Progress
              </span>
              <p className="mt-2 text-xs font-medium text-text-on-dark-muted">ID: APP-9874-FX21</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-white/10 px-4
                  text-sm font-bold text-white"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <button
                className="flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-white/10 px-4
                  text-sm font-bold text-white"
              >
                <Headphones className="h-4 w-4" />
                Support
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-on-dark-muted">
                Loan Amount
              </p>
              <p className="text-2xl font-extrabold text-white">₹5,00,000</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-on-dark-muted">
                Est. EMI
              </p>
              <p className="text-xl font-extrabold text-home-green">
                ₹16,500 <span className="text-xs text-text-muted-light">/mo</span>
              </p>
            </div>
          </div>
        </div>

        <SectionCard title="Application Timeline" icon={<Clock3 className="w-4 h-4" />}>
          {timeline.map((step, i) => (
            <TimelineItem key={step.title} step={step} isLast={i === timeline.length - 1} />
          ))}
        </SectionCard>

        {/* <SectionCard title="Submitted Documents" icon={<FileText className="w-4 h-4" />}>
          <div className="space-y-3">
            {docs.map((doc) => (
              <div
                key={doc}
                className="flex items-center justify-between rounded-xl border border-border-light bg-surface-muted px-4 py-3"
              >
                <span className="text-sm font-semibold text-text-dark-blue">{doc}</span>
                <CheckCircle className="h-5 w-5 text-home-green shrink-0" />
              </div>
            ))}
          </div>
        </SectionCard> */}
      </div>
    </StepCard>
  );
}

export default TrackApplicationV2;
