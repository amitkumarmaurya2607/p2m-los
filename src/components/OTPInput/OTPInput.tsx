'use client'
import React, { useState, useEffect, useRef } from 'react';

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

const OTPInput = ({ length = 6, onComplete }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    const val = value.slice(-1);
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const combined = newOtp.join("");
    if (combined.length === length) onComplete(combined);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(data)) return;

    const pasteData = data.split("").slice(0, length);
    const newOtp = [...otp];
    
    pasteData.forEach((char, i) => {
      newOtp[i] = char;
      if (inputRefs.current[i]) {
        inputRefs.current[i]!.value = char;
      }
    });

    setOtp(newOtp);
    const lastIdx = Math.min(pasteData.length, length - 1);
    inputRefs.current[lastIdx]?.focus();

    if (newOtp.join("").length === length) onComplete(newOtp.join(""));
  };

  return (
    <div className="flex justify-between gap-2" onPaste={handlePaste}>
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => { inputRefs.current[idx] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="
            w-[56px] h-[64px]
            text-center text-[20px] font-bold
            bg-input-bg
            border-2 border-input-border
            rounded-[16px]
            shadow-[var(--shadow-sm)]
            outline-none
            transition-all duration-200
            focus:border-secondary
            focus:ring-2 focus:ring-secondary/30
          "
        />
      ))}
    </div>
  );
};

export default OTPInput;
