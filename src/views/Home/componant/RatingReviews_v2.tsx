"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

type Review = {
    name: string;
    role: string;
    text: string;
    image: string;
    borderColor?: string;
};

const reviews: Review[] = [
    {
        name: "Rahul Sharma",
        role: "Loan Officer",
        text: `"The LOS dashboard makes lead tracking, document verification, and loan status management much faster for our team."`,
        image: "/images/userIcon.png",
        borderColor: "#3737C1",
    },
    {
        name: "Anjali Gupta",
        role: "Credit Manager",
        text: `"Application screening is now smoother. We can review customer details, eligibility, and verification steps in one place."`,
        image: "/images/userIcon.png",
        borderColor: "#00C89C",
    },
    {
        name: "Amit Patel",
        role: "Branch Manager",
        text: `"The LOS system helped us reduce manual follow-ups and improved visibility across every loan application stage."`,
        image: "/images/userIcon.png",
        borderColor: "#FF9F1C",
    },
    {
        name: "Priya Desai",
        role: "Operations Executive",
        text: `"Document upload, verification status, and customer onboarding are easy to manage with this platform."`,
        image: "/images/userIcon.png",
        borderColor: "#3737C1",
    },
    {
        name: "Vikram Joshi",
        role: "Sales Manager",
        text: `"Our sales team can quickly check application progress and update customers with accurate loan status information."`,
        image: "/images/userIcon.png",
        borderColor: "#00C89C",
    },
    {
        name: "Sneha Kapoor",
        role: "Verification Agent",
        text: `"PAN, Aadhaar, bank details, and customer verification steps are clearly organized, saving a lot of processing time."`,
        image: "/images/userIcon.png",
        borderColor: "#FF9F1C",
    },
    {
        name: "Rohit Mehta",
        role: "Relationship Manager",
        text: `"The step-by-step loan journey helps us guide customers better and avoid missing important application requirements."`,
        image: "/images/userIcon.png",
        borderColor: "#3737C1",
    },
    {
        name: "Neha Verma",
        role: "Back Office Executive",
        text: `"The system is clean, fast, and simple. It keeps every loan file organized from login to final submission."`,
        image: "/images/userIcon.png",
        borderColor: "#00C89C",
    },
];

const RatingReviews_v2 = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const duplicatedReviews = useMemo(
        () => [...reviews, ...reviews],
        [],
    );

    const scrollToCard = (index: number) => {
        const slider = scrollRef.current;

        if (!slider) return;

        const card = slider.children[index] as HTMLElement;

        if (!card) return;

        slider.scrollTo({
            left: card.offsetLeft - slider.clientWidth / 2 + card.clientWidth / 2,
            behavior: "smooth",
        });

        setActiveIndex(index % reviews.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => {
                const next = (prev + 1) % reviews.length;

                scrollToCard(next);

                return next;
            });
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden bg-white py-[60px]">
            <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 text-center">
                <div className="flex items-center gap-2">
                    <h2 className="text-[36px] font-black leading-[40px] text-[#0F172A]">
                        4.9
                    </h2>

                    <div className="flex flex-col items-start">
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    className="h-5 w-5 fill-[#FF9F1C] text-[#FF9F1C]"
                                />
                            ))}
                        </div>

                        <p className="text-sm font-semibold text-[#62748E]">
                            Google Rating
                        </p>
                    </div>
                </div>

                <p className="mt-4 text-base font-medium text-[#45556C]">
                    Trusted by 100,000+ happy customers across India
                </p>

                <div className="mt-6 h-4 w-4 rounded-full bg-[#FF9F1C]/40 blur-[1px]" />
            </div>

            <div
                ref={scrollRef}
                className="mt-8 flex gap-6 overflow-x-auto scroll-smooth px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {duplicatedReviews.map((review, index) => (
                    <div
                        key={`${review.name}-${index}`}
                        className="relative min-h-[225px] min-w-[350px] rounded-2xl border border-[#F1F5F9] bg-white px-[25px] pt-[24px] shadow-[0px_8px_30px_rgba(0,0,0,0.04)]"
                        style={{
                            borderTopWidth: "4px",
                            borderTopColor: review.borderColor,
                        }}
                    >
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className="h-4 w-4 fill-[#FF9F1C] text-[#FF9F1C]"
                                />
                            ))}
                        </div>

                        <Quote className="absolute right-5 top-5 h-8 w-8 fill-[#E2E8F0] text-[#E2E8F0]" />

                        <p className="mt-5 max-w-[300px] text-[14px] leading-[23px] text-[#45556C]">
                            {review.text}
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                            <img
                                src={review.image}
                                alt={review.name}
                                className="h-12 w-12 rounded-full object-cover"
                            />

                            <div>
                                <h4 className="text-[14px] font-bold leading-5 text-[#0F172A]">
                                    {review.name}
                                </h4>

                                <p className="text-[12px] font-medium text-[#62748E]">
                                    {review.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
                {reviews.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToCard(index)}
                        className={`transition-all duration-300 ${activeIndex === index
                            ? "h-3 w-3 rounded-full bg-[#3737C1]"
                            : "h-2 w-2 rounded-full bg-[#00C89C]/40"
                            }`}
                    />
                ))}
            </div>

            <div className="absolute bottom-[40px] left-[40px] h-3 w-3 rounded-full bg-[#00C89C]/40 blur-[1px]" />
            <div className="absolute top-[160px] left-1/2 h-2 w-2 rounded-full bg-[#3737C1]/40 blur-[1px]" />
        </section>
    );
};

export default RatingReviews_v2;