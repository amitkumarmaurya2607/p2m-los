import React from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import InnkedIcon from "@/assets/icon/InnkedIcon";
import FacebookIcon from "@/assets/icon/FacebookIcon";
import InstagramIcon from "@/assets/icon/InstagramIcon";

const socials = [
  {
    name: "Twitter",
    desc: "Follow our latest updates & tips",
    icon: FacebookIcon,
    iconBox: "bg-[#1DA1F21A]",
    color: "#1DA1F2",
  },
  {
    name: "LinkedIn",
    desc: "Join our professional network",
    icon: InnkedIcon,
    iconBox: "bg-[#0A66C21A]",
    color: "#0A66C2",
  },
  {
    name: "Instagram",
    desc: "Behind the scenes & culture",
    icon: InstagramIcon,
    iconBox:
      "bg-[linear-gradient(45deg,#F58529_0%,#F27B3F_7.14%,#EF704E_14.29%,#EB655A_21.43%,#E85964_28.57%,#E44C6D_35.71%,#E13D74_42.86%,#DD2A7B_50%,#CF3184_57.14%,#C2358C_64.29%,#B53793_71.43%,#A8389B_78.57%,#9A38A2_85.71%,#8E37A8_92.86%,#8134AF_100%)]",
    color: "#FFFFFF",
  },
];

const Community = () => {
  return (
    <section className="border-y border-[#3737C11A] bg-[#EEF2FF] px-5 py-16 font-[Inter] md:px-10 lg:px-20 lg:py-[97px]">
      <div className="mx-auto max-w-[1280px] px-0 md:px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16">
          {/* Left */}
          <div className="w-full max-w-[584px]">
            <h2 className="text-[38px] font-extrabold leading-[48px] tracking-[-1.2px] text-black sm:text-[48px] sm:leading-[58px]">
              Join the growing <br />
              <span className="bg-[linear-gradient(90deg,#3737C1_0%,#3546C0_7.14%,#3252BF_14.29%,#305EBD_21.43%,#2D69BB_28.57%,#2A73B9_35.71%,#277DB7_42.86%,#2487B5_50%,#2091B2_57.14%,#1C9AB0_64.29%,#18A3AC_71.43%,#14ADA9_78.57%,#0EB6A5_85.71%,#07BFA1_92.86%,#00C89C_100%)] bg-clip-text text-transparent">
                RinSetu Community
              </span>
            </h2>

            <div className="mt-7 flex flex-col gap-5">
              {socials.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.name}
                    className="group flex min-h-[106px] items-center justify-between rounded-2xl border border-[#F1F5F9] bg-white p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_14px_30px_rgba(15,23,42,0.12)]"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-[14px] ${item.iconBox}`}
                      >
                        <Icon
                          size={28}
                          color={item.color}
                        />
                      </div>

                      <div>
                        <h4 className="text-[18px] font-bold leading-7 text-[#0F172A]">
                          {item.name}
                        </h4>

                        <p className="text-[14px] leading-5 text-[#62748E]">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight className="h-6 w-6 text-[#CAD5E2] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#3737C1]" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <div className="relative w-full max-w-[584px]">
            <div className="absolute -left-[10px] -top-[15px] h-full w-full rotate-3 rounded-[40px] bg-[#3737C1] opacity-10" />

            <div className="relative rounded-[40px] bg-[#0F172A] p-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3737C1]">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>

              <h3 className="mt-8 max-w-[504px] text-[24px] font-bold leading-[34px] text-white sm:text-[30px] sm:leading-[38px]">
                "RinSetu's community events taught me how to properly manage
                debt and build credit."
              </h3>

              <div className="mt-9 flex flex-col gap-5 border-t border-[#1D293D] pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="/rahul-verma.jpg"
                    alt="Rahul Verma"
                    className="h-14 w-14 rounded-full border-2 border-[#00C89C] object-cover"
                  />

                  <div>
                    <p className="text-base font-bold text-white">
                      Rahul Verma
                    </p>

                    <p className="text-sm text-[#90A1B9]">
                      Member since 2023
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  Super User
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;