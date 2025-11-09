// TypeScript-Typen für die Englisch-Lern-WebApp

export type ExerciseType = "drag-drop" | "multiple-choice" | "fill-blank" | "image-matching";

export interface User {
  id: string;
  name: string;
  class: string;
  createdAt: string;
}

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback?: string;
}

export interface Question {
  id: string;
  type: ExerciseType;
  question: string;
  answers: Answer[];
  correctAnswerId: string;
  explanation?: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface DragDropQuestion extends Question {
  type: "drag-drop";
  sentence: string;
  blankPosition: number;
  options: string[];
  correctOption: string;
}

export interface MultipleChoiceQuestion extends Question {
  type: "multiple-choice";
  options: string[];
  correctOptionIndex: number;
}

export interface FillBlankQuestion extends Question {
  type: "fill-blank";
  text: string;
  blanks: Array<{
    position: number;
    correctAnswer: string;
    options: string[];
  }>;
}

export interface ImageMatchingQuestion extends Question {
  type: "image-matching";
  imageUrl: string;
  options: string[];
  correctOption: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  description?: string;
  questions: Question[];
  instructions?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  introduction: {
    title: string;
    content: string;
    examples: string[];
    vocabulary?: string[];
  };
  exercise: Exercise;
  practice?: Exercise;
  test: Exercise;
  minScore: number; // Mindestpunktzahl für Bestehen (z.B. 70%)
}

export interface Progress {
  lessonId: string;
  completed: boolean;
  score: number;
  maxScore: number;
  completedAt?: string;
  attempts: number;
}

export interface UserProgress {
  userId: string;
  lessons: Record<string, Progress>;
  totalScore: number;
  totalMaxScore: number;
  completedLessons: number;
  lastActivity: string;
}

export interface Score {
  lessonId: string;
  exerciseId: string;
  score: number;
  maxScore: number;
  percentage: number;
  timestamp: string;
  answers: Array<{
    questionId: string;
    isCorrect: boolean;
    userAnswer: string;
    correctAnswer: string;
  }>;
}

export interface FeedbackMessage {
  type: "success" | "error" | "info";
  message: string;
  correctAnswer?: string;
}


