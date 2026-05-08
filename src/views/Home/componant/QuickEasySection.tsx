import React from "react";
import { Check } from "lucide-react";

const points = [
  "No mountains of paperwork, just your Aadhaar and PAN.",
  "Funds disbursed in under 24 hours directly to your bank.",
  "Responsive customer support in your local language.",
  "Flexible repayment options tailored to your income cycle.",
];

const QuickEasySection = () => {
  return (
    <section className="w-full bg-white px-5 py-16 font-[Inter] md:px-10 lg:px-0 lg:py-24">
      <div className="mx-auto grid max-w-[1217px] items-center gap-12 lg:grid-cols-2">
        {/* Left Image */}
        <div className="relative flex justify-center lg:block">
          <img
            src="/images/family.png"
            alt="Happy family"
            className="w-full max-w-[772px] object-contain lg:-ml-24"
          />

          <div className="absolute bottom-0 right-[8%] flex h-24 w-24 items-center justify-center rounded-full border-8 border-white bg-[#00C89C] text-center text-[20px] font-bold leading-[25px] text-white shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] lg:right-6">
            100%
            <br />
            Safe
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:max-w-[576px]">
          <h2 className="text-[38px] font-extrabold leading-[48px] text-[#0F172A] md:text-[48px] md:leading-[60px]">
            Quick, Easy & <br />
            <span className="text-[#00C89C]">Built for Real Life</span>
          </h2>

          <div className="mt-8 space-y-6">
            {points.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-[#F3F4F6] pb-6 last:border-b-0"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00C89C]/10 text-[#00C89C]">
                  <Check size={20} strokeWidth={2} />
                </span>

                <p className="text-[16px] font-medium leading-7 text-[#364153] md:text-[18px]">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <button className="mt-3 h-[60px] rounded-full bg-[#3737C1] px-[27px] text-[18px] font-bold text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition hover:scale-[1.02]">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickEasySection;