"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuthContext();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked) {
      if (pathname === "/apply") {
        if (isLoggedIn) {
          router.replace("/review");
        } else {
          setChecked(true);
        }
        return;
      }

      if (!isLoggedIn) {
        router.push("/apply");
      } else {
        setChecked(true);
      }
    }
  }, [isLoggedIn, checked, router, pathname]);

  if (!checked) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isLoggedIn && pathname !== "/apply") {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
