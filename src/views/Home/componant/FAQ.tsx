"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the maximum loan amount I can get?",
      a: "You can get a personal loan up to ₹5 Lakhs and business loans up to ₹50 Lakhs depending on your eligibility and credit profile.",
    },
    {
      q: "Do I need to visit a branch for KYC?",
      a: "No! The entire process is 100% digital. You can complete your Video KYC from the comfort of your home.",
    },
    {
      q: "How long does the disbursal take?",
      a: "Once approved and bank verification is complete, the loan amount is typically disbursed to your account within 5-10 minutes.",
    },
    {
      q: "Are there any hidden charges?",
      a: "Absolutely not. We maintain 100% transparency. All processing fees and charges are clearly communicated before you accept the loan.",
    },
    {
      q: "Can I prepay my loan early?",
      a: "Yes, you can prepay your loan anytime. Foreclosure charges may apply depending on the loan product and terms.",
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-4">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-12">Got questions? We've got answers.</p>

        <div className="text-left space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-surface border border-border rounded-xl overflow-hidden
                shadow-[var(--shadow-sm)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex justify-between items-center text-left
                  hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-text-heading pr-8">{faq.q}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                  transition-transform duration-300
                  ${openIndex === idx ? "bg-primary text-white rotate-180" : "bg-muted text-text-muted"}`}
                >
                  <ChevronDown size={20} />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
                ${openIndex === idx ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-6 text-muted-foreground border-t border-border/50 pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
