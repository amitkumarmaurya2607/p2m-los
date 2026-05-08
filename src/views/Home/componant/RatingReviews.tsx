"use client";

import React from "react";
import { Star, Quote, UserIcon } from "lucide-react";

const reviews = [
  {
    name: "Rahul Sharma",
    role: "Business Owner",
    text: `"The process was incredibly smooth. I got my business loan approved in just 4 hours without any paperwork hassle."`,
    image: "",
    border: "border-t-[#3737C1]",
  },
  {
    name: "Priya Desai",
    role: "Software Engineer",
    text: `"RinSetu's EMI calculator is a lifesaver. Transparent fees, instant transfer, and a clean dashboard."`,
    image: "",
    border: "border-t-[#3737C1]",
  },
  {
    name: "Amit Patel",
    role: "Freelance Designer",
    text: `"I needed emergency funds for medical reasons. RinSetu delivered when my own bank asked for a week's time."`,
    image: "",
    border: "border-t-[#00C89C]",
  },
  {
    name: "Anjali Gupta",
    role: "Marketing Manager",
    text: `"Highly recommend for anyone looking for quick personal loans. Customer service is top-notch and always available."`,
    image: "",
    border: "border-t-[#FF9F1C]",
  },
];

const RatingReviews = () => {
  return (
    <section className="relative overflow-hidden bg-white py-14 font-[Inter]">
      <div className="flex flex-col items-center px-5 text-center">
        <div className="flex items-center gap-2">
          <span className="text-[36px] font-black leading-10 text-[#0F172A]">
            4.9
          </span>

          <div>
            <div className="flex gap-1 text-[#FF9F1C]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <p className="text-[14px] font-semibold leading-5 text-[#62748E]">
              Google Rating
            </p>
          </div>
        </div>

        <p className="mt-4 text-[16px] font-medium leading-6 text-[#45556C]">
          Trusted by 100,000+ happy customers across India
        </p>
      </div>

      <span className="mx-auto mt-6 block h-4 w-4 rounded-full bg-[#FF9F1C]/40 blur-[1px]" />

      <div className="mt-5 overflow-hidden">
        <div className="review-marquee flex w-max gap-6 px-6">
          {[...reviews, ...reviews, ...reviews].map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>

      <span className="mx-auto mt-5 block h-2 w-2 rounded-full bg-[#3737C1]/40 blur-[1px]" />
      <span className="absolute left-10 top-[260px] h-3 w-3 rounded-full bg-[#00C89C]/40 blur-[1px]" />

      <style jsx>{`
        .review-marquee {
          animation: reviewMarquee 35s linear infinite;
        }

        .review-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes reviewMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
};

const ReviewCard = ({ name, role, text, image, border }: any) => {
  return (
    <div
      className={`relative h-[225px] w-[350px] shrink-0 rounded-2xl border border-[#F1F5F9] border-t-4 bg-white px-[25px] pt-6 shadow-[0px_8px_30px_rgba(0,0,0,0.04)] ${border}`}
    >
      <div className="flex gap-1 text-[#FF9F1C]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>

      <Quote
        size={32}
        fill="#E2E8F0"
        className="absolute right-4 top-5 text-[#E2E8F0]"
      />

      <p className="mt-4 text-[14px] font-normal leading-[23px] text-[#45556C]">
        {text}
      </p>

      <div className="absolute bottom-6 left-[25px] flex items-center gap-4">
       {image? <img
          src={image}
          alt={name}
          className="h-12 w-12 rounded-full object-cover"
        />:
        <UserIcon   className="h-12 w-12 rounded-full object-cover" />
       }

        <div>
          <h4 className="text-[14px] font-bold leading-5 text-[#0F172A]">
            {name}
          </h4>
          <p className="text-[12px] font-medium leading-4 text-[#62748E]">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingReviews;