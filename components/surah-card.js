import Link from "next/link";

const SurahCard = ({ surah }) => {
  return (
    <Link
      href={`/alquran/surah/${surah.nomor}`}
      className="block bg-white p-4 border border-green-200 rounded-3xl"
    >
      <div className="flex gap-3 items-center justify-between mb-4">
        <div className="size-8 bg-green-600 text-white grid place-items-center rounded-full font-semibold">
          {surah.nomor}
        </div>

        <div className="px-3 py-1 bg-green-50 rounded-2xl border border-green-200">
          <p className="font-medium text-sm text-green-700">
            {surah.jumlah_ayat} ayat
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="font-bold text-lg text-green-900 mb-1">
            {surah.nama_latin}
          </p>
          <p className="text-sm italic text-green-700">{surah.arti}</p>
        </div>

        <div className="ml-4">
          <p
            dir="rtl"
            className="text-2xl font-semibold text-green-700 font-arabic"
            lang="ar"
          >
            {surah.nama}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SurahCard;
