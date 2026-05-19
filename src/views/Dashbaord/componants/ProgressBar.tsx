"use client";

import React from "react";
import { usePathname } from "next/navigation";

const stepRoutes = [
  "/apply",
  "/geo-location",
  "/pan-details",
  "/personal-info",
  "/aadhar-details",
  "/bank-details",
  "/account-statement",
  "/employment-details",
  "/selfie-capture",
  "/address-proof",
  "/alternate-mobile",
  "/loan-eligibility",
];

const ProgressBar: React.FC = () => {
  const pathname = usePathname();
  const idx = stepRoutes.indexOf(pathname);
  const progressPercentage = idx >= 0 ? Math.round((idx / stepRoutes.length) * 100) : 0;

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
