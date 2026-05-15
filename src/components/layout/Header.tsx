import React from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "EMI Calculator", href: "/#emi-calculator" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 h-20 bg-surface/90 shadow-sm backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-full max-w-[var(--max-width-section)] items-center justify-between px-5 md:px-8 lg:px-0">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rotate-12 rounded-[10px] bg-gradient-to-br from-secondary to-primary shadow-lg shadow-primary/20" />
          <span className="text-[24px] font-black leading-8 tracking-[-1.2px] text-text-heading">
            RinSetu<span className="text-secondary">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[16px] font-semibold leading-6 text-text-secondary transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-[30px]">
          <Link
            href="/apply"
            className="text-[16px] font-bold text-primary hover:text-primary-light transition-colors"
          >
            Apply
          </Link>

          {/* CSS-only responsive menu, no state/client JS */}
          <details className="group relative lg:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full bg-dark-navy text-dark-navy-foreground [&::-webkit-details-marker]:hidden">
            <Menu size={22} />
          </summary>

          <div className="absolute right-0 top-12 w-[calc(100vw-40px)] max-w-[320px] rounded-2xl border border-border bg-surface p-5 shadow-xl">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[16px] font-semibold text-text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </details>
        </div>
      </div>
    </header>
  );
};

export default Header;