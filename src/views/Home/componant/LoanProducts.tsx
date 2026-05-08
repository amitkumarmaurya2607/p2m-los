import React from "react";
import { ArrowRight, Briefcase, UserRound, Zap, CircleAlert } from "lucide-react";
import Link from "next/link";

const loanProducts = [
  {
    title: "Personal Loan",
    desc: "Achieve your personal goals instantly.",
    limit: "Up to ₹5 Lakhs",
    bg: "bg-primary",
    text: "text-white",
    icon: UserRound,
    iconBox: "bg-white/20 text-white",
    image: "/images/coin.png",
  },
  {
    title: "Salary Advance",
    desc: "Get your salary early, interest-free.",
    limit: "Up to ₹1 Lakh",
    bg: "bg-secondary",
    text: "text-white",
    icon: Zap,
    iconBox: "bg-white/20 text-white",
    image: "/images/shield.png",
  },
  {
    title: "Business Loan",
    desc: "Scale your business without limits.",
    limit: "Up to ₹50 Lakhs",
    bg: "bg-surface border border-border-medium",
    text: "text-dark-navy",
    icon: Briefcase,
    iconBox: "bg-surface-accent text-primary",
    image: "/images/wallet.png",
  },
  {
    title: "Emergency Loan",
    desc: "Funds disbursed in 10 minutes flat.",
    limit: "Up to ₹2 Lakhs",
    bg: "bg-dark-navy",
    text: "text-white",
    icon: CircleAlert,
    iconBox: "bg-accent-orange/20 text-accent-orange",
    image: "/images/money-bag.png",

  },
];

const LoanProducts = () => {
  return (
    <section className="w-full bg-surface px-5 py-16 font-[Inter] md:px-10 lg:px-20 lg:py-[96px]">
      <div className="mx-auto max-w-[var(--max-width-section)]">
        <div className="mx-auto max-w-[var(--max-width-text)] text-center">
          <h2 className="text-[34px] font-black leading-tight tracking-[-1px] text-text-heading md:text-[48px] md:leading-[48px] md:tracking-[-1.2px]">
            A loan for{" "}
            <span className="text-secondary">every need</span>
          </h2>

          <p className="mt-6 text-[16px] leading-[26px] text-text-body md:text-[18px] md:leading-[29px]">
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

}: any) => {
  const isLight = text.includes("dark-navy");

  return (
   <div
  className={`group relative min-h-[280px] overflow-hidden rounded-[32px] p-8 shadow-[0px_20px_50px_rgba(15,23,42,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0px_30px_80px_rgba(15,23,42,0.18)] md:min-h-[320px] md:p-10 ${bg} ${text}`}
>
  {/* Glow */}
  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
  </div>

  {/* Floating image */}
  <img
    src={image}
    alt=""
    className={`absolute z-10 object-contain transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105 w-[112px] right-8 top-5" `}
  />

  {/* Icon */}
  <div
    className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${iconBox}`}
  >
    <Icon size={28} strokeWidth={2.3} />
  </div>

  {/* Content */}
  <div className="mt-6">
    <h3 className="text-[24px] font-bold leading-8 transition-all duration-300 group-hover:translate-x-1">
      {title}
    </h3>

    <p
      className={`mt-2 text-[14px] font-medium leading-5 transition-all duration-300 ${
        isLight ? "text-dark-navy/80" : "text-white/80"
      }`}
    >
      {desc}
    </p>
  </div>

  {/* Bottom */}
  <div
    className={`absolute bottom-10 left-8 right-8 flex items-center justify-between border-t pt-4 md:left-10 md:right-10 ${
      isLight ? "border-border-medium" : "border-white/10"
    }`}
  >
    <div>
      <p
        className={`text-[12px] font-semibold uppercase leading-4 tracking-[0.6px] ${
          isLight ? "text-dark-navy/60" : "text-white/60"
        }`}
      >
        Limit
      </p>

      <p className="mt-1 text-[20px] font-bold leading-7">{limit}</p>
    </div>

  <Link
  href="/login"
  className={`group/btn relative z-10 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border transition-all duration-500 ${
    isLight
      ? "border-border-medium bg-surface text-dark-navy hover:border-dark-navy"
      : "border-white/10 bg-white/10 text-white hover:border-white"
  }`}
>
  {/* Sliding Background */}
  <span
    className={`absolute inset-0 translate-y-full transition-transform duration-500 group-hover/btn:translate-y-0 ${
      isLight ? "bg-dark-navy" : "bg-surface"
    }`}
  />

  {/* Arrow */}
  <ArrowRight
    size={20}
    className={`relative z-10 transition-all duration-500 group-hover/btn:translate-x-1 ${
      isLight
        ? "group-hover/btn:text-white"
        : "group-hover/btn:text-dark-navy"
    }`}
  />

  {/* Pulse Ring */}
  <span
    className={`absolute inset-0 rounded-full opacity-0 transition-all duration-700 group-hover/btn:scale-150 group-hover/btn:opacity-20 ${
      isLight ? "bg-dark-navy" : "bg-surface"
    }`}
  />
</Link>
  </div>

  {/* ₹ Circle */}
  <div
    className={`absolute -bottom-6 -right-6 flex h-32 w-32 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110 ${
      isLight
        ? "bg-[#BABABA]/5 text-dark-navy/10"
        : "bg-white/5 text-white/10"
    }`}
  >
    <span className="text-[80px] font-semibold leading-none transition-transform duration-500 group-hover:rotate-12">
      ₹
    </span>
  </div>
</div>
  );
};

export default LoanProducts;