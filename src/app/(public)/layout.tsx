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
  return <>{children}</>;
}