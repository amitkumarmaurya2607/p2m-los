import Header from "@/views/Dashbaord/componants/Header";
import ProgressBar from "@/views/Dashbaord/componants/ProgressBar";
import StepRedirect from "@/components/StepRedirect";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import MockDataInitializer from "@/components/MockDataInitializer";

import type { Metadata } from "next";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "P2M LOS - Dashboard",
  description: "Dashboard pages",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const token = await getSession();
  console.log("Session token:", token); // Debugging line
  if (!token) {
    redirect("/apply");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <div className="grow-1">
          <ProgressBar />
          <div className="flex justify-center px-4 pt-12 pb-6">
            <ErrorBoundary label="Dashboard">
              <MockDataInitializer />
              <StepRedirect>{children}</StepRedirect>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
