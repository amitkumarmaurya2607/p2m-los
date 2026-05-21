import React from "react";

type PulseDotProps = {
    className?: string;
};

const PulseDot = ({ className = "" }: PulseDotProps) => {
    return (
        <span className={`relative flex mt-2 h-2 w-2 shrink-0 ${className}`}>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
    );
};

export default PulseDot;