import React from "react";
import { Smartphone, Zap, Wallet, Handshake } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      title: "100% Digital",
      desc: "Apply from anywhere, anytime. No physical branch visits or paperwork required.",
      color: "bg-blue-50 text-primary border-blue-100",
    },
    {
      icon: <Zap className="w-8 h-8 text-secondary" />,
      title: "Fast Approval",
      desc: "Our AI-driven system ensures your loan is approved in minutes, not days.",
      color: "bg-green-50 text-secondary border-green-100",
    },
    {
      icon: <Wallet className="w-8 h-8 text-orange-500" />,
      title: "No Hidden Fees",
      desc: "Complete transparency. What you see is exactly what you pay.",
      color: "bg-orange-50 text-orange-500 border-orange-100",
    },
    {
      icon: <Handshake className="w-8 h-8 text-purple-500" />,
      title: "Flexible EMIs",
      desc: "Choose a repayment schedule that perfectly fits your monthly budget.",
      color: "bg-purple-50 text-purple-500 border-purple-100",
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-4">
          Why Choose <span className="text-primary">FinSetu?</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
          Experience seamless borrowing with India's most trusted digital lending platform.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${reason.color}`}
              >
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-text-heading mb-3">{reason.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
