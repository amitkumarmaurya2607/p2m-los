"use client";
import React, { InputHTMLAttributes, useId, useState } from "react";

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
  version = "v1",
  ...props
}: TextInputProps) => {
  const id = props?.id || useId();
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props?.value !== undefined && props?.value !== "";
  const isFloating = isFocused || hasValue;
  if (version === "v2") {
    return (
      <div className="w-full">
        <div className="relative">
          {label && (
            <label
              htmlFor={id}
              className={`absolute transition-all duration-200 pointer-events-none z-10 text-xs
              font-bold ${
                isFloating
                  ? "top-[-8px] left-[7px] px-[3px] bg-input-bg w-fit"
                  : `${leftIcon ? "left-[36px]" : "left-[10px]"} top-1/2 -translate-y-1/2`
              }`}
            >
              {label}
              {require && <span className="text-destructive ml-0.5">*</span>}
            </label>
          )}
          {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{leftIcon}</div>}
          <input
            id={id}
            {...props}
            placeholder={isFloating ? props?.placeholder || "Write here..." : " "}
            onFocus={(e) => {
              setIsFocused(true);
              props?.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={`px-[10px] py-[11px] text-xs border-2 rounded-[5px] bg-input-bg
              focus:outline-none w-full ${leftIcon ? "pl-[36px]" : ""}
              ${rightIcon ? "pr-[36px]" : ""} ${error ? "!border-destructive" : "border-primary"}
              ${className}`}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightIcon}</div>
          )}
        </div>
        {error && <p className="mt-1 text-[12px] text-destructive px-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={id}
            className={`absolute z-10 pointer-events-none font-semibold transition-all duration-200
            ${
              isFloating
                ? "left-5 top-2 text-[11px] text-primary"
                : `${leftIcon ? "left-11" : "left-5"} top-1/2 -translate-y-1/2 text-xs
                  text-muted-foreground`
            }`}
          >
            {label}
            {require && <span className="ml-0.5 text-destructive">*</span>}
          </label>
        )}

        {leftIcon && (
          <div className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}

        <input
          id={id}
          {...props}
          placeholder={isFloating ? props.placeholder : ""}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={` h-16 w-full rounded-2xl bg-[#F8FAFC] px-5 pb-2 pt-6 text-sm text-foreground
            shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] transition-all
            duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20
            ${leftIcon ? "pl-12" : ""} ${rightIcon ? "pr-12" : ""} ${
              error
                ? "border border-destructive focus:ring-destructive/20"
                : "border border-transparent"
            } ${className} `}
        />

        {rightIcon && (
          <div className="absolute right-5 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <p className="mt-1 px-1 text-[12px] text-destructive">{error}</p>}
    </div>
  );
};

export default TextInput;
