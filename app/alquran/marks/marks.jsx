"use client";

import { useMarksStore } from "@/store/marks-store";
import { useTabStore } from "@/store/tab-store";
import { Bookmark, Trash2 } from "lucide-react";
import Link from "next/link";

export default function Marks() {
  const marks = useMarksStore((state) => state.marks);
  const removeMark = useMarksStore((state) => state.removeMark);
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  if (!marks.length) {
    return (
      <div className="min-h-screen px-5 pt-24">
        <div className="soft-card rounded-[30px] px-7 py-14 text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#edf4f0]">
            <Bookmark className="size-7 text-[#0f6b56]" />
          </div>
          <h1 className="text-2xl font-bold">Ayat Tersimpan</h1>
          <p className="mt-3 text-sm leading-6 text-[#718078]">
            Belum ada ayat yang disimpan. Tandai ayat saat membaca untuk menemukannya kembali di sini.
          </p>
          <Link href="/alquran/surah" className="mt-6 inline-flex rounded-2xl bg-[#0f6b56] px-5 py-3 text-sm font-bold text-white">
            Mulai membaca
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-5 pb-5 pt-6">
      <section className="ornament mb-5 rounded-[30px] bg-[#0a4b3e] px-6 py-7 text-white">
        <Bookmark className="mb-8 size-7 text-[#e6c775]" />
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-100/70">Koleksi pribadi</p>
        <h1 className="mt-2 text-3xl font-bold">Ayat Tersimpan</h1>
        <p className="mt-2 text-sm text-emerald-50/70">{marks.length} ayat untuk dibaca kembali.</p>
      </section>

      <div className="space-y-3">
        {marks.map((mark) => (
          <article key={`${mark.surahNomor}-${mark.ayatNomor}`} className="rounded-[24px] border border-[#17382f]/8 bg-white/75 p-5 shadow-[0_8px_26px_rgba(23,56,47,.05)]">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0f6b56] text-sm font-bold text-white">
                {mark.ayatNomor}
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/alquran/surah/${mark.surahNomor}#ayat-${mark.ayatNomor}`}
                  onClick={() => setActiveTab("ayat")}
                  className="font-bold hover:text-[#0f6b56]"
                >
                  {mark.namaSurah}
                </Link>
                <p className="text-xs text-[#718078]">Ayat {mark.ayatNomor}</p>
              </div>
              <button
                onClick={() => removeMark(mark.surahNomor, mark.ayatNomor)}
                className="rounded-xl p-2 text-[#9aa59f] hover:bg-red-50 hover:text-red-500"
                aria-label="Hapus ayat tersimpan"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <p dir="rtl" className="arabic-text rounded-2xl bg-[#f3f0e7] p-5 text-right text-xl">
              {mark.ayatText}
            </p>
            <Link
              href={`/alquran/surah/${mark.surahNomor}#ayat-${mark.ayatNomor}`}
              onClick={() => setActiveTab("ayat")}
              className="mt-4 inline-flex text-xs font-bold text-[#0f6b56]"
            >
              Buka ayat
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
