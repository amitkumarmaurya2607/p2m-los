import React from "react";
import { Clock, Percent, ShieldCheck } from "lucide-react";

export default function FeatureCards() {
  const features = [
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Quick Approval",
      desc: "Get your loan approved in just a few minutes with minimal documentation.",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Percent className="w-6 h-6 text-secondary" />,
      title: "Low Interest",
      desc: "Enjoy competitive interest rates tailored to your credit profile.",
      bgColor: "bg-green-50",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      title: "100% Secure",
      desc: "Your data is encrypted and safe. We are RBI compliant.",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-16 relative z-10">
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-surface rounded-2xl p-6 shadow-[var(--shadow-md)] border border-border
              flex items-start gap-4 transition-transform hover:-translate-y-1"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0
              ${feature.bgColor}`}
            >
              {feature.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-heading mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
