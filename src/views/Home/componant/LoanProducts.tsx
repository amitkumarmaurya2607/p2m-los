import React from "react";
import {
  WalletCards,
  HeartPulse,
  Building2,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const loanCards = [
  {
    title: "Salary Advance",
    desc: "Get your salary early at zero interest for 15 days.",
    amount: "Up to ₹1 Lakh",
    tag: "Instant",
    icon: HeartPulse,
  },
  {
    title: "Business Loan",
    desc: "Scale your startup or MSME with collateral-free capital.",
    amount: "Up to ₹20 Lakhs",
    tag: "Growth",
    icon: Building2,
  },
  {
    title: "Emergency Loan",
    desc: "Medical or family emergencies covered within 10 minutes.",
    amount: "Up to ₹50,000",
    tag: "24/7 Fast",
    icon: BriefcaseBusiness,
  },
];

const LoanProducts = () => {
  return (
    <section className="w-full overflow-hidden bg-surface-muted px-4 py-14 sm:px-6 lg:px-20 lg:py-24">
      <div className="mx-auto flex max-w-[var(--max-width-section)] flex-col gap-12 lg:gap-16">
        {/* Heading */}
        <div className="max-w-[760px]">
          <h2 className="text-[34px] font-extrabold leading-[40px] tracking-[-1px] text-dark-navy sm:text-[42px] sm:leading-[48px] lg:text-[48px]">
            Loans designed for{" "}
            <span className="bg-gradient-to-r from-home-gradient-teal to-home-green bg-clip-text text-transparent">
              Modern India
            </span>
          </h2>

          <p className="mt-6 max-w-[var(--max-width-text)] text-[16px] leading-7 text-text-body sm:text-[18px]">
            Premium financial products tailored for your needs. Fast approvals,
            transparent terms, and complete digital convenience.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[612px_600px]">
          {/* Left Big Card */}
          <div className="group relative min-h-[556px] overflow-hidden rounded-[32px] border border-home-border-dark bg-dark-navy p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0px_30px_60px_rgba(15,23,42,0.35)]">
            {/* Glow */}
            <div className="absolute right-10 top-7 h-[320px] w-[320px] rounded-full bg-gradient-to-br from-surface-accent to-home-purple/10 opacity-[0.09] blur-[64px] transition-all duration-700 group-hover:scale-125 group-hover:opacity-20" />

            {/* Top */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-home-purple/30 bg-home-purple/20 transition-all duration-300 group-hover:scale-110 group-hover:border-home-green/40">
                <WalletCards className="h-8 w-8 text-home-green" />
              </div>

              <div className="flex h-8 items-center gap-2 rounded-full bg-home-green px-4 text-sm font-bold text-dark-navy transition-all duration-300 group-hover:scale-105">
                <span className="h-2 w-2 rounded-full bg-dark-navy" />
                Most Popular
              </div>
            </div>

            {/* Text */}
            <div className="relative z-10 mt-[105px] max-w-[247px]">
              <h3 className="text-[42px] font-bold leading-[45px] text-white">
                Personal <br /> Loan
              </h3>

              <p className="mt-3 text-[20px] font-medium leading-6 text-white">
                Achieve your personal goals instantly.
              </p>
            </div>

            {/* Image */}
            <Image
              width={220}
              height={270}
              src="/images/img1.png"
              alt="Loan Approved"
              className="absolute bottom-[148px] right-[30px] z-10 hidden w-[220px] h-auto transition-all duration-500 group-hover:scale-105 lg:block"
            />

            {/* Bottom CTA */}
            <div className="absolute bottom-10 left-10 right-10 z-20 pt-8 pb-5  flex h-[110px] items-center justify-between rounded-[10px] border border-white/30 bg-home-purple px-[30px] shadow-[var(--card-icon-shadow)] transition-all duration-300 group-hover:border-home-green/35">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.7px] text-white">
                  Loan Amount
                </p>

                <p className="mt-1 text-2xl font-bold leading-8 text-white">
                  Up to ₹5 Lakhs
                </p>
              </div>

              <Link href={'/apply'}  className="flex h-14 w-14 items-center justify-center rounded-full bg-home-green transition-all duration-300 hover:scale-110 hover:rotate-45 hover:bg-home-green/90">
                <ArrowRight className="h-6 w-6 text-white" />
              </Link>
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {loanCards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group flex min-h-[266px] flex-col justify-between rounded-3xl border border-home-border-card bg-home-bg-card-dark p-8 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-2 hover:border-home-green/40 hover:shadow-[0px_25px_50px_rgba(0,200,156,0.18)]"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-home-border-card bg-home-border-dark transition-all duration-300 group-hover:scale-110 group-hover:border-home-green/40 group-hover:bg-home-green/10">
                      <Icon className="h-6 w-6 text-home-green" />
                    </div>

                    <span className="rounded-full bg-home-orange-badge/10 px-3 py-1 text-xs font-bold text-home-orange-badge transition-all duration-300 group-hover:bg-home-orange-badge/20">
                      {item.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold leading-7 text-white transition-all duration-300 group-hover:text-home-green">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-5 text-text-muted-light">{item.desc}</p>

                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-sm font-bold text-home-green">{item.amount}</p>

                    <Link href={'/apply'} className="flex h-10 w-10 items-center justify-center rounded-full bg-home-green transition-all duration-300 hover:scale-110 hover:bg-home-green/90">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Contact Card */}
            <div className="group flex min-h-[266px] flex-col items-center justify-center rounded-3xl border border-home-purple/20 bg-surface-accent p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-home-purple/40 hover:shadow-[0px_25px_50px_rgba(55,55,193,0.12)]">
              <h3 className="text-lg font-bold leading-7 text-home-purple transition-all duration-300 group-hover:scale-105">
                Need a custom plan?
              </h3>

              <p className="mt-2 text-sm leading-5 text-text-body">
                Talk to our financial advisors today.
              </p>

              <Link href={'/contact'} className="mt-5 border-b-2 border-dark-navy pb-1 text-base font-semibold text-dark-navy transition-all duration-300 hover:border-home-purple hover:text-home-purple">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanProducts;