"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/features/auth/authSlice";

export default function PublicGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked) {
      if (isLoggedIn) {
        router.push("/review");
      } else {
        setChecked(true);
      }
    }
  }, [isLoggedIn, checked, router, pathname]);

  if (!checked) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
