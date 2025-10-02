"use client";

import { SurahNavigation } from "@/components/surah-navigation";
import { juzAlquran } from "@/data/data-juz";
import { getDetailSurah } from "@/lib/api";
import { useMarksStore } from "@/store/marks-store";
import { useTabStore } from "@/store/tab-store";
import HTMLReactParser from "html-react-parser";
import { Bookmark, Calendar, FileText, MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";

const SurahDetail = ({ surah, nomor }) => {
  const marks = useMarksStore((state) => state.marks);
  const addMark = useMarksStore((state) => state.addMark);
  const removeMark = useMarksStore((state) => state.removeMark);
  const activeTab = useTabStore((state) => state.activeTab);
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  const [detailSurah, setDetailSurah] = useState(null);
  const [targetAyat, setTargetAyat] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      setDetailSurah(null);
      const data = await getDetailSurah(nomor);
      setDetailSurah(data);
    };
    fetchDetail();
  }, [nomor]);

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

  if (!detailSurah)
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
        <SurahNavigation surah={surah} detailSurah={{ nomor: Number(nomor) }} />
        <div className="flex items-center justify-center mt-20">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-200 rounded-full animate-pulse mx-auto mb-4"></div>
            <p className="text-gray-500">Loading surah...</p>
          </div>
        </div>
      </div>
    );

  const tabs = [
    {
      key: "info",
      label: "Info",
      content: (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-white">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {detailSurah.nama_latin}
                </h1>
                <h2 className="text-2xl md:text-3xl font-arabic mb-4">
                  {detailSurah.nama}
                </h2>
                <p className="text-green-100 text-lg italic">
                  &quot;{detailSurah.arti}&quot;
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-6 mb-8">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tempat Turun</p>
                    <p className="font-semibold text-gray-900">
                      {detailSurah.tempat_turun}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Jumlah Ayat</p>
                    <p className="font-semibold text-gray-900">
                      {detailSurah.jumlah_ayat} ayat
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Urutan</p>
                    <p className="font-semibold text-gray-900">
                      Surah ke-{detailSurah.nomor}
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex gap-3 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  placeholder="Cari nomor ayat..."
                  value={targetAyat}
                  min={1}
                  max={detailSurah.jumlah_ayat}
                  onChange={(e) => setTargetAyat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGoToAyat()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                onClick={handleGoToAyat}
                disabled={
                  !targetAyat ||
                  Number(targetAyat) < 1 ||
                  Number(targetAyat) > detailSurah.jumlah_ayat
                }
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  !targetAyat ||
                  Number(targetAyat) < 1 ||
                  Number(targetAyat) > detailSurah.jumlah_ayat
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                Pergi
              </button>
            </div>
          </div>

          {/* list ayat */}
          <div className="space-y-6">
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
                <div key={s.id} id={`ayat-${s.nomor}`} className="space-y-4">
                  {juzAwal && (
                    <div className="bg-gradient-to-r from-yellow-100 to-amber-50 border border-yellow-200 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {juzAwal.juz}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-yellow-800">
                            Awal Juz {juzAwal.juz}
                          </p>
                          <p className="text-yellow-700 text-sm">
                            {juzAwal.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold font-arabic text-lg">
                              {s.nomor.toLocaleString("ar-SA", {
                                useGrouping: false,
                              })}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              Ayat {s.nomor}
                            </p>
                            <p className="text-sm text-gray-500">
                              {detailSurah.nama_latin}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            isMarked
                              ? removeMark(detailSurah.nomor, s.nomor)
                              : addMark(
                                  detailSurah.nomor,
                                  s.nomor,
                                  s.ar,
                                  detailSurah.nama_latin
                                )
                          }
                          className={`p-3 rounded-xl transition-all duration-200 ${
                            isMarked
                              ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100"
                              : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                          }`}
                          title={isMarked ? "Hapus tandaan" : "Tandai ayat"}
                        >
                          <Bookmark
                            className={`w-6 h-6 ${
                              isMarked ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6 mb-6 border-r-4 border-green-500">
                        <p className="text-2xl md:text-3xl leading-loose text-right font-arabic text-gray-800 tracking-wide">
                          {s.ar}
                        </p>
                      </div>

                      <div className="mb-4 p-4 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                        <span className="font-medium text-emerald-800 tracking-wider">
                          {HTMLReactParser(s.tr)}
                        </span>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                        <p className="text-gray-700 leading-relaxed">{s.idn}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <SurahNavigation surah={surah} detailSurah={detailSurah} />

      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-green-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {tabs.find((tab) => tab.key === activeTab)?.content}
    </div>
  );
};

export default SurahDetail;
