"use client";
import React, { useState } from "react";

export default function PlanYourLoan() {
  const [amount, setAmount] = useState(100000);
  const [months, setMonths] = useState(12);
  const [interest] = useState(12); // fixed for demo

  // Simple EMI calculation formula
  const r = interest / (12 * 100);
  const emi = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - amount;

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-4">
            Plan Your <span className="text-primary">Loan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Use our smart EMI calculator to plan your finances before you apply.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-surface rounded-3xl p-6 md:p-10 shadow-[var(--shadow-lg)] border border-border">
          {/* Sliders */}
          <div className="flex-1 space-y-8">
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-text-heading font-semibold">Loan Amount</label>
                <span className="text-primary font-bold bg-primary-muted px-3 py-1 rounded-md">
                  ₹ {amount.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground font-medium">
                <span>₹10,000</span>
                <span>₹5,00,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-text-heading font-semibold">Tenure (Months)</label>
                <span className="text-secondary font-bold bg-secondary/10 px-3 py-1 rounded-md text-secondary">
                  {months} Months
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="60"
                step="1"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground font-medium">
                <span>3 Months</span>
                <span>60 Months</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-text-heading font-semibold">Interest Rate (p.a)</label>
                <span className="text-text-heading font-bold">{interest}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="24"
                value={interest}
                disabled
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-not-allowed opacity-50"
              />
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:w-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-xl flex flex-col justify-center">
            <h3 className="text-gray-400 font-medium mb-2">Monthly EMI</h3>
            <p className="text-4xl font-extrabold text-secondary mb-8">
              ₹ {Math.round(emi).toLocaleString()}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between pb-4 border-b border-gray-700">
                <span className="text-gray-400">Principal Amount</span>
                <span className="font-semibold">₹ {amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-700">
                <span className="text-gray-400">Total Interest</span>
                <span className="font-semibold text-orange-400">
                  ₹ {Math.round(totalInterest).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Payable</span>
                <span className="font-semibold">₹ {Math.round(totalPayment).toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full py-4 bg-primary hover:bg-primary-light transition-colors text-white font-bold rounded-xl shadow-lg">
              Apply for this Loan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
