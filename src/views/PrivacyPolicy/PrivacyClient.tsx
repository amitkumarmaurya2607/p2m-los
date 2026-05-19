"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  ChevronRight,
  ChevronDown,
  Info,
  Database,
  Smartphone,
  Eye,
  Share2,
  Lock,
  User,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/config/company";

const getIcon = (id: string) => {
  switch (id) {
    case "info":
      return Info;
    case "database":
      return Database;
    case "smartphone":
      return Smartphone;
    case "eye":
      return Eye;
    case "share":
      return Share2;
    case "lock":
      return Lock;
    case "user":
      return User;
    default:
      return FileText;
  }
};

export default function PrivacyClient({ sections }: { sections: any[] }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [isMobileAccordionOpen, setIsMobileAccordionOpen] = useState<Record<string, boolean>>({
    [sections[0]?.id]: true,
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
        behavior: "smooth",
      });
    }
  };

  const toggleAccordion = (id: string) => {
    setIsMobileAccordionOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
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
        <div
          className="sticky top-28 space-y-2 bg-surface p-6 rounded-3xl border border-border
            shadow-sm"
        >
          <h3 className="text-lg font-bold text-text-heading mb-6 flex items-center gap-2">
            <FileText size={20} className="text-primary" />
            Contents
          </h3>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all
                flex items-center justify-between group ${
                  activeSection === section.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                    : "text-text-secondary hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {section.title.split(". ")[1]}
                <ChevronRight
                  size={14}
                  className={`transition-transform
                  ${activeSection === section.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100"}`}
                />
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Policy Sections */}
      <div className="lg:w-3/4 space-y-8">
        {sections.map((section) => {
          const IconComponent = getIcon(section.iconId);
          return (
            <div
              key={section.id}
              id={section.id}
              className={`bg-surface rounded-3xl border transition-all duration-500 ${
                activeSection === section.id
                  ? "border-primary/30 shadow-xl shadow-primary/5"
                  : "border-border"
              }`}
            >
              <div
                className={`p-6 lg:p-8 flex items-center justify-between cursor-pointer
                lg:cursor-default ${
                  activeSection === section.id ? "text-primary" : "text-text-heading"
                }`}
                onClick={() => toggleAccordion(section.id)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center
                    transition-colors ${
                      activeSection === section.id
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-black tracking-tight">{section.title}</h2>
                </div>
                <ChevronDown
                  size={20}
                  className={`lg:hidden transition-transform
                  ${isMobileAccordionOpen[section.id] ? "rotate-180" : ""}`}
                />
              </div>

              <div
                className={`px-6 pb-8 lg:px-8 lg:pb-10 transition-all overflow-hidden ${
                  isMobileAccordionOpen[section.id]
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100"
                }`}
              >
                <div
                  className="lg:pl-16 text-text-secondary leading-relaxed text-lg
                    whitespace-pre-wrap"
                >
                  {section.content}
                </div>
              </div>
            </div>
          );
        })}

        {/* Grievance Section (Always static but grouped here) */}
        <div id="grievance" className="bg-surface rounded-3xl border border-border p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center
                justify-center"
            >
              <FileText size={24} />
            </div>
            <h2 className="text-xl lg:text-2xl font-black tracking-tight text-text-heading">
              8. Grievance Redressal
            </h2>
          </div>
          <div className="lg:pl-16 space-y-4">
            <p className="text-text-secondary">
              If you have any queries or complaints regarding this policy, please reach out to our
              Grievance Redressal Officer:
            </p>
            <div className="p-6 bg-surface-muted rounded-2xl border border-border">
              <p className="font-bold text-text-heading">Grievance Officer:</p>
              <div className="mt-4 text-sm">
                <p>
                  <strong>Name:</strong> {COMPANY_DETAILS.grievanceOfficer.name}
                </p>
                <p>
                  <strong>Designation:</strong> {COMPANY_DETAILS.grievanceOfficer.designation}
                </p>
                <p>
                  <strong>Email:</strong> {COMPANY_DETAILS.grievanceOfficer.email}
                </p>
                <p>
                  <strong>Address:</strong> {COMPANY_DETAILS.grievanceOfficer.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
