import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Amit Patel",
      role: "Small Business Owner",
      text: "FinSetu helped me expand my shop when banks refused. The process was entirely digital and money was in my account the same day.",
      rating: 5,
      avatar: "AP"
    },
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      text: "I needed a personal loan for a medical emergency. The AI approval system is amazing. Highly recommend to everyone looking for fast loans.",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Rahul Verma",
      role: "Freelancer",
      text: "As a freelancer, getting loans is tough. FinSetu looked at my actual cash flow instead of just traditional score. Best experience ever.",
      rating: 5,
      avatar: "RV"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-4">
          Hear From Our <span className="text-primary">Customers</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
          Don't just take our word for it. Here is what people are saying.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-surface rounded-2xl p-8 shadow-[var(--shadow-md)] border border-border flex flex-col h-full">
              <div className="flex text-orange-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-8 italic flex-1">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-primary-muted text-primary font-bold flex items-center justify-center">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-text-heading">{review.name}</h4>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
