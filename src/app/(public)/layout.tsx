import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PublicGuard from "@/components/PublicGuard";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "P2M LOS - Public",
  description: "Public pages",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main>
  
         {children}
  
      </main>

      <Footer />
    </div>
  );
}
