import React from "react";

import InnkedIcon from "@/assets/icon/InnkedIcon";
import FacebookIcon from "@/assets/icon/FacebookIcon";
import StarIcon from "@/assets/icon/StarIcon";
import InstagramIcon from "@/assets/icon/InstagramIcon";

const socials = [
  {
    title: "Instagram",
    subTitle: "@rinsetu_hq",
    meta: "150K+",
    icon: InstagramIcon,
    cardBg: "bg-[#F6339A]/10",
    iconBg: "bg-[#FDF2F8]",
    color: "#F6339A",
  },
  {
    title: "LinkedIn",
    subTitle: "RinSetu Finance",
    meta: "85K+",
    icon: InnkedIcon,
    cardBg: "bg-[#155DFC]/10",
    iconBg: "bg-[#EFF6FF]",
    color: "#155DFC",
  },
  {
    title: "Facebook",
    subTitle: "RinSetuIndia",
    meta: "200K+",
    icon: FacebookIcon,
    cardBg: "bg-[#4F39F6]/10",
    iconBg: "bg-surface-accent",
    color: "#4F39F6",
  },
  {
    title: "Google",
    subTitle: "Verified Business",
    meta: "4.9/5 Rating",
    icon: StarIcon,
    cardBg: "bg-[#F0B100]/10",
    iconBg: "bg-[#FEFCE8]",
    color: "#F0B100",
    fill: true,
  },
];

const SocialProof = () => {
  return (
    <section className="border-b border-border-light bg-surface px-5 py-16 font-[Inter] md:px-10 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-[var(--max-width-section)]">
        <div className="text-center">
          <h2 className="text-[32px] font-black leading-10 text-text-heading md:text-[36px]">
            Join our <span className="text-secondary">community</span>
          </h2>
          <p className="mt-4 text-[16px] leading-6 text-text-muted-dark">
            Connect with us on your favorite platforms
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {socials.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`rounded-[24px] border border-border-light p-6 shadow-[0px_10px_40px_rgba(0,0,0,0.03)] transition hover:-translate-y-1 ${item.cardBg}`}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg}`}
                >
                  <Icon
                    size={28}
                    color={item.color}
                  />
                </div>

                <h4 className="mt-6 text-[20px] font-bold leading-7 text-text-heading">
                  {item.title}
                </h4>
                <p className="mt-1 text-[14px] font-semibold leading-5 text-text-muted-dark">
                  {item.subTitle}
                </p>
                <p className="mt-1 text-[12px] leading-4 text-text-muted-light">
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