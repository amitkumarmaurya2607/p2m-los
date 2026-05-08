

import { ArrowRight, Lock, ShieldCheck, Zap } from 'lucide-react'


function HeroSection() {
  return (
     <section className="relative pt-[32px]   px-6 lg:px-12 bg-surface-muted overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-[-200px] right-[-100px] w-[800px] h-[800px] bg-primary/10 blur-[64px] rounded-full"></div>
        <div className="absolute top-[288px] left-[-41px] w-[600px] h-[600px] bg-secondary/10 blur-[64px] rounded-full"></div>
        
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 pb-16 pt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border shadow-[var(--shadow-sm)] text-primary text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              New! Instant Approval AI
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-text-heading leading-[1.1]">
              Instant Loans. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Zero Stress.
              </span>
            </h1>
            <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
              Fast approvals, minimal documents, and secure digital process. Get approved in minutes, not days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 rounded-full bg-secondary hover:brightness-110 text-surface font-bold text-lg shadow-[var(--shadow-button)] transition-all flex items-center justify-center gap-2">
                Apply Now <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 rounded-full bg-surface text-primary font-bold text-lg border-2 border-primary hover:bg-primary/5 transition-all flex items-center justify-center">
                Check Eligibility
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary font-medium">
              <div className="flex items-center gap-2"><ShieldCheck className="text-secondary" size={20} /> RBI compliant</div>
              <div className="flex items-center gap-2"><Lock className="text-primary" size={20} /> Safe process</div>
              <div className="flex items-center gap-2"><Zap className="text-warning" size={20} /> Instant approval</div>
            </div>
          </div>
          <div className="relative  w-50% max-w-[700px]  lg:h-full flex items-end justify-center bg-[url('/images/moeny.png')] bg-no-repeat bg-top bg-[length:100%] bg-[center_top_0px] bg-no-repeat">
             {/* App preview or image goes here */}
             <div className="w-full  flex items-center justify-center  relative overflow-hidden ">
          <img src="/images/homeBanner.png" alt="App Preview" className="w-full" />
             </div>
          </div>
        </div>
      </section>
  )
}

export default HeroSection