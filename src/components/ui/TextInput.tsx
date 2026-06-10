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
  version = "v2",
  ...props
}: TextInputProps) => {
  const generatedId = useId();
  const id = props.id || generatedId;

  const [isFocused, setIsFocused] = useState(false);

  const hasValue =
    props.value !== undefined && props.value !== null && String(props.value).length > 0;

  const isFloating = isFocused || hasValue;

  if (version === "v2") {
    return (
      <div className="w-full">
        <div className="relative w-full">
          {label && (
            <label
              htmlFor={id}
              className={`absolute z-10 pointer-events-none text-xs font-bold transition-all
              duration-200 ${
                isFloating
                  ? "top-[-8px] left-[16px] w-fit bg-[#F8FAFC] px-[4px] text-primary"
                  : `${leftIcon ? "left-12" : "left-5"} top-1/2 -translate-y-1/2
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
            placeholder={isFloating ? props.placeholder || "Write here..." : " "}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={`h-16 w-full rounded-2xl bg-[#F8FAFC] px-5 text-sm text-foreground
              shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] transition-all
              duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20
              ${leftIcon ? "pl-12" : ""} ${rightIcon ? "pr-12" : ""} ${
                error
                  ? "border border-destructive focus:ring-destructive/20"
                  : "border border-transparent"
              } ${className}`}
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
          className={`h-16 w-full rounded-2xl bg-[#F8FAFC] px-5 pb-2 pt-6 text-sm text-foreground
            shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] transition-all
            duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20
            ${leftIcon ? "pl-12" : ""} ${rightIcon ? "pr-12" : ""} ${
              error
                ? "border border-destructive focus:ring-destructive/20"
                : "border border-transparent"
            } ${className}`}
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
