import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "p2m-session";
const STEP_COOKIE = "p2m-step";

const stepOrder = [
  "mobile",
  "geoLocation",
  "pan",
  "personalInfo",
  "aadhaar",
  "bankDetails",
  "accountStatement",
  "employmentDetails",
  "selfie",
  "addressProof",
  "alternateMobile",
  "loanEligibility",
];

const stepRouteMap: Record<string, string> = {
  geoLocation: "/geo-location",
  pan: "/pan-details",
  personalInfo: "/personal-info",
  aadhaar: "/aadhar-details",
  bankDetails: "/bank-details",
  accountStatement: "/account-statement",
  employmentDetails: "/employment-details",
  selfie: "/selfie-capture",
  addressProof: "/address-proof",
  alternateMobile: "/alternate-mobile",
  loanEligibility: "/loan-eligibility",
};

const routeStepMap: Record<string, string> = {
  "/apply-now": "mobile",
  "/geo-location": "geoLocation",
  "/pan-details": "pan",
  "/personal-info": "personalInfo",
  "/aadhar-details": "aadhaar",
  "/bank-details": "bankDetails",
  "/account-statement": "accountStatement",
  "/employment-details": "employmentDetails",
  "/selfie-capture": "selfie",
  "/address-proof": "addressProof",
  "/alternate-mobile": "alternateMobile",
  "/loan-eligibility": "loanEligibility",
};

const protectedPrefixes = [
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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionToken) {
    const redirectUrl = new URL("/apply-now", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const stepCookie = request.cookies.get(STEP_COOKIE)?.value;
  let completedSteps: string[] = [];
  if (stepCookie) {
    const match = stepCookie.match(/^step(\d+)$/);
    if (match) {
      completedSteps = stepOrder.slice(0, parseInt(match[1]));
    }
  }
  const completedSet = new Set(completedSteps);

  if (pathname.startsWith("/track-application")) {
    const allComplete = stepOrder.every((s) => completedSet.has(s));
    if (!allComplete) {
      const nextPending = stepOrder.find((s) => !completedSet.has(s));
      if (nextPending) {
        const target = stepRouteMap[nextPending] || "/apply-now"; 
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
        const target =
          nextPending === "mobile" ? "/apply-now" : stepRouteMap[nextPending] || "/apply-now";
        return NextResponse.redirect(new URL(target, request.url));
      }
    }

    const currentIndex = stepOrder.indexOf(currentStep);
    const firstIncompleteIndex = stepOrder.findIndex((s) => !completedSet.has(s));

    if (firstIncompleteIndex !== -1 && currentIndex > firstIncompleteIndex) {
      const nextPending = stepOrder[firstIncompleteIndex];
      const target =
        nextPending === "mobile" ? "/apply-now" : stepRouteMap[nextPending] || "/apply-now";
      return NextResponse.redirect(new URL(target, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
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
