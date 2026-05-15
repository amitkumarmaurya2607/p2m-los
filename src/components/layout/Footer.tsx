import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import FacebookIcon from "@/assets/icon/FacebookIcon";
import InnkedIcon from "@/assets/icon/InnkedIcon";
import InstagramIcon from "@/assets/icon/InstagramIcon";
import TwittarIcon from "@/assets/icon/TwittarIcon";

import { COMPANY_DETAILS } from "@/config/company";

const company = [
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const products = [
  { label: "Personal Loan", href: "#" },
  { label: "Business Loan", href: "#" },
  { label: "Medical Emergency", href: "#" },
  { label: "Salary Advance", href: "#" },
  { label: "EMI Calculator", href: "/#emi-calculator" },
];

const Footer = () => {
  return (
    <>

      <footer className=" bg-dark-navy px-5  py-10 font-sans md:px-10 lg:px-20">
        <div className="mx-auto h-px max-w-[1013px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
        <div className="mx-auto h-3 w-[338px] bg-secondary/20 blur-[20px]" />

        <div className="mx-auto mt-8 max-w-[var(--max-width-section)]">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr_0.7fr_1.4fr] lg:gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-secondary text-[18px] font-bold leading-none text-white">
                  R
                </span>
                <span className="text-[24px] font-bold leading-8 tracking-[-0.6px] text-white">
                  RinSetu
                </span>
              </div>

              <p className="mt-6 max-w-[379px] text-[16px] leading-[26px] text-text-on-dark-muted">
                India's premium digital lending platform. Fast, transparent, and
                built to fuel your ambitions without the traditional banking
                stress.
              </p>

              <div className="mt-9 flex items-center gap-4">
                {[FacebookIcon, InnkedIcon, InstagramIcon, TwittarIcon].map(
                  (Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-text-on-dark-muted transition hover:bg-white/10 hover:text-white"
                    >
                      <Icon size={16} color={"currentColor"} />
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

              <p className="mt-6 max-w-[379px] text-[14px] leading-5 text-text-on-dark-muted">
                Get the latest financial insights and offers directly in your
                inbox.
              </p>

              <form className="mt-5 flex h-[50px] rounded-full border border-white/10 bg-white/5 p-1 overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent px-4 text-[14px] text-white outline-none placeholder:text-text-muted-dark"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-white hover:bg-secondary-light transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="mt-6 flex items-center gap-2 rounded-[14px] border border-white/5 bg-white/5 p-3">
                <ShieldCheck size={24} className="shrink-0 text-secondary" />
                <div>
                  <p className="text-[12px] font-bold leading-4 text-white">
                    RBI Registered NBFC Partner
                  </p>
                  <p className="text-[10px] leading-[15px] text-text-on-dark-muted">
                    100% Safe & Secure
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 text-[14px] leading-5 text-text-muted-dark md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved.</p>

            <div className="flex flex-wrap gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/grievance-redressal" className="hover:text-white transition-colors">
                Grievance Redressal
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
};

const FooterLinks = ({ title, links }: { title: string; links: { label: string, href: string }[] }) => {
  return (
    <div>
      <h4 className="text-[16px] font-bold leading-6 text-white">{title}</h4>

      <ul className="mt-6 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-[14px] font-medium leading-5 text-text-on-dark-muted hover:text-white transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;