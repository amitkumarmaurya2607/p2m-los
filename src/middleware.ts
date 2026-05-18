import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "p2m-session";
const STEP_COOKIE = "p2m-step";

const stepOrder = [
  "mobile",
  "pan",
  "personalInfo",
  "aadhaar",
  "bankDetails",
  "selfie",
  "employmentDetails",
  "loanCalculator",
  "review",
];

const stepRouteMap: Record<string, string> = {
  pan: "/pan-details",
  personalInfo: "/personal-info",
  aadhaar: "/aadhar-details",
  bankDetails: "/bank-details",
  selfie: "/selfie-capture",
  employmentDetails: "/employment-details",
  loanCalculator: "/loan-calculator",
  review: "/review",
};

const routeStepMap: Record<string, string> = {
  "/apply": "mobile",
  "/pan-details": "pan",
  "/personal-info": "personalInfo",
  "/aadhar-details": "aadhaar",
  "/bank-details": "bankDetails",
  "/selfie-capture": "selfie",
  "/employment-details": "employmentDetails",
  "/loan-calculator": "loanCalculator",
  "/review": "review",
};

const protectedPrefixes = ["/pan-details", "/personal-info", "/aadhar-details", "/bank-details", "/selfie-capture", "/employment-details", "/loan-calculator", "/review", "/track-application"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionToken) {
    const redirectUrl = new URL("/apply", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const stepCookie = request.cookies.get(STEP_COOKIE)?.value;
  const completedSteps = stepCookie ? stepCookie.split(",").filter(Boolean) : [];
  const completedSet = new Set(completedSteps);

  if (pathname.startsWith("/track-application")) {
    const allComplete = stepOrder.every((s) => completedSet.has(s));
    if (!allComplete) {
      const nextPending = stepOrder.find((s) => !completedSet.has(s));
      if (nextPending) {
        const target = stepRouteMap[nextPending] || "/apply";
        return NextResponse.redirect(new URL(target, request.url));
      }
    }
    return NextResponse.next();
  }

  const currentStep = routeStepMap[pathname];
  if (currentStep) {
    const allComplete = stepOrder.every((s) => completedSet.has(s));
    if (allComplete) {
      return NextResponse.redirect(new URL("/track-application", request.url));
    }

    if (completedSet.has(currentStep)) {
      const nextPending = stepOrder.find((s) => !completedSet.has(s));
      if (nextPending) {
        const target = nextPending === "mobile" ? "/apply" : stepRouteMap[nextPending] || "/apply";
        return NextResponse.redirect(new URL(target, request.url));
      }
    }

    const currentIndex = stepOrder.indexOf(currentStep);
    const firstIncompleteIndex = stepOrder.findIndex((s) => !completedSet.has(s));

    if (firstIncompleteIndex !== -1 && currentIndex > firstIncompleteIndex) {
      const nextPending = stepOrder[firstIncompleteIndex];
      const target = nextPending === "mobile" ? "/apply" : stepRouteMap[nextPending] || "/apply";
      return NextResponse.redirect(new URL(target, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pan-details/:path*",
    "/personal-info/:path*",
    "/aadhar-details/:path*",
    "/bank-details/:path*",
    "/selfie-capture/:path*",
    "/employment-details/:path*",
    "/loan-calculator/:path*",
    "/review/:path*",
    "/track-application/:path*",
    "/apply/:path*",
  ],
};
