import { Lesson } from "@/lib/types";

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Simple Present Grundlagen",
    description: "Lerne die Grundlagen des Simple Present mit He/She + Verb + -s",
    order: 1,
    introduction: {
      title: "Simple Present - Die Grundlagen",
      content: "Im Simple Present verwenden wir bei he, she und it das Verb mit -s am Ende. Beispiel: 'He wakes up' oder 'She brushes her teeth'.",
      examples: [
        "He wakes up at 7 o'clock.",
        "She brushes her teeth after breakfast.",
        "He goes to school every day.",
        "She does her homework in the afternoon."
      ],
      vocabulary: [
        "wake up - aufwachen",
        "brush teeth - Zähne putzen",
        "eat breakfast - Frühstück essen",
        "go to school - zur Schule gehen",
        "do homework - Hausaufgaben machen"
      ]
    },
    exercise: {
      id: "lesson-1-exercise",
      type: "drag-drop",
      title: "Drag & Drop: Verbformen",
      description: "Ziehe die richtige Verbform in die Lücke",
      questions: [
        {
          id: "q1",
          type: "drag-drop",
          question: "He ___ up at 7 o'clock.",
          sentence: "He ___ up at 7 o'clock.",
          blankPosition: 3,
          options: ["wake", "wakes", "waking"],
          correctOption: "wakes",
          correctAnswerId: "wakes",
          answers: [
            { id: "wakes", text: "wakes", isCorrect: true, feedback: "Richtig! Bei 'he' verwenden wir 'wakes'." },
            { id: "wake", text: "wake", isCorrect: false, feedback: "Leider falsch. Bei 'he' brauchen wir 'wakes' mit -s." },
            { id: "waking", text: "waking", isCorrect: false, feedback: "Leider falsch. Das ist die -ing Form. Wir brauchen 'wakes'." }
          ]
        },
        {
          id: "q2",
          type: "drag-drop",
          question: "She ___ her teeth after breakfast.",
          sentence: "She ___ her teeth after breakfast.",
          blankPosition: 2,
          options: ["brush", "brushes", "brushing"],
          correctOption: "brushes",
          correctAnswerId: "brushes",
          answers: [
            { id: "brushes", text: "brushes", isCorrect: true, feedback: "Super, das war richtig!" },
            { id: "brush", text: "brush", isCorrect: false, feedback: "Leider falsch, richtig wäre: brushes" },
            { id: "brushing", text: "brushing", isCorrect: false, feedback: "Leider falsch, richtig wäre: brushes" }
          ]
        },
        {
          id: "q3",
          type: "drag-drop",
          question: "He ___ to school every day.",
          sentence: "He ___ to school every day.",
          blankPosition: 2,
          options: ["go", "goes", "going"],
          correctOption: "goes",
          correctAnswerId: "goes",
          answers: [
            { id: "goes", text: "goes", isCorrect: true, feedback: "Richtig!" },
            { id: "go", text: "go", isCorrect: false, feedback: "Leider falsch, richtig wäre: goes" },
            { id: "going", text: "going", isCorrect: false, feedback: "Leider falsch, richtig wäre: goes" }
          ]
        },
        {
          id: "q4",
          type: "drag-drop",
          question: "She ___ her homework in the afternoon.",
          sentence: "She ___ her homework in the afternoon.",
          blankPosition: 2,
          options: ["do", "does", "doing"],
          correctOption: "does",
          correctAnswerId: "does",
          answers: [
            { id: "does", text: "does", isCorrect: true, feedback: "Super gemacht!" },
            { id: "do", text: "do", isCorrect: false, feedback: "Leider falsch, richtig wäre: does" },
            { id: "doing", text: "doing", isCorrect: false, feedback: "Leider falsch, richtig wäre: does" }
          ]
        },
        {
          id: "q5",
          type: "drag-drop",
          question: "He ___ breakfast at 8 o'clock.",
          sentence: "He ___ breakfast at 8 o'clock.",
          blankPosition: 2,
          options: ["eat", "eats", "eating"],
          correctOption: "eats",
          correctAnswerId: "eats",
          answers: [
            { id: "eats", text: "eats", isCorrect: true, feedback: "Richtig!" },
            { id: "eat", text: "eat", isCorrect: false, feedback: "Leider falsch, richtig wäre: eats" },
            { id: "eating", text: "eating", isCorrect: false, feedback: "Leider falsch, richtig wäre: eats" }
          ]
        }
      ]
    },
    test: {
      id: "lesson-1-test",
      type: "multiple-choice",
      title: "Test: Simple Present",
      description: "Beantworte 5 Fragen zum Simple Present",
      questions: [
        {
          id: "t1",
          type: "multiple-choice",
          question: "Welche Verbform ist richtig? He ___ up early.",
          options: ["wake", "wakes", "waking"],
          correctOptionIndex: 1,
          correctAnswerId: "wakes",
          answers: [
            { id: "wake", text: "wake", isCorrect: false },
            { id: "wakes", text: "wakes", isCorrect: true },
            { id: "waking", text: "waking", isCorrect: false }
          ]
        },
        {
          id: "t2",
          type: "multiple-choice",
          question: "Welche Verbform ist richtig? She ___ her teeth.",
          options: ["brush", "brushes", "brushing"],
          correctOptionIndex: 1,
          correctAnswerId: "brushes",
          answers: [
            { id: "brush", text: "brush", isCorrect: false },
            { id: "brushes", text: "brushes", isCorrect: true },
            { id: "brushing", text: "brushing", isCorrect: false }
          ]
        },
        {
          id: "t3",
          type: "multiple-choice",
          question: "Welche Verbform ist richtig? He ___ to school.",
          options: ["go", "goes", "going"],
          correctOptionIndex: 1,
          correctAnswerId: "goes",
          answers: [
            { id: "go", text: "go", isCorrect: false },
            { id: "goes", text: "goes", isCorrect: true },
            { id: "going", text: "going", isCorrect: false }
          ]
        },
        {
          id: "t4",
          type: "multiple-choice",
          question: "Welche Verbform ist richtig? She ___ homework.",
          options: ["do", "does", "doing"],
          correctOptionIndex: 1,
          correctAnswerId: "does",
          answers: [
            { id: "do", text: "do", isCorrect: false },
            { id: "does", text: "does", isCorrect: true },
            { id: "doing", text: "doing", isCorrect: false }
          ]
        },
        {
          id: "t5",
          type: "multiple-choice",
          question: "Welche Verbform ist richtig? He ___ breakfast.",
          options: ["eat", "eats", "eating"],
          correctOptionIndex: 1,
          correctAnswerId: "eats",
          answers: [
            { id: "eat", text: "eat", isCorrect: false },
            { id: "eats", text: "eats", isCorrect: true },
            { id: "eating", text: "eating", isCorrect: false }
          ]
        }
      ]
    },
    minScore: 70
  },
  {
    id: "2",
    title: "Personalpronomen",
    description: "Lerne die Personalpronomen me, him, her kennen",
    order: 2,
    introduction: {
      title: "Personalpronomen - me, him, her",
      content: "Personalpronomen ersetzen Namen oder Nomen. 'me' bedeutet 'mich/mir', 'him' bedeutet 'ihn/ihm' und 'her' bedeutet 'sie/ihr'.",
      examples: [
        "This is me. (Das bin ich.)",
        "I see him. (Ich sehe ihn.)",
        "I help her. (Ich helfe ihr.)",
        "She talks to me. (Sie spricht mit mir.)"
      ]
    },
    exercise: {
      id: "lesson-2-exercise",
      type: "image-matching",
      title: "Bild-Zuordnung: Pronomen",
      description: "Ziehe das richtige Pronomen zum Bild",
      questions: [
        {
          id: "q1",
          type: "image-matching",
          question: "Welches Pronomen passt zu diesem Bild?",
          imageUrl: "/images/boy.png",
          options: ["me", "him", "her"],
          correctOption: "him",
          correctAnswerId: "him",
          answers: [
            { id: "him", text: "him", isCorrect: true, feedback: "Richtig! Ein Junge = him" },
            { id: "me", text: "me", isCorrect: false, feedback: "Falsch, das passende Pronomen wäre: him" },
            { id: "her", text: "her", isCorrect: false, feedback: "Falsch, das passende Pronomen wäre: him" }
          ]
        },
        {
          id: "q2",
          type: "image-matching",
          question: "Welches Pronomen passt zu diesem Bild?",
          imageUrl: "/images/girl.png",
          options: ["me", "him", "her"],
          correctOption: "her",
          correctAnswerId: "her",
          answers: [
            { id: "her", text: "her", isCorrect: true, feedback: "Richtig! Ein Mädchen = her" },
            { id: "me", text: "me", isCorrect: false, feedback: "Falsch, das passende Pronomen wäre: her" },
            { id: "him", text: "him", isCorrect: false, feedback: "Falsch, das passende Pronomen wäre: her" }
          ]
        },
        {
          id: "q3",
          type: "image-matching",
          question: "Welches Pronomen passt zu diesem Bild?",
          imageUrl: "/images/self.png",
          options: ["me", "him", "her"],
          correctOption: "me",
          correctAnswerId: "me",
          answers: [
            { id: "me", text: "me", isCorrect: true, feedback: "Richtig! Ich selbst = me" },
            { id: "him", text: "him", isCorrect: false, feedback: "Falsch, das passende Pronomen wäre: me" },
            { id: "her", text: "her", isCorrect: false, feedback: "Falsch, das passende Pronomen wäre: me" }
          ]
        }
      ]
    },
    test: {
      id: "lesson-2-test",
      type: "multiple-choice",
      title: "Test: Personalpronomen",
      description: "Wähle das richtige Pronomen",
      questions: [
        {
          id: "t1",
          type: "multiple-choice",
          question: "I see ___ (den Jungen).",
          options: ["me", "him", "her"],
          correctOptionIndex: 1,
          correctAnswerId: "him",
          answers: [
            { id: "me", text: "me", isCorrect: false },
            { id: "him", text: "him", isCorrect: true },
            { id: "her", text: "her", isCorrect: false }
          ]
        },
        {
          id: "t2",
          type: "multiple-choice",
          question: "She helps ___ (mich).",
          options: ["me", "him", "her"],
          correctOptionIndex: 0,
          correctAnswerId: "me",
          answers: [
            { id: "me", text: "me", isCorrect: true },
            { id: "him", text: "him", isCorrect: false },
            { id: "her", text: "her", isCorrect: false }
          ]
        },
        {
          id: "t3",
          type: "multiple-choice",
          question: "He talks to ___ (sie).",
          options: ["me", "him", "her"],
          correctOptionIndex: 2,
          correctAnswerId: "her",
          answers: [
            { id: "me", text: "me", isCorrect: false },
            { id: "him", text: "him", isCorrect: false },
            { id: "her", text: "her", isCorrect: true }
          ]
        }
      ]
    },
    minScore: 70
  },
  {
    id: "3",
    title: "Vokabeln & Tagesablauf",
    description: "Lerne wichtige Vokabeln für den Tagesablauf",
    order: 3,
    introduction: {
      title: "Vokabeln für den Tagesablauf",
      content: "Hier sind wichtige Vokabeln, die du für den Tagesablauf brauchst.",
      examples: [
        "get up - aufstehen",
        "go to school - zur Schule gehen",
        "do homework - Hausaufgaben machen",
        "eat dinner - Abendessen essen",
        "go to bed - ins Bett gehen"
      ],
      vocabulary: [
        "get up - aufstehen",
        "brush teeth - Zähne putzen",
        "eat breakfast - Frühstück essen",
        "go to school - zur Schule gehen",
        "do homework - Hausaufgaben machen",
        "eat dinner - Abendessen essen",
        "go to bed - ins Bett gehen"
      ]
    },
    exercise: {
      id: "lesson-3-exercise",
      type: "fill-blank",
      title: "Lückentext: Tagesablauf",
      description: "Fülle die Lücken mit den richtigen Vokabeln",
      questions: [
        {
          id: "q1",
          type: "fill-blank",
          question: "Fülle die Lücke: I ___ at 7 o'clock.",
          text: "I ___ at 7 o'clock.",
          blanks: [
            {
              position: 2,
              correctAnswer: "get up",
              options: ["get up", "go to school", "eat breakfast"]
            }
          ],
          correctAnswerId: "get up",
          answers: [
            { id: "get up", text: "get up", isCorrect: true, feedback: "Super, das war richtig!" },
            { id: "go to school", text: "go to school", isCorrect: false, feedback: "Falsch, probiere es noch einmal" },
            { id: "eat breakfast", text: "eat breakfast", isCorrect: false, feedback: "Falsch, probiere es noch einmal" }
          ]
        },
        {
          id: "q2",
          type: "fill-blank",
          question: "Fülle die Lücke: I ___ at 8 o'clock.",
          text: "I ___ at 8 o'clock.",
          blanks: [
            {
              position: 2,
              correctAnswer: "go to school",
              options: ["get up", "go to school", "do homework"]
            }
          ],
          correctAnswerId: "go to school",
          answers: [
            { id: "go to school", text: "go to school", isCorrect: true, feedback: "Richtig!" },
            { id: "get up", text: "get up", isCorrect: false, feedback: "Falsch, probiere es noch einmal" },
            { id: "do homework", text: "do homework", isCorrect: false, feedback: "Falsch, probiere es noch einmal" }
          ]
        },
        {
          id: "q3",
          type: "fill-blank",
          question: "Fülle die Lücke: I ___ in the afternoon.",
          text: "I ___ in the afternoon.",
          blanks: [
            {
              position: 2,
              correctAnswer: "do homework",
              options: ["do homework", "eat dinner", "go to bed"]
            }
          ],
          correctAnswerId: "do homework",
          answers: [
            { id: "do homework", text: "do homework", isCorrect: true, feedback: "Super gemacht!" },
            { id: "eat dinner", text: "eat dinner", isCorrect: false, feedback: "Falsch, probiere es noch einmal" },
            { id: "go to bed", text: "go to bed", isCorrect: false, feedback: "Falsch, probiere es noch einmal" }
          ]
        }
      ]
    },
    test: {
      id: "lesson-3-test",
      type: "fill-blank",
      title: "Test: Vokabeln",
      description: "Fülle den Text mit den richtigen Vokabeln",
      questions: [
        {
          id: "t1",
          type: "fill-blank",
          question: "I ___ at 7 o'clock every morning.",
          text: "I ___ at 7 o'clock every morning.",
          blanks: [
            {
              position: 2,
              correctAnswer: "get up",
              options: ["get up", "go to school", "eat breakfast"]
            }
          ],
          correctAnswerId: "get up",
          answers: [
            { id: "get up", text: "get up", isCorrect: true },
            { id: "go to school", text: "go to school", isCorrect: false },
            { id: "eat breakfast", text: "eat breakfast", isCorrect: false }
          ]
        },
        {
          id: "t2",
          type: "fill-blank",
          question: "After school, I ___.",
          text: "After school, I ___.",
          blanks: [
            {
              position: 3,
              correctAnswer: "do homework",
              options: ["do homework", "eat dinner", "go to bed"]
            }
          ],
          correctAnswerId: "do homework",
          answers: [
            { id: "do homework", text: "do homework", isCorrect: true },
            { id: "eat dinner", text: "eat dinner", isCorrect: false },
            { id: "go to bed", text: "go to bed", isCorrect: false }
          ]
        },
        {
          id: "t3",
          type: "fill-blank",
          question: "I ___ at 9 o'clock in the evening.",
          text: "I ___ at 9 o'clock in the evening.",
          blanks: [
            {
              position: 2,
              correctAnswer: "go to bed",
              options: ["get up", "eat dinner", "go to bed"]
            }
          ],
          correctAnswerId: "go to bed",
          answers: [
            { id: "go to bed", text: "go to bed", isCorrect: true },
            { id: "get up", text: "get up", isCorrect: false },
            { id: "eat dinner", text: "eat dinner", isCorrect: false }
          ]
        }
      ]
    },
    minScore: 70
  },
  {
    id: "4",
    title: "Leseverstehen",
    description: "Lese einen Text und beantworte Fragen",
    order: 4,
    introduction: {
      title: "Leseverstehen - A Day in Charlie's Life",
      content: "Lies den Text über Charlies Tagesablauf aufmerksam durch. Dann beantworte die Fragen zum Text.",
      examples: [
        "A Day in Charlie's Life",
        "Charlie wakes up at 7 o'clock every morning. He brushes his teeth and eats breakfast. Then he goes to school at 8 o'clock. After school, he does his homework. In the evening, he eats dinner with his family. At 9 o'clock, he goes to bed."
      ]
    },
    exercise: {
      id: "lesson-4-exercise",
      type: "drag-drop",
      title: "Fragen zum Text",
      description: "Beantworte die Fragen zum Text",
      questions: [
        {
          id: "q1",
          type: "drag-drop",
          question: "Charlie wakes up at...",
          sentence: "Charlie wakes up at ___",
          blankPosition: 4,
          options: ["6 o'clock", "7 o'clock", "8 o'clock"],
          correctOption: "7 o'clock",
          correctAnswerId: "7 o'clock",
          answers: [
            { id: "7 o'clock", text: "7 o'clock", isCorrect: true, feedback: "Richtig!" },
            { id: "6 o'clock", text: "6 o'clock", isCorrect: false, feedback: "Leider falsch, richtig wäre: 7 o'clock" },
            { id: "8 o'clock", text: "8 o'clock", isCorrect: false, feedback: "Leider falsch, richtig wäre: 7 o'clock" }
          ]
        },
        {
          id: "q2",
          type: "drag-drop",
          question: "Charlie goes to school at...",
          sentence: "Charlie goes to school at ___",
          blankPosition: 5,
          options: ["7 o'clock", "8 o'clock", "9 o'clock"],
          correctOption: "8 o'clock",
          correctAnswerId: "8 o'clock",
          answers: [
            { id: "8 o'clock", text: "8 o'clock", isCorrect: true, feedback: "Super!" },
            { id: "7 o'clock", text: "7 o'clock", isCorrect: false, feedback: "Leider falsch, richtig wäre: 8 o'clock" },
            { id: "9 o'clock", text: "9 o'clock", isCorrect: false, feedback: "Leider falsch, richtig wäre: 8 o'clock" }
          ]
        },
        {
          id: "q3",
          type: "drag-drop",
          question: "Charlie goes to bed at...",
          sentence: "Charlie goes to bed at ___",
          blankPosition: 5,
          options: ["8 o'clock", "9 o'clock", "10 o'clock"],
          correctOption: "9 o'clock",
          correctAnswerId: "9 o'clock",
          answers: [
            { id: "9 o'clock", text: "9 o'clock", isCorrect: true, feedback: "Richtig!" },
            { id: "8 o'clock", text: "8 o'clock", isCorrect: false, feedback: "Leider falsch, richtig wäre: 9 o'clock" },
            { id: "10 o'clock", text: "10 o'clock", isCorrect: false, feedback: "Leider falsch, richtig wäre: 9 o'clock" }
          ]
        }
      ]
    },
    test: {
      id: "lesson-4-test",
      type: "multiple-choice",
      title: "Test: Leseverstehen",
      description: "Beantworte 3 Fragen zum Text",
      questions: [
        {
          id: "t1",
          type: "multiple-choice",
          question: "Wann steht Charlie auf?",
          options: ["6 Uhr", "7 Uhr", "8 Uhr"],
          correctOptionIndex: 1,
          correctAnswerId: "7 Uhr",
          answers: [
            { id: "6 Uhr", text: "6 Uhr", isCorrect: false },
            { id: "7 Uhr", text: "7 Uhr", isCorrect: true },
            { id: "8 Uhr", text: "8 Uhr", isCorrect: false }
          ]
        },
        {
          id: "t2",
          type: "multiple-choice",
          question: "Wann geht Charlie zur Schule?",
          options: ["7 Uhr", "8 Uhr", "9 Uhr"],
          correctOptionIndex: 1,
          correctAnswerId: "8 Uhr",
          answers: [
            { id: "7 Uhr", text: "7 Uhr", isCorrect: false },
            { id: "8 Uhr", text: "8 Uhr", isCorrect: true },
            { id: "9 Uhr", text: "9 Uhr", isCorrect: false }
          ]
        },
        {
          id: "t3",
          type: "multiple-choice",
          question: "Was macht Charlie nach der Schule?",
          options: ["Er isst Abendessen", "Er macht Hausaufgaben", "Er geht ins Bett"],
          correctOptionIndex: 1,
          correctAnswerId: "Er macht Hausaufgaben",
          answers: [
            { id: "Er isst Abendessen", text: "Er isst Abendessen", isCorrect: false },
            { id: "Er macht Hausaufgaben", text: "Er macht Hausaufgaben", isCorrect: true },
            { id: "Er geht ins Bett", text: "Er geht ins Bett", isCorrect: false }
          ]
        }
      ]
    },
    minScore: 70
  },
  {
    id: "5",
    title: "Hörverstehen",
    description: "Höre einen Text und beantworte Fragen",
    order: 5,
    introduction: {
      title: "Hörverstehen - Amy's Day",
      content: "Höre dir den Text über Amys Tagesablauf an. Achte genau auf die Zeiten und Aktivitäten.",
      examples: [
        "Amy wakes up at 6:30.",
        "She goes to school at 7:30.",
        "She does homework at 4 o'clock.",
        "She goes to bed at 9:30."
      ]
    },
    exercise: {
      id: "lesson-5-exercise",
      type: "drag-drop",
      title: "Hörverständnis-Fragen",
      description: "Beantworte die Fragen zum gehörten Text",
      questions: [
        {
          id: "q1",
          type: "drag-drop",
          question: "At what time does Amy go to school?",
          sentence: "Amy goes to school at ___",
          blankPosition: 5,
          options: ["6:30", "7:30", "8:30"],
          correctOption: "7:30",
          correctAnswerId: "7:30",
          audioUrl: "/audio/amy-day.mp3",
          answers: [
            { id: "7:30", text: "7:30", isCorrect: true, feedback: "Correct!" },
            { id: "6:30", text: "6:30", isCorrect: false, feedback: "Try again!" },
            { id: "8:30", text: "8:30", isCorrect: false, feedback: "Try again!" }
          ]
        },
        {
          id: "q2",
          type: "drag-drop",
          question: "At what time does Amy do homework?",
          sentence: "Amy does homework at ___",
          blankPosition: 4,
          options: ["3 o'clock", "4 o'clock", "5 o'clock"],
          correctOption: "4 o'clock",
          correctAnswerId: "4 o'clock",
          audioUrl: "/audio/amy-day.mp3",
          answers: [
            { id: "4 o'clock", text: "4 o'clock", isCorrect: true, feedback: "Correct!" },
            { id: "3 o'clock", text: "3 o'clock", isCorrect: false, feedback: "Try again!" },
            { id: "5 o'clock", text: "5 o'clock", isCorrect: false, feedback: "Try again!" }
          ]
        },
        {
          id: "q3",
          type: "drag-drop",
          question: "At what time does Amy go to bed?",
          sentence: "Amy goes to bed at ___",
          blankPosition: 5,
          options: ["8:30", "9:30", "10:30"],
          correctOption: "9:30",
          correctAnswerId: "9:30",
          audioUrl: "/audio/amy-day.mp3",
          answers: [
            { id: "9:30", text: "9:30", isCorrect: true, feedback: "Correct!" },
            { id: "8:30", text: "8:30", isCorrect: false, feedback: "Try again!" },
            { id: "10:30", text: "10:30", isCorrect: false, feedback: "Try again!" }
          ]
        }
      ]
    },
    test: {
      id: "lesson-5-test",
      type: "multiple-choice",
      title: "Test: Hörverstehen",
      description: "Beantworte 3 Fragen zum gehörten Text",
      questions: [
        {
          id: "t1",
          type: "multiple-choice",
          question: "Wann geht Amy zur Schule?",
          options: ["6:30", "7:30", "8:30"],
          correctOptionIndex: 1,
          correctAnswerId: "7:30",
          audioUrl: "/audio/amy-day.mp3",
          answers: [
            { id: "6:30", text: "6:30", isCorrect: false },
            { id: "7:30", text: "7:30", isCorrect: true },
            { id: "8:30", text: "8:30", isCorrect: false }
          ]
        },
        {
          id: "t2",
          type: "multiple-choice",
          question: "Wann macht Amy Hausaufgaben?",
          options: ["3 Uhr", "4 Uhr", "5 Uhr"],
          correctOptionIndex: 1,
          correctAnswerId: "4 Uhr",
          audioUrl: "/audio/amy-day.mp3",
          answers: [
            { id: "3 Uhr", text: "3 Uhr", isCorrect: false },
            { id: "4 Uhr", text: "4 Uhr", isCorrect: true },
            { id: "5 Uhr", text: "5 Uhr", isCorrect: false }
          ]
        },
        {
          id: "t3",
          type: "multiple-choice",
          question: "Wann geht Amy ins Bett?",
          options: ["8:30", "9:30", "10:30"],
          correctOptionIndex: 1,
          correctAnswerId: "9:30",
          audioUrl: "/audio/amy-day.mp3",
          answers: [
            { id: "8:30", text: "8:30", isCorrect: false },
            { id: "9:30", text: "9:30", isCorrect: true },
            { id: "10:30", text: "10:30", isCorrect: false }
          ]
        }
      ]
    },
    minScore: 70
  }
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(lesson => lesson.id === id);
}

export function getAllLessons(): Lesson[] {
  return lessons;
}

