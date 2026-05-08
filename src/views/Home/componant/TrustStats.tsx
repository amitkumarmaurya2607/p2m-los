import React from "react";

const stats = [
  { value: "₹500Cr+", label: "Loans Disbursed", color: "text-[#00C89C]" },
  { value: "1L+", label: "Happy Customers", color: "text-[#3737C1]" },
  { value: "50+", label: "Cities Covered", color: "text-[#FF9F1C]" },
  { value: "4.9★", label: "App Rating", color: "text-[#0F172A]" },
];

const TrustStats = () => {
  return (
    <section className="bg-[#F1F5F9]/50 px-5 py-16 font-[Inter] md:px-10 lg:px-20">
      <div className="mx-auto max-w-[1232px] overflow-hidden rounded-[32px] border border-[#F1F5F9] bg-white shadow-[0px_20px_50px_rgba(0,0,0,0.03)]">
        <div className="relative grid gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-12 lg:py-[65px]">
          <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-[#3737C1]/5 blur-[64px]" />
          <div className="absolute -right-10 top-0 h-64 w-64 rounded-full bg-[#00C89C]/5 blur-[64px]" />

          {stats.map((item, index) => (
            <div
              key={item.label}
              className="relative flex flex-col items-center gap-2 text-center lg:border-r lg:border-[#E2E8F0] lg:last:border-r-0"
            >
              <h3
                className={`text-[44px] font-black leading-none drop-shadow-[0px_1px_4px_rgba(0,0,0,0.15)] md:text-[60px] ${item.color}`}
              >
                {item.value}
              </h3>

              <p className="text-[14px] font-semibold uppercase leading-5 tracking-[0.7px] text-[#62748E]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;