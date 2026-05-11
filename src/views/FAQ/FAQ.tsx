"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  Plus, 
  Minus, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  MessageCircle,
  ArrowRight,
  UserCheck,
  X,
  Clock,
  ChevronRight
} from "lucide-react";
import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "gen-1",
    category: "General",
    question: "What is RinSetu?",
    answer: "RinSetu is a premium digital lending platform that connects borrowers with RBI-registered NBFC partners. We provide a seamless, paperless, and fast loan origination experience tailored to modern financial needs."
  },
  {
    id: "gen-2",
    category: "General",
    question: "How quickly can I get a loan?",
    answer: "Our AI-driven process allows for instant approval in minutes. Once approved and verified, the loan amount is typically disbursed to your bank account within 4-24 hours."
  },
  {
    id: "gen-3",
    category: "General",
    question: "Are there any hidden charges?",
    answer: "No, we believe in 100% transparency. All processing fees, interest rates, and other charges are clearly mentioned in your loan agreement before you sign it digitally."
  },
  {
    id: "el-1",
    category: "Eligibility",
    question: "What is the minimum salary requirement?",
    answer: "For salaried individuals, a minimum monthly take-home salary of ₹25,000 is required. For self-employed individuals, we look for consistent business income over the last 12 months."
  },
  {
    id: "el-2",
    category: "Eligibility",
    question: "Can I get a loan with a low CIBIL score?",
    answer: "While we prefer a CIBIL score of 650+, we also consider other factors like income stability and repayment history. We recommend applying to see your personalized eligibility."
  },
  {
    id: "el-3",
    category: "Eligibility",
    question: "What is the age criteria for applying?",
    answer: "Applicants must be between 21 and 58 years of age at the time of loan application."
  },
  {
    id: "doc-1",
    category: "Documents",
    question: "What documents do I need to provide?",
    answer: "Since we are a digital platform, we only require digital copies of your PAN Card, Aadhaar Card, and the last 3-6 months' bank statements."
  },
  {
    id: "doc-2",
    category: "Documents",
    question: "Is physical document verification required?",
    answer: "No, the entire process is 100% digital. We use e-KYC and digital bank statement analysis to verify your profile instantly."
  },
  {
    id: "rep-1",
    category: "Repayment",
    question: "How do I repay my loan?",
    answer: "Repayments are automated via e-NACH/e-Mandate. You can also make manual payments through our mobile app using UPI, Debit Cards, or Net Banking."
  },
  {
    id: "rep-2",
    category: "Repayment",
    question: "Can I foreclose my loan early?",
    answer: "Yes, you can foreclose your loan after a minimum of 3-6 EMI payments. Foreclosure charges may apply as per your loan agreement."
  },
  {
    id: "rep-3",
    category: "Repayment",
    question: "What happens if I delay my EMI payment?",
    answer: "Late payment penalties and bounce charges will apply. It also negatively impacts your CIBIL score, making it harder to get loans in the future. We encourage timely repayments."
  },
  {
    id: "sec-1",
    category: "Security",
    question: "Is my data safe with RinSetu?",
    answer: "Yes, we use 256-bit SSL encryption to protect your data. We never share your personal information with third parties without your explicit consent, except for credit assessment with our partners."
  },
  {
    id: "sec-2",
    category: "Security",
    question: "Are your partners RBI registered?",
    answer: "Absolutely. We only partner with RBI-registered NBFCs and Banks to ensure that your lending experience is safe, legal, and compliant with all regulations."
  }
];

const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={i} className="bg-primary/20 text-primary rounded-sm px-0.5 font-bold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const AccordionItem = ({ 
  item, 
  isOpen, 
  highlight, 
  onClick 
}: { 
  item: FAQItem; 
  isOpen: boolean; 
  highlight: string;
  onClick: () => void 
}) => {
  return (
    <div className={`border border-border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-surface shadow-md border-primary/20" : "bg-surface-muted hover:border-primary/30"}`}>
      <button 
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
      >
        <span className={`font-bold text-lg leading-tight tracking-tight ${isOpen ? "text-primary" : "text-text-heading"}`}>
          <HighlightedText text={item.question} highlight={highlight} />
        </span>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-primary text-white rotate-180" : "bg-primary/10 text-primary"}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-border/50 pt-4">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

const FAQView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>("gen-1");

  // Derive categories dynamically from data
  const dynamicCategories = useMemo(() => {
    const cats = new Set(FAQ_DATA.map(item => item.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Dynamic filtering logic
  const filteredFAQs = useMemo(() => {
    const results = FAQ_DATA.filter(item => {
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    // Auto-open first result when searching to feel "Dynamic"
    if (searchQuery.length > 2 && results.length > 0) {
      setOpenId(results[0].id);
    }
    
    return results;
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 lg:px-12 bg-surface-muted overflow-hidden">
        <div className="absolute top-[-200px] right-[-100px] w-[800px] h-[800px] bg-primary/10 blur-[64px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] bg-secondary/10 blur-[64px] rounded-full" />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border shadow-[var(--shadow-sm)] text-primary text-sm font-semibold mb-8">
            <HelpCircle size={18} className="text-secondary" />
            <span className="tracking-wide uppercase text-xs">Knowledge Base</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-text-heading leading-[1.1] mb-8">
            How can we <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              help you today?
            </span>
          </h1>
          
          <div className="max-w-2xl mx-auto relative group">
            <TextInput 
              placeholder="Search e.g. 'CIBIL', 'Repayment'..." 
              leftIcon={<Search className="group-focus-within:text-primary transition-colors" size={20} />}
              rightIcon={searchQuery && (
                <button onClick={() => setSearchQuery("")} className="p-2 hover:bg-black/5 rounded-full mr-2">
                  <X size={16} />
                </button>
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="!h-[72px] !rounded-full !px-8 text-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Dynamic Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all border ${
                  activeCategory === cat 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                    : "bg-surface border-border text-text-secondary hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Info */}
          {searchQuery && (
            <div className="max-w-4xl mx-auto mb-6 text-text-muted font-medium px-4">
              Found {filteredFAQs.length} results for "{searchQuery}"
            </div>
          )}

          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div 
                  key={faq.id} 
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AccordionItem 
                    item={faq} 
                    isOpen={openId === faq.id}
                    highlight={searchQuery}
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-surface-muted rounded-[32px] border-2 border-dashed border-border">
                <Search size={48} className="text-text-muted mx-auto mb-4 opacity-20" />
                <h3 className="text-xl font-bold text-text-heading mb-2">No results found</h3>
                <p className="text-text-secondary mb-6">We couldn't find any questions matching your search.</p>
                <button 
                  onClick={() => {setSearchQuery(""); setActiveCategory("All");}} 
                  className="text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-surface-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: UserCheck, title: "Eligibility Check", desc: "Know your loan eligibility in just 2 minutes with basic details." },
              { icon: FileText, title: "Digital KYC", desc: "Completely paperless process with secure digital document verification." },
              { icon: ShieldCheck, title: "Data Security", desc: "Your personal and financial information is protected by bank-grade security." }
            ].map((feature, i) => (
              <div key={i} className="bg-surface p-8 rounded-3xl border border-border hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold text-text-heading mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
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
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Still have questions?</h2>
            <p className="text-text-on-dark-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Our financial advisors are available 24/7 to help you with any queries. Get in touch with us via email or phone.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="px-10 py-5 bg-secondary hover:brightness-110 text-white rounded-full font-bold text-lg shadow-[var(--shadow-button)] transition-all flex items-center gap-3 group active:scale-95">
                Contact Support
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-lg backdrop-blur-md transition-all active:scale-95">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQView;
