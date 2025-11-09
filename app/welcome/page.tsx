"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/contexts/ProgressContext";
import { saveUserData } from "@/lib/storage";
import { User } from "@/lib/types";

export default function WelcomePage() {
  const [name, setName] = useState("");
  const [classGrade, setClassGrade] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useProgress();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Bitte gib deinen Namen ein.");
      return;
    }

    if (!classGrade.trim()) {
      setError("Bitte gib deine Klasse ein.");
      return;
    }

    const user: User = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      class: classGrade.trim(),
      createdAt: new Date().toISOString()
    };

    saveUserData(user);
    setUser(user);
    router.push("/overview");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Willkommen!
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Bitte gib deinen Namen und deine Klasse ein, um zu beginnen.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Dein Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="z.B. Max"
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="class"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Deine Klasse
            </label>
            <input
              id="class"
              type="text"
              value={classGrade}
              onChange={(e) => setClassGrade(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="z.B. 5a"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Weiter
          </button>
        </form>
      </div>
    </div>
  );
}

