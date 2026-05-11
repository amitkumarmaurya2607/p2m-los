import GrievanceRedressal from "@/views/GrievanceRedressal/GrievanceRedressal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grievance Redressal & Corporate Governance | RinSetu",
  description: "Understand our complaint resolution process, escalation matrix, and corporate governance framework. RBI-compliant grievance redressal for your peace of mind.",
};

export default function GrievanceRedressalPage() {
  return <GrievanceRedressal />;
}
