import BottomNavigation from "@/components/bottom-navigation";
import GlobalAudioPlayer from "@/components/global-audio-player";
import { AudioProvider } from "@/context/audio-context";
import Murota from "./murota";

export const generateMetadata = () => {
  return {
    title: "Murotal",
    description: "Murotal",
  };
};

const Page = () => {
  return (
    <>
      <AudioProvider>
        <Murota />
        <GlobalAudioPlayer />
        <BottomNavigation />
      </AudioProvider>
    </>
  );
};

export default Page;
