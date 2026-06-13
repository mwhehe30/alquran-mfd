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
      className="sticky top-0 left-0 right-0 z-30 py-3"
      ref={dropdownRef}
    >
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-[22px] border border-[#17382f]/8 bg-white/95 px-4 py-3 text-sm font-bold text-[#17382f] shadow-[0_8px_26px_rgba(23,56,47,.05)] backdrop-blur"
      >
        {selected
          ? `${selected.nomor}. ${selected.nama_latin || ""}`
          : "Pilih Surah..."}
        <ChevronDown className="h-4 w-4 opacity-70" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-[22px] border border-[#17382f]/10 bg-white shadow-2xl">
          {/* Input search */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Cari surah..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border border-[#17382f]/10 bg-[#f7f5ee] px-4 py-3 text-sm outline-none"
            />
          </div>

          {/* List */}
          <ul className="max-h-60 overflow-y-auto">
            {filteredSurah.length > 0 ? (
              filteredSurah.map((s) => (
                <li
                  key={s.nomor}
                  onClick={() => handleSelect(s)}
                  className={`cursor-pointer px-4 py-3 text-sm hover:bg-[#edf4f0] ${
                    selected?.nomor === s.nomor
                      ? "bg-[#edf4f0] font-bold text-[#0f6b56]"
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
