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
    // We first search `messages` and ensure at runtime that `(m as any).models.prosody.scores` is defined.
    //
    const rawLatest = [...messages]
      .reverse()
      .find((m) => {
        if (m.type !== "user_message") return false;
        const possibleModels = (m as any).models;
        return !!(
          possibleModels &&
          possibleModels.prosody &&
          typeof possibleModels.prosody.scores === "object"
        );
      });

    // If there is no such message, do nothing.
    if (!rawLatest) {
      return;
    }

    //
    // 2) Now that we know `rawLatest` definitely has `models.prosody.scores`,
    // we cast it **via unknown** to tell TS “yes, we’ve checked at runtime.”
    //
    const latestUserMsg = (rawLatest as unknown) as {
      models: { prosody: { scores: Record<string, number> } };
    };

    if (status.value === "connected" && latestUserMsg.models.prosody.scores) {
      const scores = latestUserMsg.models.prosody.scores as Record<
        string,
        number
      >;

      // 3) Compute the dominant emotion by sorting the [key, value] pairs
      const dominantEmotion = (
        Object.entries(scores)
          .sort(([, a], [, b]) => b - a)
          .map(([key]) => key)
      )[0]!;

      const emotionLower = dominantEmotion.toLowerCase();

      //
      // 4) Only fetch recommendations if this emotion is different
      //
      if (emotionLower !== lastFetchedEmotion.current) {
        lastFetchedEmotion.current = emotionLower;

        fetch(`/api/recommendations?emotion=${encodeURIComponent(
          emotionLower
        )}`)
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
  // If Hume hasn’t connected yet, just render <Chat /> (it shows HomeScreen internally).
  //
  if (status.value !== "connected") {
    return <Chat accessToken={accessToken} />;
  }

  //
  // Otherwise, render the Chat plus our RecommendationsPanel below.
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