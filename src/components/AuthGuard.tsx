"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn } from "@/features/auth/authSlice";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked) {
      if (pathname === "/login") {
        if (isLoggedIn) {
          router.replace("/review");
        } else {
          setChecked(true);
        }
        return;
      }

      if (!isLoggedIn) {
        router.push("/login");
      } else {
        setChecked(true);
      }
    }
  }, [isLoggedIn, checked, router, pathname]);

  if (!checked) return null;

  if (!isLoggedIn && pathname !== "/login") return null;

  return <>{children}</>;
}
