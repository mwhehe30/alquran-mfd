import { getJadwalSholatHarian } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  const { id } = await params;
  const data = await getJadwalSholatHarian(id);
  return NextResponse.json(data, { status: data ? 200 : 502 });
}
