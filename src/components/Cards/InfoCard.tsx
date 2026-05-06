type InfoCardProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
};

const InfoCard: React.FC<InfoCardProps> = ({
  title = "Bank-grade security",
  description = "Your data is fully protected",
  icon,
  className = "",
}) => {
  return (
    <div
      className={` flex items-center gap-4 p-4 w-full max-w-[384px] bg-surface border
        border-white/40 rounded-2xl shadow-[var(--shadow-sm)] `}
    >
      {/* Icon */}
      <div
        className={` flex items-center justify-center w-[48px] h-[48px] rounded-[14px]
          shadow-[var(--card-icon-shadow)] ${className} `}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <h3 className="text-[18px] font-semibold leading-[27px] text-text-heading">{title}</h3>
        <p className="text-[14px] leading-[20px] text-text-secondary">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
