import React from "react";
import { ArrowRight, Briefcase, UserRound, Zap, CircleAlert } from "lucide-react";

const loanProducts = [
  {
    title: "Personal Loan",
    desc: "Achieve your personal goals instantly.",
    limit: "Up to ₹5 Lakhs",
    bg: "bg-[#3737C1]",
    text: "text-white",
    icon: UserRound,
    iconBox: "bg-white/20 text-white",
    image: "/images/coin.png",
    imageClass: "w-[112px] right-10 -top-6",
  },
  {
    title: "Salary Advance",
    desc: "Get your salary early, interest-free.",
    limit: "Up to ₹1 Lakh",
    bg: "bg-[#00C89C]",
    text: "text-white",
    icon: Zap,
    iconBox: "bg-white/20 text-white",
    image: "/images/shield.png",
    imageClass: "w-[112px] right-8 top-5",
  },
  {
    title: "Business Loan",
    desc: "Scale your business without limits.",
    limit: "Up to ₹50 Lakhs",
    bg: "bg-white border border-[#E2E8F0]",
    text: "text-[#0F172A]",
    icon: Briefcase,
    iconBox: "bg-[#EEF2FF] text-[#3737C1]",
    image: "/images/wallet.png",
    imageClass: "w-[121px] right-6 top-5",
  },
  {
    title: "Emergency Loan",
    desc: "Funds disbursed in 10 minutes flat.",
    limit: "Up to ₹2 Lakhs",
    bg: "bg-[#0F172A]",
    text: "text-white",
    icon: CircleAlert,
    iconBox: "bg-[#FF9F1C]/20 text-[#FF9F1C]",
    image: "/images/money-bag.png",
    imageClass: "w-[97px] right-10 top-5",
  },
];

const LoanProducts = () => {
  return (
    <section className="w-full bg-white px-5 py-16 font-[Inter] md:px-10 lg:px-20 lg:py-[96px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[672px] text-center">
          <h2 className="text-[34px] font-black leading-tight tracking-[-1px] text-[#0F172A] md:text-[48px] md:leading-[48px] md:tracking-[-1.2px]">
            A loan for{" "}
            <span className="text-[#00C89C]">every need</span>
          </h2>

          <p className="mt-6 text-[16px] leading-[26px] text-[#45556C] md:text-[18px] md:leading-[29px]">
            Whether it's a dream wedding, scaling your business, or an
            unexpected emergency, RinSetu has you covered.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:gap-12">
          {loanProducts.map((item) => (
            <LoanCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const LoanCard = ({
  title,
  desc,
  limit,
  bg,
  text,
  icon: Icon,
  iconBox,
  image,
  imageClass,
}: any) => {
  const isLight = text.includes("#0F172A");

  return (
    <div
      className={`relative min-h-[280px] overflow-hidden rounded-[32px] p-8 shadow-[0px_20px_50px_rgba(15,23,42,0.1)] md:min-h-[320px] md:p-10 ${bg} ${text}`}
    >
      <img
        src={image}
        alt=""
        className={`absolute z-10 object-contain ${imageClass}`}
      />

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)] ${iconBox}`}
      >
        <Icon size={28} strokeWidth={2.3} />
      </div>

      <div className="mt-6">
        <h3 className="text-[24px] font-bold leading-8">{title}</h3>
        <p
          className={`mt-2 text-[14px] font-medium leading-5 ${
            isLight ? "text-[#0F172A]/80" : "text-white/80"
          }`}
        >
          {desc}
        </p>
      </div>

      <div
        className={`absolute bottom-10 left-8 right-8 flex items-center justify-between border-t pt-4 md:left-10 md:right-10 ${
          isLight ? "border-[#E2E8F0]" : "border-white/10"
        }`}
      >
        <div>
          <p
            className={`text-[12px] font-semibold uppercase leading-4 tracking-[0.6px] ${
              isLight ? "text-[#0F172A]/60" : "text-white/60"
            }`}
          >
            Limit
          </p>
          <p className="mt-1 text-[20px] font-bold leading-7">{limit}</p>
        </div>

        <button
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isLight ? "bg-[#F8FAFC] text-[#0F172A]" : "bg-white/10 text-white"
          }`}
        >
          <ArrowRight size={20} />
        </button>
      </div>

      <div
        className={`absolute -bottom-6 -right-6 flex h-32 w-32 items-center justify-center rounded-full ${
          isLight ? "bg-[#BABABA]/5 text-[#0F172A]/10" : "bg-white/5 text-white/10"
        }`}
      >
        <span className="text-[80px] font-semibold leading-none">₹</span>
      </div>
    </div>
  );
};

export default LoanProducts;