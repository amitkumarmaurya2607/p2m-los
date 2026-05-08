import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

const company = ["About Us", "Careers", "Press", "Contact", "Partners"];

const products = [
  "Personal Loan",
  "Business Loan",
  "Medical Emergency",
  "Salary Advance",
  "EMI Calculator",
];

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#0F172A] px-5 py-10 font-[Inter] md:px-10 lg:px-20">
      <div className="mx-auto h-px max-w-[1013px] bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,200,156,0.5)_50%,rgba(0,0,0,0)_100%)]" />
      <div className="mx-auto h-3 w-[338px] bg-[#00C89C]/20 blur-[20px]" />

      <div className="mx-auto mt-8 max-w-[1232px]">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr_0.7fr_1.4fr] lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#00C89C] text-[18px] font-bold leading-none text-white">
                R
              </span>
              <span className="text-[24px] font-bold leading-8 tracking-[-0.6px] text-white">
                RinSetu
              </span>
            </div>

            <p className="mt-6 max-w-[379px] text-[16px] leading-[26px] text-[#90A1B9]">
              India's premium digital lending platform. Fast, transparent, and
              built to fuel your ambitions without the traditional banking
              stress.
            </p>

            <div className="mt-9 flex items-center gap-4">
              {[ArrowRight, ArrowRight, ArrowRight, ArrowRight].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[#90A1B9] transition hover:bg-white/10 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Company */}
          <FooterLinks title="Company" links={company} />

          {/* Products */}
          <FooterLinks title="Products" links={products} />

          {/* Stay Updated */}
          <div>
            <h4 className="text-[16px] font-bold leading-6 text-white">
              Stay Updated
            </h4>

            <p className="mt-6 max-w-[379px] text-[14px] leading-5 text-[#90A1B9]">
              Get the latest financial insights and offers directly in your
              inbox.
            </p>

            <form className="mt-5 flex h-[50px] rounded-full border border-white/10 bg-white/5 p-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-4 text-[14px] text-white outline-none placeholder:text-[#62748E]"
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00C89C] text-white"
              >
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-6 flex items-center gap-2 rounded-[14px] border border-white/5 bg-white/5 p-3">
              <ShieldCheck size={24} className="shrink-0 text-[#00C89C]" />
              <div>
                <p className="text-[12px] font-bold leading-4 text-white">
                  RBI Registered NBFC Partner
                </p>
                <p className="text-[10px] leading-[15px] text-[#90A1B9]">
                  100% Safe & Secure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 text-[14px] leading-5 text-[#62748E] md:flex-row md:items-center md:justify-between">
          <p>© 2026 RinSetu Finance. All rights reserved.</p>

          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Grievance Redressal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLinks = ({ title, links }: { title: string; links: string[] }) => {
  return (
    <div>
      <h4 className="text-[16px] font-bold leading-6 text-white">{title}</h4>

      <ul className="mt-6 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-[14px] font-medium leading-5 text-[#90A1B9] hover:text-white">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;