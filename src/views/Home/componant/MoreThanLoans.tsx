import React from "react";
import {
  Activity,
  BellRing,
  Link2,
  Shield,
} from "lucide-react";

const tools = [
  {
    title: "Credit Health Tracking",
    description:
      "Monitor your CIBIL score and get actionable insights to improve it.",
    icon: Activity,
    bg: "bg-[#00C89C]",
    shadowIcon: "◜",
  },
  {
    title: "Smart Alerts",
    description:
      "Never miss an EMI with WhatsApp and SMS intelligent reminders.",
    icon: BellRing,
    bg: "bg-[#3737C1]",
    shadowIcon: "〰",
  },
  {
    title: "One-Click Mandate",
    description:
      "Setup auto-pay easily via NetBanking or Debit Card.",
    icon: Link2,
    bg: "bg-[#8B5CF6]",
    shadowIcon: "⊂⊃",
  },
  {
    title: "Data Privacy",
    description:
      "End-to-end encryption for all your personal and financial data.",
    icon: Shield,
    bg: "bg-[#0EA5E9]",
    shadowIcon: "🛡",
  },
];

const MoreThanLoans = () => {
  return (
    <section className="overflow-hidden bg-white px-5 py-20 md:px-8 lg:px-[35px] lg:pt-24 lg:pb-0">
      <div className="mx-auto flex max-w-[1371px] flex-col items-center gap-16 px-0 md:px-8">
        {/* Heading */}
        <div className="max-w-[672px] text-center">
          <h2 className="text-[38px] font-extrabold leading-[46px] tracking-[-1.2px] sm:text-[48px] sm:leading-[48px]">
            <span className="bg-[linear-gradient(90deg,#3737C1_0%,#3546C0_7.14%,#3252BF_14.29%,#305EBD_21.43%,#2D69BB_28.57%,#2A73B9_35.71%,#277DB7_42.86%,#2487B5_50%,#2091B2_57.14%,#1C9AB0_64.29%,#18A3AC_71.43%,#14ADA9_78.57%,#0EB6A5_85.71%,#07BFA1_92.86%,#00C89C_100%)] bg-clip-text text-transparent">
              More than just loans.
            </span>
          </h2>

          <p className="mt-4 text-[18px] leading-7 text-[#45556C]">
            Smart tools to help you manage your financial life better.
          </p>
        </div>

        {/* Cards */}
        <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <div
                key={index}
                className={`group relative min-h-[213px] overflow-hidden rounded-[32px] ${tool.bg} p-8 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0px_25px_50px_rgba(0,0,0,0.16)]`}
              >
                {/* Large Background Shape */}
                <div className="absolute bottom-[-30px] right-[-10px] text-[160px] font-black leading-none text-white/10 transition-all duration-500 group-hover:scale-110">
                  {tool.shadowIcon}
                </div>

                {/* Icon */}
                <div className="relative z-10">
                  <Icon
                    className="h-10 w-10 text-white opacity-90"
                    strokeWidth={2.6}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 mt-10">
                  <h3 className="text-[20px] font-bold leading-7 text-white">
                    {tool.title}
                  </h3>

                  <p className="mt-4 max-w-[222px] text-[14px] leading-[23px] text-white/80">
                    {tool.description}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoreThanLoans;