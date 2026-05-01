'use client'
import React, { useState } from 'react';
import { Lock, Timer, ArrowRight } from 'lucide-react';
import OTPInput from '@/components/OTPInput/OTPInput';
import ResendTimer from '@/components/ResendTimer/ResendTimer';



const VerifyOtpPage = () => {
  const [isComplete, setIsComplete] = useState(false);

  const handleVerify = () => {
    if (!isComplete) return;
    console.log("Verifying...");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      {/* Navbar */}
      <nav className="w-full p-4 flex justify-between items-center border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
            CN
          </div>
          <span className="font-bold text-xl tracking-tight">webEtechies</span>
        </div>
        <button className="px-6 py-2 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
          Logout
        </button>
      </nav>

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 gap-12 max-w-7xl mx-auto w-full">

        {/* Left Card */}
        <div className="hidden md:flex flex-col w-1/2 max-w-md">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900 border-8 border-white dark:border-muted">
            {/* Replace with your actual image path */}
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=600"
              alt="Professional"
              className="w-full h-auto object-cover opacity-80"
            />
            <div className="absolute top-10 left-8 text-white space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Smart Loans.</h1>
              <p className="text-2xl font-light">Trusted Support.</p>
              <div className="mt-4 px-4 py-1.5 bg-blue-600 rounded-lg inline-block text-xs font-bold uppercase tracking-wider">
                Personal Loan
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-white dark:bg-muted text-center">
              <h2 className="text-foreground text-2xl font-black">webEtechies</h2>
              <p className="text-muted-foreground text-sm font-medium">Smart Money. Simple Loans.</p>
            </div>
          </div>
        </div>

        {/* Right Verification Side */}
        <div className="w-full md:w-1/2 max-w-md flex flex-col items-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-primary">
              <Lock size={32} />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2">Verify Your Identity</h2>
          <p className="text-muted-foreground text-center mb-10">
            Enter the verification code sent to your email address
          </p>

          <div className="w-full space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-bold block">6-digit Verification Code</label>

              <OTPInput length={6} onComplete={(code) => setIsComplete(true)} />

              <p className="text-sm text-muted-foreground">
                OTP sent to <span className="font-bold text-foreground">shri.shubham106@gmail.com</span>
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button className="text-primary font-bold hover:underline text-sm">
                Change Email
              </button>
              <ResendTimer onResend={() => { }} />
            </div>

            <button
              onClick={handleVerify}
              disabled={!isComplete}
              className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                ${isComplete
                  ? 'bg-primary text-primary-foreground shadow-lg hover:scale-[1.02]'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
            >
              Verify Code
            </button>

            <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
              <Lock size={12} />
              Secure, encrypted connection
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyOtpPage;