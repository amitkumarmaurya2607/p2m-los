import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "P2M LOS - Dashboard",
  description: "Dashboard pages",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center gap-6 px-4 py-3">
          <Link href="/dashboard" className="font-semibold">
            P2M LOS
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground">
            Dashboard
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}