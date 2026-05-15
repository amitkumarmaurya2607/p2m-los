
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { getSession } from "@/lib/session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | RinSetu",
    default: "RinSetu - Modern Digital Lending",
  },
  description: "RinSetu provides fast and transparent financial solutions.",
};

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const token = await getSession();
  console.log("Session token:", token);
  if (token) {
    redirect("/pan-details");
  }


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
