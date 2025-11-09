"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProgress } from "@/contexts/ProgressContext";
import { getAllLessons } from "@/data/lessons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverviewPage() {
  const router = useRouter();
  const { user, progress, isLoading } = useProgress();
  const lessons = getAllLessons();

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

  const getProgressPercentage = (lessonId: string): number => {
    if (!progress) return 0;
    const lessonProgress = progress.lessons[lessonId];
    if (!lessonProgress || lessonProgress.maxScore === 0) return 0;
    return Math.round((lessonProgress.score / lessonProgress.maxScore) * 100);
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    if (!progress) return false;
    return progress.lessons[lessonId]?.completed || false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Themenübersicht
          </h1>
          <p className="text-lg text-gray-600">
            Hallo {user.name} aus der {user.class}!
          </p>
          {progress && (
            <div className="mt-4 text-sm text-gray-600">
              Fortschritt: {progress.completedLessons} von {lessons.length} Lerneinheiten abgeschlossen
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => {
            const progressPercentage = getProgressPercentage(lesson.id);
            const completed = isLessonCompleted(lesson.id);

            return (
              <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">
                          Lerneinheit {lesson.order}: {lesson.title}
                        </CardTitle>
                        <CardDescription>{lesson.description}</CardDescription>
                      </div>
                      {completed && (
                        <div className="text-green-600 text-2xl">✓</div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {progressPercentage > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Fortschritt</span>
                          <span>{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                    <div className="text-sm text-blue-600 font-medium">
                      {completed ? "Wiederholen →" : "Starten →"}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {progress && progress.completedLessons === lessons.length && (
          <div className="mt-8 text-center">
            <Link
              href="/final-quiz"
              className="inline-block px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Abschluss-Quiz starten
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


