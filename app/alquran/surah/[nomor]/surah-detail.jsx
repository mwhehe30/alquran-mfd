"use client";

import { SurahNavigation } from "@/components/surah-navigation";
import { ErrorState } from "@/components/data-state";
import Toast from "@/components/toast";
import { juzAlquran } from "@/data/data-juz";
import { getDetailSurah } from "@/lib/api";
import { useMarksStore } from "@/store/marks-store";
import { useTabStore } from "@/store/tab-store";
import HTMLReactParser from "html-react-parser";
import {
  Bookmark,
  BookOpen,
  Calendar,
  Copy,
  FileText,
  MapPin,
  Minus,
  Pause,
  Play,
  Plus,
  Search,
  Share2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SurahDetail = ({ surah, nomor }) => {
  const marks = useMarksStore((state) => state.marks);
  const addMark = useMarksStore((state) => state.addMark);
  const removeMark = useMarksStore((state) => state.removeMark);
  const activeTab = useTabStore((state) => state.activeTab);
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  const [detailSurah, setDetailSurah] = useState(null);
  const [targetAyat, setTargetAyat] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [arabicSize, setArabicSize] = useState(29);
  const [playingAyat, setPlayingAyat] = useState(null);
  const [toast, setToast] = useState("");
  const audioRef = useRef(null);
  const toastTimerRef = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(""), 2200);
  }, []);

  const fetchDetail = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    const data = await getDetailSurah(nomor);
    setDetailSurah(data);
    setHasError(!data);
    setIsLoading(false);
  }, [nomor]);

  useEffect(() => { fetchDetail(); }, [fetchDetail]);

  useEffect(() => () => {
    clearTimeout(toastTimerRef.current);
    audioRef.current?.pause();
  }, []);

  useEffect(() => {
    if (activeTab !== "ayat" || !detailSurah) return;

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
  }, [activeTab, detailSurah]);

  const handleGoToAyat = () => {
    const ayatNum = Number(targetAyat);
    if (!ayatNum || ayatNum < 1 || ayatNum > detailSurah.jumlah_ayat) return;
    const el = document.getElementById(`ayat-${ayatNum}`);
    if (el) {
      const offset = window.innerWidth < 768 ? 80 : 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleAyatAudio = (ayat) => {
    if (!ayat.audio) {
      showToast("Audio ayat tidak tersedia");
      return;
    }

    if (playingAyat === ayat.nomor && audioRef.current) {
      audioRef.current.pause();
      setPlayingAyat(null);
      return;
    }

    audioRef.current?.pause();
    const audio = new Audio(ayat.audio);
    audioRef.current = audio;
    setPlayingAyat(ayat.nomor);
    audio.play().catch(() => showToast("Audio gagal diputar"));
    audio.addEventListener("ended", () => setPlayingAyat(null), { once: true });
  };

  const getAyatText = (ayat) =>
    `${detailSurah.nama_latin} ayat ${ayat.nomor}\n\n${ayat.ar}\n\n${ayat.idn}`;

  const handleCopy = async (ayat) => {
    try {
      await navigator.clipboard.writeText(getAyatText(ayat));
      showToast("Ayat berhasil disalin");
    } catch {
      showToast("Ayat gagal disalin");
    }
  };

  const handleShare = async (ayat) => {
    const shareData = {
      title: `${detailSurah.nama_latin} ayat ${ayat.nomor}`,
      text: getAyatText(ayat),
      url: `${window.location.origin}/alquran/surah/${detailSurah.nomor}#ayat-${ayat.nomor}`,
    };

    if (navigator.share) {
      await navigator.share(shareData).catch(() => {});
    } else {
      await navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
      showToast("Tautan ayat berhasil disalin");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen px-5 py-5">
        <SurahNavigation surah={surah} detailSurah={{ nomor: Number(nomor) }} />
        <div className="mt-4 rounded-[26px] border border-[#17382f]/8 bg-white/75 p-10 text-center shadow-[0_8px_26px_rgba(23,56,47,.05)]">
          <div className="mx-auto mb-4 size-10 animate-pulse rounded-2xl bg-[#dbe9e3]" />
          <p className="text-sm text-[#718078]">Memuat surah...</p>
        </div>
      </div>
    );

  if (hasError || !detailSurah) {
    return (
      <div className="min-h-screen px-5 py-5">
        <SurahNavigation surah={surah} detailSurah={{ nomor: Number(nomor) }} />
        <ErrorState message="Detail surah gagal dimuat. Periksa koneksi lalu coba kembali." onRetry={fetchDetail} />
      </div>
    );
  }

  const tabs = [
    {
      key: "info",
      label: "Info",
      content: (
        <div>
          <div className="overflow-hidden rounded-[30px] border border-[#17382f]/8 bg-white/75 shadow-[0_8px_26px_rgba(23,56,47,.05)]">
            <div className="ornament rounded-b-[30px] bg-[#0a4b3e] px-6 py-8 text-white">
              <BookOpen className="mb-8 size-6 text-[#e6c775]" />
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[#e6c775]">
                  Surah ke-{detailSurah.nomor}
                </p>
                <h1 className="text-3xl font-bold">
                  {detailSurah.nama_latin}
                </h1>
                <h2 dir="rtl" className="arabic-text mt-4 text-right text-4xl font-semibold">
                  {detailSurah.nama}
                </h2>
                <p className="mt-4 border-t border-white/15 pt-4 text-sm text-emerald-50/75">
                  {detailSurah.arti}
                </p>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-6 grid grid-cols-1 gap-2">
                <div className="flex items-center gap-3 rounded-2xl border border-[#17382f]/8 bg-[#f7f5ee] p-4">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-[#e5eee9]">
                    <MapPin className="size-5 text-[#0f6b56]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#718078]">Tempat turun</p>
                    <p className="font-bold text-[#17382f]">
                      {detailSurah.tempat_turun}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-[#17382f]/8 bg-[#f7f5ee] p-4">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-[#e5eee9]">
                    <FileText className="size-5 text-[#0f6b56]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#718078]">Jumlah ayat</p>
                    <p className="font-bold text-[#17382f]">
                      {detailSurah.jumlah_ayat} ayat
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-[#17382f]/8 bg-[#f7f5ee] p-4">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-[#e5eee9]">
                    <Calendar className="size-5 text-[#0f6b56]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#718078]">Urutan</p>
                    <p className="font-bold text-[#17382f]">
                      Surah ke-{detailSurah.nomor}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#edf4f0] p-5 text-sm leading-7 text-[#53645c] [&_i]:text-[#0f6b56]">
                {HTMLReactParser(detailSurah.deskripsi)}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "ayat",
      label: "Ayat",
      content: (
        <div className="space-y-4">
          {/* Search Box */}
          <div className="rounded-[26px] border border-[#17382f]/8 bg-white/75 p-4 shadow-[0_8px_26px_rgba(23,56,47,.05)]">
            <div className="flex gap-3 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#718078]" />
                <input
                  type="number"
                  placeholder="Cari nomor ayat..."
                  value={targetAyat}
                  min={1}
                  max={detailSurah.jumlah_ayat}
                  onChange={(e) => setTargetAyat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGoToAyat()}
                  className="w-full rounded-2xl border border-[#17382f]/15 bg-[#f7f5ee] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#0f6b56]"
                />
              </div>
              <button
                onClick={handleGoToAyat}
                disabled={
                  !targetAyat ||
                  Number(targetAyat) < 1 ||
                  Number(targetAyat) > detailSurah.jumlah_ayat
                }
                className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
                  !targetAyat ||
                  Number(targetAyat) < 1 ||
                  Number(targetAyat) > detailSurah.jumlah_ayat
                    ? "cursor-not-allowed bg-[#e5e7e5] text-[#8a948f]"
                    : "bg-[#0f6b56] text-white hover:bg-[#0a4b3e]"
                }`}
              >
                Pergi
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[#17382f]/8 pt-3">
              <span className="text-xs font-bold text-[#718078]">Ukuran teks Arab</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setArabicSize((size) => Math.max(23, size - 2))}
                  className="flex size-9 items-center justify-center rounded-xl bg-[#edf4f0] text-[#0f6b56]"
                  aria-label="Perkecil teks Arab"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-8 text-center text-xs font-bold">{arabicSize}</span>
                <button
                  onClick={() => setArabicSize((size) => Math.min(41, size + 2))}
                  className="flex size-9 items-center justify-center rounded-xl bg-[#edf4f0] text-[#0f6b56]"
                  aria-label="Perbesar teks Arab"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* list ayat */}
          <div className="space-y-4">
            {detailSurah.ayat.map((s) => {
              const isMarked = marks.some(
                (m) =>
                  m.surahNomor === detailSurah.nomor && m.ayatNomor === s.nomor
              );

              const juzAwal = juzAlquran.find(
                (j) =>
                  j.start.surah === detailSurah.nomor &&
                  j.start.ayah === s.nomor
              );

              return (
                <div key={s.id} id={`ayat-${s.nomor}`} className="scroll-mt-36 space-y-2">
                  {juzAwal && (
                    <div className="rounded-[22px] border border-[#d7a94a]/45 bg-[#f8f0dc] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-2xl bg-[#d7a94a]">
                          <span className="text-sm font-bold text-[#17382f]">
                            {juzAwal.juz}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-[#8d6618]">
                            Awal Juz {juzAwal.juz}
                          </p>
                          <p className="text-sm text-[#9d772c]">
                            {juzAwal.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <article className="rounded-[26px] border border-[#17382f]/8 bg-white/75 p-5 shadow-[0_8px_26px_rgba(23,56,47,.05)]">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-2xl bg-[#edf4f0]">
                            <span className="font-arabic text-lg font-bold text-[#0f6b56]">
                              {s.nomor.toLocaleString("ar-SA", {
                                useGrouping: false,
                              })}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-[#17382f]">
                              Ayat {s.nomor}
                            </p>
                            <p className="text-xs text-[#718078]">
                              {detailSurah.nama_latin}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleAyatAudio(s)}
                            className="rounded-xl border border-[#17382f]/10 p-2.5 text-[#0f6b56]"
                            aria-label={`Putar ayat ${s.nomor}`}
                          >
                            {playingAyat === s.nomor ? <Pause className="size-4" /> : <Play className="size-4" />}
                          </button>
                          <button
                            onClick={() => {
                              if (isMarked) {
                                removeMark(detailSurah.nomor, s.nomor);
                                showToast("Tandaan dihapus");
                              } else {
                                addMark(detailSurah.nomor, s.nomor, s.ar, detailSurah.nama_latin);
                                showToast("Ayat disimpan");
                              }
                            }}
                            className={`rounded-xl border p-2.5 transition ${
                              isMarked
                                ? "border-[#d7a94a]/40 bg-[#f8f0dc] text-[#b7801d]"
                                : "border-[#17382f]/10 text-[#8a948f]"
                            }`}
                            aria-label={isMarked ? "Hapus tandaan" : "Tandai ayat"}
                          >
                            <Bookmark className={`size-4 ${isMarked ? "fill-current" : ""}`} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-5 rounded-[22px] bg-[#f3f0e7] px-5 py-7">
                        <p
                          dir="rtl"
                          className="arabic-text text-right font-semibold text-[#17382f]"
                          style={{ fontSize: `${arabicSize}px` }}
                        >
                          {s.ar}
                        </p>
                      </div>

                      <div className="mt-4 border-l-2 border-[#d7a94a] pl-4">
                        <p className="text-xs font-bold uppercase tracking-[.12em] text-[#b7801d]">Latin</p>
                        <span className="mt-2 block text-sm font-medium leading-6 text-[#53645c]">
                          {HTMLReactParser(s.tr)}
                        </span>
                      </div>

                      <div className="mt-4 rounded-2xl bg-[#edf4f0] p-4">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[.12em] text-[#0f6b56]">Terjemahan</p>
                        <p className="text-sm leading-6 text-[#53645c]">{s.idn}</p>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleCopy(s)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#17382f]/10 py-2.5 text-xs font-bold text-[#53645c]"
                        >
                          <Copy className="size-4" /> Salin
                        </button>
                        <button
                          onClick={() => handleShare(s)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#17382f]/10 py-2.5 text-xs font-bold text-[#53645c]"
                        >
                          <Share2 className="size-4" /> Bagikan
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen px-5 py-5">
      <SurahNavigation surah={surah} detailSurah={detailSurah} />

      <div className="mb-4">
        <div className="grid grid-cols-2 rounded-[22px] border border-[#17382f]/8 bg-white/75 p-1.5 shadow-[0_8px_26px_rgba(23,56,47,.05)]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-2xl px-6 py-3 text-sm font-bold transition ${
                activeTab === tab.key
                  ? "bg-[#0f6b56] text-white"
                  : "text-[#718078] hover:text-[#0f6b56] hover:bg-[#edf4f0]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {tabs.find((tab) => tab.key === activeTab)?.content}
      <Toast message={toast} />
    </div>
  );
};

export default SurahDetail;
