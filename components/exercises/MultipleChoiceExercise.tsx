"use client";

import { useState, useEffect } from "react";
import { Question, FeedbackMessage } from "@/lib/types";
import { FeedbackMessage as FeedbackMessageComponent } from "@/components/FeedbackMessage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MultipleChoiceExerciseProps {
  question: Question & { type: "multiple-choice" };
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export function MultipleChoiceExercise({
  question,
  onAnswer,
  disabled = false,
}: MultipleChoiceExerciseProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);
  const [answered, setAnswered] = useState(false);

  const multipleChoiceQuestion = question as Question & {
    type: "multiple-choice";
    options: string[];
    correctOptionIndex: number;
  };

  // Reset state when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setFeedback(null);
    setAnswered(false);
  }, [question.id]);

  const handleSelect = (index: number) => {
    if (disabled || answered) return;

    setSelectedIndex(index);
    setAnswered(true);

    const isCorrect = index === multipleChoiceQuestion.correctOptionIndex;
    const selectedOption = multipleChoiceQuestion.options[index];
    const answer = multipleChoiceQuestion.answers.find(
      (a) => a.id === selectedOption
    );

    setFeedback({
      type: isCorrect ? "success" : "error",
      message: answer?.feedback || (isCorrect ? "Richtig!" : "Leider falsch"),
      correctAnswer: isCorrect
        ? undefined
        : multipleChoiceQuestion.options[
            multipleChoiceQuestion.correctOptionIndex
          ],
    });

    onAnswer(isCorrect);
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-gray-800 mb-4">
        {multipleChoiceQuestion.question}
      </div>

      <div className="space-y-3">
        {multipleChoiceQuestion.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = index === multipleChoiceQuestion.correctOptionIndex;
          const showResult = answered;

          return (
            <Button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={disabled || answered}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "w-full justify-start text-left h-auto py-4 px-6",
                showResult &&
                  isSelected &&
                  (isCorrect
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"),
                showResult &&
                  !isSelected &&
                  isCorrect &&
                  "bg-green-100 border-green-500 text-green-800",
                !showResult &&
                  isSelected &&
                  "bg-blue-600 hover:bg-blue-700 text-white"
              )}
            >
              <span className="mr-3 font-bold">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
              {showResult && isCorrect && <span className="ml-auto">✓</span>}
              {showResult && isSelected && !isCorrect && (
                <span className="ml-auto">✗</span>
              )}
            </Button>
          );
        })}
      </div>

      <FeedbackMessageComponent
        feedback={feedback}
        onClose={() => setFeedback(null)}
      />
    </div>
  );
}
