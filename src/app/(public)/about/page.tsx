import About from "@/views/About/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | P2M LOS",
  description: "Learn more about P2M LOS, our mission, vision, and how we are revolutionizing the fintech loan origination space.",
};

export default function AboutPage() {
  return <About />;
}
