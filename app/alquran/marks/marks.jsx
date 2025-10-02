"use client";

import { useMarksStore } from "@/store/marks-store";
import { useTabStore } from "@/store/tab-store";
import { Bookmark, Trash2 } from "lucide-react";
import Link from "next/link";

const Marks = () => {
  const marks = useMarksStore((state) => state.marks);
  const removeMark = useMarksStore((state) => state.removeMark);
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  if (marks.length === 0) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-md mx-auto text-center mt-20">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Ayat Tandaan
          </h1>
          <p className="text-gray-500 leading-relaxed">
            Belum ada ayat yang ditandai.
            <br />
            Tandai ayat favorit Anda untuk akses mudah.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ayat Tandaan
          </h1>
          <p className="text-gray-600">{marks.length} ayat tersimpan</p>
        </div>

        <div className="space-y-4">
          {marks.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-sm">
                        {m.ayatNomor}
                      </span>
                    </div>
                    <div>
                      <Link
                        href={`/alquran/surah/${m.surahNomor}#ayat-${m.ayatNomor}`}
                        onClick={() => setActiveTab("ayat")}
                        className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors duration-200 block"
                      >
                        {m.namaSurah}
                      </Link>
                      <p className="text-sm text-gray-500">
                        Ayat ke-{m.ayatNomor}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeMark(m.surahNomor, m.ayatNomor)}
                    className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    title="Hapus tandaan"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-green-500">
                  <p className="text-gray-700 leading-relaxed text-right font-medium font-arabic">
                    {m.ayatText}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-green-600">
                    <Bookmark className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">Tersimpan</span>
                  </div>

                  <Link
                    href={`/alquran/surah/${m.surahNomor}#ayat-${m.ayatNomor}`}
                    onClick={() => setActiveTab("ayat")}
                    className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline transition-colors duration-200"
                  >
                    Buka Ayat →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marks;
