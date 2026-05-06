import React from "react";
import { ArrowRight } from "lucide-react";

export default function FinancialWisdom() {
  const blogs = [
    {
      title: "How to improve your credit score in 3 months",
      category: "Credit Health",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400&h=250",
      date: "Oct 12, 2026",
    },
    {
      title: "Personal Loan vs Credit Card: Which is better?",
      category: "Loan Advice",
      image:
        "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80&w=400&h=250",
      date: "Oct 08, 2026",
    },
    {
      title: "Smart ways to use your Diwali bonus",
      category: "Personal Finance",
      image:
        "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=400&h=250",
      date: "Oct 01, 2026",
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-4">
              Financial <span className="text-primary">Wisdom</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Articles, guides, and tips to help you make smarter financial decisions.
            </p>
          </div>
          <button className="flex items-center gap-2 text-primary font-semibold hover:underline">
            View all articles <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="bg-surface border border-border rounded-2xl overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow group cursor-pointer"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                    {blog.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{blog.date}</span>
                </div>
                <h3 className="text-lg font-bold text-text-heading mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                  Read more{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
