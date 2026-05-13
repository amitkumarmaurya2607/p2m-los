import { type NextRequest, NextResponse } from "next/server";
import type { LogEntry } from "@/types";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const entry: LogEntry = await request.json();

    const logsDir = path.join(process.cwd(), "logs");
    const date = new Date().toISOString().slice(0, 10);
    const filePath = path.join(logsDir, `${date}.log`);

    await fs.mkdir(logsDir, { recursive: true });
    await fs.appendFile(filePath, JSON.stringify(entry) + "\n", "utf-8");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
