"use client";
import React, { useRef, useEffect, useMemo } from "react";
import { User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { steps as allSteps, StepItem } from "@/lib/sessionStorage";
import { logoutAction } from "@/lib/actions/logout.action";
import Logo from "@/assets/icon/Logo";
import Image from "next/image";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onSave?: () => void;
};

const routeStepMap: Record<string, string> = {
  "/apply-now": "mobile",
  "/geo-location": "geoLocation",
  "/pan-details": "pan",
  "/personal-info": "personalInfo",
  "/aadhar-details": "aadhaar",
  "/bank-details": "bankDetails",
  "/account-statement": "accountStatement",
  "/employment-details": "employmentDetails",
  "/selfie-capture": "selfie",
  "/address-proof": "addressProof",
  "/alternate-mobile": "alternateMobile",
  "/loan-eligibility": "loanEligibility",
};

interface Profile {
  name: string;
  img: string;
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [userData, setUserData] = React.useState<Profile | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAction();
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

  useEffect(() => {
    const handleStorageChange = () => {
      const profileData = localStorage.getItem("Profile");
      console.log("Storage event detected in Header:", profileData);
      if (profileData) {
        const parsedData = JSON.parse(profileData);
        setUserData({ name: parsedData.name, img: parsedData.img });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();


    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const progressItem: StepItem | null = useMemo(() => {
    const stepKey = routeStepMap[pathname];
    if (!stepKey) return null;
    return allSteps.find((step: StepItem) => step.key === stepKey) ?? null;
  }, [pathname]);

  const Icon = progressItem?.icon;

  return (
    <div
      className="sticky top-0 z-50 flex items-center justify-between w-full h-[80px]
        bg-surface-overlay-90 bg-background border-b border-border shadow-[var(--shadow-sm)]"
    >
      <div
        className="w-full max-w-[var(--max-width-section)] mx-auto px-5 md:px-8 lg:px-0 flex
          items-center justify-between"
      >
        <div className="flex items-center gap-4">
          {progressItem ? (
            <>
              <button
                onClick={onBack}
                className={` w-10 h-10 rounded-xl flex items-center justify-center
                  shadow-[0px_10px_30px_rgba(0,0,0,0.2)] ${progressItem.iconContainerClassName} `}
              >
                {Icon && <Icon className={progressItem.iconClassName} />}
              </button>

              <div>
                <p className="text-xs tracking-widest text-text-muted font-semibold">
                  {progressItem.fullTitle.toLocaleUpperCase()}
                </p>
                <h1 className="text-lg font-semibold text-text-heading">STEP {progressItem.id}</h1>
              </div>
            </>
          ) : (
            <>
              <Logo />
              {/* <div>
              <p className="text-xs tracking-widest text-text-muted font-semibold">{subtitle}</p>
              <h1 className="text-lg font-semibold text-text-heading">{title}</h1>
            </div> */}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {userData?.name && (
            <span className="hidden text-sm font-medium text-text-heading sm:block">
              {userData.name}
            </span>
          )}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-muted"
            >
              {userData?.img ? (
                <img src={userData.img} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <User size={18} />
              )}
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
    </div>
  );
};

export default Header;
