import React, { InputHTMLAttributes, useState } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  require?: boolean;
  version?: "v1" | "v2";
};

const TextInput = ({
  label,
  leftIcon,
  rightIcon,
  error,
  require,
  className = "",
  version = "v2",
  ...props
}: TextInputProps) => {
  if (version === "v2") {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value !== undefined && props.value !== "";
    const isFloating = isFocused || hasValue;

    return (
      <div className="w-full">
        <div className="relative">
          {label && (
            <label
              className={`absolute transition-all duration-200 pointer-events-none z-10 text-xs font-bold  ${isFloating ? "top-[-8px] left-[7px] px-[3px] bg-input-bg w-fit" : `${leftIcon ? "left-[36px]" : "left-[10px]"} top-1/2 -translate-y-1/2`}`}
            >
              {label}
              {require && <span className="text-destructive ml-0.5">*</span>}
            </label>
          )}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">{leftIcon}</div>
          )}
          <input
            {...props}
            placeholder={isFloating ? props.placeholder || "Write here..." : " "}
            onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
            onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
            className={`px-[10px] py-[11px] text-xs border-2 rounded-[5px] bg-input-bg focus:outline-none w-full ${leftIcon ? "pl-[36px]" : ""} ${rightIcon ? "pr-[36px]" : ""} ${error ? "!border-destructive" : "border-primary"} ${className}`}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightIcon}</div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-destructive px-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={`relative flex items-center w-full h-[64px] px-[20px] pt-[24px] pb-[8px]
          bg-input-bg rounded-[16px] shadow-[var(--shadow-sm)]
          ${error ? "border border-destructive" : "border border-transparent"} `}
      >
        {leftIcon && (
          <div className="mr-[10px] h-[64px] mt-[-15px] flex items-center">{leftIcon}</div>
        )}

        <div className="relative flex-1">
          <input
            {...props}
            placeholder=" "
            className={`peer w-full bg-transparent outline-none text-[14px] pt-[12px] ${className}`}
          />

          {label && (
            <label
              className={`absolute left-0 font-medium top-[10px] -translate-y-1/2 text-[16px]
              transition-all duration-200 pointer-events-none text-text-muted peer-focus:top-0
              peer-focus:text-text-label peer-[&:not(:placeholder-shown)]:top-0
              peer-[&:not(:placeholder-shown)]:text-text-label`}
            >
              {label}
              {require && <span className="text-destructive ml-0.5">*</span>}
            </label>
          )}
        </div>

        {rightIcon && (
          <div className="ml-[10px] h-[64px] mt-[-15px] flex items-center">{rightIcon}</div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-destructive px-1">{error}</p>}
    </div>
  );
};

export default TextInput;
