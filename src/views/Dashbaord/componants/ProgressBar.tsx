"use client";

import React from "react";
import { useApplicationContext } from "@/context/ApplicationContext";

const ProgressBar: React.FC = () => {
  const { progressPercentage } = useApplicationContext();

  return (
    <div className="w-full h-[6px] bg-stepper-pending overflow-hidden">
      <div
        className="h-full transition-all duration-300 bg-gradient-to-r from-secondary via-primary
          to-primary-light"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
