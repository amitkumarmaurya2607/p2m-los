"use client";

import React, { createContext, useContext, useState, } from "react";
import type { LoanApplication } from "@/types";

type LoanAppContextValue = {
  application: LoanApplication | null;
  loading: boolean;
  error: string | null;

};

const LoanAppContext = createContext<LoanAppContextValue | undefined>(undefined);

export function LoanAppProvider({ children }: { children: React.ReactNode }) {
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  return (
    <LoanAppContext.Provider value={{ application, loading, error, }}>
      {children}
    </LoanAppContext.Provider>
  );
}

export function useLoanApp(): LoanAppContextValue {
  const ctx = useContext(LoanAppContext);
  if (!ctx) {
    throw new Error("useLoanApp must be used within a <LoanAppProvider>");
  }
  return ctx;
}
