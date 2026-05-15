# Logout Cookie Cleanup Plan

## Problem

When a user logs out from the dashboard header (`src/views/Dashbaord/componants/Header.tsx`), the `handleLogout` function only clears client-side state (`sessionStorage` via `AuthContext.logout()`). It does **not** delete the server-side `p2m-session` httpOnly cookie. This creates a redirect loop: after logout, visiting any public page triggers the `(public)/layout.tsx` cookie check, which finds the stale cookie and redirects back to `/pan-details`.

## Changes Required

### 1. `src/lib/actions/logout.action.ts`

Remove the `redirect("/")` from `logoutAction` so it only deletes the cookie server-side. The client component will handle navigation.

**Current:**
```ts
"use server";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";

export async function logoutAction() {
  await deleteSession();
  redirect("/");
}
```

**Change to:**
```ts
"use server";
import { deleteSession } from "@/lib/session";

export async function logoutAction() {
  await deleteSession();
}
```

### 2. `src/views/Dashbaord/componants/Header.tsx`

Two edits needed:

**a) Add import for `logoutAction`:**
```ts
import { logoutAction } from "@/lib/actions/logout.action";
```
Add after line 7 (`import { steps as allSteps, StepItem } from "@/lib/sessionStorage";`)

**b) Update `handleLogout` to call `logoutAction` first, navigate to `/` instead of `/apply`:**
```ts
const handleLogout = async () => {
  await logoutAction();         // deletes httpOnly cookie server-side
  logout();                     // clears sessionStorage
  resetApplication();           // clears application context
  setDropdownOpen(false);
  router.push("/");             // goes to public home (layout confirms no cookie)
};
```

## Sequence After Fix

1. User clicks Logout in dashboard header dropdown
2. `logoutAction()` runs server-side → `deleteSession()` removes `p2m-session` cookie
3. `logout()` clears `sessionStorage` client-side AuthContext state
4. `resetApplication()` clears application context
5. `router.push("/")` navigates to public home page
6. `(public)/layout.tsx` runs server-side → `getSession()` returns `undefined` → renders children normally
7. No redirect loop
