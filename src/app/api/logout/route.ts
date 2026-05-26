import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("p2m-session");
  cookieStore.delete("p2m-step");
  cookieStore.delete("p2m-lat");
  cookieStore.delete("p2m-lng");
  return NextResponse.json({ success: true });
}
