import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  buildOrderedStepStatuses,
  getCurrentStepIndex,
  getStepRoute,
} from "@/lib/step-progress-map";
import { API } from "@/lib/api/urls";

const SESSION_COOKIE = "p2m-session";
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api";

const protectedPrefixes = [
  "/profile",
  "/geo-location",
  "/pan-details",
  "/personal-info",
  "/aadhar-details",
  "/bank-details",
  "/account-statement",
  "/employment-details",
  "/selfie-capture",
  "/address-proof",
  "/alternate-mobile",
  "/loan-eligibility",
  "/track-application",
];

type StepProgress = {
  steps: Array<{ step: string; status: string; completedAt: string | null }>;
};

async function fetchStepProgress(sessionToken: string): Promise<StepProgress | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${API.others.stepProgress}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json?.code !== "0000" || !json?.data?.steps) return null;
    return json.data as StepProgress;
  } catch {
    return null;
  }
}

function makeRedirect(request: NextRequest, target: string) {
  return NextResponse.redirect(new URL(target, request.url));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const res = NextResponse.next();
  res.headers.set("x-pathname", pathname);

  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!isProtectedRoute) {
    return res;
  }

  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionToken) {
    return makeRedirect(request, "/apply-now");
  }

  const progress = await fetchStepProgress(sessionToken);

  if (!progress) {
    return res;
  }
console.log("Middleware - Step Progress:", progress); // Debugging line
  const statusByOrder = buildOrderedStepStatuses(progress.steps);
  const firstPendingIndex = statusByOrder.findIndex((s) => s === "PENDING");
  const allComplete = firstPendingIndex === -1;

  if (allComplete) {
    if (pathname !== "/profile") {
      return makeRedirect(request, "/profile");
    }
    return res;
  }

  const currentStepIndex = getCurrentStepIndex(pathname);

  if (currentStepIndex === -1) {
    const target = getStepRoute(firstPendingIndex);
    const isSubRouteOfPending =
      !!target && (pathname === target || pathname.startsWith(`${target}/`));
    if (isSubRouteOfPending) {
      return res;
    }
    if (target && target !== pathname) {
      return makeRedirect(request, target);
    }
    return res;
  }

  if (currentStepIndex > firstPendingIndex) {
    const target = getStepRoute(firstPendingIndex);
    if (target && target !== pathname) {
      return makeRedirect(request, target);
    }
    return res;
  }

  if (statusByOrder[currentStepIndex] === "COMPLETED") {
    const target = getStepRoute(firstPendingIndex);
    if (target && target !== pathname) {
      return makeRedirect(request, target);
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/geo-location/:path*",
    "/pan-details/:path*",
    "/personal-info/:path*",
    "/aadhar-details/:path*",
    "/bank-details/:path*",
    "/account-statement/:path*",
    "/employment-details/:path*",
    "/selfie-capture/:path*",
    "/address-proof/:path*",
    "/alternate-mobile/:path*",
    "/loan-eligibility/:path*",
    "/track-application/:path*",
    "/apply-now/:path*",
  ],
};
