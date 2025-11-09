"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useProgress } from "@/contexts/ProgressContext";
import { getLessonById } from "@/data/lessons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExerciseWrapper } from "@/components/exercises/ExerciseWrapper";
import { ProgressBar } from "@/components/ProgressBar";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { AudioPlayer } from "@/components/AudioPlayer";
import { saveScore } from "@/lib/storage";
import { Progress, Score } from "@/lib/types";
import { shuffleMultipleChoiceQuestion } from "@/lib/utils";

export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;
  const {
    user,
    isLoading,
    updateLessonProgress: updateProgress,
    saveScore: saveScoreToContext,
  } = useProgress();
  const lesson = getLessonById(lessonId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<boolean[]>([]);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<
    Array<{
      questionId: string;
      isCorrect: boolean;
      userAnswer: string;
      correctAnswer: string;
    }>
  >([]);

  // Randomisiere Multiple-Choice-Fragen beim Laden (muss vor frühen Returns sein)
  const questions = useMemo(() => {
    if (!lesson) return [];
    return lesson.test.questions.map((question) => {
      if (question.type === "multiple-choice") {
        return shuffleMultipleChoiceQuestion(question);
      }
      return question;
    });
  }, [lesson]);

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

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (isCorrect: boolean) => {
    const newScores = [...scores, isCorrect];
    setScores(newScores);

    // Speichere Antwort-Details
    const correctAnswer =
      currentQuestion.answers.find((a) => a.isCorrect)?.text || "";
    const userAnswer =
      currentQuestion.answers.find((a) => !a.isCorrect && !isCorrect)?.text ||
      correctAnswer;

    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        isCorrect,
        userAnswer,
        correctAnswer,
      },
    ]);

    // Warte kurz, dann zur nächsten Frage
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCompleted(true);
        saveTestResults(newScores);
      }
    }, 1500);
  };

  const saveTestResults = (finalScores: boolean[]) => {
    if (!user || !lesson) return;

    const correctAnswers = finalScores.filter(Boolean).length;
    const maxScore = questions.length;
    const percentage = Math.round((correctAnswers / maxScore) * 100);
    const isCompleted = percentage >= lesson.minScore;

    // Speichere Score
    const score: Score = {
      lessonId: lesson.id,
      exerciseId: lesson.test.id,
      score: correctAnswers,
      maxScore,
      percentage,
      timestamp: new Date().toISOString(),
      answers,
    };
    saveScoreToContext(score);
    saveScore(score);

    // Speichere Fortschritt
    const progress: Progress = {
      lessonId: lesson.id,
      completed: isCompleted,
      score: correctAnswers,
      maxScore,
      completedAt: isCompleted ? new Date().toISOString() : undefined,
      attempts: 1,
    };
    updateProgress(lesson.id, progress);
  };

  const correctAnswers = scores.filter(Boolean).length;
  const totalQuestions = questions.length;
  const percentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;
  const isPassing = percentage >= lesson.minScore;

  if (completed) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <ScoreDisplay
            score={correctAnswers}
            maxScore={totalQuestions}
            title="Test-Ergebnis"
          />

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Nächste Schritte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isPassing ? (
                <div>
                  <p className="text-lg text-gray-700 mb-4">
                    Glückwunsch! Du hast den Test bestanden. 🎉
                  </p>
                  <p className="text-gray-600">
                    Du kannst jetzt zur nächsten Lerneinheit übergehen oder
                    diese noch einmal wiederholen.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-lg text-red-700 mb-4">
                    Du hast {percentage}% erreicht. Um zu bestehen, benötigst du
                    mindestens {lesson.minScore}%.
                  </p>
                  <p className="text-gray-600">
                    Versuche es noch einmal! Du schaffst das! 💪
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <Link href={`/lesson/${lessonId}`}>
                  <Button variant="outline">Zurück zur Lerneinheit</Button>
                </Link>
                {isPassing ? (
                  <Link href="/overview">
                    <Button>Zur Übersicht</Button>
                  </Link>
                ) : (
                  <Link href={`/lesson/${lessonId}/introduction`}>
                    <Button>Wiederholen</Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
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
              <CardTitle>{lesson.test.title}</CardTitle>
              <div className="text-sm text-gray-600">
                Frage {currentQuestionIndex + 1} von {questions.length}
              </div>
            </div>
            {lesson.test.description && (
              <p className="text-gray-600 mt-2">{lesson.test.description}</p>
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
