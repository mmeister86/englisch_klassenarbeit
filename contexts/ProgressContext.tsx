"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserProgress, Progress, Score } from "@/lib/types";
import {
  getUserData,
  loadUserProgress,
  updateLessonProgress as saveLessonProgress,
  saveScore as saveScoreToStorage
} from "@/lib/storage";

interface ProgressContextType {
  user: User | null;
  progress: UserProgress | null;
  setUser: (user: User) => void;
  updateLessonProgress: (lessonId: string, progress: Progress) => void;
  saveScore: (score: Score) => void;
  getLessonProgress: (lessonId: string) => Progress | null;
  isLoading: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lade Benutzerdaten beim Start
    const savedUser = getUserData();
    if (savedUser) {
      setUserState(savedUser);
      const userProgress = loadUserProgress(savedUser.id);
      setProgress(userProgress);
    }
    setIsLoading(false);
  }, []);

  const setUser = (newUser: User) => {
    setUserState(newUser);
    const userProgress = loadUserProgress(newUser.id);
    setProgress(userProgress);
  };

  const updateLessonProgress = (lessonId: string, lessonProgress: Progress) => {
    if (!user) return;

    saveLessonProgress(user.id, lessonId, lessonProgress);
    const updatedProgress = loadUserProgress(user.id);
    setProgress(updatedProgress);
  };

  const saveScore = (score: Score) => {
    saveScoreToStorage(score);
  };

  const getLessonProgress = (lessonId: string): Progress | null => {
    if (!user || !progress) return null;
    return progress.lessons[lessonId] || null;
  };

  return (
    <ProgressContext.Provider
      value={{
        user,
        progress,
        setUser,
        updateLessonProgress,
        saveScore,
        getLessonProgress,
        isLoading
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}

