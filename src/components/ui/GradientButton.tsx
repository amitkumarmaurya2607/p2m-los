import React, { ButtonHTMLAttributes } from "react";

type GradientButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const GradientButton = ({
  children = "Button",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: GradientButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`
        w-full h-[60px]
        rounded-[16px]
        text-white font-medium
        flex items-center justify-center gap-2

        bg-[linear-gradient(90deg,#00C89C_0%,#00C599_10%,#00C297_20%,#00BE94_30%,#00BB91_40%,#00B88F_50%,#00B58C_60%,#00B18A_70%,#00AE87_80%,#00AB85_90%,#00A882_100%)]

        shadow-[0px_12px_24px_-8px_rgba(0,200,156,0.4)]

        hover:opacity-90
        active:scale-[0.98]
        transition-all duration-200

        disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100

        ${className}
      `}
    >
      {/* Left Icon */}
      {!loading && leftIcon && (
        <span className="flex items-center">{leftIcon}</span>
      )}

      {/* Loading Spinner OR Text */}
      {loading ? (
    <span className="flex items-center gap-2">
  <span className="inline-block w-4 h-4 border-2 border-white border-r-transparent border-b-transparent rounded-full animate-spin" />
  Loading...
</span>
      ) : (
        <span>{children}</span>
      )}

      {/* Right Icon */}
      {!loading && rightIcon && (
        <span className="flex items-center">{rightIcon}</span>
      )}
    </button>
  );
};

export default GradientButton;