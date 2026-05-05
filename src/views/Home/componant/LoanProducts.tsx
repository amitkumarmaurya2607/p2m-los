import React from 'react';
import { Briefcase, GraduationCap, Home as HomeIcon, User } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export default function LoanProducts() {
  const products = [
    {
      id: 1,
      title: "Personal Loan",
      amount: "Up to ₹5 Lakhs",
      icon: <User className="w-5 h-5 text-primary" />,
      color: "bg-blue-50 text-primary",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      id: 2,
      title: "Business Loan",
      amount: "Up to ₹50 Lakhs",
      icon: <Briefcase className="w-5 h-5 text-secondary" />,
      color: "bg-green-50 text-secondary",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      id: 3,
      title: "Education Loan",
      amount: "Up to ₹20 Lakhs",
      icon: <GraduationCap className="w-5 h-5 text-purple-500" />,
      color: "bg-purple-50 text-purple-500",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      id: 4,
      title: "Home Renovation",
      amount: "Up to ₹10 Lakhs",
      icon: <HomeIcon className="w-5 h-5 text-orange-500" />,
      color: "bg-orange-50 text-orange-500",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400&h=300"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-4">
              <span className="text-primary">Loan Products</span> for Every Need
            </h2>
            <p className="text-muted-foreground text-lg">
              Tailored financial solutions designed to help you achieve your goals, whether personal or professional.
            </p>
          </div>
          <button className="flex items-center gap-2 text-primary font-semibold hover:underline">
            View all products <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col sm:flex-row group shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all cursor-pointer">
              <div className="p-8 flex-1 flex flex-col justify-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${product.color}`}>
                  {product.icon}
                </div>
                <h3 className="text-xl font-bold text-text-heading mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-secondary font-semibold mb-6">{product.amount}</p>
                
                <div className="mt-auto flex items-center gap-2 text-primary text-sm font-semibold">
                  Apply Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent z-10 hidden sm:block w-1/2"></div>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
