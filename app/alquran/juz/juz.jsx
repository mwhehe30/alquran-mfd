"use client";

import { juzAlquran } from "@/data/data-juz";
import { useTabStore } from "@/store/tab-store";
import { BookOpen, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const Juz = () => {
  const activeTab = useTabStore((state) => state.activeTab);
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  useEffect(() => {
    if (activeTab !== "ayat") return;

    const hash = window.location.hash;
    if (!hash) return;

    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        const offset = window.innerWidth < 768 ? 80 : 90;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 150);
  }, [activeTab]);

  return (
    <div className="min-h-screen px-5 pb-5 pt-6">
      <div>
        <div className="ornament mb-5 rounded-[30px] bg-[#0a4b3e] px-6 py-7 text-white">
          <BookOpen className="mb-8 size-7 text-[#e6c775]" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">Pembagian bacaan</p>
          <h1 className="mt-2 text-3xl font-bold">30 Juz Al-Qur&apos;an</h1>
          <p className="mt-2 text-sm text-emerald-50/70">Temukan awal bacaan setiap juz dengan mudah.</p>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {juzAlquran.map((juz) => (
            <Link
              key={juz.juz}
              href={`/alquran/surah/${juz.start.surah}#ayat-${juz.start.ayah}`}
              onClick={() => setActiveTab("ayat")}
              className="group rounded-[22px] border border-[#17382f]/8 bg-white/75 p-4 shadow-[0_8px_26px_rgba(23,56,47,.045)] transition hover:-translate-y-0.5 hover:bg-white"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf4f0]">
                  <span className="font-bold text-[#0f6b56]">
                    {juz.juz}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-bold text-[#17382f]">
                    {juz.name}
                  </h2>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#718078]">
                    <MapPin className="size-3.5 text-[#d09c35]" />
                    Surah {juz.start.surah} · Ayat {juz.start.ayah}
                  </p>
                </div>
                <ChevronRight className="size-5 text-[#b8c1bc] group-hover:text-[#0f6b56]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Juz;
