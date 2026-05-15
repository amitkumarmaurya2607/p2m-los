import SideBar from "@/views/Auth/SideBar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "P2M LOS - Dashboard",
  description: "Dashboard pages",
};

export default async function layout({ children }: { children: React.ReactNode }) {
  const token = await getSession();
  console.log("Session token:", token); // Debugging line
  // if (!token) {
  //   redirect("/apply");
  // }
  return (
    <div className="flex w-full font-sans antialiased min-h-[100dvh]">
      <SideBar />
      <ErrorBoundary label="Authentication">
        {children}
      </ErrorBoundary>
    </div>
  );
}
