'use client'
import { cn } from '@/lib/utils';
import React, { ReactNode, useId, useState } from 'react';
import Select, { Props as SelectProps, GroupBase } from 'react-select';

interface CustomSelectProps extends SelectProps<any, boolean, GroupBase<any>> {
  label: string;
  leftIcon?: ReactNode;
  error?: string;
  required?: boolean;
  containerClassName?: string;
}

const SelectBox = ({
  label,
  leftIcon,
  error,
  required,
  containerClassName,
  ...props
}: CustomSelectProps) => {
  const id = props.id || useId();
  const [isFocused, setIsFocused] = useState(false);

  const hasValue =
    props.value &&
    (Array.isArray(props.value) ? props.value.length > 0 : true);

  const isFloating = isFocused || hasValue;

  return (
    <div className={cn("w-full", containerClassName)}>
      <div
        className={cn(
          "relative flex items-center w-full h-[64px]",
          "px-[20px] pt-[24px] pb-[8px]",
          "bg-[#F8FAFC] rounded-[16px]",
          "shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]",
          error && "ring-1 ring-red-500"
        )}
      >
        {/* Left Icon */}
        {leftIcon && (
          <div className="mr-[10px] flex items-center">
            {leftIcon}
          </div>
        )}

        {/* Select */}
        <div className="flex-1">
          <Select
            {...props}
            inputId={id}
            unstyled
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
                "bg-transparent border-none shadow-none min-h-0",
              valueContainer: () => "p-0 m-0",
              input: () => "m-0 p-0 text-[14px]",
              singleValue: () => "text-[14px]",
              placeholder: () => "text-[#94A3B8]",
              indicatorsContainer: () => "p-0",
              dropdownIndicator: () => "p-0",
              clearIndicator: () => "p-0",
              menu: () =>
                "mt-2 bg-white border rounded-md shadow-lg z-50",
              option: ({ isFocused, isSelected }) =>
                cn(
                  "px-3 py-2 text-sm cursor-pointer",
                  isFocused && "bg-gray-100",
                  isSelected && "bg-black text-white"
                ),
            }}
            placeholder=""
          />
        </div>

        {/* Floating Label */}
        <label
          htmlFor={id}
          className={cn(
            "absolute left-[20px] font-medium pointer-events-none transition-all duration-200",
            leftIcon && "left-[44px]",

            !isFloating && "top-[10px] -translate-y-1/2 text-[16px] text-[#94A3B8]",
            isFloating && "top-0 translate-y-0 text-[11px] text-[#64748B]"
          )}
        >
          {label} {required && "*"}
        </label>
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default SelectBox;