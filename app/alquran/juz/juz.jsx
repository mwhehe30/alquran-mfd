"use client";

import { juzAlquran } from "@/data/data-juz";
import { useTabStore } from "@/store/tab-store";
import { Book, ChevronRight, MapPin } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Book className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Daftar Juz Al-Quran
          </h1>
          <p className="text-gray-600 text-lg">
            30 Juz lengkap untuk panduan membaca Al-Quran
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {juzAlquran.map((juz) => (
            <Link
              key={juz.juz}
              href={`/alquran/surah/${juz.start.surah}?#ayat-${juz.start.ayah}`}
              onClick={() => setActiveTab("ayat")}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-lg">
                        {juz.juz}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Juz {juz.juz}
                      </p>
                      <p className="text-xs text-gray-400">Para {juz.juz}</p>
                    </div>
                  </div>

                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors duration-200">
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors duration-200" />
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200 mb-2">
                    {juz.name}
                  </h2>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-green-500">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Dimulai dari:
                    </span>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    Surah {juz.start.surah}, Ayat {juz.start.ayah}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Juz;
