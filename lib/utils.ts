import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { MultipleChoiceQuestion } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Fisher-Yates Shuffle Algorithmus zum Mischen eines Arrays
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
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
  }))

  // Mische die Optionen
  const shuffledIndexedOptions = shuffleArray(indexedOptions)

  // Finde den neuen Index der richtigen Antwort
  const correctAnswer = question.answers.find((a) => a.isCorrect)
  const correctOptionText = correctAnswer?.text || question.options[question.correctOptionIndex]

  const newCorrectIndex = shuffledIndexedOptions.findIndex(
    (item) => item.option === correctOptionText
  )

  // Erstelle neue Optionen-Array
  const newOptions = shuffledIndexedOptions.map((item) => item.option)

  // Sortiere die Answers entsprechend der neuen Optionen-Reihenfolge
  const newAnswers = newOptions.map((option) => {
    return question.answers.find((a) => a.text === option)!
  })

  // Erstelle eine neue Frage mit gemischten Optionen
  return {
    ...question,
    options: newOptions,
    correctOptionIndex: newCorrectIndex,
    answers: newAnswers,
  }
}
