"use client";

import ButtonBack from "@/components/button-back";
import { CardSkeleton, ErrorState } from "@/components/data-state";
import { getSemuaKota } from "@/lib/api";
import { ChevronRight, Clock3, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [kota, setKota] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadCities = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    const data = await getSemuaKota();
    setKota(data);
    setHasError(!data.length);
    setIsLoading(false);
  }, []);

  useEffect(() => { loadCities(); }, [loadCities]);

  const filteredKota = kota.filter((item) =>
    item.lokasi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen px-5 pb-8 pt-5">
      <div className="mb-4"><ButtonBack /></div>
      <section className="ornament mb-5 rounded-[30px] bg-[#0a4b3e] px-6 py-7 text-white">
        <Clock3 className="mb-8 size-7 text-[#e6c775]" />
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-100/70">Waktu ibadah</p>
        <h1 className="mt-2 text-3xl font-bold">Jadwal Salat</h1>
        <p className="mt-2 text-sm text-emerald-50/70">Pilih kota untuk melihat jadwal hari ini.</p>
      </section>
      <div className="soft-card sticky top-3 z-20 mb-5 flex items-center gap-3 rounded-[22px] px-4 py-3">
        <Search className="size-5 text-[#0f6b56]" />
        <input
          type="search"
          placeholder="Cari kota atau kabupaten..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
      </div>
      <p className="mb-3 px-1 text-xs font-bold uppercase tracking-[.15em] text-[#718078]">
        {search ? `${filteredKota.length} lokasi ditemukan` : "Pilih lokasi"}
      </p>
      {isLoading ? (
        <CardSkeleton count={6} />
      ) : hasError ? (
        <ErrorState message="Daftar kota gagal dimuat dari server jadwal salat." onRetry={loadCities} />
      ) : <div className="space-y-2">
        {filteredKota.map((item) => (
          <Link href={`/jadwal-sholat/${item.id}`} key={item.id} className="group flex items-center gap-3 rounded-[20px] border border-[#17382f]/8 bg-white/75 p-4 hover:bg-white">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-[#edf4f0] text-[#0f6b56]"><MapPin className="size-4" /></div>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold">{item.lokasi}</span>
            <ChevronRight className="size-4 text-[#b8c1bc] group-hover:text-[#0f6b56]" />
          </Link>
        ))}
      </div>}
    </main>
  );
}
