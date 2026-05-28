"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchLoanApplication } from "@/lib/services/loan-application.service";
import type { LoanApplication } from "@/types";

type LoanAppContextValue = {
  application: LoanApplication | null;
  loading: boolean;
  error: string | null;
  refreshApp: () => Promise<void>;
};

const LoanAppContext = createContext<LoanAppContextValue | undefined>(undefined);

export function LoanAppProvider({ children }: { children: React.ReactNode }) {
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshApp = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLoanApplication();
      setApplication(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch loan application");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshApp();
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [refreshApp]);

  return (
    <LoanAppContext.Provider value={{ application, loading, error, refreshApp }}>
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
