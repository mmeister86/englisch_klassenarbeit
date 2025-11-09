// Hinweise für Fragen - geben Kindern Tipps ohne die Lösung direkt zu verraten

const hints: Record<string, string> = {
  // Lesson 1 - Exercise
  "1-q1": "Denke daran: Bei 'he', 'she' und 'it' kommt ein -s ans Verb!",
  "1-q2": "Bei 'she' braucht das Verb ein -s am Ende. Schau dir die Endung an!",
  "1-q3": "Das Verb 'go' wird bei 'he' zu 'goes'. Was kommt ans Ende?",
  "1-q4": "Bei 'she' wird 'do' zu 'does'. Denke an die Regel mit -s!",
  "1-q5": "Bei 'he' bekommt das Verb ein -s. Welche Form passt hier?",

  // Lesson 1 - Test
  "1-t1": "Bei 'he' kommt immer ein -s ans Verb. Welche Option hat ein -s?",
  "1-t2": "Denke an die Regel: Bei 'she' bekommt das Verb ein -s am Ende.",
  "1-t3": "Das Verb 'go' wird bei 'he' zu 'goes'. Schau dir die Optionen genau an!",
  "1-t4": "Bei 'she' wird 'do' zu 'does'. Welche Option passt?",
  "1-t5": "Bei 'he' bekommt das Verb ein -s. Welche Form siehst du?",

  // Lesson 2 - Exercise (Image Matching)
  "2-q1": "Schau dir das Bild genau an. Ist es ein Junge, ein Mädchen oder du selbst?",
  "2-q2": "Welches Pronomen passt zu einem Mädchen?",
  "2-q3": "Wenn du von dir selbst sprichst, welches Pronomen verwendest du?",

  // Lesson 2 - Test
  "2-t1": "'Den Jungen' bedeutet auf Englisch 'him'. Welche Option ist das?",
  "2-t2": "'mich' bedeutet auf Englisch 'me'. Schau dir die Optionen an!",
  "2-t3": "'sie' (weiblich) bedeutet auf Englisch 'her'. Welche Option passt?",

  // Lesson 3 - Exercise (Fill Blank)
  "3-q1": "Was macht man morgens zuerst? Denke an deinen Tagesablauf!",
  "3-q2": "Wann gehst du normalerweise zur Schule?",
  "3-q3": "Was machst du nach der Schule? Denke an Hausaufgaben!",

  // Lesson 3 - Test
  "3-t1": "Morgens um 7 Uhr - was macht man da normalerweise?",
  "3-t2": "Nach der Schule - was kommt als Nächstes?",
  "3-t3": "Abends um 9 Uhr - wohin geht man dann?",

  // Lesson 4 - Exercise (Reading Comprehension)
  "4-q1": "Lies den Text noch einmal. Wann steht Charlie auf?",
  "4-q2": "Schau im Text nach: Wann geht Charlie zur Schule?",
  "4-q3": "Was steht im Text über die Schlafenszeit?",

  // Lesson 4 - Test
  "4-t1": "Lies den Text noch einmal genau. Wann steht Charlie auf?",
  "4-t2": "Im Text steht eine Uhrzeit für die Schule. Welche ist es?",
  "4-t3": "Was macht Charlie nach der Schule? Schau im Text nach!",

  // Lesson 5 - Exercise (Listening)
  "5-q1": "Höre noch einmal genau hin. Wann geht Amy zur Schule?",
  "5-q2": "Achte auf die Zeitangabe für die Hausaufgaben!",
  "5-q3": "Wann geht Amy ins Bett? Höre noch einmal zu!",

  // Lesson 5 - Test
  "5-t1": "Höre noch einmal genau hin. Achte auf die Uhrzeit für die Schule!",
  "5-t2": "Wann macht Amy Hausaufgaben? Höre auf die Zeitangabe!",
  "5-t3": "Höre noch einmal: Wann geht Amy ins Bett?",
};

/**
 * Gibt einen Hinweis für eine Frage zurück
 * @param questionId Die ID der Frage
 * @returns Der Hinweis-Text oder undefined, wenn kein Hinweis vorhanden ist
 */
export function getHint(questionId: string): string | undefined {
  return hints[questionId];
}

/**
 * Prüft, ob für eine Frage ein Hinweis vorhanden ist
 * @param questionId Die ID der Frage
 * @returns true, wenn ein Hinweis vorhanden ist
 */
export function hasHint(questionId: string): boolean {
  return questionId in hints;
}
