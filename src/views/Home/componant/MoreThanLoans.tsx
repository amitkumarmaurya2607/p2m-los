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
        bg: "bg-home-green",
        shadowIcon: "◜",
    },
    {
        title: "Smart Alerts",
        description:
            "Never miss an EMI with WhatsApp and SMS intelligent reminders.",
        icon: BellRing,
        bg: "bg-home-purple",
        shadowIcon: "〰",
    },
    {
        title: "One-Click Mandate",
        description:
            "Setup auto-pay easily via NetBanking or Debit Card.",
        icon: Link2,
        bg: "bg-home-card-violet",
        shadowIcon: "⊂⊃",
    },
    {
        title: "Data Privacy",
        description:
            "End-to-end encryption for all your personal and financial data.",
        icon: Shield,
        bg: "bg-home-card-sky",
        shadowIcon: "🛡",
    },
];

const MoreThanLoans = () => {
    return (
        <section className="overflow-hidden bg-white px-5 py-20 md:px-8 lg:px-[35px] lg:pt-24 ">
            <div className="mx-auto flex max-w-[1371px] flex-col items-center gap-16 px-0 md:px-8">
                {/* Heading */}
                <div className="max-w-[672px] text-center">
                    <h2 className="text-[38px] font-extrabold leading-[46px] tracking-[-1.2px] sm:text-[48px] sm:leading-[48px]">
                        <span className="bg-gradient-to-r from-home-purple to-home-green bg-clip-text text-transparent">
                            More than just loans.
                        </span>
                    </h2>

                    <p className="mt-4 text-[18px] leading-7 text-text-body">
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