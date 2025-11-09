"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
  className?: string;
}

export function AudioPlayer({
  src,
  autoPlay = false,
  className,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    // Auto-Play wenn autoPlay prop gesetzt ist
    if (autoPlay) {
      audio.play().catch(() => {
        // Ignoriere Fehler beim Auto-Play (Browser-Beschränkungen)
      });
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [autoPlay]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateTimeFromPosition = useCallback(
    (clientX: number): number => {
      const progressBar = progressBarRef.current;
      const audio = audioRef.current;
      if (!progressBar || !audio || !duration) return 0;

      const rect = progressBar.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      return percentage * duration;
    },
    [duration]
  );

  const setAudioTime = useCallback((newTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }, []);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const newTime = calculateTimeFromPosition(e.clientX);
    setAudioTime(newTime);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (!duration) return;
    const newTime = calculateTimeFromPosition(e.clientX);
    setAudioTime(newTime);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (!duration) return;
    const touch = e.touches[0];
    const newTime = calculateTimeFromPosition(touch.clientX);
    setAudioTime(newTime);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !duration) return;
      const newTime = calculateTimeFromPosition(e.clientX);
      if (newTime > 0) {
        setAudioTime(newTime);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !duration) return;
      const touch = e.touches[0];
      if (!touch) return;
      const newTime = calculateTimeFromPosition(touch.clientX);
      if (newTime > 0) {
        setAudioTime(newTime);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, duration, calculateTimeFromPosition, setAudioTime]);

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 bg-gray-50 rounded-lg",
        className
      )}
    >
      <audio ref={audioRef} src={src} preload="metadata" autoPlay={autoPlay} />

      <Button
        onClick={togglePlayPause}
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full"
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </Button>

      <div className="flex-1">
        <div
          ref={progressBarRef}
          className={cn(
            "w-full bg-gray-200 rounded-full h-2 mb-1 cursor-pointer relative group",
            isDragging && "cursor-grabbing"
          )}
          onClick={handleProgressClick}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div
            className={cn(
              "bg-blue-600 h-2 rounded-full transition-all",
              isDragging && "transition-none"
            )}
            style={{
              width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
