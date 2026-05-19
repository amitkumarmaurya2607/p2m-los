"use client";

import React from "react";
const ProgressBar: React.FC = () => {

  return (
    <div className="w-full h-[6px] bg-stepper-pending overflow-hidden">
      <div
        className="h-full transition-all duration-300 bg-gradient-to-r from-secondary via-primary
          to-primary-light"
        style={{ width: `0%` }}
      />
    </div>
  );
};

export default ProgressBar;
