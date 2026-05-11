"use client";

import React, { useState, useEffect } from "react";
import { 
  Info, 
  ChevronRight, 
  ChevronDown,
  AlertTriangle,
  Globe,
  UserCheck,
  Lock,
  Zap,
  CreditCard,
  CheckCircle2,
  Ban,
  ShieldAlert,
  Scale
} from "lucide-react";
import { COMPANY_DETAILS } from "@/config/company";

const getIcon = (id: string) => {
  switch (id) {
    case "globe": return Globe;
    case "user-check": return UserCheck;
    case "lock": return Lock;
    case "zap": return Zap;
    case "credit-card": return CreditCard;
    case "check": return CheckCircle2;
    case "ban": return Ban;
    case "shield": return ShieldAlert;
    case "scale": return Scale;
    default: return Info;
  }
};

export default function TermsClient({ sections }: { sections: any[] }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [isMobileAccordionOpen, setIsMobileAccordionOpen] = useState<Record<string, boolean>>({
    [sections[0]?.id]: true
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
      
      for (const section of sections) {
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
  }, [sections]);

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <aside className="hidden lg:block lg:w-1/4">
        <div className="sticky top-28 space-y-2 bg-surface p-6 rounded-3xl border border-border shadow-sm">
          <h3 className="text-lg font-bold text-text-heading mb-6 flex items-center gap-2">
            <Info size={20} className="text-primary" />
            Navigation
          </h3>
          <nav className="space-y-1">
            {sections.map((section) => (
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

      <div className="lg:w-3/4 space-y-8">
        {sections.map((section) => {
          const IconComponent = getIcon(section.iconId);
          return (
            <div 
              key={section.id} 
              id={section.id}
              className={`bg-surface rounded-3xl border transition-all duration-500 ${
                activeSection === section.id ? "border-secondary/30 shadow-xl shadow-secondary/5" : "border-border"
              }`}
            >
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
                    <IconComponent size={24} />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-black tracking-tight">
                    {section.title}
                  </h2>
                </div>
                <ChevronDown size={20} className={`lg:hidden transition-transform ${isMobileAccordionOpen[section.id] ? "rotate-180" : ""}`} />
              </div>

              <div className={`px-6 pb-8 lg:px-8 lg:pb-10 transition-all overflow-hidden ${
                isMobileAccordionOpen[section.id] ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100"
              }`}>
                <div className="lg:pl-16 text-text-secondary leading-relaxed text-lg">
                  {section.content}
                </div>
              </div>
            </div>
          );
        })}

        {/* Support Section */}
        <div id="grievance" className="bg-surface rounded-3xl border border-border p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Info size={24} />
            </div>
            <h2 className="text-xl lg:text-2xl font-black tracking-tight text-text-heading">
              10. Support & Grievance
            </h2>
          </div>
          <div className="lg:pl-16 space-y-4">
            <p className="text-text-secondary">For any queries or grievances regarding our terms or services, please contact our support team or the Nodal Officer as detailed below:</p>
            <div className="p-6 bg-surface-muted rounded-2xl border border-border">
              <p className="font-bold text-text-heading">{COMPANY_DETAILS.grievanceOfficer.name}</p>
              <p className="text-sm text-text-secondary">{COMPANY_DETAILS.grievanceOfficer.designation}</p>
              <p className="text-sm text-primary mt-2 font-bold">{COMPANY_DETAILS.grievanceOfficer.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
