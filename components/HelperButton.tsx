"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { getHint } from "@/data/hints";

interface HelperButtonProps {
  questionId: string;
  lessonId?: string;
  className?: string;
}

export function HelperButton({ questionId, lessonId, className }: HelperButtonProps) {
  const handleClick = () => {
    // Verwende lessonId + questionId für eindeutige Zuordnung
    const hintKey = lessonId ? `${lessonId}-${questionId}` : questionId;
    const hint = getHint(hintKey);

    if (hint) {
      toast.info(hint, {
        duration: 5000,
        description: "💡 Tipp",
      });
    } else {
      toast.info("Für diese Frage ist leider kein Hinweis verfügbar.", {
        duration: 3000,
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="sm"
      className={className}
      type="button"
    >
      <HelpCircle className="h-4 w-4 mr-2" />
      Hilfe
    </Button>
  );
}
