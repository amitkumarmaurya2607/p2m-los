import TermsAndConditionsView from "@/views/TermsAndConditions/TermsAndConditions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | RinSetu",
  description: "Read the Terms and Conditions of RinSetu Finance. Understand your rights, obligations, and the rules governing our digital lending platform.",
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsView />;
}
