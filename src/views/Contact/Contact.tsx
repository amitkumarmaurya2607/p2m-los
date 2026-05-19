import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/config/company";
import ContactForm from "./ContactForm";

const ContactView = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section - SSR */}
      <section className="relative pt-24 pb-32 px-6 lg:px-12 bg-surface-muted overflow-hidden">
        <div
          className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] bg-primary/10
            blur-[100px] rounded-full"
        />
        <div
          className="absolute bottom-[-200px] right-[-100px] w-[800px] h-[800px] bg-secondary/10
            blur-[120px] rounded-full"
        />

        <div className="container mx-auto text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border
              border-border shadow-sm text-primary text-sm font-bold mb-8"
          >
            <MessageSquare size={18} className="text-secondary" />
            <span className="tracking-wide uppercase text-xs">Contact Us</span>
          </div>

          <h1
            className="text-5xl lg:text-7xl font-black tracking-tight text-text-heading
              leading-tight mb-8"
          >
            Let's Start a <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
            >
              Conversation
            </span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions about a loan? Our financial experts are here to help you navigate your
            financial journey with ease.
          </p>
        </div>
      </section>

      {/* Contact Content - SSR & Client Hybrid */}
      <section className="py-20 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Contact Info - SSR */}
            <div className="lg:col-span-5 space-y-8">
              <div
                className="bg-surface rounded-[32px] p-8 border border-border shadow-xl space-y-10"
              >
                <h3 className="text-2xl font-black text-text-heading">Get in Touch</h3>

                <div className="space-y-8">
                  <div className="flex gap-5 group">
                    <div
                      className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center
                        justify-center shrink-0 group-hover:bg-primary group-hover:text-white
                        transition-all duration-300"
                    >
                      <Mail size={24} />
                    </div>
                    <div>
                      <p
                        className="text-sm font-bold text-text-secondary uppercase tracking-widest
                          mb-1"
                      >
                        Email Us
                      </p>
                      <a
                        href={`mailto:${COMPANY_DETAILS.supportEmail}`}
                        className="text-xl font-black text-text-heading hover:text-primary
                          transition-colors"
                      >
                        {COMPANY_DETAILS.supportEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-5 group">
                    <div
                      className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex
                        items-center justify-center shrink-0 group-hover:bg-secondary
                        group-hover:text-white transition-all duration-300"
                    >
                      <Phone size={24} />
                    </div>
                    <div>
                      <p
                        className="text-sm font-bold text-text-secondary uppercase tracking-widest
                          mb-1"
                      >
                        Call Us
                      </p>
                      <a
                        href={`tel:${COMPANY_DETAILS.supportPhone}`}
                        className="text-xl font-black text-text-heading hover:text-secondary
                          transition-colors"
                      >
                        {COMPANY_DETAILS.supportPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-5 group">
                    <div
                      className="w-14 h-14 bg-accent-orange/10 text-accent-orange rounded-2xl flex
                        items-center justify-center shrink-0 group-hover:bg-accent-orange
                        group-hover:text-white transition-all duration-300"
                    >
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p
                        className="text-sm font-bold text-text-secondary uppercase tracking-widest
                          mb-1"
                      >
                        Visit Us
                      </p>
                      <p className="text-lg font-bold text-text-heading leading-relaxed">
                        {COMPANY_DETAILS.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Clock size={18} className="text-primary" />
                    <span className="text-sm font-medium">Mon - Sat: 9AM - 6PM</span>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-surface-muted border-2 border-surface
                          flex items-center justify-center overflow-hidden"
                      >
                        <div
                          className="w-full h-full bg-gradient-to-br from-primary/20
                            to-secondary/20"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trust Badge - SSR */}
              <div className="bg-dark-navy rounded-[32px] p-8 text-white relative overflow-hidden">
                <div
                  className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-white/5 blur-3xl
                    rounded-full"
                />
                <div className="flex items-center gap-4 mb-4">
                  <ShieldCheck className="text-primary" size={32} />
                  <h4 className="text-xl font-bold">Authorized Platform</h4>
                </div>
                <p className="text-text-on-dark-muted leading-relaxed">
                  RinSetu is a registered digital platform partnering only with RBI-regulated
                  financial institutions.
                </p>
              </div>
            </div>

            {/* Contact Form - Client */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Grievance Section - SSR */}
      <section className="py-24 bg-surface-muted border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-text-heading mb-6">
              Grievance Redressal
            </h2>
            <p className="text-text-secondary text-lg">
              We are committed to resolving your concerns promptly. If you have an unresolved issue,
              please contact our Nodal Officer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-surface p-8 rounded-3xl border border-border shadow-sm text-center">
              <div
                className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center
                  justify-center mx-auto mb-6"
              >
                <Zap size={30} />
              </div>
              <h4 className="text-lg font-bold text-text-heading mb-2">Step 1</h4>
              <p className="text-sm text-text-secondary">
                Contact our support team via email or phone for immediate assistance.
              </p>
            </div>

            <div
              className="bg-surface p-8 rounded-3xl border border-border shadow-sm text-center
                relative"
            >
              <div
                className="hidden md:block absolute top-1/2 -right-4 translate-y-[-50%] z-10
                  text-border"
              >
                <ChevronRight size={32} />
              </div>
              <div
                className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center
                  justify-center mx-auto mb-6"
              >
                <Clock size={30} />
              </div>
              <h4 className="text-lg font-bold text-text-heading mb-2">Step 2</h4>
              <p className="text-sm text-text-secondary">
                Most issues are resolved within 24-48 business hours by our team.
              </p>
            </div>

            <div className="bg-surface p-8 rounded-3xl border border-border shadow-sm text-center">
              <div
                className="w-16 h-16 bg-accent-orange/10 text-accent-orange rounded-full flex
                  items-center justify-center mx-auto mb-6"
              >
                <Globe size={30} />
              </div>
              <h4 className="text-lg font-bold text-text-heading mb-2">Step 3</h4>
              <p className="text-sm text-text-secondary">
                Escalate to the Nodal Officer if you are not satisfied with the resolution.
              </p>
            </div>
          </div>

          <div
            className="mt-16 bg-surface p-8 lg:p-12 rounded-[40px] border border-border max-w-4xl
              mx-auto shadow-xl"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div
                className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center
                  shrink-0"
              >
                <ShieldCheck className="text-primary" size={48} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black text-text-heading mb-2">
                  {COMPANY_DETAILS.grievanceOfficer.name}
                </h3>
                <p className="text-primary font-bold mb-4">
                  {COMPANY_DETAILS.grievanceOfficer.designation}
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Mail size={16} className="text-primary" />
                    <span>{COMPANY_DETAILS.grievanceOfficer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <MapPin size={16} className="text-primary" />
                    <span>Gurgaon, Haryana</span>
                  </div>
                </div>
              </div>
              <Link
                href="/faq"
                className="px-8 py-4 bg-surface-muted hover:bg-surface border border-border
                  rounded-full font-bold transition-all text-sm whitespace-nowrap"
              >
                View Policy Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactView;
