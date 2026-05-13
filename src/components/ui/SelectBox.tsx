"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useId, useState } from "react";
import Select, { Props as SelectProps, GroupBase } from "react-select";

interface CustomSelectProps extends SelectProps<any, boolean, GroupBase<any>> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  required?: boolean;
  containerClassName?: string;
  version?: "v1" | "v2";
}

const SelectBox = ({
  label,
  leftIcon,
  rightIcon,
  error,
  required,
  containerClassName,
  version = "v2",
  ...props
}: CustomSelectProps) => {
  const id = props.id || useId();
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = props.value && (Array.isArray(props.value) ? props.value.length > 0 : true);

  const isActive = isFocused || hasValue;

  if (version === "v2") {
    return (
      <div className={cn("w-full", containerClassName)}>
        <div className="relative">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "absolute transition-all duration-200 pointer-events-none z-10 text-xs font-bold",
                isActive
                  ? "top-[-8px] left-[7px] px-[3px] bg-input-bg w-fit"
                  : `${leftIcon ? "left-[36px]" : "left-[10px]"} top-1/2 -translate-y-1/2`,
              )}
            >
              {label} {required && "*"}
            </label>
          )}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 ">{leftIcon}</div>
          )}
          <Select
            {...props}
            inputId={id}
            unstyled
            placeholder=" "
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            classNames={{
              control: () =>
                cn(
                  "px-[10px] py-[11px] text-xs border-2 rounded-[5px] bg-input-bg cursor-pointer",
                  error ? "!border-destructive" : "border-primary",
                ),
              valueContainer: () => "p-0 m-0",
              input: () => "m-0 p-0 text-xs",
              singleValue: () => "text-xs",
              placeholder: () => "text-xs text-text-muted",
              indicatorsContainer: () => "p-0 ml-1",
              dropdownIndicator: () => "p-0 text-primary",
              clearIndicator: () => "p-0",
              menu: () => "mt-1 bg-surface border border-border rounded-md shadow-lg z-50",
              option: ({ isFocused, isSelected }) =>
                cn(
                  "px-3 py-2 text-xs cursor-pointer",
                  isFocused && "bg-muted",
                  isSelected && "bg-info/10 text-info",
                ),
            }}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 ">{rightIcon}</div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-destructive px-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className={cn("w-full", containerClassName)}>
      <div
        className={cn(
          "relative flex items-center w-full h-[64px]",
          "",
          "bg-input-bg rounded-[16px]",
          "shadow-[var(--shadow-sm)]",
          error ? "border border-destructive" : "border border-transparent",
        )}
      >
        {leftIcon && <div className="mr-[10px] flex items-center">{leftIcon}</div>}

        <div className="relative flex-1">
          <Select
            {...props}
            inputId={id}
            unstyled
            placeholder=""
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            classNames={{
              control: () =>
                "bg-transparent border-none shadow-none min-h-0 h-auto px-[20px] pt-[24px] pb-[8px]",
              valueContainer: () => "p-0 m-0",
              input: () => "m-0 p-0 text-[14px] ",
              singleValue: () => "text-[14px]",
              indicatorsContainer: () => "p-0 ml-2",
              dropdownIndicator: () => "p-0  ",
              clearIndicator: () => "p-0",
              menu: () => "mt-2 bg-surface border rounded-md shadow-lg z-50 w-full",
              option: ({ isFocused, isSelected }) =>
                cn(
                  "px-3 py-2 text-sm cursor-pointer",
                  isFocused && "bg-muted",
                  isSelected && "bg-info/10 text-info",
                ),
            }}
          />

          {label && (
            <label
              htmlFor={id}
              className={cn(
                `absolute left-0 font-medium -translate-y-1/2 text-[16px] transition-all
                duration-200 `,
                leftIcon ? "left-[20px]" : "left-[20px]",

                error ? "text-destructive" : "text-text-muted",

                !isActive && "top-[24px] ",
                isActive && "top-[16px] text-text-label",
              )}
            >
              {label} {required && "*"}
            </label>
          )}
        </div>

        {rightIcon && <div className="ml-[10px] flex items-center">{rightIcon}</div>}
      </div>

      {error && <p className="mt-1 text-sm text-destructive px-1">{error}</p>}
    </div>
  );
};

export default SelectBox;
