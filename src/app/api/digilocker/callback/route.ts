import { type NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;

  const txnId = searchParams.get("txnId");
  const errorCode = searchParams.get("error_code");
  const errMsg = searchParams.get("errMsg");

  if (errorCode) {
    const redirectUrl = new URL("/aadhar-details", origin);

    redirectUrl.searchParams.set("TYPE", "ERROR");

    if (txnId) {
      redirectUrl.searchParams.set("txnId", txnId);
    }

    if (errorCode) {
      redirectUrl.searchParams.set("error_code", errorCode);
    }

    if (errMsg) {
      redirectUrl.searchParams.set("errMsg", errMsg);
    }

    return NextResponse.redirect(redirectUrl);
  }

  const redirectUrl = new URL("/aadhar-details", origin);
  redirectUrl.searchParams.set("TYPE", "SUCCESS");

  if (txnId) {
    redirectUrl.searchParams.set("txnId", txnId);
  }

  return NextResponse.redirect(redirectUrl);
}