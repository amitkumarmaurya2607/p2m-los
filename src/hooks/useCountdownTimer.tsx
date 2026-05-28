"use client";
import { useState, useEffect, useCallback } from "react";

export const useCountdownTimer = (initialSeconds: number) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const isActive = timeLeft > 0;

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  return { timeLeft, isActive, resetTimer };
};
