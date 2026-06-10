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

  const isActive = isFocused || !!value;

  if (version === "v2") {
    return (
      <div className="w-full">
        <div className="relative z-20">
          {label && (
            <label
              htmlFor={id}
              className={`absolute z-10 pointer-events-none text-xs font-bold transition-all
              duration-200 ${
                isActive
                  ? "top-[-8px] left-[16px] w-fit bg-[#F8FAFC] px-[4px] text-primary"
                  : `${leftIcon ? "left-12" : "left-5"} top-1/2 -translate-y-1/2
                    text-muted-foreground`
              }`}
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

          <DatePicker
            id={id}
            selected={value}
            onChange={onChange}
            dateFormat="dd MMM yyyy"
            calendarClassName="custom-datepicker"
            dayClassName={() => "custom-day"}
            weekDayClassName={() => "custom-weekday"}
            monthClassName={() => "custom-month"}
            className={`h-16 w-full rounded-2xl bg-[#F8FAFC] px-5 text-sm text-foreground
              shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] transition-all
              duration-200 focus:outline-none ${leftIcon ? "pl-12" : ""} ${rightIcon ? "pr-12" : ""}
              ${
                error
                  ? "border border-destructive"
                  : "border border-transparent focus:border-primary"
              }`}
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
            <div className="absolute right-5 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="mt-1 px-1 text-[12px] text-destructive">{error}</p>}

        <style jsx global>{`
          .custom-datepicker {
            background: #f8fafc;
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 8px;
            width: 320px;
            font-family: inherit;
            box-shadow:
              0px 10px 25px rgba(0, 0, 0, 0.08),
              0px 4px 10px rgba(0, 0, 0, 0.04);
            overflow: hidden;
          }

          .react-datepicker__month-container {
            float: none;
          }

          .custom-datepicker .react-datepicker__triangle {
            display: none;
          }

          .custom-datepicker .react-datepicker__header {
            background: transparent !important;
            border-bottom: none !important;
            padding-top: 2px !important;
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

          .custom-datepicker .react-datepicker__navigation-icon::before {
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
            background: #f8fafc;
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
      <div className="relative z-20">
        {label && (
          <label
            htmlFor={id}
            className={`absolute z-10 pointer-events-none font-semibold transition-all duration-200
            ${
              isActive
                ? "left-5 top-2 text-[11px] text-primary"
                : `${leftIcon ? "left-12" : "left-5"} top-1/2 -translate-y-1/2 text-xs
                  text-muted-foreground`
            }`}
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

        <DatePicker
          id={id}
          selected={value}
          onChange={onChange}
          dateFormat="dd MMM yyyy"
          calendarClassName="custom-datepicker"
          dayClassName={() => "custom-day"}
          weekDayClassName={() => "custom-weekday"}
          monthClassName={() => "custom-month"}
          className={`h-16 w-full rounded-2xl bg-[#F8FAFC] px-5 pb-2 pt-6 text-sm text-foreground
            shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] transition-all
            duration-200 focus:outline-none ${leftIcon ? "pl-12" : ""} ${rightIcon ? "pr-12" : ""}
            ${
              error ? "border border-destructive" : "border border-transparent focus:border-primary"
            }`}
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
          <div className="absolute right-5 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <p className="mt-1 px-1 text-[12px] text-destructive">{error}</p>}
    </div>
  );
};

export default CustomDatePicker;
