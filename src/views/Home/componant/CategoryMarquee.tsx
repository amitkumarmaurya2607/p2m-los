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
    color: "text-accent-orange",
    bg: "bg-accent-orange/10",
  },
  {
    title: "Education Loan",
    icon: GraduationCap,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Medical Loan",
    icon: HeartHandshake,
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    title: "Travel Loan",
    icon: Plane,
    color: "text-dark-navy",
    bg: "bg-dark-navy/10",
  },
  {
    title: "Bike Loan",
    icon: Bike,
    color: "text-accent-orange",
    bg: "bg-accent-orange/10",
  },
  {
    title: "Festival Loan",
    icon: Sparkles,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const CategoryMarquee = () => {
  return (
    <section className="overflow-hidden border-y border-border-light bg-surface py-8">
      <div className="relative flex overflow-hidden">
        {/* Track */}
        <div className="marquee flex min-w-max gap-6 px-6 py-4">
          {[...categories, ...categories, ...categories].map(
            (item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={index}
                  className="flex h-[66px] shrink-0 items-center gap-3 rounded-full border border-border-medium bg-surface px-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${item.bg}`}
                  >
                    <Icon size={16} className={item.color} strokeWidth={2.2} />
                  </span>

                  <span className="whitespace-nowrap text-[16px] font-bold text-text-dark-blue">
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