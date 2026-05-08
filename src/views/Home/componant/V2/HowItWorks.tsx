import React from "react";
import { ClipboardCheck, CreditCard, Landmark, UserCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
      title: "Check Eligibility",
      desc: "Enter basic details and check your loan limit in 2 mins.",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-primary" />,
      title: "Complete KYC",
      desc: "Verify your identity with PAN and Aadhaar seamlessly.",
    },
    {
      icon: <Landmark className="w-8 h-8 text-primary" />,
      title: "Bank Verification",
      desc: "Set up auto-repay securely with your bank account.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary" />,
      title: "Instant Disbursal",
      desc: "Money is transferred directly to your bank account.",
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-4">
          How it <span className="text-primary">Works</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
          Follow these simple steps to get your loan approved and disbursed instantly without any
          branch visits.
        </p>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div
            className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border border-dashed
              border-t-2"
          ></div>

          <div className="grid md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className="w-24 h-24 rounded-full bg-surface border-4 border-white shadow-xl flex
                    items-center justify-center mb-6 relative"
                >
                  <div
                    className="w-16 h-16 rounded-full bg-primary-muted flex items-center
                      justify-center"
                  >
                    {step.icon}
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-white
                      font-bold flex items-center justify-center border-4 border-white"
                  >
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-text-heading mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
