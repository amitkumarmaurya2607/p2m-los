import React from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import InnkedIcon from "@/assets/icon/InnkedIcon";
import FacebookIcon from "@/assets/icon/FacebookIcon";
import InstagramIcon from "@/assets/icon/InstagramIcon";
import Image from "next/image";

const socials = [
  {
    name: "Twitter",
    desc: "Follow our latest updates & tips",
    icon: FacebookIcon,
    iconBox: "bg-home-social-twitter/10",
    color: "var(--home-social-twitter)",
  },
  {
    name: "LinkedIn",
    desc: "Join our professional network",
    icon: InnkedIcon,
    iconBox: "bg-home-social-linkedin/10",
    color: "var(--home-social-linkedin)",
  },
  {
    name: "Instagram",
    desc: "Behind the scenes & culture",
    icon: InstagramIcon,
    iconBox: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    color: "white",
  },
];

const Community = () => {
  return (
    <section
      className="border-y border-home-purple/10 bg-surface-accent px-5 py-16 font-[Inter] md:px-10
        lg:px-20 lg:py-[97px]"
    >
      <div className="mx-auto max-w-[var(--max-width-section)] px-0 md:px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16">
          {/* Left */}
          <div className="w-full max-w-[584px]">
            <h2
              className="text-[38px] font-extrabold leading-[48px] tracking-[-1.2px] text-black
                sm:text-[48px] sm:leading-[58px]"
            >
              Join the growing <br />
              <span
                className="bg-gradient-to-r from-home-purple to-home-green bg-clip-text
                  text-transparent"
              >
                RinSetu Community
              </span>
            </h2>

            <div className="mt-7 flex flex-col gap-5">
              {socials.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.name}
                    className="group flex min-h-[106px] items-center justify-between rounded-2xl
                      border border-border-light bg-white p-6 shadow-[var(--shadow-sm)]
                      transition-all duration-300 hover:-translate-y-1
                      hover:shadow-[0px_14px_30px_rgba(15,23,42,0.12)]"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-[14px]
                        ${item.iconBox}`}
                      >
                        <Icon size={28} color={item.color} />
                      </div>

                      <div>
                        <h4 className="text-[18px] font-bold leading-7 text-dark-navy">
                          {item.name}
                        </h4>

                        <p className="text-[14px] leading-5 text-text-muted-dark">{item.desc}</p>
                      </div>
                    </div>

                    <ArrowUpRight
                      className="h-6 w-6 text-text-on-dark-muted transition-all duration-300
                        group-hover:translate-x-1 group-hover:-translate-y-1
                        group-hover:text-home-purple"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <div className="relative overflow-visible">
            <div className="group relative w-full max-w-[584px]">
              {/* Background Hover Layer */}
              <div
                className="absolute inset-0 z-0 rounded-[40px] bg-home-purple opacity-0
                  transition-all duration-500 ease-out group-hover:-translate-x-[10px]
                  group-hover:-translate-y-[15px] group-hover:rotate-3 group-hover:opacity-10"
              />

              {/* Main Card */}
              <div
                className="relative z-10 rounded-[40px] bg-dark-navy p-8
                  shadow-[var(--shadow-dark-card)] transition-all duration-500 sm:p-10"
              >
                {/* Icon */}
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-home-purple"
                >
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>

                {/* Quote */}
                <h3
                  className="mt-8 max-w-[504px] text-[24px] font-bold leading-[34px] text-white
                    sm:text-[30px] sm:leading-[38px]"
                >
                  "RinSetu's community events taught me how to properly manage debt and build
                  credit."
                </h3>

                {/* Footer */}
                <div
                  className="mt-9 flex flex-col gap-5 border-t border-home-border-dark pt-8
                    sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* User */}
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/userIcon.png"
                      alt="Rahul Verma"
                      width={64}
                      height={64}
                      className="h-14 w-14 rounded-full border-2 border-home-green object-cover"
                    />

                    <div>
                      <p className="text-base font-bold text-white">Rahul Verma</p>

                      <p className="text-sm text-text-muted-light">Member since 2023</p>
                    </div>
                  </div>

                  {/* Badge */}
                  <span
                    className="w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-semibold
                      text-white"
                  >
                    Super User
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
