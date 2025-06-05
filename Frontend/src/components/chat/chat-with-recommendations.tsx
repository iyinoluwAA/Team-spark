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
  }>({
    breathing: [],
    music: [],
    quotes: [],
  });

  useEffect(() => {
    //
    // 1) Find the latest user_message that has prosody.scores
    //
    // We need to tell TS “this message definitely has a .models.prosody.scores”
    // so that we can safely read models.prosody.scores.
    //
    const rawLatest = [...messages]
      .reverse()
      .find((m) => {
        // First, ensure it's a “user_message”
        if (m.type !== "user_message") return false;

        // Then, check at runtime that `m.models.prosody.scores` is defined.
        // We cast to `any` to bypass TS complaining “property 'models' does not exist…”
        const possibleModels = (m as any).models;
        return !!(
          possibleModels &&
          possibleModels.prosody &&
          typeof possibleModels.prosody.scores === "object"
        );
      });

    // If our `.find()` returns undefined, there's nothing to do.
    if (!rawLatest) {
      return;
    }

    //
    // 2) Now that we know “rawLatest” really does have `models.prosody.scores`,
    // we can grab it. We cast it to Record<string, number> so TS knows “scores” is numeric.
    //
    const latestUserMsg = rawLatest as {
      models: { prosody: { scores: Record<string, number> } };
    };

    if (
      status.value === "connected" &&
      latestUserMsg.models.prosody.scores
    ) {
      const scores = latestUserMsg.models.prosody
        .scores as Record<string, number>;

      // 3) Compute “dominantEmotion” by sorting the [key, value] pairs by the numeric value `b - a`.
      // Now TS knows “a” and “b” are numbers, so subtraction is OK.
      const dominantEmotion = (
        Object.entries(scores)
          .sort(([, a], [, b]) => b - a)
          .map(([key]) => key)
      )[0]!;

      const emotionLower = dominantEmotion.toLowerCase();

      //
      // 4) Only fetch if this emotion is different from lastFetchedEmotion
      //
      if (emotionLower !== lastFetchedEmotion.current) {
        lastFetchedEmotion.current = emotionLower;

        fetch(`/api/recommendations?emotion=${encodeURIComponent(emotionLower)}`)
          .then(async (res) => {
            if (!res.ok) {
              console.error("Recommendation API error:", await res.text());
              return null;
            }
            return (await res.json()) as {
              breathing: any[];
              music: any[];
              quotes: any[];
            };
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

  //
  // If Hume is not connected yet, render Chat’s built‑in HomeScreen
  // (the <Chat> component will show it automatically when not connected).
  //
  if (status.value !== "connected") {
    return <Chat accessToken={accessToken} />;
  }

  //
  // Otherwise, show the chat plus our RecommendationsPanel below it.
  //
  return (
    <>
      <Chat accessToken={accessToken} />

      <div className="relative mx-auto flex w-full grow flex-col overflow-hidden">
        <RecommendationsPanel recommendations={recommendations} />
      </div>
    </>
  );
}
