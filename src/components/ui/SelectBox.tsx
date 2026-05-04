'use client'
import { cn } from '@/lib/utils'
import React, { ReactNode, useId, useState } from 'react'
import Select, { Props as SelectProps, GroupBase } from 'react-select'

interface CustomSelectProps extends SelectProps<any, boolean, GroupBase<any>> {
  label?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  error?: string
  required?: boolean
  containerClassName?: string
}

const SelectBox = ({
  label,
  leftIcon,
  rightIcon,
  error,
  required,
  containerClassName,
  ...props
}: CustomSelectProps) => {
  const id = props.id || useId()
  const [isFocused, setIsFocused] = useState(false)

  const hasValue =
    props.value &&
    (Array.isArray(props.value) ? props.value.length > 0 : true)

  const isActive = isFocused || hasValue

  return (
    <div className={cn("w-full", containerClassName)}>
      
      <div
        className={cn(
          "relative flex items-center w-full h-[64px]",
          "px-[20px] pt-[24px] pb-[8px]",
          "bg-input-bg rounded-[16px]",
          "shadow-[var(--shadow-sm)]",
          error ? "border border-destructive" : "border border-transparent"
        )}
      >
        {leftIcon && (
          <div className="mr-[10px] flex items-center">
            {leftIcon}
          </div>
        )}

        <div className="relative flex-1">
          <Select
            {...props}
            inputId={id}
            unstyled
            placeholder=""
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            classNames={{
              control: () =>
                "bg-transparent border-none shadow-none min-h-0 h-auto",
              valueContainer: () => "p-0 m-0",
              input: () => "m-0 p-0 text-[14px]",
              singleValue: () => "text-[14px]",
              indicatorsContainer: () => "p-0 ml-2",
              dropdownIndicator: () => "p-0",
              clearIndicator: () => "p-0",
              menu: () =>
                "mt-2 bg-surface border rounded-md shadow-lg z-50",
              option: ({ isFocused, isSelected }) =>
                cn(
                  "px-3 py-2 text-sm cursor-pointer",
                  isFocused && "bg-muted",
                  isSelected && "bg-foreground text-background"
                ),
            }}
          />

          {label && (
            <label
              htmlFor={id}
              className={cn(
                "absolute font-medium pointer-events-none transition-all duration-200",
                leftIcon ? "left-[0px]" : "left-0",

                error ? "text-destructive" : "text-text-muted",

                !isActive &&
                  "top-[10px] -translate-y-1/2 text-[16px]",
                isActive &&
                  "top-0 text-[12px] text-text-label"
              )}
            >
              {label} {required && "*"}
            </label>
          )}
        </div>

        {rightIcon && (
          <div className="ml-[10px] flex items-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-destructive px-1">
          {error}
        </p>
      )}
    </div>
  )
}

export default SelectBox
