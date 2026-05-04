import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidMobile = (value: string) => {
  // Indian mobile: +91XXXXXXXXXX or 10 digit
  return /^(\+91)?[6-9]\d{9}$/.test(value.replace(/\s/g, ""));
};

export const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};