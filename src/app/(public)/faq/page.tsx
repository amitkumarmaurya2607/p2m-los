import FAQView from "@/views/FAQ/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | RinSetu",
  description:
    "Find answers to your questions about loan eligibility, documentation, repayment, and security at RinSetu.",
};

export default function FAQPage() {
  return <FAQView />;
}
