"use client";

import React from "react";
import { useApplicationSteps } from "@/hooks/useApplicationSteps";

const ProgressBar: React.FC = () => {
  const { progress } = useApplicationSteps();

  return (
    <div className="w-full h-[6px] bg-stepper-pending overflow-hidden">
      <div
        className="h-full transition-all duration-300 
        bg-gradient-to-r from-secondary via-primary to-primary-light"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
