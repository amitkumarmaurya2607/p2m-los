import { type NextRequest, NextResponse } from "next/server";
import { getApplicationStatus } from "@/lib/services/application.service";
import { withApiLogging } from "@/lib/api-logger";

async function getHandler(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await getApplicationStatus(id);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch application status";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export const GET = withApiLogging(getHandler);
