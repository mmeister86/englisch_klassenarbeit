"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CertificatePage() {
  const router = useRouter();
  const { user, progress, isLoading } = useProgress();
  const certificateRef = useRef<HTMLDivElement>(null);

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

  const downloadCertificate = () => {
    if (!certificateRef.current) return;

    // Erstelle ein Canvas-Element für den Download
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    // Hintergrund
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rahmen
    ctx.strokeStyle = "#1e40af";
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Titel
    ctx.fillStyle = "#1e40af";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("ZERTIFIKAT", canvas.width / 2, 150);

    // Untertitel
    ctx.fillStyle = "#64748b";
    ctx.font = "24px Arial";
    ctx.fillText("Englisch-Lern-App", canvas.width / 2, 200);

    // Text
    ctx.fillStyle = "#1e293b";
    ctx.font = "28px Arial";
    ctx.fillText("Dieses Zertifikat bestätigt, dass", canvas.width / 2, 300);

    // Name
    ctx.fillStyle = "#1e40af";
    ctx.font = "bold 36px Arial";
    ctx.fillText(user.name, canvas.width / 2, 380);

    // Klasse
    ctx.fillStyle = "#64748b";
    ctx.font = "24px Arial";
    ctx.fillText(`Klasse ${user.class}`, canvas.width / 2, 430);

    // Text
    ctx.fillStyle = "#1e293b";
    ctx.font = "28px Arial";
    ctx.fillText("alle Lerneinheiten erfolgreich abgeschlossen hat.", canvas.width / 2, 500);

    // Datum
    ctx.fillStyle = "#64748b";
    ctx.font = "20px Arial";
    const date = new Date().toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    ctx.fillText(date, canvas.width / 2, 650);

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Zertifikat_${user.name.replace(/\s+/g, "_")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

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
            <CardTitle className="text-3xl">Deine Urkunde</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              ref={certificateRef}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border-4 border-blue-600 rounded-lg p-12 text-center"
            >
              <h1 className="text-4xl font-bold text-blue-900 mb-4">
                ZERTIFIKAT
              </h1>
              <p className="text-xl text-gray-600 mb-8">Englisch-Lern-App</p>
              <p className="text-lg text-gray-700 mb-4">
                Dieses Zertifikat bestätigt, dass
              </p>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">
                {user.name}
              </h2>
              <p className="text-xl text-gray-600 mb-8">Klasse {user.class}</p>
              <p className="text-lg text-gray-700 mb-8">
                alle Lerneinheiten erfolgreich abgeschlossen hat.
              </p>
              <div className="mt-12 text-gray-600">
                <p>{new Date().toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}</p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/overview">
                <Button variant="outline">Zurück</Button>
              </Link>
              <Button onClick={downloadCertificate}>
                Urkunde herunterladen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

