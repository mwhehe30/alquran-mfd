import BottomNavigation from "@/components/bottom-navigation";
import ListSurah from "@/components/list-surah";
import ButtonBack from "@/components/button-back";

const page = () => {
  return (
    <div className="min-h-screen pt-5">
      <div className="mb-4 px-5"><ButtonBack /></div>
      <ListSurah />
      <BottomNavigation />
    </div>
  );
};

export default page;
