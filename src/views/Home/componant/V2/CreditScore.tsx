import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CreditScore() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background decorations */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px]
          -translate-y-1/2 translate-x-1/2"
      ></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[80px]
          translate-y-1/2 -translate-x-1/2"
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div
          className="bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-8 md:p-12
            flex flex-col md:flex-row items-center gap-12"
        >
          <div className="flex-1 text-white">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-sm
                font-medium mb-6"
            >
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              100% Free forever
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
              Check your <span className="text-secondary">Credit Score</span>
              <br />
              Instantly, for free!
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl">
              Knowing your credit score is the first step to financial freedom. Get your detailed
              credit report without any impact on your score.
            </p>
            <button
              className="bg-white text-primary px-8 py-4 rounded-full font-bold shadow-lg
                hover:shadow-xl transition-all flex items-center gap-2 hover:-translate-y-1"
            >
              Check free score <ArrowRight size={20} />
            </button>
          </div>

          <div className="w-full md:w-[400px] shrink-0">
            <div className="bg-white rounded-3xl p-8 relative shadow-2xl">
              {/* Score meter visualization */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg viewBox="0 0 100 50" className="w-full overflow-visible">
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 50 A 40 40 0 0 1 75 20"
                    fill="none"
                    stroke="#00C89C"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="125"
                    strokeDashoffset="0"
                    className="animate-[dash_1.5s_ease-out_forwards]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                  <span className="text-4xl font-extrabold text-primary">780</span>
                  <span className="text-sm font-semibold text-secondary">Excellent</span>
                </div>
              </div>

              <div
                className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center
                  gap-3"
              >
                <div
                  className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center
                    shrink-0"
                >
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-heading">You are pre-approved!</p>
                  <p className="text-xs text-muted-foreground">For a loan up to ₹5 Lakhs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
