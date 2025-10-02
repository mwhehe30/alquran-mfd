"use client";
import { useAudio } from "@/context/audio-context";
import { getSurah } from "@/lib/api";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

const Murota = () => {
  const [surah, setSurah] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    currentAudio,
    isPlaying,
    muted,
    progress,
    duration,
    playSurah,
    toggleMute,
    setSurahData,
  } = useAudio();

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const res = await getSurah();
        setSurah(res);
        setSurahData(res);
      } catch (err) {
        console.error("Failed to fetch surah:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurah();
  }, [setSurahData]);

  const handlePlay = (index) => {
    const surahData = surah[index];
    playSurah(surahData, index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">
            Memuat daftar surah...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 pb-32">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-800 mb-1">
            Murottal Al-Qur'an
          </h1>
          <p className="text-gray-600 text-sm">
            Dengarkan bacaan Al-Qur'an dari setiap surah
          </p>
        </header>

        <div className="space-y-3">
          {surah.map((s, index) => (
            <div
              key={s.nomor}
              className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 border ${
                currentAudio === index
                  ? "border-green-500 ring-1 ring-green-200"
                  : "border-gray-100"
              }`}
            >
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-3">
                      {s.nomor}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-gray-800">
                        {s.nama_latin}
                      </h2>
                      <p className="text-sm text-green-700">{s.nama}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlay(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      currentAudio === index && isPlaying
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white shadow-sm hover:shadow-md`}
                  >
                    {currentAudio === index && isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </button>
                </div>

                <div className="flex justify-between text-xs text-gray-500 mb-3">
                  <span className="italic">{s.arti}</span>
                  <span className="font-medium">{s.jumlah_ayat} ayat</span>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 mr-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-150"
                        style={{
                          width:
                            currentAudio === index && duration > 0
                              ? `${(progress / duration) * 100}%`
                              : "0%",
                        }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    {muted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Murota;
