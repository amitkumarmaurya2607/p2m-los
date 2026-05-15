'use client';
import React, { useState, useEffect } from "react";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

const stars = Array.from({ length: 5 });

const users = [
  "/images/userIcon.png",
  "/images/userIcon.png",
  "/images/userIcon.png",
  "/images/userIcon.png",
];

const reviews = [
  {
    name: "Rahul Sharma",
    role: "Small Business Owner",
    avatar: "/images/userIcon.png",
    text: "The process was incredibly smooth. I got my business loan approved within 2 hours. RinSetu really understands the urgency for startups.",
  },
  {
    name: "Priya Patel",
    role: "Freelancer",
    avatar: "/images/userIcon.png",
    text: "No physical documents, everything was 100% digital. The entire process was seamless from application to disbursement.",
  },
  {
    name: "Amit Kumar",
    role: "Software Engineer",
    avatar: "/images/userIcon.png",
    text: "I've tried other loan apps, but this one is by far the most reliable. The interest rates are competitive and the approval is instant.",
  },
  {
    name: "Neha Gupta",
    role: "Fashion Designer",
    avatar: "/images/userIcon.png",
    text: "Instant approval changed the game for me. I needed funds urgently for my business and RinSetu delivered within hours.",
  },
];

const RatingReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const review = reviews[activeIndex];

  return (
    <section className="relative w-full overflow-hidden bg-dark-navy px-4 py-20 sm:px-6 lg:px-[95px] lg:py-32">
      <div className="absolute -left-[135px] -top-[171px] h-[514px] w-[811px] rounded-full bg-home-purple/30 blur-[120px]" />
      <div className="absolute bottom-[-170px] right-[-140px] h-[428px] w-[676px] rounded-full bg-home-green/20 blur-[140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.8)_0%,rgba(15,23,42,0.95)_100%)]" />

      <div className="relative mx-auto flex max-w-[1232px] flex-col items-center gap-16 lg:flex-row lg:gap-24">
        <div className="w-full max-w-[568px]">
          <h2 className="text-[44px] font-extrabold leading-[52px] tracking-[-1.2px] text-white sm:text-[60px] sm:leading-[66px]">
            What Our <br />
            <span className="bg-gradient-to-r from-home-green to-home-purple bg-clip-text text-transparent">
              Borrowers Say
            </span>
          </h2>

          <p className="mt-8 max-w-[448px] text-[18px] leading-8 text-home-text-on-dark sm:text-[20px]">
            Real stories from people who trusted RinSetu to power their
            financial journey.
          </p>

          <div className="mt-12 flex w-fit items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div>
              <h3 className="text-[36px] font-black leading-10 text-white">
                4.9/5
              </h3>
              <div className="mt-1 flex gap-1">
                {stars.map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-home-orange-badge text-home-orange-badge"
                  />
                ))}
              </div>
            </div>

            <div className="h-12 w-px bg-white/10" />

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.7px] text-home-text-muted-light">
                Trusted By
              </p>
              <h4 className="mt-1 text-xl font-bold text-white">250,000+</h4>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-12 w-[176px]">
              {users.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  width={48}
                  height={48}
                  alt=""
                  className="absolute top-0 h-12 w-12 rounded-full border-2 border-dark-navy object-cover"
                  style={{ left: `${index * 32}px` }}
                />
              ))}

              <div className="absolute left-32 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-dark-navy bg-home-purple text-xs font-bold text-white">
                +2k
              </div>
            </div>

            <p className="text-sm font-medium text-home-text-muted-light">
              Verified Reviews
            </p>
          </div>
        </div>

        <div className="relative w-full max-w-[568px] pt-12">
          <div className="absolute bottom-[-90px] left-[-48px] hidden h-[110px] w-[220px] rotate-[-0.99deg] rounded-2xl border border-white/5 bg-white/10 p-4 opacity-60 shadow-2xl lg:block">
            <p className="text-sm font-bold text-white">Priya Patel</p>
            <div className="flex">
              {stars.map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-home-orange-badge text-home-orange-badge"
                />
              ))}
            </div>
            <p className="mt-3 text-xs leading-4 text-home-text-on-dark">
              "No physical documents, everything was 100% digital."
            </p>
          </div>

          <div className="absolute bottom-[-130px] right-[45px] hidden h-[110px] w-[220px] rotate-[1.97deg] rounded-2xl border border-white/5 bg-white/10 p-4 opacity-80 shadow-2xl lg:block">
            <p className="text-sm font-bold text-white">Amit Kumar</p>
            <div className="flex">
              {stars.map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-home-orange-badge text-home-orange-badge"
                />
              ))}
            </div>
            <p className="mt-3 text-xs leading-4 text-home-text-on-dark">
              "I've tried other loan apps, but this one is by far the most
              reliable."
            </p>
          </div>

          <div className="absolute right-[-90px] top-[40px] hidden h-[110px] w-[220px] rotate-[-1.46deg] rounded-2xl border border-white/5 bg-white/10 p-4 opacity-50 shadow-2xl lg:block">
            <p className="text-sm font-bold text-white">Neha Gupta</p>
            <div className="flex">
              {stars.map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-home-orange-badge text-home-orange-badge"
                />
              ))}
            </div>
            <p className="mt-3 text-xs leading-4 text-home-text-on-dark">
              "Instant approval changed the game for me."
            </p>
          </div>

          <div className="relative rounded-[40px] border border-white/20 bg-white/[0.95] p-8 shadow-[0px_32px_64px_rgba(0,0,0,0.3)] sm:p-12">
            <div className="absolute -right-4 -top-14 flex h-24 w-24 rotate-12 items-center justify-center rounded-3xl bg-gradient-to-br from-home-green to-home-purple shadow-xl">
              <Quote className="h-10 w-10 fill-white text-white opacity-80" />
            </div>

            <div className="flex gap-1">
              {stars.map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-home-orange-badge text-home-orange-badge"
                />
              ))}
            </div>

            <p className="mt-9 text-[24px] font-medium leading-[40px] text-dark-navy sm:text-[30px] sm:leading-[49px]">
              &ldquo;{review.text}&rdquo;
            </p>

            <div className="mt-12 flex items-center gap-5">
              <Image
                width={64}
                height={64}
                src={review.avatar}
                alt={review.name}
                className="h-16 w-16 rounded-full border-2 border-muted object-cover shadow"
              />

              <div>
                <h4 className="text-xl font-bold text-dark-navy">
                  {review.name}
                </h4>
                <p className="text-base font-medium text-home-purple">
                  {review.role}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 flex items-center justify-center gap-3">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-300 ${i === activeIndex
                  ? "h-2 w-10 bg-home-green"
                  : "h-2 w-2 bg-white/20 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatingReviews;