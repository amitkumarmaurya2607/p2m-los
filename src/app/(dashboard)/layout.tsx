
import { headers } from "next/headers";

import type { Metadata } from "next";
import LayoutV1 from "@/views/Dashbaord/Layout/LayoutV1";
import ProfileLayout from "@/views/Dashbaord/Profile/componants/ProfileLayout";


export const metadata: Metadata = {
  title: "P2M LOS - Dashboard",
  description: "Dashboard pages",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  return (

    <div className="min-h-screen bg-background">
      {pathname.includes('profile') ?
        <ProfileLayout>
          {children}
        </ProfileLayout>
        : <LayoutV1>
          {children}
        </LayoutV1>}
    </div>
  );
}
