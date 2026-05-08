import React from "react";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "How it works", href: "#how-it-works" },
  { label: "EMI Calculator", href: "#emi-calculator" },
  { label: "About Us", href: "#about-us" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 h-20 bg-white/90 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-5 md:px-8 lg:px-6">
        <a href="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rotate-12 rounded-[10px] bg-[linear-gradient(135deg,#00C89C_0%,#3737C1_100%)]" />
          <span className="text-[24px] font-black leading-8 tracking-[-1.2px] text-[#0F172A]">
            RinSetu<span className="text-[#00C89C]">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[16px] font-semibold leading-6 text-[#4A5565] transition hover:text-[#3737C1]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="/login"
            className="px-[15px] text-[16px] font-bold text-[#3737C1]"
          >
            Login
          </a>

          <a
            href="/get-app"
            className="flex h-11 items-center rounded-full bg-[#0F172A] px-[23px] text-[16px] font-bold text-white"
          >
            Get App
          </a>
        </div>

        {/* CSS-only responsive menu, no state/client JS */}
        <details className="group relative lg:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full bg-[#0F172A] text-white [&::-webkit-details-marker]:hidden">
            <Menu size={22} />
          </summary>

          <div className="absolute right-0 top-12 w-[calc(100vw-40px)] max-w-[320px] rounded-2xl border border-[#F1F5F9] bg-white p-5 shadow-xl">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[16px] font-semibold text-[#4A5565]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-5 flex gap-3">
              <a
                href="/login"
                className="flex h-11 flex-1 items-center justify-center rounded-full border border-[#3737C1] font-bold text-[#3737C1]"
              >
                Login
              </a>

              <a
                href="/get-app"
                className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#0F172A] font-bold text-white"
              >
                Get App
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
};

export default Header;