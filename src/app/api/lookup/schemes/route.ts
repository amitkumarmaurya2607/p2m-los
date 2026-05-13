import { NextResponse } from "next/server";
import { apiGet } from "@/lib/axios";
import type { ApiResponse } from "@/types";

interface LoanScheme {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  maxTenure: number;
}

export async function GET() {
  try {
    const result = await apiGet<ApiResponse<LoanScheme[]>>("/lookup/schemes");
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch loan schemes";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
