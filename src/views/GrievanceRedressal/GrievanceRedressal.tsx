import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, MessageCircle, ArrowRight, Zap, Globe } from "lucide-react";
import GrievanceClient from "./GrievanceClient";
import { GRC_SECTIONS } from "./GrievanceData";

const GrievanceRedressalView = () => {
  return (
    <div
      className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20
        selection:text-primary"
    >
      {/* Hero Section - SSR */}
      <section className="relative pt-24 pb-20 px-6 lg:px-12 bg-surface-muted overflow-hidden">
        <div
          className="absolute top-[-200px] left-[-100px] w-[700px] h-[700px] bg-secondary/10
            blur-[80px] rounded-full"
        />

        <div className="container mx-auto relative z-10 text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border
              border-border shadow-sm text-primary text-xs font-bold mb-6 uppercase tracking-widest"
          >
            <ShieldCheck size={14} className="text-secondary" />
            <span>Corporate Governance</span>
          </div>

          <h1
            className="text-4xl lg:text-6xl font-black tracking-tight text-text-heading
              leading-tight mb-6"
          >
            Grievance Redressal & <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
            >
              Policy Framework
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <div
              className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg
                font-bold text-sm"
            >
              <CheckCircle2 size={16} />
              RBI Compliant Mechanism
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 bg-secondary/10 text-secondary
                rounded-lg font-bold text-sm"
            >
              <Zap size={16} />
              Response within 24 Hours
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Client Hydrated */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-12">
          <GrievanceClient sections={GRC_SECTIONS} />
        </div>
      </section>

      {/* RBI Compliance Section - SSR Static */}
      <section className="py-24 bg-surface-muted border-y border-border">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto bg-surface rounded-[40px] p-8 md:p-12 border border-border
              shadow-xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px]" />
            <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black text-text-heading mb-6 tracking-tight">
              Ombudsman Scheme
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              In case your complaint is not redressed within a period of one month from the date of
              its receipt, or if you are not satisfied with the reply, you may appeal to the{" "}
              <strong>RBI Ombudsman</strong> under the Reserve Bank - Integrated Ombudsman Scheme,
              2021.
            </p>
            <a
              href="https://cms.rbi.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-black hover:underline
                group"
            >
              Visit RBI CMS Portal
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section - SSR Static */}
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
              Need help with a complaint?
            </h2>
            <p
              className="text-text-on-dark-muted text-lg md:text-xl max-w-2xl mx-auto mb-10
                leading-relaxed"
            >
              Our resolution team is dedicated to solving your concerns with absolute fairness and
              transparency. We are just a message away.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="px-10 py-5 bg-secondary hover:brightness-110 text-white rounded-full
                  font-bold text-lg shadow-lg transition-all flex items-center gap-3 group"
              >
                Contact Support
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/faq"
                className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border
                  border-white/20 rounded-full font-bold text-lg backdrop-blur-md transition-all"
              >
                Browse FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GrievanceRedressalView;
