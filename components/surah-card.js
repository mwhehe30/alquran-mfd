import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const SurahCard = ({ surah }) => (
  <Link
    href={`/alquran/surah/${surah.nomor}`}
    className="group flex items-center gap-4 rounded-[22px] border border-[#17382f]/8 bg-white/75 p-4 shadow-[0_8px_26px_rgba(23,56,47,.045)] transition hover:-translate-y-0.5 hover:border-[#0f6b56]/25 hover:bg-white"
  >
    <div className="flex size-11 shrink-0 rotate-45 items-center justify-center rounded-[14px] bg-[#edf4f0] text-[#0f6b56]">
      <span className="-rotate-45 text-sm font-bold">{surah.nomor}</span>
    </div>
    <div className="min-w-0 flex-1">
      <h2 className="truncate font-bold text-[#17382f]">{surah.nama_latin}</h2>
      <p className="mt-1 truncate text-xs text-[#718078]">
        {surah.arti} · {surah.jumlah_ayat} ayat
      </p>
    </div>
    <div className="text-right">
      <p dir="rtl" lang="ar" className="font-arabic text-[23px] font-semibold text-[#0f6b56]">
        {surah.nama}
      </p>
      <ArrowUpRight className="ml-auto mt-1 size-4 text-[#b8c1bc] transition group-hover:text-[#d09c35]" />
    </div>
  </Link>
);

export default SurahCard;
