import Header from "@/pages/Dashbaord/componants/Header";
import ProgressBar from "@/pages/Dashbaord/componants/ProgressBar";
import { StepperAlt } from "@/pages/Dashbaord/componants/Stepper";

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
      <Header />
    
        <div className="flex">
          <StepperAlt />
           <div className=" grow-1 ">
              <ProgressBar />
              <div className="flex justify-center px-4 pt-12 pb-6">
                {children}
              </div>
             
           </div>
        </div>
    </div>
  );
}