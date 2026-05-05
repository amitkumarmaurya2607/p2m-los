import Header from "@/views/Dashbaord/componants/Header";
import HorizontalStepper from "@/views/Dashbaord/componants/HorizontalStepper";
import ProgressBar from "@/views/Dashbaord/componants/ProgressBar";
import StepperAlt from "@/views/Dashbaord/componants/Stepper";
import StepRedirect from "@/components/StepRedirect";
import AuthGuard from "@/components/AuthGuard";

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
          {/* <StepperAlt /> */}
           <div className=" grow-1 ">
              <ProgressBar />
               <div className="flex justify-center p-8">
                <HorizontalStepper />
               </div>
              <div className="flex justify-center px-4 pt-12 pb-6">
                <AuthGuard>
                  <StepRedirect>
                    {children}
                  </StepRedirect>
                </AuthGuard>
              </div>
             
           </div>
        </div>
    </div>
  );
}