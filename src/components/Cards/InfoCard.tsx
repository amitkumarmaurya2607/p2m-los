import React from "react";

interface InfoCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title = "Bank-grade security",
  description = "Your data is fully protected",
  icon,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center gap-4 p-4 w-[384px] h-[82px] bg-white border border-white/40 shadow-sm rounded-2xl ${className}`}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 flex items-center justify-center rounded-xl 
        bg-gradient-to-br from-[#6FFFD2] to-[#00C89C]
        shadow-[0px_10px_30px_rgba(0,0,0,0.3),inset_0px_-2px_0px_rgba(0,0,0,0.2)]"
      >
        {icon ?? (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M12 3l7 4v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V7l7-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <h3 className="text-[18px] font-semibold text-[#0F172B] leading-[27px]">
          {title}
        </h3>
        <p className="text-[14px] text-[#45556C] leading-[20px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;