"use client";

import { useState } from "react";
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

interface DragDropExerciseProps {
  question: Question & { type: "drag-drop" };
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
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[48px] px-4 py-2 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors",
        isOver && "border-blue-500 bg-blue-50",
        isFilled &&
          (isCorrect
            ? "border-green-500 bg-green-50"
            : "border-red-500 bg-red-50"),
        !isFilled && "border-gray-300"
      )}
    >
      {children}
    </div>
  );
}

export function DragDropExercise({
  question,
  onAnswer,
  disabled = false
}: DragDropExerciseProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);

  const dragDropQuestion = question as Question & {
    type: "drag-drop";
    sentence: string;
    blankPosition: number;
    options: string[];
    correctOption: string;
  };

  const handleDragStart = (event: DragStartEvent) => {
    if (disabled) return;
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (disabled) return;

    const { active, over } = event;
    setActiveId(null);

    if (!over || over.id !== "drop-zone") {
      return;
    }

    const selectedText = active.id as string;
    setSelectedOption(selectedText);

    const isCorrect = selectedText === dragDropQuestion.correctOption;
    const answer = dragDropQuestion.answers.find(
      (a) => a.id === selectedText
    );

    setFeedback({
      type: isCorrect ? "success" : "error",
      message: answer?.feedback || (isCorrect ? "Richtig!" : "Falsch!"),
      correctAnswer: isCorrect ? undefined : dragDropQuestion.correctOption
    });

    onAnswer(isCorrect);
  };

  const sentenceParts = dragDropQuestion.sentence.split("___");
  const unusedOptions = dragDropQuestion.options.filter(
    (opt) => opt !== selectedOption
  );

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-gray-800 mb-4">
        {dragDropQuestion.question}
      </div>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="space-y-6">
          <div className="text-xl font-semibold text-gray-900 p-4 bg-gray-50 rounded-lg">
            {sentenceParts[0]}
            <DroppableArea
              id="drop-zone"
              isCorrect={
                selectedOption === dragDropQuestion.correctOption
              }
              isFilled={selectedOption !== null}
            >
              {selectedOption ? (
                <span
                  className={cn(
                    "font-bold",
                    selectedOption === dragDropQuestion.correctOption
                      ? "text-green-700"
                      : "text-red-700"
                  )}
                >
                  {selectedOption}
                </span>
              ) : (
                <span className="text-gray-400">___</span>
              )}
            </DroppableArea>
            {sentenceParts[1]}
          </div>

            <div>
            <p className="text-sm text-gray-600 mb-3">
              Ziehe die richtige Antwort in die Lücke:
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
