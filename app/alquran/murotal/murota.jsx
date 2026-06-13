"use client";
import { useAudio } from "@/context/audio-context";
import { CardSkeleton, ErrorState } from "@/components/data-state";
import { getSurah } from "@/lib/api";
import { Headphones, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const Murota = () => {
  const [surah, setSurah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const {
    currentAudio,
    isPlaying,
    progress,
    duration,
    playSurah,
    handleProgressChange,
    setSurahData,
  } = useAudio();

  const fetchSurah = useCallback(async () => {
    setLoading(true);
    setHasError(false);
    const data = await getSurah();
    setSurah(data);
    setSurahData(data);
    setHasError(!data.length);
    setLoading(false);
  }, [setSurahData]);

  useEffect(() => { fetchSurah(); }, [fetchSurah]);

  const handlePlay = (index) => {
    const surahData = surah[index];
    playSurah(surahData, index);
  };

  return (
    <div className="min-h-screen px-5 pb-32 pt-6">
      <div>
        <header className="ornament mb-5 rounded-[30px] bg-[#0a4b3e] px-6 py-7 text-white">
          <Headphones className="mb-8 size-7 text-[#e6c775]" />
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-100/70">Temani harimu</p>
          <h1 className="mt-2 text-3xl font-bold">Murotal Al-Qur&apos;an</h1>
          <p className="mt-2 text-sm text-emerald-50/70">Dengarkan tilawah dari setiap surah.</p>
        </header>

        {loading ? <CardSkeleton count={6} /> : hasError ? (
          <ErrorState message="Daftar murotal gagal dimuat." onRetry={fetchSurah} />
        ) : <div className="space-y-2.5">
          {surah.map((s, index) => (
            <div
              key={s.nomor}
              className={`rounded-[22px] p-4 shadow-[0_8px_26px_rgba(23,56,47,.045)] transition border ${
                currentAudio === index
                  ? "border-[#0f6b56]/30 bg-[#edf4f0]"
                  : "border-[#17382f]/8 bg-white/75"
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-[#edf4f0] text-xs font-bold text-[#0f6b56] mr-3">
                      {s.nomor}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[#17382f]">
                        {s.nama_latin}
                      </h2>
                      <p className="font-arabic text-lg text-[#0f6b56]">{s.nama}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlay(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      currentAudio === index && isPlaying
                        ? "bg-[#d09c35]"
                        : "bg-[#0f6b56]"
                    } text-white shadow-sm`}
                  >
                    {currentAudio === index && isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </button>
                </div>

                <div className="flex justify-between text-xs text-[#718078] mb-3">
                  <span className="italic">{s.arti}</span>
                  <span className="font-medium">{s.jumlah_ayat} ayat</span>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 mr-3">
                    <input
                      type="range"
                      min="0"
                      max={currentAudio === index ? duration || 0 : 0}
                      value={currentAudio === index ? Math.min(progress, duration || 0) : 0}
                      onChange={(event) => handleProgressChange(Number(event.target.value))}
                      disabled={currentAudio !== index}
                      className="h-1.5 w-full accent-[#d09c35] disabled:opacity-50"
                      aria-label={`Posisi audio ${s.nama_latin}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default Murota;
