"use client";
import React, { useRef, useEffect, useMemo } from "react";
import { ArrowLeft, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useApplicationSteps } from "@/hooks/useApplicationSteps";
import { steps as allSteps, StepItem } from "@/lib/sessionStorage";
import { logoutAction } from "@/lib/actions/logout.action";

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthContext();
  const { resetApplication } = useApplicationContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    logout();
    resetApplication();
    setDropdownOpen(false);
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


 const { stepStatuses } = useApplicationSteps();

const pathname = usePathname();

const progressItem: StepItem | null = useMemo(() => {
  const progressStepKey =
    [...stepStatuses.entries()].find(
      ([_, status]) => status === "progress"
    )?.[0] ?? null;

  return (
    allSteps.find(
      (step: StepItem) => step.key === progressStepKey
    ) ?? null
  );
}, [pathname, stepStatuses, allSteps]);

console.log("Progress Item:", progressItem);

const Icon = progressItem?.icon;

  return (
    <div
      className="sticky top-0 z-50 flex items-center justify-between w-full h-[80px] px-[56px] bg-surface-overlay-90
        bg-background border-b border-border shadow-[var(--shadow-sm)]"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
            className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            shadow-[0px_10px_30px_rgba(0,0,0,0.2)]
            ${progressItem?.iconContainerClassName}
          `}
        >
        {Icon && <Icon className={progressItem?.iconClassName} />}
        </button>

        <div>
          <p className="text-xs tracking-widest text-text-muted font-semibold">{(progressItem?.fullTitle || "").toLocaleUpperCase()}</p>
          <h1 className="text-lg font-semibold text-text-heading">{`STEP ${progressItem?.id || ""}`}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted"
          >
            <User size={18} />
          </button>
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-40 bg-surface border border-border rounded-md
                shadow-md z-10"
            >
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-text-heading hover:bg-muted"
              >
                Profile
              </a>
              <button
                onClick={handleLogout}
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
