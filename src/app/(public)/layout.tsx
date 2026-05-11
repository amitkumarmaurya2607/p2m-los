
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | RinSetu",
    default: "RinSetu - Modern Digital Lending",
  },
  description: "RinSetu provides fast and transparent financial solutions.",
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
