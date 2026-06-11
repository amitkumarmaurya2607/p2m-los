"use client";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import GeoLocationGuard from "@/components/GeoLocationGuard";
import ProfileHeader from "./ProfileHeaders";
import ProfileSidebar from "./ProfileSidebar";
import { useState } from "react";
import { ProfileProvider } from "@/contexts/ProfileContext";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ProfileProvider>
      <div className="min-h-screen bg-surface-muted">
        {/* Sidebar */}
        <ProfileSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main Area */}
        <div className="flex min-h-screen flex-col lg:ml-72">
          {/* Header */}
          <ProfileHeader
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            role="Borrower"
            notificationCount={1}
          />

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <ErrorBoundary label="Dashboard">
              <GeoLocationGuard>{children}</GeoLocationGuard>
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </ProfileProvider>
  );
}

export default ProfileLayout;
