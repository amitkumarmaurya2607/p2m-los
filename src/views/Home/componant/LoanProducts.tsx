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
    <section className="w-full overflow-hidden bg-[linear-gradient(180deg,#F8FAFC_0%,#FAFCFD_33.33%,#FDFDFE_66.67%,#FFFFFF_100%)] px-4 py-14 sm:px-6 lg:px-20 lg:py-24">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 lg:gap-16">
        {/* Heading */}
        <div className="max-w-[760px]">
          <h2 className="text-[34px] font-extrabold leading-[40px] tracking-[-1px] text-[#0F172A] sm:text-[42px] sm:leading-[48px] lg:text-[48px]">
            Loans designed for{" "}
            <span className="bg-[linear-gradient(90deg,#1998B6_0%,#00C89C_100%)] bg-clip-text text-transparent">
              Modern India
            </span>
          </h2>

          <p className="mt-6 max-w-[672px] text-[16px] leading-7 text-[#45556C] sm:text-[18px]">
            Premium financial products tailored for your needs. Fast approvals,
            transparent terms, and complete digital convenience.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[612px_600px]">
          {/* Left Big Card */}
          <div className="group relative min-h-[556px] overflow-hidden rounded-[32px] border border-[#1D293D] bg-[#0F172A] p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0px_30px_60px_rgba(15,23,42,0.35)]">
            {/* Glow */}
            <div className="absolute right-10 top-7 h-[320px] w-[320px] rounded-full bg-[linear-gradient(135deg,#EEF2FF_0%,rgba(55,55,193,0.1)_100%)] opacity-[0.09] blur-[64px] transition-all duration-700 group-hover:scale-125 group-hover:opacity-20" />

            {/* Top */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#3737C14D] bg-[#3737C133] transition-all duration-300 group-hover:scale-110 group-hover:border-[#00C89C66]">
                <WalletCards className="h-8 w-8 text-[#00C89C]" />
              </div>

              <div className="flex h-8 items-center gap-2 rounded-full bg-[#00C89C] px-4 text-sm font-bold text-[#0F172A] transition-all duration-300 group-hover:scale-105">
                <span className="h-2 w-2 rounded-full bg-[#0F172A]" />
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
            <div className="absolute bottom-10 left-10 right-10 z-20 pt-8 pb-5  flex h-[110px] items-center justify-between rounded-[10px] border border-white/30 bg-[linear-gradient(90deg,#3737C1_0%,#3535BC_12.5%,#3434B7_25%,#3232B2_37.5%,#3131AD_50%,#2F2FA8_62.5%,#2E2EA4_75%,#2C2C9F_87.5%,#2B2B9A_100%)] px-[30px] shadow-[0px_10px_30px_rgba(0,0,0,0.3),inset_0px_-2px_0px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:border-[#00C89C55]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.7px] text-white">
                  Loan Amount
                </p>

                <p className="mt-1 text-2xl font-bold leading-8 text-white">
                  Up to ₹5 Lakhs
                </p>
              </div>

              <Link href={'/apply'}  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00C89C] transition-all duration-300 hover:scale-110 hover:rotate-45 hover:bg-[#00ddb0]">
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
                  className="group flex min-h-[266px] flex-col justify-between rounded-3xl border border-[#314158] bg-[#1E293B] p-8 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:border-[#00C89C66] hover:shadow-[0px_25px_50px_rgba(0,200,156,0.18)]"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#314158] bg-[#1D293D] transition-all duration-300 group-hover:scale-110 group-hover:border-[#00C89C66] group-hover:bg-[#00C89C14]">
                      <Icon className="h-6 w-6 text-[#00C89C]" />
                    </div>

                    <span className="rounded-full bg-[#FF8A001A] px-3 py-1 text-xs font-bold text-[#FF8A00] transition-all duration-300 group-hover:bg-[#FF8A0030]">
                      {item.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold leading-7 text-white transition-all duration-300 group-hover:text-[#00C89C]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-5 text-[#90A1B9]">
                      {item.desc}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-sm font-bold text-[#00C89C]">
                        {item.amount}
                      </p>

                    <Link href={'/apply'} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C89C] transition-all duration-300 hover:scale-110 hover:bg-[#00ddb0]">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Contact Card */}
            <div className="group flex min-h-[266px] flex-col items-center justify-center rounded-3xl border border-[#3737C133] bg-[#EEF2FF] p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#3737C166] hover:shadow-[0px_25px_50px_rgba(55,55,193,0.12)]">
              <h3 className="text-lg font-bold leading-7 text-[#3737C1] transition-all duration-300 group-hover:scale-105">
                Need a custom plan?
              </h3>

              <p className="mt-2 text-sm leading-5 text-[#45556C]">
                Talk to our financial advisors today.
              </p>

              <Link href={'/contact'} className="mt-5 border-b-2 border-[#0F172A] pb-1 text-base font-semibold text-[#0F172A] transition-all duration-300 hover:border-[#3737C1] hover:text-[#3737C1]">
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