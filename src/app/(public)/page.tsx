"use client";


import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Shield, TrendingUp, Users, Smartphone, Mail, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return <AuthLayout />;
}

const AuthLayout = () => {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState(false);
  const [authMethod, setAuthMethod] = useState<'mobile' | 'email'>('mobile');

  const handleGetOTP = () => {
    if (mobileNumber.length < 10) {
      setError(true);
    } else {
      setError(false);
      router.push('/verify-otp');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row font-sans text-[#1a1a1a]">
      {/* Left Section: Marketing/Info */}
      <div className="relative flex flex-1 flex-col justify-between bg-primary p-8 lg:p-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-secondary/80 to-secondary"></div>
            <span className="text-2xl font-bold text-white tracking-tight">FinSetu</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-white lg:text-6xl max-w-xl">
            Access your financial dashboard
          </h1>
          <p className="mb-12 max-w-md text-lg text-white/80 leading-relaxed">
            Instant loans, seamless process, and secure digital journeys. Empowering your financial future.
          </p>

          {/* Features */}
          <div className="space-y-4 max-w-sm">
            <FeatureCard 
              icon={<Shield className="text-secondary" size={24} />}
              title="Bank-grade security"
              desc="Your data is fully protected"
            />
            <FeatureCard 
              icon={<TrendingUp className="text-secondary" size={24} />}
              title="Instant Approval"
              desc="Zero wait times, 100% digital"
            />
            <FeatureCard 
              icon={<Users className="text-secondary" size={24} />}
              title="2M+ Happy Customers"
              desc="Building trust across India"
            />
          </div>
        </div>

        <div className="relative z-10 mt-12 text-sm text-white/60">
          © 2026 FinSetu Financial Services
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6 lg:p-12">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] lg:p-12">
          <h2 className="mb-2 text-3xl font-bold text-slate-900">Welcome back</h2>
          <p className="mb-8 text-slate-500">Please enter your details to sign in.</p>

          {/* Toggle Switch */}
          <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
            <button 
              onClick={() => setAuthMethod('mobile')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${authMethod === 'mobile' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
            >
              <Smartphone size={18} /> Mobile
            </button>
            <button 
              onClick={() => setAuthMethod('email')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${authMethod === 'email' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
            >
              <Mail size={18} /> Email
            </button>
          </div>

          {/* Input Field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                if(error) setError(false);
              }}
              className={`w-full rounded-xl border bg-slate-50 px-4 py-4 outline-none transition-all focus:ring-2 ${
                error 
                ? 'border-red-500 ring-red-100' 
                : 'border-slate-100 focus:border-primary focus:ring-primary/20'
              }`}
            />
            {error && <p className="mt-2 text-xs text-red-500">Please enter a valid 10-digit mobile number.</p>}
          </div>

          <button 
            onClick={handleGetOTP}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-white shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Get OTP <ArrowRight size={20} />
          </button>

          {/* Divider */}
          <div className="relative my-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative bg-white px-3 text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-100 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Mail size={18} /> Github
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-100 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Mail size={18} /> Google
            </button>
          </div>

          <div className="text-center">
            <button className="text-sm font-semibold text-primary hover:underline">
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex items-center gap-4 rounded-2xl bg-white/95 p-4 shadow-sm backdrop-blur-sm">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-bold text-white">{title}</h3>
      <p className="text-xs text-white/70">{desc}</p>
    </div>
  </div>
);