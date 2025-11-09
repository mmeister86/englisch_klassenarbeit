"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useProgress } from "@/contexts/ProgressContext";
import { getLessonById } from "@/data/lessons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExerciseWrapper } from "@/components/exercises/ExerciseWrapper";
import { ProgressBar } from "@/components/ProgressBar";
import { AudioPlayer } from "@/components/AudioPlayer";

export default function ExercisePage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;
  const { user, isLoading } = useProgress();
  const lesson = getLessonById(lessonId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<boolean[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/welcome");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Lädt...</div>
      </div>
    );
  }

  if (!user || !lesson) {
    return null;
  }

  const questions = lesson.exercise.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (isCorrect: boolean) => {
    const newScores = [...scores, isCorrect];
    setScores(newScores);

    // Warte kurz, dann zur nächsten Frage
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCompleted(true);
      }
    }, 1500);
  };

  const correctAnswers = scores.filter(Boolean).length;
  const totalQuestions = questions.length;

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Übung abgeschlossen!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-2xl font-semibold mb-4">
                  Du hast {correctAnswers} von {totalQuestions} Fragen richtig beantwortet!
                </p>
                <ProgressBar
                  current={correctAnswers}
                  max={totalQuestions}
                  label="Ergebnis"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Link href={`/lesson/${lessonId}`}>
                  <Button variant="outline">Zurück</Button>
                </Link>
                <Link href={`/lesson/${lessonId}/test`}>
                  <Button>Weiter zum Test</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/lesson/${lessonId}`}
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Zurück zur Lerneinheit
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{lesson.exercise.title}</CardTitle>
              <div className="text-sm text-gray-600">
                Frage {currentQuestionIndex + 1} von {questions.length}
              </div>
            </div>
            {lesson.exercise.description && (
              <p className="text-gray-600 mt-2">{lesson.exercise.description}</p>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <ProgressBar
              current={currentQuestionIndex + 1}
              max={questions.length}
              label="Fortschritt"
            />

            {currentQuestion.audioUrl && (
              <div className="mb-4">
                <AudioPlayer src={currentQuestion.audioUrl} />
              </div>
            )}

            <div className="min-h-[300px]">
              <ExerciseWrapper
                question={currentQuestion}
                onAnswer={handleAnswer}
                lessonId={lessonId}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
