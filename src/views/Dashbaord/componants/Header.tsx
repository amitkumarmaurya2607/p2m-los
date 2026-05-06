"use client";
import React, { useRef, useEffect } from "react";
import { ArrowLeft, Moon, Sun, User } from "lucide-react";
import { useThemeContext } from "@/components/theme/ThemeProvider";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onSave?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  title = "Verification",
  subtitle = "APPLICATION",
  onBack,
  onSave,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { theme, toggleTheme, mounted } = useThemeContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="
      flex items-center justify-between
      w-full h-[80px]
      px-[56px]
      bg-surface-overlay-90
      border-b border-border
      shadow-[var(--shadow-sm)]
    "
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-muted"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <p className="text-xs tracking-widest text-text-muted font-semibold">{subtitle}</p>
          <h1 className="text-lg font-semibold text-text-heading">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {mounted && (
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-text-muted hover:text-text-heading transition-colors"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted"
          >
            <User size={18} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-surface border border-border rounded-md shadow-md z-10">
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-text-heading hover:bg-muted"
              >
                Profile
              </a>
              <button
                onClick={() => console.log("Logout")}
                className="w-full text-left px-4 py-2 text-sm text-text-heading hover:bg-muted"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
