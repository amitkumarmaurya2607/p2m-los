"use client";

import React from "react";
import {
  GraduationCap,
  HeartHandshake,
  Plane,
  Bike,
  Sparkles,
  Heart,
} from "lucide-react";

const categories = [
  {
    title: "Wedding Loan",
    icon: Heart,
    color: "text-[#FF9F1C]",
    bg: "bg-[#FF9F1C]/10",
  },
  {
    title: "Education Loan",
    icon: GraduationCap,
    color: "text-[#3737C1]",
    bg: "bg-[#3737C1]/10",
  },
  {
    title: "Medical Loan",
    icon: HeartHandshake,
    color: "text-[#00C89C]",
    bg: "bg-[#00C89C]/10",
  },
  {
    title: "Travel Loan",
    icon: Plane,
    color: "text-[#0F172A]",
    bg: "bg-[#0F172A]/10",
  },
  {
    title: "Bike Loan",
    icon: Bike,
    color: "text-[#FF9F1C]",
    bg: "bg-[#FF9F1C]/10",
  },
  {
    title: "Festival Loan",
    icon: Sparkles,
    color: "text-[#3737C1]",
    bg: "bg-[#3737C1]/10",
  },
];

const CategoryMarquee = () => {
  return (
    <section className="overflow-hidden border-y border-[#F1F5F9] bg-white py-8">
      <div className="relative flex overflow-hidden">
        {/* Track */}
        <div className="marquee flex min-w-max gap-6 px-6 py-4">
          {[...categories, ...categories, ...categories].map(
            (item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={index}
                  className="flex h-[66px] shrink-0 items-center gap-3 rounded-full border border-[#E2E8F0] bg-white px-6 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${item.bg}`}
                  >
                    <Icon size={16} className={item.color} strokeWidth={2.2} />
                  </span>

                  <span className="whitespace-nowrap text-[16px] font-bold text-[#314158]">
                    {item.title}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </div>

      <style jsx>{`
        .marquee {
          animation: marquee 28s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
};

export default CategoryMarquee;