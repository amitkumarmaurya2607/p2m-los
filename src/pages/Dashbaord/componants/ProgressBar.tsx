import React from "react";

type ProgressBarProps = {
  value?: number; // 0 - 100
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value = 40 }) => {
  return (
    <div className="w-full h-[6px] bg-stepper-pending overflow-hidden">
      <div
        className="h-full transition-all duration-300 
        bg-gradient-to-r from-secondary via-primary to-primary-light"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ProgressBar;