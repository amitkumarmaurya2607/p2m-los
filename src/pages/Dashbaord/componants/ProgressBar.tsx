import React from "react";

type ProgressBarProps = {
  value?: number; // 0 - 100
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value = 40 }) => {
  return (
    <div className="w-full h-[6px] bg-slate-200 overflow-hidden">
      <div
        className="h-full transition-all duration-300 
        bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ProgressBar;