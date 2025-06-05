// components/chat/recommendations-panel.tsx
"use client";

import { motion } from "framer-motion";

export default function RecommendationsPanel({
  recommendations,
}: {
  recommendations: {
    breathing: { id: string; title: string; duration_seconds: number }[];
    music: { id: string; title: string; duration_seconds: number }[];
    quotes: { id: string; quote_text: string; author: string | null;}[];
  };
}) {
  // If none of the three arrays has content, render nothing
  if (
    recommendations.breathing.length === 0 &&
    recommendations.music.length === 0 &&
    recommendations.quotes.length === 0
  ) {
    return null;
  }

  return (
    <div className="mt-4 w-full border-t border-gray-300 p-4 dark:border-gray-700">
      <motion.h3
        className="mb-2 text-lg font-semibold text-gray-800 dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Based on your emotion
      </motion.h3>

      <div className="space-y-4">
        {recommendations.quotes.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300">
              Inspirational Quotes
            </h4>
            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
              {recommendations.quotes.map((q) => (
                <li key={q.id}>
                  “{q.quote_text}” {q.author ? `— ${q.author}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {recommendations.breathing.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300">
              Breathing Exercises
            </h4>
            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
              {recommendations.breathing.map((b) => (
                <li key={b.id}>
                  {b.title} — {b.duration_seconds}s
                </li>
              ))}
            </ul>
          </div>
        )}

        {recommendations.music.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300">
              Music Therapy
            </h4>
            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
              {recommendations.music.map((m) => (
                <li key={m.id}>
                  {m.title} — {m.duration_seconds}s
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
