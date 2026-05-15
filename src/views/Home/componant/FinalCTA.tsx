import React from "react";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#3737C1_0%,#3535BC_9.09%,#3232B7_18.18%,#3030B2_27.27%,#2E2EAD_36.36%,#2B2CA8_45.45%,#2929A3_54.55%,#27279E_63.64%,#252599_72.73%,#222395_81.82%,#202090_90.91%,#1E1E8B_100%)] px-5 py-16 font-[Inter] md:px-10 lg:px-20 lg:py-24">
      <div className="absolute -right-[220px] -top-[267px] h-[800px] w-[800px] rounded-full bg-[#00C89C]/20 opacity-50 blur-[64px]" />
      <div className="absolute -left-[156px] bottom-[-200px] h-[600px] w-[600px] rounded-full bg-[#FF8A00]/20 opacity-30 blur-[64px]" />

      <div className="relative mx-auto max-w-[1217px] rounded-[48px] border border-white/20 bg-white/10 px-8 py-12 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] md:px-14 lg:min-h-[492px] lg:px-[81px] lg:py-[81px]">
        <div className="max-w-[525px]">
          <h2 className="text-[42px] font-extrabold leading-[52px] text-white md:text-[60px] md:leading-[75px]">
            Ready to take the{" "}
            <span className="text-[#00C89C]">next big step?</span>
          </h2>

          <p className="mt-6 max-w-[512px] text-[18px] leading-7 text-white/80 md:text-[20px]">
            Join over 2 million Indians who have chosen RinSetu for their
            financial needs. Get approved in minutes.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href='/apply' className="flex h-[60px] items-center justify-center gap-2 rounded-[14px] border-2 border-[#00C89C] bg-[#00C89C] px-8 text-[16px] font-semibold text-white shadow-[0px_10px_15px_-3px_rgba(0,200,156,0.2),0px_4px_6px_-4px_rgba(0,200,156,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#00B88F]">
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link href='/apply' className="h-[60px] flex items-center justify-center rounded-[14px] border-2 border-white/30 px-8 text-[16px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
              Check Eligibility
            </Link>
          </div>
        </div>

        <div className="mt-12 flex justify-center lg:absolute lg:right-[82px] lg:top-[102px] lg:mt-0">
          <div className="relative">
            <div className="h-[240px] w-[240px] rounded-full border-[8px] border-white/20 p-2 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] md:h-[288px] md:w-[288px]">
              <Image
                src="/images/img1.png"
                alt="Happy user"
                width={240}
                height={240}
                className="h-full w-full rounded-full object-contain drop-shadow-[-2px_3px_14px_rgba(0,0,0,0.25)]"

              />
            </div>

            <div className="absolute -bottom-1 -left-12 flex h-[74px] w-[151px] items-center gap-3 rounded-2xl border border-[#F1F5F9] bg-white px-4 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C89C]/20">
                <Check className="h-5 w-5 text-[#00C89C]" />
              </div>

              <div>
                <p className="text-[14px] font-bold leading-5 text-[#0F172B]">
                  Approved
                </p>
                <p className="text-[12px] leading-4 text-[#62748E]">
                  ₹2,00,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;