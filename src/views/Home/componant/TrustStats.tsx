const stats = [
  { value: "₹50Cr+", label: "Loans Disbursed", color: "text-secondary" },
  { value: "10K+", label: "Happy Customers", color: "text-primary" },
  { value: "50+", label: "Cities Covered", color: "text-accent-orange" },
  { value: "4.9★", label: "App Rating", color: "text-dark-navy" },
];

const TrustStats = () => {
  return (
    <section className="bg-[var(--border-light)]/50 px-5 py-16 font-[Inter] md:px-10 lg:px-20">
      <div
        className="mx-auto max-w-[var(--max-width-section)] overflow-hidden rounded-[32px] border
          border-border-light bg-surface shadow-[0px_20px_50px_rgba(0,0,0,0.03)]"
      >
        <div
          className="relative grid gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-12
            lg:py-[65px]"
        >
          <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-primary/5 blur-[64px]" />
          <div
            className="absolute -right-10 top-0 h-64 w-64 rounded-full bg-secondary/5 blur-[64px]"
          />

          {stats.map((item) => (
            <div
              key={item.label}
              className="relative flex flex-col items-center gap-2 text-center lg:border-r
                lg:border-border-medium lg:last:border-r-0"
            >
              <h3
                className={`text-[44px] font-black leading-none
                drop-shadow-[0px_1px_4px_rgba(0,0,0,0.15)] md:text-[60px] ${item.color}`}
              >
                {item.value}
              </h3>

              <p
                className="text-[14px] font-semibold uppercase leading-5 tracking-[0.7px]
                  text-text-muted-dark"
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
