"use client";

import React, { useEffect, useRef, useState } from "react";

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
  version?: "v1" | "v2";
}

const OTPInput = ({
  length = 6,
  onComplete,
  version = "v2",
}: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    const val = value.slice(-1);

    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const combined = newOtp.join("");

    if (combined.length === length && !newOtp.includes("")) {
      onComplete(combined);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const data = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(data)) return;

    const pasteData = data.slice(0, length).split("");
    const newOtp = [...otp];

    pasteData.forEach((char, i) => {
      newOtp[i] = char;
    });

    setOtp(newOtp);

    const lastIndex = pasteData.length - 1;
    inputRefs.current[lastIndex]?.focus();

    if (newOtp.join("").length === length && !newOtp.includes("")) {
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div
      className={
        version === "v2"
          ? "mx-auto flex w-full max-w-[430px] justify-between gap-2 sm:gap-3"
          : "mx-auto flex w-full max-w-[360px] justify-between gap-1 sm:gap-2"
      }
      onPaste={handlePaste}
    >
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          type="password"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onFocus={(e) => e.target.select()}
          className={
            version === "v2"
              ? `h-14 w-full max-w-[64px] rounded-2xl bg-[#F8FAFC] text-center text-lg font-bold
                text-foreground shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]
                border border-transparent outline-none transition-all duration-200
                focus:border-primary focus:ring-2 focus:ring-primary/20
                sm:h-16 sm:max-w-[68px] sm:text-xl`
              : `w-full max-w-[56px] aspect-[7/8] text-center text-[18px] sm:text-[20px] font-bold
                bg-input-bg border-2 border-input-border rounded-[12px] sm:rounded-[16px]
                shadow-[var(--shadow-sm)] outline-none transition-all duration-200
                focus:border-secondary focus:ring-2 focus:ring-secondary/30`
          }
        />
      ))}
    </div>
  );
};

export default OTPInput;