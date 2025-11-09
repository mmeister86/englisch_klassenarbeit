"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDraggable,
  useDroppable
} from "@dnd-kit/core";
import { Question, FeedbackMessage } from "@/lib/types";
import { FeedbackMessage as FeedbackMessageComponent } from "@/components/FeedbackMessage";
import { cn } from "@/lib/utils";

interface FillBlankExerciseProps {
  question: Question & { type: "fill-blank" };
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

function DraggableItem({
  id,
  text,
  isUsed,
  disabled
}: {
  id: string;
  text: string;
  isUsed: boolean;
  disabled?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled: isUsed || disabled
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "px-4 py-2 bg-blue-600 text-white rounded-lg cursor-grab active:cursor-grabbing font-medium touch-manipulation",
        (isUsed || disabled) && "opacity-50 cursor-not-allowed",
        isDragging && "opacity-75"
      )}
    >
      {text}
    </div>
  );
}

function DroppableArea({
  id,
  children,
  isCorrect,
  isFilled
}: {
  id: string;
  children: React.ReactNode;
  isCorrect?: boolean;
  isFilled?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id
  });

  return (
    <span
      ref={setNodeRef}
      className={cn(
        "inline-block min-w-[120px] min-h-[32px] px-3 py-1 border-2 border-dashed rounded mx-1 transition-colors",
        isOver && "border-blue-500 bg-blue-50",
        isFilled &&
          (isCorrect
            ? "border-green-500 bg-green-50"
            : "border-red-500 bg-red-50"),
        !isFilled && "border-gray-300"
      )}
    >
      {children}
    </span>
  );
}

export function FillBlankExercise({
  question,
  onAnswer,
  disabled = false
}: FillBlankExerciseProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);

  const fillBlankQuestion = question as Question & {
    type: "fill-blank";
    text: string;
    blanks: Array<{
      position: number;
      correctAnswer: string;
      options: string[];
    }>;
  };

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswers({});
    setFeedback(null);
    setActiveId(null);
  }, [question.id]);

  const handleDragStart = (event: DragStartEvent) => {
    if (disabled) return;
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (disabled) return;

    const { active, over } = event;
    setActiveId(null);

    if (!over || typeof over.id !== "string" || !over.id.startsWith("blank-")) {
      return;
    }

    const blankIndex = parseInt(over.id.replace("blank-", ""));
    const selectedText = active.id as string;
    const blank = fillBlankQuestion.blanks[blankIndex];

    const newAnswers = { ...selectedAnswers, [blankIndex]: selectedText };
    setSelectedAnswers(newAnswers);

    const isCorrect = selectedText === blank.correctAnswer;
    const answer = fillBlankQuestion.answers.find((a) => a.id === selectedText);

    setFeedback({
      type: isCorrect ? "success" : "error",
      message:
        answer?.feedback ||
        (isCorrect ? "Super, das war richtig!" : "Falsch, probiere es noch einmal"),
      correctAnswer: isCorrect ? undefined : blank.correctAnswer
    });

    onAnswer(isCorrect);
  };

  // Erstelle Text mit Lücken
  const renderText = () => {
    const parts = fillBlankQuestion.text.split("___");
    const elements: React.ReactNode[] = [];

    parts.forEach((part, index) => {
      elements.push(<span key={`text-${index}`}>{part}</span>);

      if (index < parts.length - 1) {
        const blankIndex = index;
        const blank = fillBlankQuestion.blanks[blankIndex];
        const selectedAnswer = selectedAnswers[blankIndex];

        elements.push(
          <DroppableArea
            key={`blank-${blankIndex}`}
            id={`blank-${blankIndex}`}
            isCorrect={selectedAnswer === blank.correctAnswer}
            isFilled={selectedAnswer !== undefined}
          >
            {selectedAnswer ? (
              <span
                className={cn(
                  "font-bold",
                  selectedAnswer === blank.correctAnswer
                    ? "text-green-700"
                    : "text-red-700"
                )}
              >
                {selectedAnswer}
              </span>
            ) : (
              <span className="text-gray-400">___</span>
            )}
          </DroppableArea>
        );
      }
    });

    return elements;
  };

  const allOptions = fillBlankQuestion.blanks.flatMap((blank) => blank.options);
  const usedOptions = Object.values(selectedAnswers);
  const unusedOptions = allOptions.filter((opt) => !usedOptions.includes(opt));

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-gray-800 mb-4">
        {fillBlankQuestion.question}
      </div>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="space-y-6">
          <div className="text-xl font-semibold text-gray-900 p-4 bg-gray-50 rounded-lg">
            {renderText()}
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-3">
              Ziehe die richtigen Wörter in die Lücken:
            </p>
            <div className="flex flex-wrap gap-3 touch-none">
              {unusedOptions.map((option) => (
                <DraggableItem
                  key={option}
                  id={option}
                  text={option}
                  isUsed={false}
                  disabled={disabled}
                />
              ))}
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium opacity-90">
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <FeedbackMessageComponent
        feedback={feedback}
        onClose={() => setFeedback(null)}
      />
    </div>
  );
}
