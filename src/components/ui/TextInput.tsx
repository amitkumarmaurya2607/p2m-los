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
      {/* Input Wrapper */}
      <div
        className={`relative flex items-center w-full h-[64px] px-[20px] pt-[24px] pb-[8px] 
        bg-[#F8FAFC] rounded-[16px] 
        shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]
        ${error ? "border border-red-500" : "border border-transparent"}
        `}
      >
        {/* Left Icon */}
        {leftIcon && <div className="mr-[10px] flex items-center">{leftIcon}</div>}

        {/* Input + Label */}
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
                error ? "text-red-500" : "text-[#94A3B8]"
              }
              peer-focus:top-0 peer-focus:text-[#64748B]
              peer-[&:not(:placeholder-shown)]:top-0
              peer-[&:not(:placeholder-shown)]:text-[#64748B]`}
            >
              {label}
            </label>
          )}
        </div>

        {/* Right Icon */}
        {rightIcon && <div className="ml-[10px] flex items-center">{rightIcon}</div>}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-500 px-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;