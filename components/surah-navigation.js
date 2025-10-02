"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const SurahNavigation = ({ surah, detailSurah }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  const normalizeText = (str) =>
    str
      ?.toLowerCase()
      .replace(/[\s'-]/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const handleSelect = (s) => {
    setSelected(s);
    setQuery("");
    setOpen(false);
    router.push(`/alquran/surah/${s.nomor}`);
  };

  const filteredSurah = surah.filter((s) =>
    normalizeText(s.nama_latin).includes(normalizeText(query))
  );

  // Sync selected dengan detailSurah dari props
  useEffect(() => {
    if (detailSurah) {
      const found = surah.find((s) => s.nomor === detailSurah.nomor);
      setSelected(found || detailSurah);
    }
  }, [detailSurah, surah]);

  // tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="sticky top-0 left-0 right-0 p-3 bg-transparent z-20"
      ref={dropdownRef}
    >
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {selected
          ? `${selected.nomor}. ${selected.nama_latin || ""}`
          : "Pilih Surah..."}
        <ChevronDown className="h-4 w-4 opacity-70" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg z-30">
          {/* Input search */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Cari surah..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* List */}
          <ul className="max-h-60 overflow-y-auto">
            {filteredSurah.length > 0 ? (
              filteredSurah.map((s) => (
                <li
                  key={s.nomor}
                  onClick={() => handleSelect(s)}
                  className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${
                    selected?.nomor === s.nomor
                      ? "bg-green-50 font-semibold"
                      : ""
                  }`}
                >
                  {s.nomor}. {s.nama_latin}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">Tidak ditemukan</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
