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
        text-primary-foreground font-medium
        flex items-center justify-center gap-2
        bg-gradient-to-r from-secondary to-secondary/90
        shadow-[var(--shadow-button)]
        hover:opacity-90
        active:scale-[0.98]
        transition-all duration-200
        disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
        ${className}
      `}
    >
      {!loading && leftIcon && (
        <span className="flex items-center">{leftIcon}</span>
      )}

      {loading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-primary-foreground border-r-transparent border-b-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        <span>{children}</span>
      )}

      {!loading && rightIcon && (
        <span className="flex items-center">{rightIcon}</span>
      )}
    </button>
  );
};

export default GradientButton;
