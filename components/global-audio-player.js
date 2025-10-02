"use client";
import { useAudio } from "@/context/audio-context";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const GlobalAudioPlayer = () => {
  const {
    showAudioMenu,
    currentAudio,
    currentSurah,
    isPlaying,
    progress,
    duration,
    muted,
    surahList,
    pauseAudio,
    resumeAudio,
    playPrevious,
    playNext,
    toggleMute,
    stopAudio,
    formatTime,
  } = useAudio();

  if (!showAudioMenu || currentAudio === null || !currentSurah) {
    return null;
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };

  return (
    <div className="fixed bottom-18 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-50 max-w-md mx-auto">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center flex-1">
          {/* Previous Button */}
          <button
            onClick={playPrevious}
            disabled={currentAudio === 0}
            className={`p-1.5 rounded-full ${
              currentAudio === 0
                ? "text-gray-300"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mx-3 hover:bg-green-600 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>

          {/* Next Button */}
          <button
            onClick={playNext}
            disabled={currentAudio === surahList.length - 1}
            className={`p-1.5 rounded-full ${
              currentAudio === surahList.length - 1
                ? "text-gray-300"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Surah Info */}
          <div className="ml-4 flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-800 truncate">
              {currentSurah.nama_latin}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {currentSurah.nama}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-150"
                style={{
                  width: `${duration ? (progress / duration) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center ml-4 space-x-2">
          {/* Time Display */}
          <div className="text-xs text-gray-500 min-w-[45px] text-center">
            {formatTime(progress)} / {formatTime(duration)}
          </div>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={stopAudio}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalAudioPlayer;
