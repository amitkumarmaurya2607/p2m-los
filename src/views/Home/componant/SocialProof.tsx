import React from "react";
import {

  Star,
} from "lucide-react";

const socials = [
  {
    title: "Instagram",
    subTitle: "@rinsetu_hq",
    meta: "150K+",
    icon: Star,
    cardBg: "bg-[#F6339A]/10",
    iconBg: "bg-[#FDF2F8]",
    color: "text-[#F6339A]",
  },
  {
    title: "LinkedIn",
    subTitle: "RinSetu Finance",
    meta: "85K+",
    icon: Star,
    cardBg: "bg-[#155DFC]/10",
    iconBg: "bg-[#EFF6FF]",
    color: "text-[#155DFC]",
  },
  {
    title: "Facebook",
    subTitle: "RinSetuIndia",
    meta: "200K+",
    icon: Star,
    cardBg: "bg-[#4F39F6]/10",
    iconBg: "bg-[#EEF2FF]",
    color: "text-[#4F39F6]",
  },
  {
    title: "Google",
    subTitle: "Verified Business",
    meta: "4.9/5 Rating",
    icon: Star,
    cardBg: "bg-[#F0B100]/10",
    iconBg: "bg-[#FEFCE8]",
    color: "text-[#F0B100]",
    fill: true,
  },
];

const SocialProof = () => {
  return (
    <section className="border-b border-[#F1F5F9] bg-white px-5 py-16 font-[Inter] md:px-10 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center">
          <h2 className="text-[32px] font-black leading-10 text-[#0F172A] md:text-[36px]">
            Join our <span className="text-[#00C89C]">community</span>
          </h2>
          <p className="mt-4 text-[16px] leading-6 text-[#62748E]">
            Connect with us on your favorite platforms
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {socials.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`rounded-[24px] border border-[#F1F5F9] p-6 shadow-[0px_10px_40px_rgba(0,0,0,0.03)] transition hover:-translate-y-1 ${item.cardBg}`}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg}`}
                >
                  <Icon
                    size={28}
                    strokeWidth={2.3}
                    className={item.color}
                    fill={item.fill ? "currentColor" : "none"}
                  />
                </div>

                <h4 className="mt-6 text-[20px] font-bold leading-7 text-[#0F172A]">
                  {item.title}
                </h4>
                <p className="mt-1 text-[14px] font-semibold leading-5 text-[#62748E]">
                  {item.subTitle}
                </p>
                <p className="mt-1 text-[12px] leading-4 text-[#90A1B9]">
                  {item.meta}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;