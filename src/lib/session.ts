import "server-only";
import { cookies } from "next/headers";

const SESSION_NAME = "p2m-session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export async function createSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function getSession(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_NAME)?.value;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_NAME);
}
