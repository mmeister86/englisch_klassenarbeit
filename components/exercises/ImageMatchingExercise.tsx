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

interface ImageMatchingExerciseProps {
  question: Question & { type: "image-matching" };
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
        "min-h-[120px] min-w-[200px] border-2 border-dashed rounded-lg flex items-center justify-center transition-colors",
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

export function ImageMatchingExercise({
  question,
  onAnswer,
  disabled = false
}: ImageMatchingExerciseProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);

  const imageMatchingQuestion = question as Question & {
    type: "image-matching";
    imageUrl: string;
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

    if (!over || over.id !== "image-drop-zone") {
      return;
    }

    const selectedText = active.id as string;
    setSelectedOption(selectedText);

    const isCorrect = selectedText === imageMatchingQuestion.correctOption;
    const answer = imageMatchingQuestion.answers.find(
      (a) => a.id === selectedText
    );

    setFeedback({
      type: isCorrect ? "success" : "error",
      message:
        answer?.feedback ||
        (isCorrect ? "Richtig!" : "Falsch, das passende Pronomen wäre: " + imageMatchingQuestion.correctOption),
      correctAnswer: isCorrect ? undefined : imageMatchingQuestion.correctOption
    });

    onAnswer(isCorrect);
  };

  const unusedOptions = imageMatchingQuestion.options.filter(
    (opt) => opt !== selectedOption
  );

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-gray-800 mb-4">
        {imageMatchingQuestion.question}
      </div>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <DroppableArea
              id="image-drop-zone"
              isCorrect={selectedOption === imageMatchingQuestion.correctOption}
              isFilled={selectedOption !== null}
            >
              {selectedOption ? (
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">
                    <span
                      className={cn(
                        selectedOption === imageMatchingQuestion.correctOption
                          ? "text-green-700"
                          : "text-red-700"
                      )}
                    >
                      {selectedOption}
                    </span>
                  </div>
                  {imageMatchingQuestion.imageUrl && (
                    <img
                      src={imageMatchingQuestion.imageUrl}
                      alt="Match"
                      className="w-32 h-32 object-contain"
                      onError={(e) => {
                        // Fallback wenn Bild nicht geladen werden kann
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className="text-center">
                  {imageMatchingQuestion.imageUrl ? (
                    <img
                      src={imageMatchingQuestion.imageUrl}
                      alt="Match"
                      className="w-32 h-32 object-contain opacity-50"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      Bild
                    </div>
                  )}
                  <p className="text-sm text-gray-400 mt-2">
                    Ziehe das Pronomen hierher
                  </p>
                </div>
              )}
            </DroppableArea>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-3">
              Ziehe das richtige Pronomen zum Bild:
            </p>
            <div className="flex flex-wrap gap-3 justify-center touch-none">
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
