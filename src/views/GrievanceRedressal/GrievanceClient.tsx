"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, 
  ChevronRight, 
  ChevronDown,
  MessageSquare,
  TrendingUp,
  Clock,
  Shield,
  UserCheck,
  AlertTriangle,
  Mail,
  MapPin,
  Briefcase
} from "lucide-react";
import { COMPANY_DETAILS } from "@/config/company";

const getIcon = (id: string) => {
  switch (id) {
    case "message-square": return MessageSquare;
    case "trending-up": return TrendingUp;
    case "clock": return Clock;
    case "shield": return Shield;
    case "user-check": return UserCheck;
    case "alert-triangle": return AlertTriangle;
    default: return FileText;
  }
};

export default function GrievanceClient({ sections }: { sections: any[] }) {
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
      {/* Sticky TOC (Desktop) */}
      <aside className="hidden lg:block lg:w-1/4">
        <div className="sticky top-28 space-y-2 bg-surface p-6 rounded-3xl border border-border shadow-sm">
          <h3 className="text-lg font-bold text-text-heading mb-6 flex items-center gap-2">
            <Shield size={20} className="text-primary" />
            Governance
          </h3>
          <nav className="space-y-1">
            {sections.map((section) => (
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
            <button
                onClick={() => scrollToSection("officer-details")}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${
                  activeSection === "officer-details" 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                    : "text-text-secondary hover:bg-primary/5 hover:text-primary"
                }`}
              >
                Officer Details
                <ChevronRight size={14} className={`transition-transform ${activeSection === "officer-details" ? "translate-x-1" : "opacity-0 group-hover:opacity-100"}`} />
              </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:w-3/4 space-y-8">
        {sections.map((section) => {
          const IconComponent = getIcon(section.iconId);
          return (
            <div 
              key={section.id} 
              id={section.id}
              className={`bg-surface rounded-3xl border transition-all duration-500 ${
                activeSection === section.id ? "border-primary/30 shadow-xl shadow-primary/5" : "border-border"
              }`}
            >
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

        {/* Officer Details Section */}
        <div id="officer-details" className="space-y-8">
          <div className="bg-surface rounded-3xl border border-border p-6 lg:p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-text-heading">
                Grievance & Nodal Officer Details
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Grievance Officer */}
              <div className="p-8 bg-surface-muted rounded-[32px] border border-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-black text-primary mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Grievance Officer
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Name</p>
                    <p className="text-lg font-black text-text-heading">{COMPANY_DETAILS.grievanceOfficer.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Designation</p>
                    <p className="font-bold text-text-secondary">{COMPANY_DETAILS.grievanceOfficer.designation}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-primary bg-white p-3 rounded-xl border border-primary/10">
                    <Mail size={16} />
                    {COMPANY_DETAILS.grievanceOfficer.email}
                  </div>
                </div>
              </div>

              {/* Nodal Officer */}
              <div className="p-8 bg-dark-navy rounded-[32px] text-white relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[100px] group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-black text-secondary mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(13,148,136,0.5)]" />
                  Nodal Officer (Level 3)
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-text-on-dark-muted uppercase tracking-widest mb-1">Officer In-charge</p>
                    <p className="text-lg font-black text-white">{COMPANY_DETAILS.grievanceOfficer.name}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-secondary bg-white/5 p-3 rounded-xl border border-white/10">
                    <Mail size={16} />
                    {COMPANY_DETAILS.grievanceOfficer.email}
                  </div>
                  <div className="flex items-start gap-3 text-sm text-text-on-dark-muted">
                    <MapPin size={16} className="shrink-0 mt-1" />
                    <span>{COMPANY_DETAILS.grievanceOfficer.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
