"use client";

import { getSurah } from "@/lib/api";
import { AlertCircle, BookOpen, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import SurahCard from "./surah-card";

const normalizeText = (str) =>
  str
    ?.toLowerCase()
    .replace(/[\s'-]/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const ListSurah = () => {
  const [surah, setSurah] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setIsLoading(true);
        const res = await getSurah();
        setSurah(res);
      } catch (error) {
        console.error("Error fetching surah:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSurah();
  }, []);

  const filteredSurah = surah.filter((s) =>
    normalizeText(s.nama_latin).includes(normalizeText(search))
  );

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="pt-8 pb-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Daftar Surah Al-Qur&apos;an
          </h1>
          <p className="text-green-600 text-lg font-medium">
            114 Surah dalam Al-Qur&apos;an Al-Kareem
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 mb-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                id="search"
                placeholder="Cari nama surah... (contoh: Al-Fatiha, Yasin, An-Nas)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-lg"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Clear search</span>✕
                </button>
              )}
            </div>

            {search && (
              <div className="mt-3 text-sm text-gray-600">
                {filteredSurah.length > 0
                  ? `Ditemukan ${filteredSurah.length} surah`
                  : "Tidak ada surah yang cocok"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
              </div>
              <p className="text-gray-600 font-medium">
                Memuat daftar surah...
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Mohon tunggu sebentar
              </p>
            </div>
          ) : (
            <>
              {/* Results */}
              {filteredSurah.length > 0 ? (
                <div className="space-y-3">
                  {/* Results Header */}
                  {!search && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="font-semibold text-gray-900">
                            Semua Surah ({surah.length})
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Klik surah untuk membaca
                        </div>
                      </div>
                    </div>
                  )}

                  {filteredSurah.map((s) => (
                    <SurahCard surah={s} key={s.nomor} />
                  ))}
                </div>
              ) : search.trim() !== "" ? (
                // No Results State
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                    <AlertCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Surah tidak ditemukan
                  </h3>
                  <p className="text-gray-500 text-center max-w-md mb-6">
                    Tidak ada surah yang cocok dengan pencarian &quot;
                    <span className="font-semibold">{search}</span>&quot;
                  </p>
                  <button
                    onClick={() => setSearch("")}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Lihat Semua Surah
                  </button>

                  <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-md">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Tips Pencarian:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Coba kata kunci yang lebih singkat</li>
                      <li>• Gunakan nama Latin (Al-Fatiha, Yasin)</li>
                      <li>• Periksa ejaan nama surah</li>
                    </ul>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListSurah;
