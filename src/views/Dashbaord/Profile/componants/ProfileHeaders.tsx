import React, { useEffect, useRef } from "react";
import { Bell, Menu, Search } from "lucide-react";

interface Profile {
  name: string;
  img: string;
}

interface ProfileHeaderProps {
  role: string;
  notificationCount?: number;
  onSearch?: (value: string) => void;
  onMenuClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  role,
  notificationCount = 1,
  onSearch,
  onMenuClick = () => {},
}) => {
  const [userData, setUserData] = React.useState<Profile | null>(null);

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

  return (
    <header
      className="sticky top-0 z-30 w-full border-b border-border-medium bg-white/80 backdrop-blur-md
        shadow-sm"
    >
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl border
              border-border-medium bg-surface lg:hidden"
          >
            <Menu size={20} className="text-text-secondary" />
          </button>

          {/* Search - Hidden on Mobile */}
          <div className="relative hidden sm:block sm:w-[250px] lg:w-[288px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light"
            />

            <input
              type="text"
              placeholder="Search dashboard..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="h-[42px] w-full rounded-[14px] border border-border-medium
                bg-surface-muted/50 pl-10 pr-4 text-sm font-medium text-text-primary outline-none
                transition-all placeholder:text-text-dark-blue/50 focus:border-primary focus:ring-2
                focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Notification */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full
              hover:bg-surface-muted"
          >
            <Bell size={20} className="text-text-muted-dark" />

            {notificationCount > 0 && (
              <span
                className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white
                  bg-red-500"
              />
            )}
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 border-l border-border-medium pl-3 sm:pl-5">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-text-heading">
                {userData?.name || "User"}
              </span>

              <span className="text-xs font-medium text-text-muted-dark">{role}</span>
            </div>

            <div
              className="h-10 w-10 overflow-hidden rounded-full border border-border-medium
                bg-border-medium"
            >
              {userData?.img ? (
                <img
                  src={userData?.img}
                  alt={userData?.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-sm font-semibold
                    text-text-heading"
                >
                  {(userData?.name || "U").charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
