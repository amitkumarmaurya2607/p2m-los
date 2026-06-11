import type { Metadata } from "next";
import DynamicLayout from "./DynamicLayout";

export const metadata: Metadata = {
  title: "P2M LOS - Dashboard",
  description: "Dashboard pages",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DynamicLayout>{children}</DynamicLayout>;
}
