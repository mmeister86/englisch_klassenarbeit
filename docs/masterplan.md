# Masterplan: Englisch-Lern-WebApp für die 5. Klasse (Simple Present & Tagesablauf)

## Einleitung

Dieses Konzept beschreibt den Aufbau einer WebApp mit interaktiven Lerneinheiten auf Basis des sächsischen Englisch-Lehrplans Klasse 5. Jede Einheit besteht aus Einführung, interaktiver Übung (Drag&Drop), Wiederholung, abschließendem Test und direkter Erfolgskontrolle.

---

## Gesamtstruktur

1. Begrüßung und Benutzerwahl (Schülername, Klasse)
2. Themenübersicht und Fortschrittsanzeige
3. Einheiten-Struktur:
   - Kurze Einführung mit Beispielen
   - Drag&Drop-Übung mit direktem Feedback
   - Übungswiederholung (andere Aufgabentypen)
   - Mini-Test (Quiz, Multiple Choice)
   - Erfolgskontrolle (Ergebnis und Empfehlung)
4. Highscore/Belohnungssystem

---

## Lerneinheit 1: Simple Present Grundlagen

### Erklärung & Beispiele

- Arbeit mit Beispielsätzen (He/She + Verb + -s)
- Vorstellung typischer Tagesablauf-Verben (wake up, brush teeth, eat breakfast, etc.)

### Drag&Drop-Übung

- Sätze mit Lücken im Prädikat (Verb fehlt):
  - "He **\_** up at 7 o'clock."
  - "She **\_** her teeth after breakfast."
- Schüler zieht passende Verbform in die Lücke.
- **Feedback:** Sofortige Anzeige ("Richtig!" oder "Leider falsch, das richtige Wort wäre ...")

### Test

- 5 Multiple-Choice-Fragen zur Verbform im Simple Present
- Ergebnis/Score direkt nach Beendigung
- Vorschläge für Wiederholung, falls Punkte < 70%

---

## Lerneinheit 2: Personalpronomen (me, him, her)

### Erklärung & Beispiele

- Übersicht einfacher Personalpronomen im Englischen
- Zuordnung Person ↔ Pronomen (Bilder: Junge/Mädchen/Ich, etc.)

### Drag&Drop-Übung

- Schüler zieht Pronomen zu Bild oder Textfeld:
  - Bild: Junge → "him", Mädchen → "her", Ich → "me"
- **Feedback:** Sofortige Anzeige ("Richtig!" / "Falsch, das passende Pronomen wäre ...")

### Test

- Zuordnungsaufgabe: Pronomen zugeben werden 3 Sätzen im Multiple-Choice Prinzip
- Ergebnis/Score + Fortschrittsanzeige

---

## Lerneinheit 3: Vokabeln & Tagesablauf

### Erklärung & Vokabelliste

- Einführung typischer Vokabeln (get up, go to school, do homework, etc.)
- Kurzer Beispieltext "My Day"

### Drag&Drop-Übung

- Text mit Lücken, Schüler zieht passende Vokabel in die Lücke
- Mix aus Wort und Bild (z.B. Wecker für "wake up")
- **Feedback:** Sofort ("Super, das war richtig!" / "Falsch, probiere es noch einmal")

### Test

- Mini-Text zum Ausfüllen/Lückentext mit Vokabelauswahl
- Ergebnis/Score + Wiederholungsoption

---

## Lerneinheit 4: Leseverstehen

### Einführung

- Kurzer, altersgerechter Lesetext ("A Day in Charlie's Life")

### Aufgaben

- Drag&Drop-Fragen zum Textverständnis:
  - Wichtige Infos per Drag&Drop (“Charlie wakes up at…”)
- **Feedback:** Nach jeder Frage direkte Rückmeldung

### Test

- 3 inhaltliche Fragen zum Text
- Score & Fortschrittsbalken

---

## Lerneinheit 5: Hörverstehen

### Einführung

- Kurze Audioaufnahme: Tagesablauf einer englischsprachigen Person

### Aufgaben

- Drag&Drop Fragen (z.B.: “At what time does Amy go to school?” Auswahlfeld mit Zeiten)
- **Feedback:** Direkt ("Correct!" / "Try again!")

### Test

- 3 Hörverständnis-Fragen als Multiple-Choice
- Ergebnisanzeige

---

## Erfolgskontrolle und Motivation

- Jede Einheit: Score und direkte Rückmeldung („Super gemacht!“ / „Du kannst das besser, versuche es noch einmal.“)
- Fortschritt sichtbar (Balken/Level)
- Belohnungen für abgeschlossene Themen (Punkte, Auszeichnungen)

---

## Abschluss- und Wiederholungsmodul

- Zusammenfassung aller Themen
- Großes Quiz mit Drag&Drop und Multiple-Choice als Abschluss (mindestens 15 gemischte Aufgaben)
- Schlussfeedback mit Vorschlägen zu schwächeren Themen
- Downloadbare Urkunde bei >80% Gesamterfolg

---

## Technische Anforderungen

- Mobile und Desktop tauglich (responsive)
- Drag&Drop mit Echtzeit-Validierung
- Visuelles & Audio-Feedback
- Benutzer-Session mit Fortschrittsspeicherung (optional)

---

## Beispiel-Feedback-Beispiele

if (correct) {showMessage(“Super, das war richtig!”)} else {showMessage(“Leider falsch, richtig wäre: correctWord”)}

---

## Quellen/Lehrplan-Referenzen

- Sachsen Englisch-Lehrplan 5. Klasse[web:4]
- Vokabellisten und Beispiele aus Online-Vokabeltrainern[web:7]
- Interaktive Aufgaben aus aktuellen Arbeitsblättern/Online-Übungsportalen[web:10]
