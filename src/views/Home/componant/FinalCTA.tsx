import React from "react";
import { ChevronRight, IndianRupee, ShieldCheck, Clock3 } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="bg-white px-5 py-16 font-[Inter] md:px-10 lg:px-[125px] lg:py-20">
      <div className="mx-auto max-w-[1143px] overflow-hidden rounded-[32px] bg-[#0F172A] px-6 py-16 text-center md:rounded-[48px] lg:relative lg:min-h-[462px] lg:px-20 lg:py-20">
        <div className="absolute right-[-180px] top-[-250px] hidden h-[500px] w-[500px] rounded-full bg-[#3737C1]/30 blur-[100px] lg:block" />
        <div className="absolute bottom-[-130px] left-[-100px] hidden h-[400px] w-[400px] rounded-full bg-[#00C89C]/20 blur-[80px] lg:block" />

        <div className="absolute left-[60px] top-[31px] hidden h-16 w-16 rotate-12 items-center justify-center rounded-2xl bg-[#FF9F1C] text-white shadow-xl lg:flex">
          <IndianRupee size={32} />
        </div>

        <div className="absolute right-[55px] top-[125px] hidden items-center gap-3 rounded-[14px] border border-white/20 bg-white/10 px-4 py-4 text-left lg:flex">
          <ShieldCheck size={24} className="text-[#00C89C]" />
          <div>
            <p className="text-[12px] leading-4 text-white/60">Fully Secure</p>
            <p className="text-[14px] font-bold leading-5 text-white">
              256-bit Encrypted
            </p>
          </div>
        </div>

        <div className="absolute -right-7 bottom-[55px] hidden h-14 w-14 items-center justify-center rounded-full bg-[#00C89C] text-white shadow-xl lg:flex">
          <Clock3 size={24} />
        </div>

        <div className="relative z-10 mx-auto max-w-[672px]">
          <h2 className="text-[40px] font-black leading-tight tracking-[-1px] text-white md:text-[60px] md:leading-[60px] md:tracking-[-1.5px]">
            Ready When You Are.
          </h2>

          <p className="mt-6 text-[16px] leading-7 text-[#CAD5E2] md:text-[18px] md:leading-[29px]">
            Experience the fastest loan origination system in India. Minimal
            documents, transparent terms, instant disbursal.
          </p>

          <button className="mx-auto mt-10 flex h-[68px] items-center justify-center gap-3 rounded-full bg-[#3737C1] px-10 text-[18px] font-bold text-white shadow-[0px_10px_30px_rgba(55,55,193,0.4)] transition hover:scale-[1.02]">
            Apply Now
            <ChevronRight size={20} />
          </button>

          <p className="mt-8 flex items-center justify-center gap-2 text-[14px] font-medium text-white/40">
            <span className="h-2 w-2 rounded-full bg-[#00C89C]" />
            Takes only 2 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;