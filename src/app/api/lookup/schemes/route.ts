import { NextResponse } from "next/server";
import { apiGet } from "@/lib/axios";
import { API } from "@/lib/api/urls";
import { withApiLogging } from "@/lib/api-logger";
import type { ApiResponse } from "@/types";

interface LoanScheme {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  maxTenure: number;
}

async function getHandler() {
  try {
    const result = await apiGet<ApiResponse<LoanScheme[]>>(API.lookup.schemes);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch loan schemes";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export const GET = withApiLogging(getHandler);
