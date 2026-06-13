import { getDoa } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getDoa();
  return NextResponse.json(data, { status: data.length ? 200 : 502 });
}
