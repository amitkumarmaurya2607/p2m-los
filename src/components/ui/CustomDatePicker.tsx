"use client";
import React, { useId, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  label?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  version?: "v1" | "v2";
};

const CustomDatePicker = ({
  label,
  value,
  onChange,
  error,
  required,
  leftIcon,
  rightIcon,
  version = "v2",
}: Props) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || value;

  if (version === "v2") {
    return (
      <div className="w-full">
        <div className="relative z-20">
          {label && (
            <label
              htmlFor={id}
              className={`absolute transition-all duration-200 pointer-events-none z-10 text-xs font-bold
              ${isActive
                  ? "top-[-8px] left-[7px] px-[3px] bg-input-bg w-fit"
                  : `${leftIcon ? "left-[36px]" : "left-[10px]"} top-1/2 -translate-y-1/2`
                }`}
            >
              {label}
              {required && <span className="text-destructive ml-0.5">*</span>}
            </label>
          )}

          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
              {leftIcon}
            </div>
          )}

          <DatePicker
            id={id}
            selected={value}
            onChange={onChange}
            dateFormat="dd MMM yyyy"
            calendarClassName="custom-datepicker"
            dayClassName={() => "custom-day"}
            weekDayClassName={() => "custom-weekday"}
            monthClassName={() => "custom-month"}
            className={`px-[10px] py-[11px] text-xs border-2 rounded-[5px] bg-input-bg focus:outline-none w-full
            ${leftIcon ? "pl-[36px]" : ""}
            ${rightIcon ? "pr-[36px]" : ""}
            ${error ? "!border-destructive" : "border-primary"}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            maxDate={new Date()}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-destructive px-1">{error}</p>
        )}

        {/* DATEPICKER CUSTOM STYLE */}
        <style jsx global>{`
          .custom-datepicker {
            background: var(--background);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 8px;
            width: 320px;
            font-family: inherit;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }

          .react-datepicker__month-container{
            float: none;
          }

          .custom-datepicker .react-datepicker__triangle {
            display: none;
          }

          .custom-datepicker .react-datepicker__header {
            background: transparent!important;
            border-bottom: none!important;
            padding-top: 2px!important;
          }

          .custom-datepicker .react-datepicker__current-month {
            color: var(--foreground);
            font-size: 18px;
            font-weight: 700;
            text-align: center;
            margin-left: 8px;
            margin-top: 10px;
          }

          .custom-datepicker .react-datepicker__navigation {
            top: 18px;
          }

          .custom-datepicker
            .react-datepicker__navigation-icon::before {
            border-color: var(--foreground);
            border-width: 2px 2px 0 0;
            height: 8px;
            width: 8px;
          }

          .custom-datepicker .react-datepicker__day-names {
            margin-top: 6px;
            display: flex;
            justify-content: space-between;
            padding: 0 6px;
          }

          .custom-weekday {
            color: var(--text-muted);
            font-size: 12px;
            font-weight: 600;
            width: 2.2rem;
            line-height: 1.6rem;
          }

          .custom-datepicker .react-datepicker__month {
            margin: 4px 0 0;
          }

          .custom-datepicker .react-datepicker__week {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
          }

          .custom-day {
            width: 2rem;
            line-height: 1.6rem;
            border-radius: 999px;
            color: var(--text-body);
            font-size: 14px;
            transition: all 0.2s ease;
          }

          .custom-day:hover {
            background: var(--surface-muted);
          }

          .custom-datepicker .react-datepicker__day--selected,
          .custom-datepicker .react-datepicker__day--keyboard-selected {
            background: var(--primary) !important;
            border: 1.5px solid var(--primary);
            color: var(--primary-foreground) !important;
          }

          .custom-datepicker .react-datepicker__day--today {
            font-weight: 700;
          }

          .custom-datepicker .react-datepicker__day--outside-month {
            color: var(--text-label);
          }

          .custom-datepicker .react-datepicker__month-dropdown,
          .custom-datepicker .react-datepicker__year-dropdown {
            background: var(--background);
            border: 1px solid var(--border);
            border-radius: 10px;
          }

          .custom-datepicker .react-datepicker__month-option,
          .custom-datepicker .react-datepicker__year-option {
            color: var(--text-body);
          }

          .custom-datepicker .react-datepicker__month-option:hover,
          .custom-datepicker .react-datepicker__year-option:hover {
            background: var(--surface-muted);
          }

          .custom-datepicker .react-datepicker__month-select,
          .custom-datepicker .react-datepicker__year-select {
            background: transparent;
            color: var(--foreground);
            border: none;
            font-weight: 600;
            outline: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={`relative flex items-center w-full h-[64px] px-[20px] pt-[24px] pb-[8px]
        bg-input-bg rounded-[16px] shadow-[var(--shadow-sm)]
        ${error ? "border border-destructive" : "border border-transparent"}`}
      >
        {leftIcon && (
          <div className="mr-[10px] flex items-center">{leftIcon}</div>
        )}

        <div className="relative flex-1">
          <DatePicker
            id={id}
            selected={value}
            onChange={onChange}
            dateFormat="dd MMM yyyy"
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
              htmlFor={id}
              className={`absolute left-0 text-[16px] font-medium transition-all duration-200
              ${error ? "text-destructive" : "text-text-muted"}
              ${isActive ? "top-[-10px] text-text-label" : "top-[0px]"}`}
            >
              {label}
              {required && (
                <span className="text-destructive ml-0.5">*</span>
              )}
            </label>
          )}
        </div>

        {rightIcon && (
          <div className="ml-[10px] flex items-center">{rightIcon}</div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-destructive px-1">{error}</p>
      )}
    </div>
  );
};

export default CustomDatePicker;