"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Send,
  ChevronRight,
  User,
  AtSign,
  Smartphone,
  BookOpen
} from "lucide-react";
import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import { COMPANY_DETAILS } from "@/config/company";

const HeroSection = () => (
  <section className="relative pt-20 pb-32 px-6 lg:px-12 bg-surface-muted overflow-hidden">
    {/* Abstract Shapes */}
    <div className="absolute top-[-200px] right-[-100px] w-[800px] h-[800px] bg-primary/10 blur-[64px] rounded-full" />
    <div className="absolute top-[288px] left-[-41px] w-[600px] h-[600px] bg-secondary/10 blur-[64px] rounded-full" />
    
    <div className="container mx-auto text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border shadow-[var(--shadow-sm)] text-primary text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
        </span>
        <span className="tracking-wide uppercase text-xs">Contact Us</span>
      </div>
      
      <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-text-heading leading-[1.1] mb-8">
        Get in Touch with Our <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Financial Advisors
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
        Have questions about our loan products or need assistance with your application? 
        Our team is here to provide you with expert guidance and support.
      </p>
    </div>
  </section>
);

const ContactInfo = () => {
  const infoCards = [
    {
      title: "Quick Contact",
      details: [COMPANY_DETAILS.supportPhone],
      icon: Phone,
      color: "text-primary",
      bg: "bg-primary/10",
      link: `tel:${COMPANY_DETAILS.supportPhone.replace(/\s+/g, '')}`
    },
    {
      title: "Email Support",
      details: [COMPANY_DETAILS.supportEmail],
      icon: Mail,
      color: "text-secondary",
      bg: "bg-secondary/10",
      link: `mailto:${COMPANY_DETAILS.supportEmail}`
    },
    {
      title: "Registered Office",
      details: [COMPANY_DETAILS.officeAddress],
      icon: MapPin,
      color: "text-accent-orange",
      bg: "bg-accent-orange/10",
      link: "#"
    },
    {
      title: "Grievance Redressal",
      details: [COMPANY_DETAILS.grievanceOfficer.email, "Response: Within 5 working days"],
      icon: ShieldCheck,
      color: "text-success",
      bg: "bg-success/10",
      link: `mailto:${COMPANY_DETAILS.grievanceOfficer.email}`
    }
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {infoCards.map((card, index) => (
        <a 
          key={index} 
          href={card.link}
          className="bg-surface border border-border p-8 rounded-3xl hover:border-primary/30 transition-all shadow-[var(--shadow-sm)] group"
        >
          <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <card.icon className={`w-7 h-7 ${card.color}`} />
          </div>
          <h3 className="text-xl font-bold text-text-heading mb-3">{card.title}</h3>
          <div className="space-y-1">
            {card.details.map((detail, idx) => (
              <p key={idx} className="text-text-secondary font-medium leading-relaxed">{detail}</p>
            ))}
          </div>
        </a>
      ))}
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="bg-surface border border-border rounded-[40px] p-8 md:p-12 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
      
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-text-heading mb-4 tracking-tight">Leave us a message</h2>
        <p className="text-text-secondary">Fill out the form below and we'll get back to you as soon as possible.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <TextInput 
            label="Full Name" 
            placeholder="Enter your name" 
            require
            leftIcon={<User className="text-text-muted" size={20} />}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <TextInput 
            label="Email Address" 
            type="email"
            placeholder="Enter your email" 
            require
            leftIcon={<AtSign className="text-text-muted" size={20} />}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <TextInput 
            label="Phone Number" 
            placeholder="Enter phone number" 
            require
            leftIcon={<Smartphone className="text-text-muted" size={20} />}
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <TextInput 
            label="Subject" 
            placeholder="How can we help?" 
            leftIcon={<BookOpen className="text-text-muted" size={20} />}
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
        </div>
        
        <div className="w-full">
          <div className="relative flex w-full min-h-[160px] px-[20px] pt-[24px] pb-[8px] bg-input-bg rounded-[16px] border border-transparent shadow-[var(--shadow-sm)] focus-within:border-primary/30 transition-all">
            <div className="mr-[10px] h-full flex items-start pt-2">
              <MessageSquare className="text-text-muted" size={20} />
            </div>
            <div className="relative flex-1">
              <textarea 
                placeholder=" "
                className="peer w-full h-full bg-transparent outline-none text-[14px] pt-[12px] resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              <label className="absolute left-0 font-medium top-[10px] -translate-y-1/2 text-[16px] transition-all duration-200 pointer-events-none text-text-muted peer-focus:top-0 peer-focus:text-text-label peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-text-label">
                Your Message
              </label>
            </div>
          </div>
        </div>
        
        <GradientButton type="submit" loading={loading} rightIcon={<Send size={20} />}>
          Send Message
        </GradientButton>
      </form>
    </div>
  );
};

const FAQSection = () => (
  <section className="py-24 bg-surface-muted">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-text-heading mb-6 tracking-tight">Have more questions?</h2>
      <p className="text-text-secondary max-w-2xl mx-auto mb-10">
        Check out our frequently asked questions to find quick answers to common queries about our loans and processes.
      </p>
      <Link 
        href="/#faq" 
        className="inline-flex items-center gap-2 px-8 py-4 bg-background border border-border rounded-full font-bold text-text-heading hover:bg-surface transition-all shadow-[var(--shadow-sm)]"
      >
        View FAQ
        <ChevronRight size={20} />
      </Link>
    </div>
  </section>
);

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <HeroSection />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-5/12">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-6 tracking-tight">Contact Information</h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  We're here to help you get past the unique financial obstacles that your business faces. 
                  Reach out to us through any of the following channels.
                </p>
              </div>
              <ContactInfo />
            </div>
            
            <div className="lg:w-7/12">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <FAQSection />
      
      {/* Map Section Placeholder */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="w-full h-[450px] bg-surface-muted rounded-[40px] border border-border overflow-hidden relative shadow-lg">
             {/* Replace with real Google Maps iframe if needed */}
             <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                  <p className="text-text-muted font-medium">Interactive Map Placeholder</p>
                  <p className="text-text-muted text-sm">2nd Floor, C-56/32, Industrial Area, Sector 62, Noida</p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
