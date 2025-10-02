import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen p-20 flex flex-col gap-4 items-center justify-center">
      <Link
        href="/alquran/surah"
        className="w-full px-4 py-2 bg-white rounded-2xl border border-green-200 text-center"
      >
        Alquran
      </Link>
      <Link
        href="/jadwal-sholat"
        className="w-full px-4 py-2 bg-white rounded-2xl border border-green-200 text-center"
      >
        Jadwal Sholat
      </Link>
      <Link
        href="/doa"
        className="w-full px-4 py-2 bg-white rounded-2xl border border-green-200 text-center"
      >
        Doa Doa
      </Link>
    </div>
  );
};

export default Page;
