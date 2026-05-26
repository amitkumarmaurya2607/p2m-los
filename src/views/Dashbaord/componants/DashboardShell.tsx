"use client";

import { LoanAppProvider } from "@/contexts/LoanAppContext";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return <LoanAppProvider>{children}</LoanAppProvider>;
}
