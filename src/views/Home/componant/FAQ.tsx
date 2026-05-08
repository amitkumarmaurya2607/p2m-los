"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How quickly can I get my loan approved?",
    answer:
      "Our AI-powered engine approves most loans within 60 seconds of applying. Disbursal to your bank account typically happens within 5-10 minutes after approval.",
  },
  {
    question: "What documents are required for application?",
    answer: "You only need Aadhaar, PAN, and basic bank details to apply.",
  },
  {
    question: "Are there any hidden fees or pre-closure charges?",
    answer:
      "No hidden fees. Any charges are shown clearly before you confirm your loan.",
  },
  {
    question: "What is the minimum CIBIL score required?",
    answer:
      "Eligibility depends on multiple factors, but a higher CIBIL score improves your approval chances.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white px-5 py-16 font-[Inter] md:px-10 lg:py-24">
      <div className="mx-auto max-w-[720px]">
        <div className="text-center">
          <h2 className="text-[32px] font-black leading-10 text-[#0F172A] md:text-[36px]">
            Frequently Asked{" "}
            <span className="text-[#3737C1]">Questions</span>
          </h2>
          <p className="mt-4 text-[16px] leading-6 text-[#62748E]">
            Everything you need to know about our lending process.
          </p>
        </div>

        <div className="mt-12 space-y-4 lg:mt-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border border-[#F1F5F9] transition-all ${
                  isOpen
                    ? "bg-white shadow-[0px_10px_40px_rgba(0,0,0,0.05)]"
                    : "bg-[#F8FAFC]/50"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    className={`text-[16px] font-bold leading-6 ${
                      isOpen ? "text-[#3737C1]" : "text-[#314158]"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#90A1B9] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-7 text-[16px] leading-[26px] text-[#45556C]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;