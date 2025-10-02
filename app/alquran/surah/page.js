import BottomNavigation from "@/components/bottom-navigation";
import ListSurah from "@/components/list-surah";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen">
      <Link
        href="/"
        className="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
      >
        <span className="font-medium">Kembali</span>
      </Link>
      <ListSurah />
      <BottomNavigation />
    </div>
  );
};

export default page;
