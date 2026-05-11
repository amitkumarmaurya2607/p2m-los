"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Shield, 
  Lock, 
  FileText, 
  User, 
  Database, 
  Eye, 
  ChevronRight, 
  ArrowRight,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  Info,
  Key,
  Smartphone,
  Share2,
  CheckCircle2
} from "lucide-react";
import { COMPANY_DETAILS } from "@/config/company";

interface PolicySection {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: Info,
    content: (
      <div className="space-y-4">
        <p>Welcome to RinSetu. We value the trust you place in us and are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website and mobile application.</p>
        <p>By using our services, you agree to the collection and use of information in accordance with this policy. We follow all applicable laws in India, including the Information Technology Act, 2000 and the Digital Personal Data Protection (DPDP) Act, 2023.</p>
      </div>
    )
  },
  {
    id: "collection",
    title: "2. Information We Collect",
    icon: Database,
    content: (
      <div className="space-y-4">
        <p>To provide our digital lending services, we collect various types of information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Personal Identifiable Information (PII):</strong> Full name, date of birth, gender, and contact details (email, phone number).</li>
          <li><strong>KYC Documents:</strong> Digital copies of PAN Card, Aadhaar Card, and photographs for identity verification as per RBI guidelines.</li>
          <li><strong>Financial Information:</strong> Bank account statements, income details, salary slips, and employment history.</li>
          <li><strong>Credit Information:</strong> Credit scores and credit history fetched from authorized Credit Information Companies (Bureaus).</li>
        </ul>
      </div>
    )
  },
  {
    id: "device-data",
    title: "3. Device & Usage Data",
    icon: Smartphone,
    content: (
      <div className="space-y-4">
        <p>When you use the RinSetu app, we collect certain data to prevent fraud and assess creditworthiness:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Device Info:</strong> Model, OS version, unique device identifiers, and network information.</li>
          <li><strong>Location:</strong> One-time or periodic location access to ensure service availability and prevent fraudulent applications.</li>
          <li><strong>App Metadata:</strong> List of installed applications to analyze financial behavior and risk patterns.</li>
          <li><strong>SMS Metadata:</strong> We only collect transaction-related SMS metadata (not personal messages) to calculate your debt-to-income ratio.</li>
        </ul>
      </div>
    )
  },
  {
    id: "usage",
    title: "4. How We Use Your Data",
    icon: Eye,
    content: (
      <div className="space-y-4">
        <p>We use the collected information for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To verify your identity and perform KYC checks.</li>
          <li>To assess your creditworthiness and loan eligibility using our proprietary AI algorithms.</li>
          <li>To facilitate loan processing and disbursal with our RBI-registered NBFC partners.</li>
          <li>To communicate with you regarding your application, repayment schedules, and promotional offers.</li>
          <li>To detect, prevent, and address fraud or security issues.</li>
        </ul>
      </div>
    )
  },
  {
    id: "sharing",
    title: "5. Data Sharing & Disclosure",
    icon: Share2,
    content: (
      <div className="space-y-4">
        <p>We do not sell your personal data. We only share information with:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Lending Partners:</strong> RBI-registered NBFCs and Banks that actually provide the credit.</li>
          <li><strong>Service Providers:</strong> Cloud hosting, KYC verification agencies, and payment gateways.</li>
          <li><strong>Credit Bureaus:</strong> As required by law to report loan status and repayment history.</li>
          <li><strong>Legal Authorities:</strong> When required by law to comply with legal processes or government requests.</li>
        </ul>
      </div>
    )
  },
  {
    id: "security",
    title: "6. Data Security",
    icon: Lock,
    content: (
      <div className="space-y-4">
        <p>We implement bank-grade security measures to protect your data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Encryption:</strong> All data is transmitted over secure 256-bit SSL/TLS encryption.</li>
          <li><strong>Storage:</strong> Data is stored on secure servers located within India, compliant with RBI data residency guidelines.</li>
          <li><strong>Access Control:</strong> Strict internal access controls ensure that only authorized personnel can access sensitive information.</li>
        </ul>
      </div>
    )
  },
  {
    id: "rights",
    title: "7. Your Rights",
    icon: User,
    content: (
      <div className="space-y-4">
        <p>Under the DPDP Act, you have the following rights:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Right to Correction:</strong> Ask us to update or correct any inaccurate information.</li>
          <li><strong>Right to Withdrawal:</strong> Withdraw your consent for data processing at any time (this may affect our ability to provide services).</li>
          <li><strong>Right to Erasure:</strong> Request the deletion of your data when it's no longer needed for the purpose it was collected.</li>
        </ul>
      </div>
    )
  },
  {
    id: "grievance",
    title: "8. Grievance Redressal",
    icon: FileText,
    content: (
      <div className="space-y-4 p-6 bg-surface-muted rounded-2xl border border-border">
        <p className="font-bold text-text-heading">Grievance Officer:</p>
        <p className="text-text-secondary">If you have any queries or complaints regarding this policy, please reach out to our Grievance Redressal Officer:</p>
        <div className="mt-4 text-sm">
          <p><strong>Name:</strong> {COMPANY_DETAILS.grievanceOfficer.name}</p>
          <p><strong>Designation:</strong> {COMPANY_DETAILS.grievanceOfficer.designation}</p>
          <p><strong>Email:</strong> {COMPANY_DETAILS.grievanceOfficer.email}</p>
          <p><strong>Address:</strong> {COMPANY_DETAILS.grievanceOfficer.address}</p>
        </div>
      </div>
    )
  }
];

const PrivacyPolicyView = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isMobileAccordionOpen, setIsMobileAccordionOpen] = useState<Record<string, boolean>>({
    introduction: true
  });

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const toggleAccordion = (id: string) => {
    setIsMobileAccordionOpen(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const section of POLICY_SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 lg:px-12 bg-surface-muted overflow-hidden">
        <div className="absolute top-[-200px] right-[-100px] w-[700px] h-[700px] bg-primary/10 blur-[80px] rounded-full" />
        
        <div className="container mx-auto relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border shadow-sm text-primary text-xs font-bold mb-6 uppercase tracking-widest">
            <Shield size={14} className="text-secondary" />
            <span>Privacy & Security</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-text-heading leading-tight mb-6">
            Privacy Policy
          </h1>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/10 text-secondary rounded-lg font-bold text-sm">
              <CheckCircle2 size={16} />
              Last Updated: May 11, 2026
            </div>
            <p className="text-text-secondary max-w-2xl leading-relaxed">
              We care about your privacy. This policy outlines how RinSetu collects and uses your data to provide a secure lending experience.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sticky TOC (Desktop) */}
            <aside className="hidden lg:block lg:w-1/4">
              <div className="sticky top-28 space-y-2 bg-surface p-6 rounded-3xl border border-border shadow-sm">
                <h3 className="text-lg font-bold text-text-heading mb-6 flex items-center gap-2">
                  <FileText size={20} className="text-primary" />
                  Contents
                </h3>
                <nav className="space-y-1">
                  {POLICY_SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${
                        activeSection === section.id 
                          ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                          : "text-text-secondary hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      {section.title.split(". ")[1]}
                      <ChevronRight size={14} className={`transition-transform ${activeSection === section.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100"}`} />
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Policy Sections */}
            <div className="lg:w-3/4 space-y-8">
              {POLICY_SECTIONS.map((section) => (
                <div 
                  key={section.id} 
                  id={section.id}
                  className={`bg-surface rounded-3xl border transition-all duration-500 ${
                    activeSection === section.id ? "border-primary/30 shadow-xl shadow-primary/5" : "border-border"
                  }`}
                >
                  {/* Desktop Title / Mobile Accordion Header */}
                  <div 
                    className={`p-6 lg:p-8 flex items-center justify-between cursor-pointer lg:cursor-default ${
                      activeSection === section.id ? "text-primary" : "text-text-heading"
                    }`}
                    onClick={() => toggleAccordion(section.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        activeSection === section.id ? "bg-primary text-white" : "bg-primary/10 text-primary"
                      }`}>
                        <section.icon size={24} />
                      </div>
                      <h2 className="text-xl lg:text-2xl font-black tracking-tight">
                        {section.title}
                      </h2>
                    </div>
                    <ChevronDown size={20} className={`lg:hidden transition-transform ${isMobileAccordionOpen[section.id] ? "rotate-180" : ""}`} />
                  </div>

                  {/* Content (Always visible on desktop, toggle on mobile) */}
                  <div className={`px-6 pb-8 lg:px-8 lg:pb-10 transition-all overflow-hidden ${
                    isMobileAccordionOpen[section.id] ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100"
                  }`}>
                    <div className="lg:pl-16 text-text-secondary leading-relaxed text-lg">
                      {section.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Features Marquee/Grid */}
      <section className="py-20 bg-surface-muted border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-text-heading mb-4">Our Security Standards</h2>
            <p className="text-text-secondary">We use industry-leading technologies to keep your data safe.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "256-bit SSL", desc: "Military grade encryption for all data transfers." },
              { icon: Lock, title: "Secure Storage", desc: "All data is hosted on secure Indian servers." },
              { icon: Key, title: "Access Control", desc: "Strict biometric and MFA for internal systems." },
              { icon: CheckCircle2, title: "PCI DSS Compliant", desc: "Safe handling of all payment information." }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-surface rounded-[28px] border border-border flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm group-hover:shadow-lg">
                  <item.icon className="text-secondary" size={32} />
                </div>
                <h3 className="font-bold text-text-heading mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative bg-dark-navy rounded-[40px] p-8 md:p-16 overflow-hidden text-center shadow-2xl">
            <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-primary/20 blur-[100px] -z-10" />
            <div className="absolute bottom-[-130px] left-[-100px] w-[500px] h-[500px] bg-secondary/15 blur-[100px] -z-10" />
            
            <MessageCircle className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Have questions about your privacy?</h2>
            <p className="text-text-on-dark-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Our data protection team is here to help you understand how we manage your information. Feel free to reach out.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="px-10 py-5 bg-secondary hover:brightness-110 text-white rounded-full font-bold text-lg shadow-lg transition-all flex items-center gap-3 group">
                Contact Data Team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/faq" className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-lg backdrop-blur-md transition-all">
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
