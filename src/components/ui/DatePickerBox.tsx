'use client'
import { cn } from '@/lib/utils';
import React, { ReactNode, useId, useRef, useState } from 'react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import { Calendar } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerBoxProps
  extends Omit<DatePickerProps, 'id' | 'placeholderText'> {
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}

const DatePickerBox = ({
  label,
  leftIcon,
  rightIcon,
  error,
  required,
  className,
  selected,
  onChange,
  ...props
}: DatePickerBoxProps) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<any>(null);

  const isFloating = isFocused || !!selected;

  return (
    <div className={cn("w-full", className)}>
      <div
        onClick={() => inputRef.current?.setFocus?.()}
        className={cn(
          "relative flex items-center w-full h-[64px]",
          "px-[20px] pt-[24px] pb-[8px]",
          "bg-[#F8FAFC] rounded-[16px]",
          "shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]",
          "cursor-text",
          error && "ring-1 ring-red-500"
        )}
      >
        {/* Left Icon */}
        {leftIcon && (
          <div className="mr-[10px] flex items-center">
            {leftIcon}
          </div>
        )}

        {/* DatePicker */}
        <div className="flex-1">
          <DatePicker
            {...props}
            selected={selected}
            onChange={onChange}
            ref={inputRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderText=""
            className="
              w-full bg-transparent outline-none
              text-[14px] pt-[12px]
            "
            wrapperClassName="w-full"
          />
        </div>

        {/* Floating Label */}
        <label
          htmlFor={id}
          className={cn(
            "absolute font-medium pointer-events-none transition-all duration-200",
            leftIcon ? "left-[44px]" : "left-[20px]",

            !isFloating &&
              "top-[10px] -translate-y-1/2 text-[16px] text-[#94A3B8]",

            isFloating &&
              "top-0 translate-y-0 text-[11px] text-[#64748B]"
          )}
        >
          {label} {required && "*"}
        </label>

        {/* Right Icon */}
        <div className="ml-[10px] flex items-center">
          {rightIcon || <Calendar className="w-4 h-4" />}
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default DatePickerBox;