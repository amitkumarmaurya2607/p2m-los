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

export const isValidPinCode = (value: string): boolean => {
  return /^[0-9]{6}$/.test(value);
};

export const isValidIFSCCode = (value: string): boolean => {
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value);
};

export const isValidPAN = (value: string): boolean => {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
};

export const isValidAadhaar = (value: string): boolean => {
  return /^\d{12}$/.test(value);
};

export const isValidOTP = (value: string, length = 6): boolean => {
  return new RegExp(`^\\d{${length}}$`).test(value);
};

export const sanitizeEmail = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9@._-]/g, "");
};

export const sanitizeNumeric = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const sanitizePAN = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
};

export const sanitizeIFSC = (value: string): string => {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
};

export const maskEmail = (email: string): string => {
  return email.replace(/(.{2}).+(@.+)/, "$1****$2");
};

export const maskMobile = (mobile: string): string => {
  const digits = mobile.replace(/\D/g, "");
  return "+91 " + digits.slice(3).replace(/(?=.{4})/g, "*");
};

export const formatMobile = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 5) return digits ? "+91 " + digits : "";
  return "+91 " + digits.slice(0, 5) + " " + digits.slice(5);
};


export const cleanAddress = (
  address: string,
  city?: string,
  state?: string,
  pincode?: string,
  country: string = "India"
) => {
  let cleaned = address;

  const removeValues = [pincode, city, state, country].filter(Boolean);

  removeValues.forEach((value) => {
    cleaned = cleaned.replace(new RegExp(`,?\\s*${value}\\s*,?`, "gi"), ",");
  });

  return cleaned
    .replace(/,+/g, ",")
    .replace(/^,\s*|\s*,$/g, "")
    .trim();
};