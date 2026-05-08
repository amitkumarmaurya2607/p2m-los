import React from "react";
import {
  Zap,
  Smartphone,
  CalendarDays,
  Shield,
  Send,
  Percent,
} from "lucide-react";

const features = [
  {
    title: "Instant Approval",
    desc: "AI-driven algorithms assess and approve your limit within 60 seconds.",
    icon: Zap,
    color: "bg-[#FF9F1C]",
    glow: "bg-[#FF9F1C]/5",
    tall: true,
  },
  {
    title: "100% Digital",
    desc: "From onboarding to disbursal, everything happens on your smartphone.",
    icon: Smartphone,
    color: "bg-[#3737C1]",
    glow: "bg-[#3737C1]/5",
  },
  {
    title: "Flexible EMI",
    desc: "Choose a repayment schedule that perfectly fits your monthly budget.",
    icon: CalendarDays,
    color: "bg-[#00C89C]",
    glow: "bg-[#00C89C]/5",
    tall: true,
  },
  {
    title: "Secure Process",
    desc: "Bank-grade 256-bit encryption ensures your data stays completely private.",
    icon: Shield,
    color: "bg-[#0F172A]",
    glow: "bg-[#0F172A]/5",
  },
  {
    title: "Fast Transfer",
    desc: "Money hits your bank account instantly via IMPS/NEFT networks.",
    icon: Send,
    color: "bg-[#3737C1]",
    glow: "bg-[#3737C1]/5",
    tall: true,
  },
  {
    title: "Low Interest",
    desc: "Competitive rates starting from just 1% per month for premium profiles.",
    icon: Percent,
    color: "bg-[#00C89C]",
    glow: "bg-[#00C89C]/5",
  },
];

const WhyChoose = () => {
  return (
    <section className="bg-[#F8FAFC] px-5 py-16 font-[Inter] md:px-10 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[672px] text-center">
          <h2 className="text-[36px] font-black leading-tight tracking-[-1.2px] text-[#0F172A] md:text-[48px] md:leading-[48px]">
            Why Choose <span className="text-[#00C89C]">RinSetu</span>
          </h2>

          <p className="mt-6 text-[16px] leading-[26px] text-[#45556C] md:text-[18px] md:leading-[29px]">
            Built for modern India, designed to give you financial power without
            the traditional banking friction.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:gap-y-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {features.map((item, index) => (
            <FeatureCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  title,
  desc,
  icon: Icon,
  color,
  glow,
  tall,
  index,
}: any) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] border border-[#F1F5F9] bg-white p-8 shadow-[0px_8px_30px_rgba(0,0,0,0.04)] ${
        tall ? "lg:min-h-[287px]" : "lg:min-h-[240px]"
      } ${index === 1 ? "lg:mt-12" : ""} ${index === 4 ? "lg:-mt-12" : ""}`}
    >
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-[40px] ${glow}`}
      />

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] ${color}`}
      >
        <Icon size={24} strokeWidth={2} />
      </div>

      <h3 className="mt-8 text-[20px] font-bold leading-7 text-[#0F172A]">
        {title}
      </h3>

      <p className="mt-4 text-[14px] leading-[23px] text-[#45556C]">
        {desc}
      </p>
    </div>
  );
};

export default WhyChoose;