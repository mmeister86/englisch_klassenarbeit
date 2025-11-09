"use client";

import { Question } from "@/lib/types";
import { DragDropExercise } from "./DragDropExercise";
import { MultipleChoiceExercise } from "./MultipleChoiceExercise";
import { FillBlankExercise } from "./FillBlankExercise";
import { ImageMatchingExercise } from "./ImageMatchingExercise";

interface ExerciseWrapperProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export function ExerciseWrapper({
  question,
  onAnswer,
  disabled = false
}: ExerciseWrapperProps) {
  switch (question.type) {
    case "drag-drop":
      return (
        <DragDropExercise
          question={question as Question & { type: "drag-drop" }}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );
    case "multiple-choice":
      return (
        <MultipleChoiceExercise
          question={question as Question & { type: "multiple-choice" }}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );
    case "fill-blank":
      return (
        <FillBlankExercise
          question={question as Question & { type: "fill-blank" }}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );
    case "image-matching":
      return (
        <ImageMatchingExercise
          question={question as Question & { type: "image-matching" }}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );
    default:
      return <div>Unbekannter Übungstyp</div>;
  }
}

