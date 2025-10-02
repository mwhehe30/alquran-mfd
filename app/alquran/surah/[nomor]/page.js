import BottomNavigation from "@/components/bottom-navigation";
import { getDetailSurah, getSurah } from "@/lib/api";
import SurahDetail from "./surah-detail";

export async function generateMetadata({ params }) {
  const param = await params;
  const surahDetail = await getDetailSurah(param.nomor);
  return {
    title: `Surah ${surahDetail.nama_latin}`,
    description: `Surah ${surahDetail.deskripsi}`,
  };
}

export default async function Page({ params }) {
  const param = await params;
  const surah = await getSurah();
  return (
    <>
      <SurahDetail surah={surah} nomor={param.nomor} />
      <BottomNavigation />
    </>
  );
}
