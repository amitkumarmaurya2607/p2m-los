import { Zap, Smartphone, CalendarDays, Shield, Send, Percent } from "lucide-react";

const features = [
  {
    title: "Instant Approval",
    desc: "AI-driven algorithms assess and approve your limit within 60 seconds.",
    icon: Zap,
    color: "bg-accent-orange",
    glow: "bg-accent-orange/10",
    tall: true,
  },
  {
    title: "100% Digital",
    desc: "From onboarding to disbursal, everything happens on your smartphone.",
    icon: Smartphone,
    color: "bg-primary",
    glow: "bg-primary/10",
  },
  {
    title: "Flexible EMI",
    desc: "Choose a repayment schedule that perfectly fits your monthly budget.",
    icon: CalendarDays,
    color: "bg-secondary",
    glow: "bg-secondary/10",
    tall: true,
  },
  {
    title: "Secure Process",
    desc: "Bank-grade 256-bit encryption ensures your data stays completely private.",
    icon: Shield,
    color: "bg-dark-navy",
    glow: "bg-dark-navy/10",
  },
  {
    title: "Fast Transfer",
    desc: "Money hits your bank account instantly via IMPS/NEFT networks.",
    icon: Send,
    color: "bg-primary",
    glow: "bg-primary/10",
    tall: true,
  },
  {
    title: "Low Interest",
    desc: "Competitive rates starting from just 1% per month for premium profiles.",
    icon: Percent,
    color: "bg-secondary",
    glow: "bg-secondary/10",
  },
];

const WhyChoose = () => {
  return (
    <>
      <section className="bg-surface-muted px-5 py-16 font-[Inter] md:px-10 lg:px-20 lg:py-24">
        <div className="mx-auto max-w-[var(--max-width-section)]">
          {/* Heading */}
          <div className="mx-auto max-w-[var(--max-width-text)] text-center">
            <h2
              className="text-[36px] font-black leading-tight tracking-[-1.2px] text-text-heading
                md:text-[48px] md:leading-[48px]"
            >
              Why Choose <span className="text-secondary">RinSetu</span>
            </h2>

            <p
              className="mt-6 text-[16px] leading-[26px] text-text-body md:text-[18px]
                md:leading-[29px]"
            >
              Built for modern India, designed to give you financial power without the traditional
              banking friction.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-14 grid gap-8 lg:gap-y-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {features.map((item, index) => (
              <FeatureCard key={item.title} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glow: string;
  tall?: boolean;
  index: number;
}

const FeatureCard = ({ title, desc, icon: Icon, color, glow, tall, index }: FeatureCardProps) => {
  return (
    <div
      className={`feature-card group relative overflow-hidden rounded-[32px] border
        border-border-light bg-surface p-8 shadow-[0px_8px_30px_rgba(0,0,0,0.04)] transition-all
        duration-500 hover:-translate-y-3 hover:shadow-[0px_25px_60px_rgba(0,0,0,0.12)] ${
          tall ? "lg:min-h-[287px]" : "lg:min-h-[240px]"
        } ${index === 1 ? "lg:mt-12" : ""}
        ${index === 4 ? "lg:-mt-12" : ""}`}
      style={{
        animationDelay: `${index * 140}ms`,
      }}
    >
      {/* Glow */}
      <div
        className={`feature-glow absolute -right-10 -top-10 h-32 w-32 rounded-full blur-[40px]
          transition-all duration-500 group-hover:scale-125 ${glow}`}
      />

      {/* Icon */}
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white
          shadow-[var(--shadow-btn-soft)] transition-transform duration-500 group-hover:rotate-6
          group-hover:scale-110 ${color}`}
      >
        <Icon />
      </div>

      {/* Title */}
      <h3
        className="mt-8 text-[20px] font-bold leading-7 text-text-heading transition-colors
          duration-300 group-hover:text-primary"
      >
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 text-[14px] leading-[23px] text-text-body">{desc}</p>

      {/* Hover Border Effect */}
      <div
        className="absolute inset-0 rounded-[32px] border border-transparent transition-all
          duration-500 group-hover:border-primary/20"
      />
    </div>
  );
};

export default WhyChoose;
