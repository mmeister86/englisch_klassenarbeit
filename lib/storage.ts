// Local Storage Utilities für Benutzerdaten und Fortschritt

import { User, UserProgress, Progress, Score } from "./types";

const STORAGE_KEYS = {
  USER: "englisch_app_user",
  PROGRESS: "englisch_app_progress",
  SCORES: "englisch_app_scores"
} as const;

// User Management
export function saveUserData(user: User): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error("Fehler beim Speichern der Benutzerdaten:", error);
  }
}

export function getUserData(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    if (!data) return null;
    return JSON.parse(data) as User;
  } catch (error) {
    console.error("Fehler beim Laden der Benutzerdaten:", error);
    return null;
  }
}

export function clearUserData(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error("Fehler beim Löschen der Benutzerdaten:", error);
  }
}

// Progress Management
export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error("Fehler beim Speichern des Fortschritts:", error);
  }
}

export function loadUserProgress(userId: string): UserProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!data) {
      // Erstelle neuen Fortschritt für diesen Benutzer
      return {
        userId,
        lessons: {},
        totalScore: 0,
        totalMaxScore: 0,
        completedLessons: 0,
        lastActivity: new Date().toISOString()
      };
    }
    const progress = JSON.parse(data) as UserProgress;
    // Stelle sicher, dass es zum richtigen Benutzer gehört
    if (progress.userId !== userId) {
      return {
        userId,
        lessons: {},
        totalScore: 0,
        totalMaxScore: 0,
        completedLessons: 0,
        lastActivity: new Date().toISOString()
      };
    }
    return progress;
  } catch (error) {
    console.error("Fehler beim Laden des Fortschritts:", error);
    return {
      userId,
      lessons: {},
      totalScore: 0,
      totalMaxScore: 0,
      completedLessons: 0,
      lastActivity: new Date().toISOString()
    };
  }
}

export function updateLessonProgress(
  userId: string,
  lessonId: string,
  progress: Progress
): void {
  const userProgress = loadUserProgress(userId);
  if (!userProgress) return;

  userProgress.lessons[lessonId] = progress;
  userProgress.lastActivity = new Date().toISOString();

  // Berechne Gesamtstatistiken neu
  const lessons = Object.values(userProgress.lessons);
  userProgress.totalScore = lessons.reduce((sum, p) => sum + p.score, 0);
  userProgress.totalMaxScore = lessons.reduce((sum, p) => sum + p.maxScore, 0);
  userProgress.completedLessons = lessons.filter(p => p.completed).length;

  saveUserProgress(userProgress);
}

export function getLessonProgress(
  userId: string,
  lessonId: string
): Progress | null {
  const userProgress = loadUserProgress(userId);
  if (!userProgress) return null;
  return userProgress.lessons[lessonId] || null;
}

// Score Management
export function saveScore(score: Score): void {
  if (typeof window === "undefined") return;
  try {
    const scores = getScores();
    scores.push(score);
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
  } catch (error) {
    console.error("Fehler beim Speichern des Scores:", error);
  }
}

export function getScores(): Score[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SCORES);
    if (!data) return [];
    return JSON.parse(data) as Score[];
  } catch (error) {
    console.error("Fehler beim Laden der Scores:", error);
    return [];
  }
}

export function getScoresByLesson(lessonId: string): Score[] {
  return getScores().filter(score => score.lessonId === lessonId);
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.SCORES);
  } catch (error) {
    console.error("Fehler beim Löschen aller Daten:", error);
  }
}


