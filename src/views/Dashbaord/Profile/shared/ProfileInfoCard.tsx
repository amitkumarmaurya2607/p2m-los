import React from "react";
import type { LucideIcon } from "lucide-react";

type ProfileInfoCardProps = {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
};

const ProfileInfoCard = ({ title, icon: Icon, children, rightSlot }: ProfileInfoCardProps) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex items-center gap-3 border-b border-border px-5 py-5 sm:px-8">
        {Icon && (
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10
              text-primary"
          >
            <Icon className="h-5 w-5" />
          </div>
        )}

        <h2 className="flex-1 text-lg font-bold text-text-heading sm:text-xl">{title}</h2>
        {rightSlot}
      </div>

      <div className="px-5 sm:px-8">{children}</div>
    </section>
  );
};

export default ProfileInfoCard;
