import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("p2m-session");
  cookieStore.delete("p2m-step");
  return NextResponse.json({ success: true });
}
