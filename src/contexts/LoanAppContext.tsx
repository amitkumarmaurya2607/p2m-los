"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { LoanApplication } from "@/types";
import { getStepProgressAction } from "@/lib/actions/auth.action";

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
      const data = await getStepProgressAction();
      //setApplication(data);
      console.log("data----", JSON.stringify(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch loan application");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshApp();
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
