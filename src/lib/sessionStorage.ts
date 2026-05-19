import {
  Smartphone,
  MapPin,
  CreditCard,
  User,
  ShieldCheck,
  Landmark,
  Upload,
  Briefcase,
  Camera,
  FileText,
  Phone,
  BadgeCheck,
} from "lucide-react";

export type StepStatus = "pending" | "progress" | "complete";

export type StepItem = {
  id: number;
  key: string;
  title: string;
  fullTitle: string;
  icon: React.ElementType;
  iconClassName: string;
  iconContainerClassName: string;
};

export const steps: StepItem[] = [
  {
    id: 1,
    key: "mobile",
    title: "Mobile",
    fullTitle: "Mobile Verification",
    icon: Smartphone,
    iconClassName: "w-5 h-5 text-white",
    iconContainerClassName: "bg-gradient-to-br from-[#6FFFD2] to-[#00C89C]",
  },
  {
    id: 2,
    key: "geoLocation",
    title: "Geo Location",
    fullTitle: "Geo Location",
    icon: MapPin,
    iconClassName: "w-5 h-5 text-white",
    iconContainerClassName: "bg-gradient-to-br from-[#60A5FA] to-[#2563EB]",
  },
  {
    id: 3,
    key: "pan",
    title: "PAN",
    fullTitle: "PAN Verification",
    icon: CreditCard,
    iconClassName: "w-5 h-5 text-white",
    iconContainerClassName: "bg-gradient-to-br from-[#7A7AF5] to-[#3737C1]",
  },
  {
    id: 4,
    key: "personalInfo",
    title: "Personal",
    fullTitle: "Personal Details",
    icon: User,
    iconClassName: "w-5 h-5 text-white",
    iconContainerClassName: "bg-gradient-to-br from-[#FFB86B] to-[#F59E0B]",
  },
  {
    id: 5,
    key: "aadhaar",
    title: "Aadhaar",
    fullTitle: "Aadhaar Verification",
    icon: ShieldCheck,
    iconClassName: "w-5 h-5 text-white",
    iconContainerClassName: "bg-gradient-to-br from-[#A78BFA] to-[#7C3AED]",
  },
  {
    id: 6,
    key: "bankDetails",
    title: "Bank",
    fullTitle: "Bank Details",
    icon: Landmark,
    iconClassName: "w-5 h-5 text-white",
    iconContainerClassName: "bg-gradient-to-br from-[#F472B6] to-[#DB2777]",
  },
  {
    id: 7,
    key: "accountStatement",
    title: "Bank Statement",
    fullTitle: "Account Statement Upload",
    icon: Upload,
    iconClassName: "w-5 h-5 text-white",
    iconContainerClassName: "bg-gradient-to-br from-[#34D399] to-[#059669]",
  },
  {
    id: 8,
    key: "employmentDetails",
    title: "Employment",
    fullTitle: "Employment Details",
    icon: Briefcase,
    iconClassName: "w-5 h-5 text-white",
    iconContainerClassName: "bg-gradient-to-br from-[#FFB86B] to-[#F59E0B]",
  },
  {
    id: 9,
    key: "selfie",
    title: "Selfie",
    fullTitle: "Selfie / Video Verification",
    icon: Camera,
    iconClassName: "w-5 h-5 text-white",
    iconContainerClassName: "bg-gradient-to-br from-[#FB7185] to-[#E11D48]",
  },
  {
    id: 10,
    key: "addressProof",
    title: "Address Proof",
    fullTitle: "Local Address Proof Upload",
    icon: FileText,
    iconClassName: "w-5 h-5 text-white",
    iconContainerClassName: "bg-gradient-to-br from-[#22D3EE] to-[#0891B2]",
  },
  {
    id: 11,
    key: "alternateMobile",
    title: "Alt. Mobile",
    fullTitle: "Alternate Mobile Number",
    icon: Phone,
    iconClassName: "w-5 h-5 text-white",
    iconContainerClassName: "bg-gradient-to-br from-[#F472B6] to-[#DB2777]",
  },
  {
    id: 12,
    key: "loanEligibility",
    title: "Eligibility",
    fullTitle: "Loan Eligibility & Application",
    icon: BadgeCheck,
    iconClassName: "w-5 h-5 text-white",
    iconContainerClassName: "bg-gradient-to-br from-[#A78BFA] to-[#7C3AED]",
  },
] as const;
