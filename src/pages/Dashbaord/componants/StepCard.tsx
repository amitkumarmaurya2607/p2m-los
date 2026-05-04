import { ArrowLeft } from "lucide-react";
import React from "react";

type StepCardProps = {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode; // 👈 new
  children?: React.ReactNode;
  className?:string;
  back?:()=>void;
};

const StepCard: React.FC<StepCardProps> = ({
  title,
  subtitle,
  icon,
  children,
  className="",
  back
}) => {
  return (
    <div
      className={`
      w-[512px] min-h-[430px]
      p-[48px]
      flex flex-col gap-8
      bg-white/90
      border border-slate-100
      rounded-[32px]
      shadow-[0px_32px_80px_-24px_rgba(0,0,0,0.15)]

      ${className}
     `}   >

    {/* Back */}
       {back && <button
          className="flex items-center justify-center w-[40px] h-[40px] bg-[#F1F5F9] rounded-full"
          onClick={back}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>}

      {/* Header */}
      <div className="flex flex-col gap-4">
        {/* Icon */}
        {icon && (
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            {icon}
          </div>
        )}

        {/* Title */}
        <h2 className="text-[30px] leading-[36px] font-extrabold tracking-[-0.75px] text-[#0F172B]">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-[14px] text-slate-500">
          {subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="w-full flex-1">
        {children}
      </div>
    </div>
  );
};

export default StepCard;