"use client";

import { usePathname } from "next/navigation";
import LayoutV1 from "@/views/Dashbaord/Layout/LayoutV1";
import ProfileLayout from "@/views/Dashbaord/Profile/componants/ProfileLayout";

export default function DynamicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {pathname.includes("profile") ? (
        <ProfileLayout>{children}</ProfileLayout>
      ) : (
        <LayoutV1>{children}</LayoutV1>
      )}
    </div>
  );
}
