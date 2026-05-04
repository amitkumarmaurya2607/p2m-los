import React, { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
};

const TextInput = ({
  label,
  leftIcon,
  rightIcon,
  error,
  className = "",
  ...props
}: TextInputProps) => {
  return (
    <div className="w-full">
      <div
        className={`relative flex items-center w-full h-[64px] px-[20px] pt-[24px] pb-[8px] 
        bg-input-bg rounded-[16px] 
        shadow-[var(--shadow-sm)]
        ${error ? "border border-destructive" : "border border-transparent"}
        `}
      >
        {leftIcon && <div className="mr-[10px] flex items-center">{leftIcon}</div>}

        <div className="relative flex-1">
          <input
            {...props}
            placeholder=" "
            className={`peer w-full bg-transparent outline-none text-[14px] pt-[12px] ${className}`}
          />

          {label && (
            <label
              className={`absolute left-0 font-medium top-[10px] -translate-y-1/2 text-[16px] transition-all duration-200 pointer-events-none
              ${
                error ? "text-destructive" : "text-text-muted"
              }
              peer-focus:top-0 peer-focus:text-text-label
              peer-[&:not(:placeholder-shown)]:top-0
              peer-[&:not(:placeholder-shown)]:text-text-label`}
            >
              {label}
            </label>
          )}
        </div>

        {rightIcon && <div className="ml-[10px] flex items-center">{rightIcon}</div>}
      </div>

      {error && (
        <p className="mt-1 text-sm text-destructive px-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
