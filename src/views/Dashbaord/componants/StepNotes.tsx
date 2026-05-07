import { useEffect, useState } from "react";
import { Fingerprint, ShieldCheck } from "lucide-react";

import { useStickyOnScroll } from "../../../hooks/useStickyOnScroll";

type StepNotesProps = {
  title?: string;
  description?: string;

  noteTitle?: string;
  noteDescription?: React.ReactNode;

  icon?: React.ReactNode;
  noteIcon?: React.ReactNode;

  className?: string;
  stickyOffset?: number;
};

const StepNotes = ({
  title = "Identity Verification",
  description = "To ensure compliance and secure your application, we need to verify your government-issued identity documents.",

  noteTitle = "Secure & Encrypted",
  noteDescription = "Your data is protected with 256-bit bank-grade encryption and is never shared with unauthorized third parties.",

  icon,
  noteIcon,

  className = "",
  stickyOffset = 10,
}: StepNotesProps) => {
  const [wrapperRef, isSticky] = useStickyOnScroll<HTMLDivElement>(stickyOffset);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [wrapperRef]);

  const content = (
    <>
      {/* Top Icon */}
      <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[16px] bg-[rgba(55,55,193,0.1)]">
        {icon || (
          <Fingerprint
            size={28}
            strokeWidth={1.75}
            className="text-[#3737C1]"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col items-start gap-[10px]">
        <h2 className="text-[18px] font-bold leading-[27px] text-black">
          {title}
        </h2>

        <p className="max-w-[460px] text-[13px] font-normal leading-[20px] text-[#62748E]">
          {description}
        </p>
      </div>

      {/* Bottom Note Box */}
      <div className="flex w-full items-start gap-4 rounded-[14px] border border-[#DBEAFE] bg-[rgba(239,246,255,0.5)] p-5">
        
        {/* Note Icon */}
        <div className="flex h-6 w-6 items-center justify-center">
          {noteIcon || (
            <ShieldCheck
              size={24}
              strokeWidth={2}
              className="text-[#3737C1]"
            />
          )}
        </div>

        {/* Note Content */}
        <div className="flex flex-col items-start gap-1">
          <h4 className="text-[14px] font-semibold leading-[24px] text-black">
            {noteTitle}
          </h4>

          <p className="text-[12px] font-normal leading-[20px] text-[#45556C]">
            {noteDescription}
          </p>
        </div>
      </div>
    </>
  );

  return (
    <div ref={wrapperRef} className="relative">
      {isSticky && (
        <div
          style={{ width: dimensions.width, height: dimensions.height }}
        />
      )}

      <div
        className={`hidden lg:flex w-full max-w-[464px] flex-col items-start gap-[29px] ${
          isSticky
            ? "fixed z-10 mt-0"
            : "mt-5"
        } ${className}`}
        style={isSticky ? { top: stickyOffset, width: dimensions.width } : undefined}
      >
        {content}
      </div>
    </div>
  );
};

export default StepNotes;