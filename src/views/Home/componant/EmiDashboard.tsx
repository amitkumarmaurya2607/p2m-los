"use client";

import React, { useMemo, useState } from "react";
import { Calculator, Target, PieChart, IndianRupee } from "lucide-react";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const EmiDashboard = () => {
  const [amount, setAmount] = useState(500000);
  const [tenure, setTenure] = useState(24);
  const rate = 12.5;

  const { emi, totalPayable, interest, interestPercent } = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const emiValue =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);

    const total = emiValue * tenure;
    const interestValue = total - amount;

    return {
      emi: Math.round(emiValue),
      totalPayable: Math.round(total),
      interest: Math.round(interestValue),
      interestPercent: (interestValue / total) * 100,
    };
  }, [amount, tenure]);

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] px-5 py-16 font-[Inter] md:px-10 lg:px-20 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2">
        {/* Left */}
        <div>
          <div className="flex items-center gap-3">
            <IconBox icon={<Calculator size={24} />} color="text-[#3737C1]" />
            <IconBox icon={<Target size={24} />} color="text-[#00C89C]" />
            <IconBox icon={<PieChart size={24} />} color="text-[#FF9F1C]" />
          </div>

          <h2 className="mt-6 text-[40px] font-black leading-[42px] tracking-[-1.2px] text-[#0F172A] md:text-[48px] md:leading-[48px]">
            Smart <br />
            <span className="text-[#3737C1]">EMI Planning</span>
          </h2>

          <p className="mt-8 max-w-[448px] text-[18px] leading-[29px] text-[#45556C]">
            Design your repayment schedule the way you want. Transparent fees,
            instant breakdown, and absolute control over your finances.
          </p>

          <div className="mt-9 space-y-4">
            {[
              "Adjust tenure in real-time",
              "See instant interest breakdowns",
              "Zero hidden charges",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00C89C]/20">
                  <span className="h-2 w-2 rounded-full bg-[#00C89C]" />
                </span>
                <span className="text-[16px] font-semibold text-[#314158]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator */}
        <div className="relative">
          <div className="absolute -inset-12 rounded-full bg-[linear-gradient(90deg,rgba(0,200,156,0.1),rgba(55,55,193,0.1))] blur-[64px]" />

          <div className="relative rounded-[32px] border border-white bg-white/80 p-6 shadow-[0px_30px_60px_rgba(15,23,42,0.08)] md:rounded-[40px] md:p-[33px]">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-bold text-[#0F172A]">
                EMI Calculator
              </h3>
              <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-[14px] font-semibold text-[#3737C1]">
                {rate}% p.a.
              </span>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-[243px_1fr]">
              <div className="space-y-8">
                <RangeInput
                  label="Loan Amount"
                  value={amount}
                  min={50000}
                  max={2000000}
                  step={50000}
                  minLabel="₹50K"
                  maxLabel="₹20L"
                  display={formatINR(amount)}
                  onChange={setAmount}
                />

                <RangeInput
                  label="Tenure (Months)"
                  value={tenure}
                  min={3}
                  max={60}
                  step={1}
                  minLabel="3m"
                  maxLabel="60m"
                  display={`${tenure} Months`}
                  onChange={setTenure}
                />
              </div>

              <div>
                <div className="relative mx-auto h-40 w-40">
                  <div
                    className="h-full w-full rounded-full"
                    style={{
                      background: `conic-gradient(#3737C1 0 ${interestPercent}%, #00C89C ${interestPercent}% 100%)`,
                    }}
                  />
                  <div className="absolute inset-[20px] flex flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-[12px] font-semibold text-[#90A1B9]">
                      Monthly EMI
                    </span>
                    <strong className="text-[18px] font-black text-[#0F172A]">
                      {formatINR(emi)}
                    </strong>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <InfoRow color="#00C89C" label="Principal" value={formatINR(amount)} />
                  <InfoRow color="#3737C1" label="Interest" value={formatINR(interest)} />
                </div>
              </div>
            </div>

            <button className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-[14px] bg-[#0F172A] text-[16px] font-bold text-white shadow-lg">
              <IndianRupee size={20} />
              Proceed with this EMI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const IconBox = ({ icon, color }: { icon: React.ReactNode; color: string }) => (
  <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] bg-white shadow ${color}`}>
    {icon}
  </div>
);

const RangeInput = ({
  label,
  value,
  min,
  max,
  step,
  display,
  minLabel,
  maxLabel,
  onChange,
}: any) => (
  <div>
    <div className="flex justify-between text-[14px]">
      <label className="font-semibold text-[#62748E]">{label}</label>
      <span className="font-bold text-[#0F172A]">{display}</span>
    </div>

    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="mt-5 h-2 w-full cursor-pointer accent-[#00C89C]"
    />

    <div className="mt-2 flex justify-between text-[12px] font-medium text-[#90A1B9]">
      <span>{minLabel}</span>
      <span>{maxLabel}</span>
    </div>
  </div>
);

const InfoRow = ({ color, label, value }: any) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[14px] font-medium text-[#62748E]">{label}</span>
    </div>
    <strong className="text-[14px] text-[#0F172A]">{value}</strong>
  </div>
);

export default EmiDashboard;