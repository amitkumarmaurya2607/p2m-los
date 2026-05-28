import React from "react";
import Link from "next/link";
import { Shield, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import PrivacyClient from "./PrivacyClient";

const PRIVACY_SECTIONS = [
  {
    id: "introduction",
    title: "1. Introduction",
    iconId: "info",
    content:
      "Welcome to RinSetu. We value the trust you place in us and are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website and mobile application. By using our services, you agree to the collection and use of information in accordance with this policy. We follow all applicable laws in India, including the Information Technology Act, 2000 and the Digital Personal Data Protection (DPDP) Act, 2023.",
  },
  {
    id: "collection",
    title: "2. Information We Collect",
    iconId: "database",
    content:
      "To provide our digital lending services, we collect various types of information: Personal Identifiable Information (PII) like name and contact details; KYC Documents like digital copies of PAN and Aadhaar; Financial Information like bank statements and income details; and Credit Information fetched from authorized bureaus.",
  },
  {
    id: "device-data",
    title: "3. Device & Usage Data",
    iconId: "smartphone",
    content:
      "When you use the RinSetu app, we collect certain data to prevent fraud and assess creditworthiness: Device Info (model, OS version); Location access to ensure service availability; App Metadata for risk patterns; and transaction-related SMS Metadata to calculate debt-to-income ratios.",
  },
  {
    id: "usage",
    title: "4. How We Use Your Data",
    iconId: "eye",
    content:
      "We use the collected information to: verify your identity and perform KYC checks; assess your creditworthiness and loan eligibility; facilitate loan processing and disbursal with our RBI-registered NBFC partners; and communicate with you regarding your application and security.",
  },
  {
    id: "sharing",
    title: "5. Data Sharing & Disclosure",
    iconId: "share",
    content:
      "We do not sell your personal data. We only share information with: RBI-registered Lending Partners; Service Providers like cloud hosting and payment gateways; Credit Bureaus; and Legal Authorities when required by law.",
  },
  {
    id: "security",
    title: "6. Data Security",
    iconId: "lock",
    content:
      "We implement bank-grade security measures to protect your data: 256-bit SSL/TLS encryption for transmission; Data storage on secure servers within India compliant with RBI guidelines; and strict internal access controls.",
  },
  {
    id: "rights",
    title: "7. Your Rights",
    iconId: "user",
    content:
      "Under the DPDP Act, you have the following rights: Right to Access your data; Right to Correction of inaccurate information; Right to Withdrawal of consent; and Right to Erasure when data is no longer needed.",
  },
];

const PrivacyPolicyView = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section - SSR */}
      <section className="relative pt-24 pb-20 px-6 lg:px-12 bg-surface-muted overflow-hidden">
        <div
          className="absolute top-[-200px] right-[-100px] w-[700px] h-[700px] bg-primary/10
            blur-[80px] rounded-full"
        />

        <div className="container mx-auto relative z-10 text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border
              border-border shadow-sm text-primary text-xs font-bold mb-6 uppercase tracking-widest"
          >
            <Shield size={14} className="text-secondary" />
            <span>Privacy & Security</span>
          </div>

          <h1
            className="text-4xl lg:text-6xl font-black tracking-tight text-text-heading
              leading-tight mb-6"
          >
            Privacy Policy
          </h1>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <div
              className="flex items-center gap-2 px-3 py-1.5 bg-secondary/10 text-secondary
                rounded-lg font-bold text-sm"
            >
              <CheckCircle2 size={16} />
              Last Updated: May 11, 2026
            </div>
            <p className="text-text-secondary max-w-2xl leading-relaxed">
              We care about your privacy. This policy outlines how RinSetu collects and uses your
              data to provide a secure lending experience.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Content - Client Hydrated */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-12">
          <PrivacyClient sections={PRIVACY_SECTIONS} />
        </div>
      </section>

      {/* Static Footer Section - SSR */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div
            className="relative bg-dark-navy rounded-[40px] p-8 md:p-16 overflow-hidden text-center
              shadow-2xl"
          >
            <div
              className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-primary/20
                blur-[100px] -z-10"
            />
            <div
              className="absolute bottom-[-130px] left-[-100px] w-[500px] h-[500px] bg-secondary/15
                blur-[100px] -z-10"
            />

            <MessageCircle className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Have questions about your privacy?
            </h2>
            <p
              className="text-text-on-dark-muted text-lg md:text-xl max-w-2xl mx-auto mb-10
                leading-relaxed"
            >
              Our data protection team is here to help you understand how we manage your
              information. Feel free to reach out.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="px-10 py-5 bg-secondary hover:brightness-110 text-white rounded-full
                  font-bold text-lg shadow-lg transition-all flex items-center gap-3 group"
              >
                Contact Data Team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/faq"
                className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border
                  border-white/20 rounded-full font-bold text-lg backdrop-blur-md transition-all"
              >
                Security FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyView;
