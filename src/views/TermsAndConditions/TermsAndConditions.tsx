"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  FileText, 
  UserCheck, 
  CreditCard, 
  ShieldAlert, 
  Scale, 
  HelpCircle,
  ChevronRight, 
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Info,
  Zap,
  Lock,
  Globe,
  Ban,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { COMPANY_DETAILS } from "@/config/company";

interface TermSection {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

const TERMS_SECTIONS: TermSection[] = [
  {
    id: "platform-usage",
    title: "1. Platform Usage",
    icon: Globe,
    content: (
      <div className="space-y-4">
        <p>By accessing or using the RinSetu platform, you agree to be bound by these Terms and Conditions. Our platform acts as a facilitator between you and our RBI-registered NBFC/Bank partners for the purpose of loan origination and management.</p>
        <p>The use of this platform is subject to your compliance with all applicable laws and regulations of India.</p>
      </div>
    )
  },
  {
    id: "eligibility",
    title: "2. User Eligibility",
    icon: UserCheck,
    content: (
      <div className="space-y-4">
        <p>To use our services, you must fulfill the following criteria:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must be a citizen and resident of India.</li>
          <li>You must be at least 21 years of age at the time of application.</li>
          <li>You must have a valid PAN (Permanent Account Number) and Aadhaar Card.</li>
          <li>You must have a steady source of income (Salaried or Self-Employed).</li>
          <li>You must have a valid bank account with an Indian bank.</li>
        </ul>
      </div>
    )
  },
  {
    id: "kyc-verification",
    title: "3. Registration & KYC",
    icon: Lock,
    content: (
      <div className="space-y-4">
        <p>When you register on RinSetu, you agree to provide accurate and complete information. As part of our regulatory obligations, we perform digital KYC (Know Your Customer) verification.</p>
        <p>You authorize RinSetu and its lending partners to verify your identity using Aadhaar e-KYC, PAN verification, and other digital tools. Any discrepancy in the information provided may lead to the immediate rejection of your application.</p>
      </div>
    )
  },
  {
    id: "loan-process",
    title: "4. Loan Application & Approval",
    icon: Zap,
    content: (
      <div className="space-y-4">
        <p>Submitting an application on our platform does not guarantee a loan. The final approval is at the sole discretion of our lending partners (NBFCs/Banks) based on their internal credit policies and risk assessment.</p>
        <p>We use AI-driven algorithms to analyze your creditworthiness, which includes fetching your credit report from authorized bureaus like CIBIL, Experian, or Equifax. By applying, you provide your explicit consent for such credit checks.</p>
      </div>
    )
  },
  {
    id: "charges",
    title: "5. Interest & Charges",
    icon: CreditCard,
    content: (
      <div className="space-y-4">
        <p>All financial terms, including Interest Rates (APR), Processing Fees, and Documentation Charges, will be clearly outlined in your Loan Agreement (Sanction Letter) before you sign it digitally.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Processing Fee:</strong> A one-time non-refundable fee deducted from the disbursed amount.</li>
          <li><strong>Interest:</strong> Calculated on a reducing balance basis or as specified in your agreement.</li>
          <li><strong>Late Payment Charges:</strong> Penalties apply if EMIs are not paid by the due date.</li>
          <li><strong>Foreclosure:</strong> Early repayment is permitted subject to the conditions and charges mentioned in the agreement.</li>
        </ul>
      </div>
    )
  },
  {
    id: "repayment",
    title: "6. Repayment Obligations",
    icon: CheckCircle2,
    content: (
      <div className="space-y-4">
        <p>You agree to repay the loan in equated monthly installments (EMIs) through automated mandates (e-NACH/e-Mandate) or other approved digital payment methods.</p>
        <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/20 flex gap-4 items-start">
          <AlertTriangle className="text-secondary shrink-0 mt-1" size={20} />
          <p className="text-sm font-medium text-text-secondary">Failure to repay on time will result in late fees, a negative impact on your CIBIL score, and may lead to legal recovery actions by our lending partners.</p>
        </div>
      </div>
    )
  },
  {
    id: "prohibited",
    title: "7. Prohibited Activities",
    icon: Ban,
    content: (
      <div className="space-y-4">
        <p>You agree NOT to use the platform for:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Providing false or misleading financial information.</li>
          <li>Laundering money or any other illegal financial activities.</li>
          <li>Attempting to hack, disrupt, or interfere with the platform's security.</li>
          <li>Using the loan amount for speculative or illegal purposes.</li>
        </ul>
      </div>
    )
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    icon: ShieldAlert,
    content: (
      <div className="space-y-4">
        <p>RinSetu and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the platform.</p>
        <p>While we strive for 100% uptime, we do not guarantee that the platform will always be available or free from errors or viruses.</p>
      </div>
    )
  },
  {
    id: "governing-law",
    title: "9. Governing Law",
    icon: Scale,
    content: (
      <div className="space-y-4">
        <p>These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Gurgaon, Haryana.</p>
      </div>
    )
  },
  {
    id: "grievance",
    title: "10. Support & Grievance",
    icon: HelpCircle,
    content: (
      <div className="space-y-4">
        <p>For any queries or grievances regarding our terms or services, please contact our support team or the Nodal Officer as detailed below:</p>
        <div className="p-6 bg-surface-muted rounded-2xl border border-border mt-4">
          <p className="font-bold text-text-heading">{COMPANY_DETAILS.grievanceOfficer.name}</p>
          <p className="text-sm text-text-secondary">{COMPANY_DETAILS.grievanceOfficer.designation}</p>
          <p className="text-sm text-primary mt-2 font-bold">{COMPANY_DETAILS.grievanceOfficer.email}</p>
        </div>
      </div>
    )
  }
];

const TermsAndConditionsView = () => {
  const [activeSection, setActiveSection] = useState("platform-usage");
  const [isMobileAccordionOpen, setIsMobileAccordionOpen] = useState<Record<string, boolean>>({
    "platform-usage": true
  });

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
      
      for (const section of TERMS_SECTIONS) {
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
        <div className="absolute top-[-200px] left-[-100px] w-[700px] h-[700px] bg-secondary/10 blur-[80px] rounded-full" />
        
        <div className="container mx-auto relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border shadow-sm text-primary text-xs font-bold mb-6 uppercase tracking-widest">
            <FileText size={14} className="text-secondary" />
            <span>Legal Agreement</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-text-heading leading-tight mb-6">
            Terms & Conditions
          </h1>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg font-bold text-sm">
              <CheckCircle2 size={16} />
              Last Updated: May 11, 2026
            </div>
            <p className="text-text-secondary max-w-2xl leading-relaxed">
              Please read these terms carefully before using RinSetu. These terms constitute a legally binding agreement between you and RinSetu Finance.
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
                  <Info size={20} className="text-primary" />
                  Navigation
                </h3>
                <nav className="space-y-1">
                  {TERMS_SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${
                        activeSection === section.id 
                          ? "bg-secondary text-white shadow-lg shadow-secondary/20 scale-105" 
                          : "text-text-secondary hover:bg-secondary/5 hover:text-secondary"
                      }`}
                    >
                      {section.title.split(". ")[1]}
                      <ChevronRight size={14} className={`transition-transform ${activeSection === section.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100"}`} />
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Terms Sections */}
            <div className="lg:w-3/4 space-y-8">
              {TERMS_SECTIONS.map((section) => (
                <div 
                  key={section.id} 
                  id={section.id}
                  className={`bg-surface rounded-3xl border transition-all duration-500 ${
                    activeSection === section.id ? "border-secondary/30 shadow-xl shadow-secondary/5" : "border-border"
                  }`}
                >
                  {/* Header */}
                  <div 
                    className={`p-6 lg:p-8 flex items-center justify-between cursor-pointer lg:cursor-default ${
                      activeSection === section.id ? "text-secondary" : "text-text-heading"
                    }`}
                    onClick={() => toggleAccordion(section.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        activeSection === section.id ? "bg-secondary text-white" : "bg-secondary/10 text-secondary"
                      }`}>
                        <section.icon size={24} />
                      </div>
                      <h2 className="text-xl lg:text-2xl font-black tracking-tight">
                        {section.title}
                      </h2>
                    </div>
                    <ChevronDown size={20} className={`lg:hidden transition-transform ${isMobileAccordionOpen[section.id] ? "rotate-180" : ""}`} />
                  </div>

                  {/* Content */}
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

      {/* Trust Section */}
      <section className="py-24 bg-surface-muted border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8">
            <Zap className="text-primary" size={40} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-text-heading mb-6 tracking-tight">Built on Trust and Transparency</h2>
          <p className="text-text-secondary max-w-3xl mx-auto text-lg leading-relaxed">
            At RinSetu, we believe that clear communication is the foundation of a great financial partnership. Our terms are designed to be fair, legal, and easy to understand.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative bg-dark-navy rounded-[40px] p-8 md:p-16 overflow-hidden text-center shadow-2xl">
            <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-secondary/20 blur-[100px] -z-10" />
            <div className="absolute bottom-[-130px] left-[-100px] w-[500px] h-[500px] bg-primary/15 blur-[100px] -z-10" />
            
            <MessageCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Need help understanding our terms?</h2>
            <p className="text-text-on-dark-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Our legal and support teams are happy to clarify any points mentioned in these terms. We are committed to absolute transparency.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="px-10 py-5 bg-primary hover:brightness-110 text-white rounded-full font-bold text-lg shadow-lg transition-all flex items-center gap-3 group">
                Talk to Support
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-lg backdrop-blur-md transition-all">
                Learn About Our Process
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditionsView;
