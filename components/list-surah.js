"use client";

import { getSurah } from "@/lib/api";
import { BookOpen, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CardSkeleton, ErrorState } from "./data-state";
import SurahCard from "./surah-card";

const normalizeText = (value = "") =>
  value.toLowerCase().replace(/[\s'-]/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function ListSurah() {
  const [surah, setSurah] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadSurah = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    const data = await getSurah();
    setSurah(data);
    setHasError(!data.length);
    setIsLoading(false);
  }, []);

  useEffect(() => { loadSurah(); }, [loadSurah]);

  const filteredSurah = surah.filter((item) =>
    normalizeText(item.nama_latin).includes(normalizeText(search))
  );

  return (
    <div className="px-5 pb-5">
      <section className="ornament relative mb-5 overflow-hidden rounded-[30px] bg-[#0a4b3e] px-6 py-7 text-white">
        <BookOpen className="mb-8 size-7 text-[#e6c775]" />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
          Al-Qur&apos;an Al-Karim
        </p>
        <h1 className="mt-2 text-3xl font-bold">Daftar Surah</h1>
        <p className="mt-2 text-sm text-emerald-50/70">114 surah untuk dibaca dan direnungkan.</p>
      </section>

      <div className="soft-card sticky top-3 z-20 mb-5 flex items-center gap-3 rounded-[22px] px-4 py-3">
        <Search className="size-5 shrink-0 text-[#0f6b56]" />
        <input
          type="search"
          placeholder="Cari nama surah..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9aa59f]"
        />
        {search && (
          <button onClick={() => setSearch("")} aria-label="Hapus pencarian">
            <X className="size-4 text-[#718078]" />
          </button>
        )}
      </div>

      <div className="mb-3 flex items-center justify-between px-1">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#718078]">
          {search ? `${filteredSurah.length} hasil` : "Semua surah"}
        </p>
        <span className="text-xs text-[#0f6b56]">{surah.length || 114} surah</span>
      </div>

      {isLoading ? (
        <CardSkeleton count={6} />
      ) : hasError ? (
        <ErrorState message="Periksa koneksi internet lalu coba kembali." onRetry={loadSurah} />
      ) : filteredSurah.length ? (
        <div className="space-y-2.5">
          {filteredSurah.map((item) => <SurahCard key={item.nomor} surah={item} />)}
        </div>
      ) : (
        <div className="soft-card rounded-[26px] px-6 py-14 text-center">
          <Search className="mx-auto mb-4 size-8 text-[#b8c1bc]" />
          <h2 className="font-bold">Surah tidak ditemukan</h2>
          <p className="mt-2 text-sm text-[#718078]">Coba gunakan nama surah yang lebih singkat.</p>
        </div>
      )}
    </div>
  );
}
