import { getDetailSurah } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  const { nomor } = await params;
  const data = await getDetailSurah(nomor);
  return NextResponse.json(data, { status: data ? 200 : 502 });
}
