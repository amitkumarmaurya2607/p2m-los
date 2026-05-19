import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const points = [
  "No mountains of paperwork, just your Aadhaar and PAN.",
  "Funds disbursed in under 24 hours directly to your bank.",
  "Responsive customer support in your local language.",
  "Flexible repayment options tailored to your income cycle.",
];

const QuickEasySection = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-14 sm:px-6 lg:px-0 lg:py-24">
      <div
        className="mx-auto flex max-w-[1257px] flex-col items-center gap-12 lg:flex-row
          lg:justify-between"
      >
        {/* Left Image */}
        <div className="relative w-full max-w-[690px]">
          <Image
            src="/images/family.png"
            alt="Happy family with loan approval"
            width={633}
            height={417}
            className="relative z-10 w-full h-auto max-w-[800px] object-contain
              drop-shadow-[-2px_3px_14px_rgba(0,0,0,0.25)]"
          />

          <div
            className="absolute bottom-[70px] right-[10px] z-20 flex h-24 w-24 items-center
              justify-center rounded-full border-[8px] border-white bg-home-green text-center
              text-[20px] font-bold leading-[25px] text-white shadow-[var(--shadow-card)]
              sm:right-[30px]"
          >
            {/* Small Ripple */}
            <span
              className="absolute inset-[-6px] rounded-full border-2 border-home-green/35
                animate-ping"
            />

            <span className="relative z-10">
              100%
              <br />
              Safe
            </span>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full max-w-[576px]">
          <h2
            className="text-[38px] font-extrabold leading-[48px] text-dark-navy sm:text-[48px]
              sm:leading-[60px]"
          >
            Quick, Easy & <br />
            <span className="text-home-green">Built for Real Life</span>
          </h2>

          <div className="mt-9 flex flex-col gap-6">
            {points.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-muted pb-6 last:border-b-0"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                    bg-home-green
                    shadow-[0px_5.33391px_8.00087px_-1.33348px_rgba(0,0,0,0.1),0px_2.66696px_5.33391px_-2.66696px_rgba(0,0,0,0.1)]"
                >
                  <Check className="h-[21px] w-[21px] text-white" />
                </div>

                <p className="text-[16px] font-medium leading-7 text-home-text-dark sm:text-[18px]">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/apply"
            className="mt-8 h-[60px] inline-flex items-center justify-center rounded-full
              bg-home-purple px-7 text-[18px] font-bold text-white shadow-[var(--shadow-btn-soft)]
              transition-all duration-300 hover:-translate-y-1 hover:bg-home-purple/90
              hover:shadow-[0px_16px_30px_rgba(55,55,193,0.35)]"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickEasySection;
