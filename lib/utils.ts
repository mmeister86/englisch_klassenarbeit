import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MultipleChoiceQuestion } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Fisher-Yates Shuffle Algorithmus zum Mischen eines Arrays
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Randomisiert die Optionen einer Multiple-Choice-Frage
 * und passt den correctOptionIndex entsprechend an
 */
export function shuffleMultipleChoiceQuestion(
  question: MultipleChoiceQuestion
): MultipleChoiceQuestion {
  // Erstelle ein Array mit Indizes und Optionen
  const indexedOptions = question.options.map((option, index) => ({
    index,
    option,
  }));

  // Mische die Optionen
  const shuffledIndexedOptions = shuffleArray(indexedOptions);

  // Finde den neuen Index der richtigen Antwort
  const correctAnswer = question.answers.find((a) => a.isCorrect);
  const correctOptionText =
    correctAnswer?.text || question.options[question.correctOptionIndex];

  // Validiere, dass correctOptionText definiert ist
  if (!correctOptionText) {
    const shuffledOptions = shuffledIndexedOptions.map((item) => item.option);
    throw new Error(
      `shuffleMultipleChoiceQuestion: correctOptionText ist undefined. ` +
        `Shuffled Options: [${shuffledOptions.join(", ")}]`
    );
  }

  const newCorrectIndex = shuffledIndexedOptions.findIndex(
    (item) => item.option === correctOptionText
  );

  // Validiere, dass der korrekte Index gefunden wurde
  if (newCorrectIndex === -1) {
    const shuffledOptions = shuffledIndexedOptions.map((item) => item.option);
    throw new Error(
      `shuffleMultipleChoiceQuestion: Konnte correctOptionText "${correctOptionText}" nicht in den gemischten Optionen finden. ` +
        `Shuffled Options: [${shuffledOptions.join(", ")}]`
    );
  }

  // Erstelle neue Optionen-Array
  const newOptions = shuffledIndexedOptions.map((item) => item.option);

  // Sortiere die Answers entsprechend der neuen Optionen-Reihenfolge
  const newAnswers = newOptions.map((option) => {
    const answer = question.answers.find((a) => a.text === option);
    if (answer === undefined) {
      throw new Error(
        `shuffleMultipleChoiceQuestion: Konnte keine Antwort für Option "${option}" finden. ` +
          `Frage-ID: ${question.id}, Frage-Text: "${question.question}". ` +
          `Verfügbare Antworten: [${question.answers
            .map((a) => `"${a.text}"`)
            .join(", ")}]`
      );
    }
    return answer;
  });

  // Erstelle eine neue Frage mit gemischten Optionen
  return {
    ...question,
    options: newOptions,
    correctOptionIndex: newCorrectIndex,
    answers: newAnswers,
  };
}
