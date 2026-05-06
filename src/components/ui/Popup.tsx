"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PopupProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  overlayClassName?: string;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[90vw]",
};

export function Popup({
  open,
  onClose,
  children,
  title,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  overlayClassName,
}: PopupProps) {
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
        overlayClassName,
      )}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className={cn(
          `bg-surface border border-border rounded-2xl p-6 relative shadow-[var(--shadow-lg)] w-full
          max-h-[90vh] overflow-y-auto`,
          sizeClasses[size],
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between mb-4">
            {title && <h3 className="text-lg font-semibold text-text-heading">{title}</h3>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
