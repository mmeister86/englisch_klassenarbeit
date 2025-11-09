"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useProgress } from "@/contexts/ProgressContext";
import { getLessonById } from "@/data/lessons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreDisplay } from "@/components/ScoreDisplay";

export default function ResultPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;
  const { user, isLoading, getLessonProgress } = useProgress();
  const lesson = getLessonById(lessonId);

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

  const progress = getLessonProgress(lessonId);
  const hasProgress = progress && progress.maxScore > 0;
  const percentage = hasProgress
    ? Math.round((progress.score / progress.maxScore) * 100)
    : 0;
  const isPassing = percentage >= lesson.minScore;

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

        {hasProgress ? (
          <>
            <ScoreDisplay
              score={progress.score}
              maxScore={progress.maxScore}
              title={`Ergebnis: ${lesson.title}`}
            />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Empfehlungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isPassing ? (
                  <div>
                    <p className="text-lg text-gray-700 mb-4">
                      Ausgezeichnet! Du hast diese Lerneinheit erfolgreich abgeschlossen. 🎉
                    </p>
                    <p className="text-gray-600">
                      Du kannst jetzt zur nächsten Lerneinheit übergehen oder diese noch einmal wiederholen, um dein Wissen zu festigen.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg text-red-700 mb-4">
                      Du hast {percentage}% erreicht. Um zu bestehen, benötigst du mindestens {lesson.minScore}%.
                    </p>
                    <p className="text-gray-600 mb-4">
                      Wir empfehlen dir, die Einführung und die Übungen noch einmal durchzugehen, bevor du den Test wiederholst.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Wiederhole die Einführung, um die Grundlagen zu festigen</li>
                      <li>Mache die Übungen noch einmal</li>
                      <li>Versuche dann den Test erneut</li>
                    </ul>
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
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Noch kein Ergebnis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Du hast noch keinen Test für diese Lerneinheit abgeschlossen.
              </p>
              <div className="flex justify-end gap-4">
                <Link href={`/lesson/${lessonId}`}>
                  <Button variant="outline">Zurück</Button>
                </Link>
                <Link href={`/lesson/${lessonId}/test`}>
                  <Button>Test starten</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

