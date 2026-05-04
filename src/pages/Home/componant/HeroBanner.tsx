import { ArrowRight, Check, Shield } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#3737C1] via-[#2487B5] to-[#00C89C]">

      {/* Glow Effects */}
      <div className="absolute w-[400px] h-[400px] bg-white/10 blur-[80px] rounded-full top-[-120px] right-[-80px]" />
      <div className="absolute w-[350px] h-[350px] bg-[#00C89C]/20 blur-[80px] rounded-full bottom-[-120px] left-[-80px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="space-y-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm">
            <Shield className="w-4 h-4 text-green-400" />
            RBI Registered NBFC Partner
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Instant Loans for
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Every Indian 🇮🇳
            </h1>
          </div>

          {/* Description */}
          <p className="text-white/80 text-lg max-w-xl">
            Fast approvals, minimal documents, and secure digital process.
            Jhatpat approval, bina kisi tension ke!
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#3737C1] font-semibold rounded-full shadow-lg">
              Apply Now <ArrowRight size={18} />
            </button>

            <button className="px-6 py-3 border-2 border-white/50 text-white rounded-full font-semibold">
              Check Eligibility
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 text-white text-sm">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-green-500 rounded-full">
                <Check size={12} />
              </span>
              RBI Compliant
            </div>

            <div className="flex items-center gap-2">
              <span className="p-1 bg-green-500 rounded-full">
                <Check size={12} />
              </span>
              PAN & Aadhaar Supported
            </div>
          </div>
        </div>

        {/* RIGHT FLOATING CARDS */}
        <div className="relative hidden lg:block">

          {/* Approved Amount */}
          <div className="absolute top-0 left-10 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-4 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
              <Check className="text-green-600" size={18} />
            </div>
            <div>
              <p className="text-white/70 text-xs">Approved Amount</p>
              <p className="text-white font-bold">₹2,50,000</p>
            </div>
          </div>

          {/* Credit Score */}
          <div className="absolute top-0 right-10 bg-white rounded-xl p-4 shadow-lg w-[110px]">
            <p className="text-xs text-gray-500 uppercase">Credit Score</p>
            <p className="text-xl font-bold text-blue-600">752</p>
            <div className="h-1 bg-gray-200 rounded-full mt-2">
              <div className="h-1 w-2/3 bg-blue-500 rounded-full" />
            </div>
          </div>

          {/* EMI Card */}
          <div className="absolute bottom-10 right-0 bg-white rounded-xl p-4 shadow-lg flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-100 flex items-center justify-center rounded-full">
              ₹
            </div>
            <div>
              <p className="text-xs text-gray-500">Monthly EMI</p>
              <p className="font-bold text-gray-900">₹5,240</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}