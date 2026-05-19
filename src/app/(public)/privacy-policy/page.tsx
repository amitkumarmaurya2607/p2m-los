import PrivacyPolicyView from "@/views/PrivacyPolicy/PrivacyPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RinSetu",
  description:
    "Read RinSetu's privacy policy to understand how we collect, use, and protect your personal and financial data.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}
