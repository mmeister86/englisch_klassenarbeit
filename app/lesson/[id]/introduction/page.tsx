"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useProgress } from "@/contexts/ProgressContext";
import { getLessonById } from "@/data/lessons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function IntroductionPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;
  const { user, isLoading } = useProgress();
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

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl">{lesson.introduction.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {lesson.introduction.content}
            </p>

            {lesson.introduction.examples && lesson.introduction.examples.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Beispiele:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {lesson.introduction.examples.map((example, index) => (
                    <li key={index} className="text-lg">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {lesson.introduction.vocabulary && lesson.introduction.vocabulary.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Vokabeln:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {lesson.introduction.vocabulary.map((vocab, index) => (
                    <li key={index} className="text-lg">
                      {vocab}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href={`/lesson/${lessonId}`}>
            <Button variant="outline">Zurück</Button>
          </Link>
          <Link href={`/lesson/${lessonId}/exercise`}>
            <Button>Weiter zur Übung</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
