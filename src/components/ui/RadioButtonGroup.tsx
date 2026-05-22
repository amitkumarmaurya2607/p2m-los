"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RadioOption = {
  value: string;
  label: string;
};

type RadioButtonGroupProps = {
  options: RadioOption[];
  name: string;
  value?: string;
  onChange: (value: string) => void;
  heading?: ReactNode;
  error?: string;
  disabled?: boolean;
  className?: string;
};

const RadioButtonGroup = ({
  options,
  name,
  value,
  onChange,
  heading,
  error,
  disabled = false,
  className,
}: RadioButtonGroupProps) => {
  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      {heading && <div className="text-sm font-medium text-text-primary">{heading}</div>}
      <div
        className="flex flex-wrap rounded-[0.5rem] bg-muted p-1
          shadow-[0_0_0px_1px_rgba(0,0,0,0.06)] text-sm"
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn("flex-1 text-center", disabled ? "cursor-not-allowed" : "cursor-pointer")}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => {
                if (!disabled) onChange(option.value);
              }}
              disabled={disabled}
              className="peer hidden"
            />
            <span
              className={cn(
                "flex items-center justify-center rounded-[0.5rem] py-2 px-3",
                "text-foreground transition-all duration-150",
                "hover:bg-white/50",
                "peer-checked:bg-background peer-checked:font-semibold",
                "peer-checked:shadow-[0_2px_8px_rgba(0,0,0,0.1)]",
                "peer-checked:relative",
                "peer-checked:animate-[radioSelect_0.3s_ease]",
                `before:content-[''] before:absolute before:w-1 before:h-1 before:rounded-full
                before:bg-primary`,
                "before:opacity-0 before:top-[-8px] before:left-1/2 before:-translate-x-1/2",
                `after:content-[''] after:absolute after:w-1 after:h-1 after:rounded-full
                after:bg-primary`,
                "after:opacity-0 after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2",
                "peer-checked:before:animate-[radioParticleUp_0.5s_ease_forwards]",
                "peer-checked:after:animate-[radioParticleDown_0.5s_ease_forwards]",
                disabled && "opacity-50",
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-destructive px-1">{error}</p>}
    </div>
  );
};

export default RadioButtonGroup;
