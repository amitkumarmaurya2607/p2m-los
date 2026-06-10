"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface PageHeaderProps {
    title?: string;
    subtitle?: string;

    showTitle?: boolean;
    showSubtitle?: boolean;
    showButton?: boolean;

    buttonText?: string;
    onButtonClick?: () => void;
    loading?: boolean;

    className?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    buttonClassName?: string;
}

export default function PageHeader({
    title = "Loan Application Status",
    subtitle = "Track the progress of your latest application.",

    showTitle = true,
    showSubtitle = true,
    showButton = true,

    buttonText = "Refresh Status",
    onButtonClick,
    loading = false,

    className = "",
    titleClassName = "",
    subtitleClassName = "",
    buttonClassName = "",
}: PageHeaderProps) {
    const hasText = (showTitle && title) || (showSubtitle && subtitle);

    return (
        <div
            className={`
        flex w-full flex-col gap-4 border-b border-[#E2E8F0] pb-5
        sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-6
        ${className}
      `}
        >
            {hasText && (
                <div className="min-w-0 flex-1">
                    {showTitle && title && (
                        <h1
                            className={`
                break-words text-2xl font-extrabold leading-8 tracking-[-0.5px] text-[#0F172B]
                sm:text-[30px] sm:leading-9 sm:tracking-[-0.75px]
                ${titleClassName}
              `}
                        >
                            {title}
                        </h1>
                    )}

                    {showSubtitle && subtitle && (
                        <p
                            className={`
                pt-1 text-sm font-medium leading-5 text-[#62748E]
                sm:text-base sm:leading-6
                ${subtitleClassName}
              `}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            {showButton && (
                <button
                    type="button"
                    onClick={onButtonClick}
                    disabled={loading}
                    className={`
            flex h-[38px] w-full shrink-0 items-center justify-center gap-2
            rounded-[14px] border border-[#E2E8F0] bg-white px-4 py-2
            text-sm font-bold leading-5 text-[#45556C]
            shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]
            transition-all hover:bg-slate-50 active:scale-[0.98]
            disabled:cursor-not-allowed disabled:opacity-60
            sm:w-auto
            ${buttonClassName}
          `}
                >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    <span className="whitespace-nowrap">
                        {loading ? "Refreshing..." : buttonText}
                    </span>
                </button>
            )}
        </div>
    );
}