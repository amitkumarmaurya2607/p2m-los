"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, useId, useState } from "react";
import Select, { Props as SelectProps, GroupBase } from "react-select";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CustomSelectProps extends SelectProps<any, boolean, GroupBase<any>> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  required?: boolean;
  containerClassName?: string;
  version?: "v1" | "v2";
  className?: string;
}

const SelectBox = ({
  label,
  leftIcon,
  rightIcon,
  error,
  required,
  className,
  containerClassName,
  version = "v2",
  ...props
}: CustomSelectProps) => {
  const generatedId = useId();
  const id = props.id || generatedId;

  const [isFocused, setIsFocused] = useState(false);

  const hasValue =
    props.value &&
    (Array.isArray(props.value) ? props.value.length > 0 : true);

  const isActive = isFocused || hasValue;

  if (version === "v2") {
    return (
      <div className={cn("w-full", containerClassName)}>
        <div className="relative w-full">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "absolute z-10 pointer-events-none text-xs font-bold transition-all duration-200",
                isActive
                  ? "top-[-8px] left-[16px] w-fit bg-[#F8FAFC] px-[4px] text-primary"
                  : cn(
                    "top-1/2 -translate-y-1/2 text-muted-foreground",
                    leftIcon ? "left-12" : "left-5"
                  )
              )}
            >
              {label}
              {required && (
                <span className="ml-0.5 text-destructive">*</span>
              )}
            </label>
          )}

          {leftIcon && (
            <div className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}

          <Select
            {...props}
            inputId={id}
            unstyled
            placeholder=" "
            menuPortalTarget={
              typeof document !== "undefined" ? document.body : undefined
            }
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            classNames={{
              control: ({ isFocused }) =>
                cn(
                  "min-h-[64px] h-[64px] rounded-2xl bg-[#F8FAFC]",
                  "px-5",
                  "shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]",
                  "border cursor-pointer transition-all duration-200",
                  error
                    ? "border-destructive"
                    : isFocused
                      ? "border-primary"
                      : "border-transparent",
                  className
                ),

              valueContainer: () =>
                cn(
                  "m-0 p-0",
                  leftIcon && "pl-7",
                  rightIcon && "pr-7"
                ),

              input: () => "m-0 p-0 text-sm text-foreground",

              singleValue: () => "text-sm text-foreground",

              placeholder: () => "text-sm text-muted-foreground",

              indicatorsContainer: () => "h-full p-0",

              dropdownIndicator: () => "p-0 text-muted-foreground",

              clearIndicator: () => "p-0 text-muted-foreground",

              indicatorSeparator: () => "hidden",

              menu: () =>
                "mt-2 overflow-hidden rounded-xl border border-border bg-background shadow-lg z-50",

              menuList: () => "py-1",

              option: ({ isFocused, isSelected }) =>
                cn(
                  "cursor-pointer px-4 py-3 text-sm transition-colors",
                  isFocused && "bg-muted",
                  isSelected && "bg-primary/10 text-primary"
                ),

              noOptionsMessage: () =>
                "px-4 py-3 text-sm text-muted-foreground",
            }}
          />

          {rightIcon && (
            <div className="absolute right-12 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 px-1 text-[12px] text-destructive">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn("w-full", containerClassName)}>
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "absolute z-10 pointer-events-none font-semibold transition-all duration-200",
              isActive
                ? "left-5 top-2 text-[11px] text-primary"
                : cn(
                  "top-1/2 -translate-y-1/2 text-xs text-muted-foreground",
                  leftIcon ? "left-12" : "left-5"
                )
            )}
          >
            {label}
            {required && <span className="ml-0.5 text-destructive">*</span>}
          </label>
        )}

        {leftIcon && (
          <div className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}

        <Select
          {...props}
          inputId={id}
          unstyled
          placeholder=" "
          menuPortalTarget={
            typeof document !== "undefined" ? document.body : undefined
          }
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          classNames={{
            control: ({ isFocused }) =>
              cn(
                "min-h-[64px] h-[64px] rounded-2xl bg-[#F8FAFC]",
                "px-5 pt-6 pb-2",
                "shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]",
                "border cursor-pointer transition-all duration-200",
                error
                  ? "border-destructive"
                  : isFocused
                    ? "border-primary"
                    : "border-transparent",
                className
              ),

            valueContainer: () =>
              cn("m-0 p-0", leftIcon && "pl-7", rightIcon && "pr-7"),

            input: () => "m-0 p-0 text-sm text-foreground",

            singleValue: () => "text-sm text-foreground",

            placeholder: () => "text-sm text-muted-foreground",

            indicatorsContainer: () => "h-full p-0",

            dropdownIndicator: () => "p-0 text-muted-foreground",

            clearIndicator: () => "p-0 text-muted-foreground",

            indicatorSeparator: () => "hidden",

            menu: () =>
              "mt-2 overflow-hidden rounded-xl border border-border bg-background shadow-lg z-50",

            menuList: () => "py-1",

            option: ({ isFocused, isSelected }) =>
              cn(
                "cursor-pointer px-4 py-3 text-sm transition-colors",
                isFocused && "bg-muted",
                isSelected && "bg-primary/10 text-primary"
              ),

            noOptionsMessage: () =>
              "px-4 py-3 text-sm text-muted-foreground",
          }}
        />

        {rightIcon && (
          <div className="absolute right-12 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 px-1 text-[12px] text-destructive">{error}</p>
      )}
    </div>
  );
};

export default SelectBox;