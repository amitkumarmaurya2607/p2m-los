import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const points = [
  "No mountains of paperwork, just your Aadhaar and PAN.",
  "Funds disbursed in under 24 hours directly to your bank.",
  "Responsive customer support in your local language.",
  "Flexible repayment options tailored to your income cycle.",
];

const QuickEasySection = () => {
  return (
    <section className="w-full bg-surface px-5 py-16 font-[Inter] md:px-10 lg:px-0 lg:py-24">
      <div className="mx-auto grid max-w-[var(--max-width-section)] items-center gap-12 lg:grid-cols-2">
        {/* Left Image */}
        <div className="relative flex justify-center lg:block">
          <img
            src="/images/family.png"
            alt="Happy family"
            className="w-full max-w-[772px] object-contain "
          />

         <div className="absolute bottom-0 right-[8%] lg:right-6">
  {/* Ripple Rings */}
  <span className="absolute inset-0 rounded-full bg-secondary/30 animate-ping" />

  <span
    className="absolute inset-0 rounded-full bg-secondary/20 animate-ping"
    style={{
      animationDelay: "1s",
    }}
  />

  {/* Main Circle */}
  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-8 border-surface bg-secondary text-center text-[20px] font-bold leading-[25px] text-surface shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
    100%
    <br />
    Safe
  </div>
</div>
        </div>

        {/* Right Content */}
        <div className="lg:max-w-[576px]">
          <h2 className="text-[38px] font-extrabold leading-[48px] text-text-heading md:text-[48px] md:leading-[60px]">
            Quick, Easy & <br />
            <span className="text-secondary">Built for Real Life</span>
          </h2>

          <div className="mt-8 space-y-6">
            {points.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-muted pb-6 last:border-b-0"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Check size={20} strokeWidth={2} />
                </span>

                <p className="text-[16px] font-medium leading-7 text-text-body md:text-[18px]">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <Link href="/login" className="inline-flex items-center justify-center mt-3 h-[60px] rounded-full bg-primary px-[27px] text-[18px] font-bold text-primary-foreground shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition hover:scale-[1.02]">
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickEasySection;