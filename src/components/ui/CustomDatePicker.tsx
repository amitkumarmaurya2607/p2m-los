"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  label?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const CustomDatePicker = ({ label, value, onChange, error, leftIcon, rightIcon }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || value;

  return (
    <div className="w-full">
      <div
        className={`relative flex items-center w-full h-[64px] px-[20px] pt-[24px] pb-[8px] 
        bg-input-bg rounded-[16px] 
        shadow-[var(--shadow-sm)]
        ${error ? "border border-destructive" : "border border-transparent"}`}
      >
        {leftIcon && <div className="mr-[10px] flex items-center">{leftIcon}</div>}

        <div className="relative flex-1">
          <DatePicker
            selected={value}
            onChange={onChange}
            dateFormat="dd/MM/yyyy"
            className="w-full bg-transparent outline-none text-[14px] pt-[12px]"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            maxDate={new Date()}
          />

          {label && (
            <label
              className={`absolute left-0 text-[16px] font-medium transition-all duration-200 
                ${error ? "text-destructive" : "text-text-muted"}
                ${isActive ? "top-[-10px]  text-text-label" : "top-[0px] "}
              `}
            >
              {label}
            </label>
          )}
        </div>

        {rightIcon && <div className="ml-[10px] flex items-center">{rightIcon}</div>}
      </div>

      {error && <p className="mt-1 text-sm text-destructive px-1">{error}</p>}
    </div>
  );
};

export default CustomDatePicker;
