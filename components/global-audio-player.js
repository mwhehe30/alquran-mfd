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
    volume,
    surahList,
    pauseAudio,
    resumeAudio,
    playPrevious,
    playNext,
    toggleMute,
    handleVolumeChange,
    handleProgressChange,
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
    <div className="fixed bottom-24 left-1/2 z-50 w-[calc(100%-24px)] max-w-[496px] -translate-x-1/2 px-3">
      <div className="soft-card mx-auto flex items-center justify-between rounded-[24px] p-3">
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
            className="w-10 h-10 rounded-full bg-[#0f6b56] text-white flex items-center justify-center mx-2"
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
            <div className="text-sm font-bold text-[#17382f] truncate">
              {currentSurah.nama_latin}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {currentSurah.nama}
            </div>

            <input
              type="range"
              min="0"
              max={duration || 0}
              value={Math.min(progress, duration || 0)}
              onChange={(event) => handleProgressChange(Number(event.target.value))}
              className="mt-2 h-1.5 w-full cursor-pointer accent-[#d09c35]"
              aria-label="Posisi audio"
            />
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
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={muted ? 0 : volume}
            onChange={(event) => handleVolumeChange(Number(event.target.value))}
            className="hidden w-16 accent-[#0f6b56] sm:block"
            aria-label="Volume audio"
          />

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
