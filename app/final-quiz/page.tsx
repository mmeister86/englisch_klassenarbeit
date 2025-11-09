"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProgress } from "@/contexts/ProgressContext";
import { getAllLessons } from "@/data/lessons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExerciseWrapper } from "@/components/exercises/ExerciseWrapper";
import { ProgressBar } from "@/components/ProgressBar";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { Question } from "@/lib/types";

export default function FinalQuizPage() {
  const router = useRouter();
  const { user, isLoading } = useProgress();
  const lessons = getAllLessons();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<boolean[]>([]);
  const [completed, setCompleted] = useState(false);

  // Sammle alle Fragen aus allen Lerneinheiten
  const allQuestions = useMemo(() => {
    const questions: Question[] = [];
    lessons.forEach((lesson) => {
      // Füge Fragen aus Exercise hinzu
      lesson.exercise.questions.forEach((q) => {
        questions.push({ ...q, id: `exercise-${lesson.id}-${q.id}` });
      });
      // Füge Fragen aus Test hinzu
      lesson.test.questions.forEach((q) => {
        questions.push({ ...q, id: `test-${lesson.id}-${q.id}` });
      });
    });
    // Mische die Fragen zufällig
    return questions.sort(() => Math.random() - 0.5).slice(0, 15);
  }, [lessons]);

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

  if (!user) {
    return null;
  }

  const currentQuestion = allQuestions[currentQuestionIndex];

  const handleAnswer = (isCorrect: boolean) => {
    const newScores = [...scores, isCorrect];
    setScores(newScores);

    setTimeout(() => {
      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCompleted(true);
      }
    }, 1500);
  };

  const correctAnswers = scores.filter(Boolean).length;
  const totalQuestions = allQuestions.length;
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const isPassing = percentage >= 80;

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <ScoreDisplay
            score={correctAnswers}
            maxScore={totalQuestions}
            title="Abschluss-Quiz Ergebnis"
          />

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Herzlichen Glückwunsch!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isPassing ? (
                <div>
                  <p className="text-lg text-gray-700 mb-4">
                    Du hast {percentage}% erreicht! 🎉
                  </p>
                  <p className="text-gray-600 mb-4">
                    Du hast das Abschluss-Quiz erfolgreich bestanden! Du kannst dir jetzt deine Urkunde herunterladen.
                  </p>
                  <div className="flex justify-end gap-4 mt-6">
                    <Link href="/overview">
                      <Button variant="outline">Zur Übersicht</Button>
                    </Link>
                    <Link href="/certificate">
                      <Button>Urkunde herunterladen</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-lg text-red-700 mb-4">
                    Du hast {percentage}% erreicht. Um die Urkunde zu erhalten, benötigst du mindestens 80%.
                  </p>
                  <p className="text-gray-600">
                    Versuche es noch einmal! Du schaffst das! 💪
                  </p>
                  <div className="flex justify-end gap-4 mt-6">
                    <Link href="/overview">
                      <Button variant="outline">Zur Übersicht</Button>
                    </Link>
                    <Button onClick={() => {
                      setCurrentQuestionIndex(0);
                      setScores([]);
                      setCompleted(false);
                    }}>
                      Nochmal versuchen
                    </Button>
                  </div>
                </div>
              )}
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
            href="/overview"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Zurück zur Übersicht
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Abschluss-Quiz</CardTitle>
              <div className="text-sm text-gray-600">
                Frage {currentQuestionIndex + 1} von {allQuestions.length}
              </div>
            </div>
            <p className="text-gray-600 mt-2">
              Zeige was du gelernt hast! Beantworte mindestens 80% der Fragen richtig, um deine Urkunde zu erhalten.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProgressBar
              current={currentQuestionIndex + 1}
              max={allQuestions.length}
              label="Fortschritt"
            />

            <div className="min-h-[300px]">
              <ExerciseWrapper
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

