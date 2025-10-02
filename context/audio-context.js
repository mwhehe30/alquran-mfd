"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [currentSurah, setCurrentSurah] = useState(null);
  const [surahList, setSurahList] = useState([]);
  const audioRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      // Auto play next surah
      if (currentAudio !== null && currentAudio < surahList.length - 1) {
        playNext();
      } else {
        setCurrentAudio(null);
        setShowAudioMenu(false);
        setCurrentSurah(null);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [currentAudio, surahList.length]);

  const playSurah = (surahData, index) => {
    const audio = audioRef.current;
    if (!audio || !surahData) return;

    // If same surah is clicked, toggle play/pause
    if (currentAudio === index && currentSurah?.nomor === surahData.nomor) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      return;
    }

    // Load new surah
    audio.src = surahData.audio;
    audio.load();
    setCurrentAudio(index);
    setCurrentSurah(surahData);
    setShowAudioMenu(true);
    audio.play().catch(console.error);
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resumeAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (newTime) => {
    setProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const playPrevious = () => {
    if (currentAudio > 0 && surahList.length > 0) {
      const prevSurah = surahList[currentAudio - 1];
      playSurah(prevSurah, currentAudio - 1);
    }
  };

  const playNext = () => {
    if (currentAudio < surahList.length - 1 && surahList.length > 0) {
      const nextSurah = surahList[currentAudio + 1];
      playSurah(nextSurah, currentAudio + 1);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentAudio(null);
    setCurrentSurah(null);
    setShowAudioMenu(false);
    setProgress(0);
  };

  const setSurahData = (surahData) => {
    setSurahList(surahData);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const value = {
    // State
    currentAudio,
    isPlaying,
    muted,
    volume,
    progress,
    duration,
    showAudioMenu,
    currentSurah,
    surahList,

    // Actions
    playSurah,
    pauseAudio,
    resumeAudio,
    toggleMute,
    handleVolumeChange,
    handleProgressChange,
    playPrevious,
    playNext,
    stopAudio,
    setSurahData,
    formatTime,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};
