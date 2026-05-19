import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = await getSession();

  if (!token) {
    redirect("/apply-now");
  }

  return <>{children}</>;
}
