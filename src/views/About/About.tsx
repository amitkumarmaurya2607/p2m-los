
import React from "react";
import Link from "next/link";
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Users, 
  TrendingUp, 
  Heart,
  Award,
  Clock,
  ChevronRight,
  Briefcase,
  Wallet,
  Home as HomeIcon
} from "lucide-react";
import { COMPANY_DETAILS } from "@/config/company";

const HeroSection = () => (
  <section className="relative pt-20 pb-32 px-6 lg:px-12 bg-surface-muted overflow-hidden">
    {/* Abstract Shapes consistent with Home */}
    <div className="absolute top-[-200px] right-[-100px] w-[800px] h-[800px] bg-primary/10 blur-[64px] rounded-full" />
    <div className="absolute top-[288px] left-[-41px] w-[600px] h-[600px] bg-secondary/10 blur-[64px] rounded-full" />
    
    <div className="container mx-auto text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border shadow-[var(--shadow-sm)] text-primary text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
        </span>
        <span className="tracking-wide uppercase text-xs">Who We Are</span>
      </div>
      
      <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-text-heading leading-[1.1] mb-8">
        Empowering Your <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Financial Future
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
        We are a next-generation fintech platform dedicated to simplifying the loan origination process. 
        By leveraging cutting-edge technology and human-centric design, we bridge the gap between financial aspirations and reality.
      </p>
    </div>
  </section>
);

const StatsSection = () => {
  const stats = [
    { label: "Happy Customers", value: "50K+", icon: Users },
    { label: "Loans Disbursed", value: "₹500Cr+", icon: TrendingUp },
    { label: "Processing Speed", value: "Instant", icon: Zap },
    { label: "Trust Rating", value: "4.9/5", icon: Heart },
  ];

  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-12 h-12 rounded-2xl bg-surface-muted border border-border flex items-center justify-center mx-auto mb-4 group-hover:border-primary/50 group-hover:shadow-lg transition-all duration-300">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-text-heading mb-1 tracking-tight">{stat.value}</div>
              <div className="text-sm text-text-muted font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MissionVision = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl -rotate-3 group-hover:rotate-0 transition-transform duration-500 blur-sm" />
          <div className="relative bg-surface border border-border p-8 md:p-12 rounded-3xl shadow-xl">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-text-heading mb-4 tracking-tight">Our Mission</h2>
            <p className="text-text-secondary leading-relaxed">
              To democratize access to credit by providing a transparent, fast, and secure digital lending platform 
              that empowers individuals and businesses to achieve their financial goals without the traditional hurdles.
            </p>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500 blur-sm" />
          <div className="relative bg-surface border border-border p-8 md:p-12 rounded-3xl shadow-xl">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-3xl font-bold text-text-heading mb-4 tracking-tight">Our Vision</h2>
            <p className="text-text-secondary leading-relaxed">
              To be India's most trusted and innovative fintech partner, setting new standards in the loan origination 
              landscape through technological excellence and unwavering customer-centricity.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ValuesSection = () => {
  const values = [
    {
      title: "Integrity First",
      desc: "We operate with absolute transparency and ethical standards in every transaction.",
      icon: ShieldCheck,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      title: "Customer Centric",
      desc: "Your needs drive our innovation. We build products that solve real financial challenges.",
      icon: Heart,
      color: "text-secondary",
      bg: "bg-secondary/10"
    },
    {
      title: "Agile Innovation",
      desc: "We continuously evolve our platform to provide the fastest and most efficient experience.",
      icon: Zap,
      color: "text-accent-orange",
      bg: "bg-accent-orange/10"
    },
    {
      title: "Excellence",
      desc: "We strive for perfection in our processes, ensuring a seamless journey for our users.",
      icon: Award,
      color: "text-success",
      bg: "bg-success/10"
    }
  ];

  return (
    <section className="py-24 bg-surface-muted">
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4 tracking-tight">The Values We Live By</h2>
          <p className="text-text-secondary">Our culture is built on these four pillars that define how we work and serve our customers.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-surface border border-border p-8 rounded-3xl hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
              <div className={`w-14 h-14 ${value.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <value.icon className={`w-7 h-7 ${value.color}`} />
              </div>
              <h3 className="text-xl font-bold text-text-heading mb-3">{value.title}</h3>
              <p className="text-text-secondary leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EligibilitySection = () => {
  const criteria = [
    { label: "Age Requirement", value: "21 - 58 Years", icon: Clock },
    { label: "Employment", value: "Salaried/Self-Employed", icon: Briefcase },
    { label: "Monthly Income", value: "Min. ₹25,000", icon: Wallet },
    { label: "Citizenship", value: "Indian Resident", icon: HomeIcon },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4 tracking-tight">Loan Eligibility</h2>
          <p className="text-text-secondary">We believe in making credit accessible. Check if you meet our simple eligibility criteria.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {criteria.map((item, index) => (
            <div key={index} className="bg-surface border border-border p-6 rounded-2xl text-center hover:border-secondary/30 transition-all shadow-[var(--shadow-sm)] hover:shadow-md">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-sm text-text-muted mb-1 font-medium tracking-wide uppercase">{item.label}</div>
              <div className="text-lg font-bold text-text-heading">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GrievanceSection = () => (
  <section className="py-24 bg-surface-muted">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto bg-surface border border-border rounded-[32px] p-8 md:p-12 shadow-lg">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8 text-secondary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-heading mb-4 tracking-tight">Grievance Redressal</h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              In compliance with the RBI directives, we have established a dedicated Grievance Redressal Cell to address all customer concerns effectively. We are committed to responsible lending and ethical recovery practices.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-4 bg-background rounded-xl border border-border group hover:border-primary/50 transition-colors">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Nodal Officer</div>
                <div className="text-text-heading font-bold">{COMPANY_DETAILS.grievanceOfficer.name}</div>
              </div>
              <div className="p-4 bg-background rounded-xl border border-border group hover:border-primary/50 transition-colors">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Email Us At</div>
                <div className="text-primary font-bold">{COMPANY_DETAILS.grievanceOfficer.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StorySection = () => (
  <section className="py-24 bg-background overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-surface">
             <img 
               src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
               alt="Our Team Working" 
               className="w-full h-auto object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full">
                 <div className="text-white font-bold text-xl mb-1 tracking-tight">Founded in 2024</div>
                 <div className="text-white/80 text-sm">Started with a vision to redefine digital lending in India.</div>
               </div>
             </div>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-6 tracking-tight">Our Story</h2>
          <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
            <p>
              In an era where technology was rapidly transforming every aspect of life, the financial landscape remained bogged down by tedious paperwork and slow turn-around times.
            </p>
            <p>
              P2M LOS was born from the belief that access to credit should be as seamless as any other digital service. We've built a platform that combines traditional banking trust with modern technological efficiency.
            </p>
            <p>
              Whether it's for <strong>working capital, debt consolidation, business expansion, or household expenses</strong>, our digital loan system ensures swift approval and disbursal, keeping your momentum steady.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-surface border border-border shadow-[var(--shadow-sm)]">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-bold text-text-heading text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-surface border border-border shadow-[var(--shadow-sm)]">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <span className="font-bold text-text-heading text-sm">Secure Data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PartnersSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-text-heading mb-4 tracking-tight">Our NBFC Partners</h2>
      <p className="text-text-secondary max-w-2xl mx-auto mb-12">
        RinSetu operates as a digital lending platform partnering with RBI-registered NBFCs to ensure a safe, compliant, and trustworthy experience.
      </p>
      
      <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="h-16 w-44 bg-surface-muted rounded-2xl border border-border flex items-center justify-center p-4">
          <div className="h-full w-full bg-border/40 rounded-lg animate-pulse" />
        </div>
        <div className="h-16 w-44 bg-surface-muted rounded-2xl border border-border flex items-center justify-center p-4">
          <div className="h-full w-full bg-border/40 rounded-lg animate-pulse" />
        </div>
        <div className="h-16 w-44 bg-surface-muted rounded-2xl border border-border flex items-center justify-center p-4">
          <div className="h-full w-full bg-border/40 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="relative bg-dark-navy rounded-[40px] p-8 md:p-16 overflow-hidden text-center shadow-2xl">
        <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-primary/20 blur-[100px] -z-10" />
        <div className="absolute bottom-[-130px] left-[-100px] w-[500px] h-[500px] bg-secondary/15 blur-[100px] -z-10" />
        
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Ready to Experience the Future?</h2>
        <p className="text-text-on-dark-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of satisfied customers who have simplified their financial journey with us.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/apply" className="px-10 py-5 bg-secondary hover:brightness-110 text-white rounded-full font-bold text-lg shadow-[var(--shadow-button)] transition-all flex items-center gap-3 group active:scale-95">
            Apply for a Loan
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-lg backdrop-blur-md transition-all active:scale-95">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <HeroSection />
      <StatsSection />
      <StorySection />
      <MissionVision />
      <EligibilitySection />
      <ValuesSection />
      <GrievanceSection />
      <PartnersSection />
      <FinalCTA />
    </div>
  );
}
