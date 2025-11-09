"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScoreDisplayProps {
  score: number;
  maxScore: number;
  title?: string;
  showBadge?: boolean;
  className?: string;
}

export function ScoreDisplay({
  score,
  maxScore,
  title = "Dein Ergebnis",
  showBadge = true,
  className
}: ScoreDisplayProps) {
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const isPassing = percentage >= 70;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-5xl font-bold mb-2">
            <span className={cn(isPassing ? "text-green-600" : "text-red-600")}>
              {score}
            </span>
            <span className="text-gray-400"> / {maxScore}</span>
          </div>
          <div className="text-2xl font-semibold text-gray-700">
            {percentage}%
          </div>
        </div>

        {showBadge && (
          <div className="flex justify-center">
            <Badge
              variant={isPassing ? "default" : "destructive"}
              className="text-lg px-4 py-2"
            >
              {isPassing ? "✓ Bestanden" : "Nicht bestanden"}
            </Badge>
          </div>
        )}

        <div className="text-center text-gray-600">
          {isPassing ? (
            <p className="text-lg font-medium text-green-700">
              Super gemacht! 🎉
            </p>
          ) : (
            <p className="text-lg font-medium text-red-700">
              Du kannst das besser, versuche es noch einmal.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
