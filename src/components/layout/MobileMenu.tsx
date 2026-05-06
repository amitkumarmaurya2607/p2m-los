"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type Props = {
  navItems: { label: string; href: string }[];
};

export default function MobileMenu({ navItems }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>

      {/* Drawer */}
      {open && (
        <div
          className="absolute left-0 top-[70px] w-full bg-white border-t shadow-md p-4 space-y-4
            z-50"
        >
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium"
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-4 border-t flex flex-col gap-3">
            <button className="w-full py-2 rounded-full border text-[#3737C1] font-semibold">
              Login
            </button>

            <button className="w-full py-2 rounded-full bg-[#3737C1] text-white font-semibold">
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
