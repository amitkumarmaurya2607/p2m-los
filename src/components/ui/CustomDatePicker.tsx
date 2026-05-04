'use client'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  label?: string
  value?: Date | null
  onChange: (date: Date | null) => void
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const CustomDatePicker = ({
  label,
  value,
  onChange,
  error,
  leftIcon,
  rightIcon,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false)

  const isActive = isFocused || value

  return (
    <div className="w-full">
      <div
        className={`relative flex items-center w-full h-[64px] px-[20px] pt-[24px] pb-[8px] 
        bg-[#F8FAFC] rounded-[16px] 
        shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]
        ${error ? "border border-red-500" : "border border-transparent"}`}
      >
        {leftIcon && <div className="mr-[10px] flex items-center">{leftIcon}</div>}

        <div className="relative flex-1">
          <DatePicker
            selected={value}
            onChange={onChange}
            dateFormat="dd/MM/yyyy"
            placeholderText=""
            className="w-full bg-transparent outline-none text-[14px] pt-[12px]"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {label && (
            <label
              className={`absolute left-0 font-medium transition-all duration-200 pointer-events-none
                ${error ? "text-red-500" : "text-[#94A3B8]"}
                ${
                  isActive
                    ? "top-0 text-[12px] text-[#64748B]"
                    : "top-[10px] -translate-y-1/2 text-[16px]"
                }
              `}
            >
              {label}
            </label>
          )}
        </div>

        {rightIcon && <div className="ml-[10px] flex items-center">{rightIcon}</div>}
      </div>

      {error && <p className="mt-1 text-sm text-red-500 px-1">{error}</p>}
    </div>
  )
}

export default CustomDatePicker