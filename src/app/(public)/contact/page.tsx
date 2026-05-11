import Contact from "@/views/Contact/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | P2M LOS",
  description: "Get in touch with our financial advisors. We are here to help you with your loan applications and queries.",
};

export default function ContactPage() {
  return <Contact />;
}
