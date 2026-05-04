import React from 'react';
import { ArrowUpRight, Clock, Users, Star } from 'lucide-react';

export default function TrustStats() {
  const stats = [
    {
      icon: <ArrowUpRight className="w-6 h-6 text-secondary" />,
      value: "99%",
      label: "Approval Rate"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      value: "5 Min",
      label: "Disbursal Time"
    },
    {
      icon: <Users className="w-6 h-6 text-orange-400" />,
      value: "2M+",
      label: "Happy Customers"
    },
    {
      icon: <Star className="w-6 h-6 text-pink-400" />,
      value: "4.9",
      label: "App Rating"
    }
  ];

  return (
    <section className="py-20 bg-[#1D293D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Building Trust Across India
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
          Numbers that speak for themselves. Join millions of Indians who trust us.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center">
              <div className="mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
