import React from "react";
import { Mail, PhoneCall, Plus, Minus } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    question: "What documents do I need to apply?",
    answer:
      "We require minimal documentation. You just need your PAN card, Aadhaar card, and the last 3 months' bank statements. Our process is 100% paperless.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Approval usually takes a few minutes after successful verification. In some cases, it may take longer due to additional checks.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No, all charges are shown clearly before you confirm your loan application.",
  },
  {
    question: "Can I choose my EMI date?",
    answer:
      "Yes, you can select a convenient EMI date based on the available options.",
  },
];

const FaqSection = () => {
  return (
    <section className="bg-white px-5 py-16  md:px-10 lg:px-[90px] lg:py-24">
      <div className="mx-auto max-w-[1280px] px-0 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[789px_363px] lg:gap-16">
          <div>
            <h2 className="text-[32px] font-bold leading-10 tracking-[-0.9px] text-[#0F172A] md:text-[36px]">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-[18px] leading-7 text-[#4A5565]">
              Everything you need to know about our products and processes.
            </p>

            <div className="mt-11 flex flex-col gap-4">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  open={index === 0}
                  className="group overflow-hidden rounded-3xl border border-[#F3F4F6] bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] open:border-[#3737C1]"
                >
                  <summary className="flex min-h-[80px] cursor-pointer list-none items-center justify-between gap-4 px-6 text-left marker:hidden [&::-webkit-details-marker]:hidden">
                    <span className="text-[18px] font-bold leading-7 text-[#0F172A]">
                      {faq.question}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-[#6A7282] group-open:bg-[#3737C1] group-open:text-white">
                      <Plus className="h-4 w-4 group-open:hidden" />
                      <Minus className="hidden h-4 w-4 group-open:block" />
                    </span>
                  </summary>

                  <div className="border-t border-[#F9FAFB] px-6 pb-6 pt-2">
                    <p className="text-[16px] leading-[26px] text-[#4A5565]">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-[40px] bg-[#0F172A] px-8 pb-8 pt-8 text-center shadow-[0px_25px_50px_-12px_rgba(49,44,133,0.2)]">
            <Image
              src="/images/supportUser.jpg"
              alt="Support executive"
              width={128}
              height={128}
              className="mx-auto h-32 w-32 rounded-full border-4 border-white/10 object-cover"
            />

            <h3 className="mt-6 text-[24px] font-bold leading-8 text-white">
              Still have questions?
            </h3>

            <p className="mx-auto mt-2 max-w-[299px] text-[16px] leading-6 text-[#99A1AF]">
              Our support executives are here to guide you through the process.
            </p>

            <div className="mt-[147px] flex flex-col gap-4">
              <button className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#00C89C] text-[16px] font-bold text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
                <PhoneCall className="h-5 w-5" />
                Call Us Now
              </button>

              <button className="flex h-[58px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 text-[16px] font-bold text-white">
                <Mail className="h-5 w-5" />
                Email Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;