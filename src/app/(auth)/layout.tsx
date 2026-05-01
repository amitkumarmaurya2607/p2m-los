import SideBar from "@/pages/Auth/SideBar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "P2M LOS - Dashboard",
    description: "Dashboard pages",
};

export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
         <div className="flex w-full font-sans antialiased min-h-[100dvh]">
          
            <SideBar />
            {children}
        </div>
    );
}