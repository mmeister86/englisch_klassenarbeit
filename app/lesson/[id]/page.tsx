"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useProgress } from "@/contexts/ProgressContext";
import { getLessonById } from "@/data/lessons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LessonPage() {
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

  if (!user) {
    return null;
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Lerneinheit nicht gefunden</div>
      </div>
    );
  }

  const steps = [
    {
      id: "introduction",
      title: "Einführung",
      description: "Lerne die Grundlagen",
      href: `/lesson/${lessonId}/introduction`
    },
    {
      id: "exercise",
      title: "Übung",
      description: "Drag & Drop Übung",
      href: `/lesson/${lessonId}/exercise`
    },
    {
      id: "test",
      title: "Test",
      description: "Zeige was du gelernt hast",
      href: `/lesson/${lessonId}/test`
    },
    {
      id: "result",
      title: "Ergebnis",
      description: "Sieh dein Ergebnis",
      href: `/lesson/${lessonId}/result`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/overview"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Zurück zur Übersicht
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {lesson.title}
          </h1>
          <p className="text-lg text-gray-600">{lesson.description}</p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <Link key={step.id} href={step.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <CardTitle>{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                    <div className="text-blue-600">→</div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


