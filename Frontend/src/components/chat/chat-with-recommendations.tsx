// src/components/chat/chat-with-recommendations.tsx
"use client";

import Chat from "@/components/chat/chat";
import RecommendationsPanel from "@/components/chat/recommendations-panel";
import { useVoice } from "@humeai/voice-react";
import { useEffect, useRef, useState } from "react";

export default function ChatWithRecommendations({
  accessToken,
}: {
  accessToken: string;
}) {
  const { status, messages } = useVoice();
  const lastFetchedEmotion = useRef<string | null>(null);

  
  const [recommendations, setRecommendations] = useState<{
    breathing: any[];
    music: any[];
    quotes: any[];
  }>({ breathing: [], music: [], quotes: [] });

  useEffect(() => {
    // 1) Find the most recent user_message that has prosody.scores
    const latestUserMsg = [...messages]
      .reverse()
      .find((m) => m.type === "user_message" && !!m.models.prosody?.scores);

    if (
      status.value === "connected" &&
      latestUserMsg?.models.prosody?.scores
    ) {
      // <<<— THIS LINE IS CHANGED to assert type of scores:
      const scores = latestUserMsg.models.prosody!.scores as Record<string, number>;

      // Now `scores` is a Record<string, number>, so TypeScript knows `a` and `b` are both numbers.
      const dominantEmotion = (
        Object.entries(scores)
          .sort(([, a], [, b]) => b - a)
          .map(([key]) => key)
      )[0]!;
      const emotionLower = dominantEmotion.toLowerCase();

      if (emotionLower !== lastFetchedEmotion.current) {
        lastFetchedEmotion.current = emotionLower;

        fetch(`/api/recommendations?emotion=${encodeURIComponent(emotionLower)}`)
          .then(async (res) => {
            if (!res.ok) {
              console.error("Recommendation API error:", await res.text());
              return null;
            }
            return res.json() as Promise<{
              breathing: any[];
              music: any[];
              quotes: any[];
            }>;
          })
          .then((json) => {
            if (json) {
              setRecommendations(json);
            }
          })
          .catch((err) => {
            console.error("Failed to fetch recommendations:", err);
          });
      }
    }
  }, [messages, status.value]);

  // If Hume isn’t connected, just render Chat’s HomeScreen
  if (status.value !== "connected") {
    return <Chat accessToken={accessToken} />;
  }

  // Otherwise show Chat plus our RecommendationsPanel
  return (
    <>
      <Chat accessToken={accessToken} />

      <div className="relative mx-auto flex w-full grow flex-col overflow-hidden">
        <RecommendationsPanel recommendations={recommendations} />
      </div>
    </>
  );
}
