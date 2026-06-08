import Header from "@/views/Dashbaord/componants/Header";
import ProgressBar from "@/views/Dashbaord/componants/ProgressBar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import GeoLocationGuard from "@/components/GeoLocationGuard";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "P2M LOS - Dashboard",
  description: "Dashboard pages",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (

    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <div className="grow-1">
          <ProgressBar />
          <div className="flex justify-center px-4 pt-12 pb-6">
            <ErrorBoundary label="Dashboard">
              <GeoLocationGuard>{children}</GeoLocationGuard>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
