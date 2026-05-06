import { ArrowLeft } from "lucide-react";
import React from "react";

type StepCardProps = {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  back?: () => void;
};

const StepCard: React.FC<StepCardProps> = ({
  title,
  subtitle,
  icon,
  children,
  className = "",
  back,
}) => {
  return (
    <div
      className={` w-full max-w-[512px] lg:max-w-none lg:w-[512px] min-h-[430px] p-8 lg:p-12 flex
        flex-col gap-6 flex flex-col lg:gap-8 bg-surface-overlay-90 border border-border-light
        rounded-[16px] lg:rounded-[32px] shadow-[var(--shadow-lg)] ${className} `}
    >
      {back && (
        <button
          className="flex items-center justify-center w-[40px] h-[40px] bg-muted rounded-full"
          onClick={back}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      <div className="flex flex-col gap-4">
        {icon && (
          <div
            className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-muted
              text-primary"
          >
            {icon}
          </div>
        )}

        <h2
          className="text-[30px] leading-[36px] font-extrabold tracking-[-0.75px] text-text-heading"
        >
          {title}
        </h2>

        <p className="text-[14px] text-text-muted">{subtitle}</p>
      </div>

      <div className="w-full flex-1">{children}</div>
    </div>
  );
};

export default StepCard;
