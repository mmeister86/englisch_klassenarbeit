import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Willkommen zur Englisch-Lern-App!
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Lerne Englisch mit interaktiven Übungen für die 5. Klasse
        </p>
        <div className="space-y-4">
          <p className="text-lg text-gray-600">
            Diese App hilft dir beim Lernen von:
          </p>
          <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-2 text-gray-700">
            <li>Simple Present Grundlagen</li>
            <li>Personalpronomen</li>
            <li>Vokabeln & Tagesablauf</li>
            <li>Leseverstehen</li>
            <li>Hörverstehen</li>
          </ul>
        </div>
        <Link
          href="/welcome"
          className="inline-block mt-8 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Los geht&apos;s!
        </Link>
      </div>
    </div>
  );
}
