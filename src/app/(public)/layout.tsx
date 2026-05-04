import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "P2M LOS - Public",
  description: "Public pages",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <Navbar />
  {children}
  <Footer />
  </>;
}