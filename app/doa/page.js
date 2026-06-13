"use client";

import ButtonBack from "@/components/button-back";
import { CardSkeleton, ErrorState } from "@/components/data-state";
import { getDoa } from "@/lib/api";
import { BookHeart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [doa, setDoa] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadDoa = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    const data = await getDoa();
    setDoa(data);
    setHasError(!data.length);
    setIsLoading(false);
  }, []);

  useEffect(() => { loadDoa(); }, [loadDoa]);

  return (
    <main className="min-h-screen px-5 pb-8 pt-5">
      <div className="mb-4"><ButtonBack /></div>
      <section className="ornament mb-5 rounded-[30px] bg-[#0a4b3e] px-6 py-7 text-white">
        <BookHeart className="mb-8 size-7 text-[#e6c775]" />
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-100/70">Dekatkan hati</p>
        <h1 className="mt-2 text-3xl font-bold">Doa Harian</h1>
        <p className="mt-2 text-sm text-emerald-50/70">Kumpulan doa untuk menemani keseharian.</p>
      </section>

      {isLoading ? (
        <CardSkeleton count={4} />
      ) : hasError ? (
        <ErrorState message="Kumpulan doa gagal dimuat dari server." onRetry={loadDoa} />
      ) : (
        <div className="space-y-3">
          {doa.map((item, index) => (
            <article key={item.id ?? index} className="rounded-[26px] border border-[#17382f]/8 bg-white/75 p-5 shadow-[0_8px_26px_rgba(23,56,47,.05)]">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#edf4f0] text-sm font-bold text-[#0f6b56]">{index + 1}</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#d09c35]">Doa pilihan</p>
                  <h2 className="mt-0.5 font-bold">{item.judul}</h2>
                </div>
              </div>
              <p dir="rtl" lang="ar" className="arabic-text rounded-[22px] bg-[#f3f0e7] px-5 py-6 text-right text-[25px] text-[#17382f]">
                {item.arab}
              </p>
              <div className="mt-4 border-l-2 border-[#d7a94a] pl-4">
                <p className="text-xs font-bold uppercase tracking-[.12em] text-[#b7801d]">Latin</p>
                <p className="mt-2 text-sm italic leading-6 text-[#53645c]">{item.latin}</p>
              </div>
              <div className="mt-4 rounded-2xl bg-[#edf4f0] p-4">
                <p className="text-xs font-bold uppercase tracking-[.12em] text-[#0f6b56]">Artinya</p>
                <p className="mt-2 text-sm leading-6 text-[#53645c]">{item.terjemah}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
