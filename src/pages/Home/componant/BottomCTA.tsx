import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

export default function BottomCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary-light to-secondary relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
          
          <div className="flex-1 text-white text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Ready to Unlock <br />
              <span className="text-secondary-gradient-start">Your Dreams?</span>
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto md:mx-0">
              Join millions of Indians who have chosen FinSetu for their financial needs. Download the app or apply online in just 2 minutes.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-white text-primary px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
                Apply Now <ArrowRight size={20} />
              </button>
              <button className="bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
                <Download size={20} /> Download App
              </button>
            </div>
          </div>

          <div className="hidden lg:block shrink-0 relative">
            {/* Simple Mockup representation using a stylized div instead of an image to avoid missing assets */}
            <div className="w-[280px] h-[560px] bg-surface rounded-[2.5rem] p-3 border-8 border-gray-900 shadow-2xl relative rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20"></div>
              <div className="w-full h-full bg-primary-muted rounded-[1.8rem] overflow-hidden relative">
                <div className="bg-primary h-48 w-full p-6 text-white pt-12">
                  <p className="text-sm opacity-80">Available Limit</p>
                  <p className="text-3xl font-bold">₹ 5,00,000</p>
                </div>
                <div className="bg-surface -mt-6 rounded-t-3xl h-full p-6 space-y-4">
                  <div className="h-20 bg-muted rounded-xl animate-pulse"></div>
                  <div className="h-20 bg-muted rounded-xl animate-pulse"></div>
                  <div className="h-20 bg-muted rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
