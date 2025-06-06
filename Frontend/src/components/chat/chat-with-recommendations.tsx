// src/components/chat/chat-with-recommendations.tsx
"use client";

import Chat from "@/components/chat/chat"; // your existing Chat (which itself wraps a VoiceProvider)
import RecommendationsPanel from "@/components/chat/recommendations-panel";
import type { JSONMessage, ConnectionMessage } from "@humeai/voice-react";
import { useVoice } from "@humeai/voice-react";
import { useEffect, useRef, useState } from "react";

export default function ChatWithRecommendations({
  accessToken,
}: {
  accessToken: string;
}) {
  return (
    <>
      {/* First render <Chat> so that its <VoiceProvider> appears in the tree */}
      <Chat accessToken={accessToken} />

      {/* Now we mount a child that calls useVoice() _after_ VoiceProvider is present */}
      <FetchRecommendationsInsideProvider />
    </>
  );
}

function FetchRecommendationsInsideProvider() {
  // SAFE to call useVoice() here because <Chat> has already mounted its VoiceProvider above.
  const { status, messages } = useVoice();
  const messagesRef = useRef<HTMLDivElement>(null);

  // Helper: scan messages from newest to oldest and pick the first one that has prosody.scores
  
    const rawLatestMessage = messages
    .slice()
    .reverse()
    .find((m: JSONMessage | ConnectionMessage) => {
        return (
        m.type === "user_message" &&
        typeof (m as any).models?.prosody?.scores === "object"
        );
    });

  // At this point, rawLatestMessage is either undefined (if no message with prosody)
  // or it is some message object with .models.prosody.scores present. We'll cast it to `any`
  // so TypeScript stops complaining—because we've already done the runtime check above.
  const latestUserMsg = (rawLatestMessage as any) || null;

  // Extract numeric scores safely, or null if absent
  const scores: Record<string, number> | null =
    latestUserMsg?.models?.prosody?.scores ?? null;

  // Compute "dominantEmotion" by picking the key with the highest score
  let dominantEmotion: string | null = null;
  if (scores) {
    const sorted = Object.entries(scores).sort(([, aVal], [, bVal]) => bVal - aVal);
    if (sorted.length > 0) {
      dominantEmotion = sorted[0][0]; // the emotion‐tag string
    }
  }

  // Lowercase version for API call (e.g. "anxiety", "sad", etc.)
  const emotionLower = dominantEmotion?.toLowerCase() ?? null;

  // Track the last emotion for which we fetched recommendations
  const lastFetchedEmotion = useRef<string | null>(null);

  // Store fetched recommendations
  const [recommendations, setRecommendations] = useState<{
    breathing: any[];
    music: any[];
    quotes: any[];
  }>({ breathing: [], music: [], quotes: [] });

  // Whenever Hume gives us a new dominantEmotion, fetch /api/recommendations
  useEffect(() => {
    if (
      status.value === "connected" &&        // must be connected
      emotionLower &&                         // we have a detectedEmotion
      emotionLower !== lastFetchedEmotion.current // and it’s different from last time
    ) {
      lastFetchedEmotion.current = emotionLower;

      fetch(`/api/recommendations?emotion=${encodeURIComponent(emotionLower)}`)
        .then(async (res) => {
          if (!res.ok) {
            console.error("Recommendation API error:", await res.text());
            return { breathing: [], music: [], quotes: [] };
          }
          return (await res.json()) as {
            breathing: any[];
            music: any[];
            quotes: any[];
          };
        })
        .then((data) => {
          setRecommendations(data);
        })
        .catch((err) => {
          console.error("Failed to fetch recommendations:", err);
        });
    }
  }, [status.value, emotionLower]);

  // If we haven’t connected to Hume yet, render nothing (Chat itself shows its HomeScreen)
  if (status.value !== "connected") {
    return null;
  }

  // Once connected, append the RecommendationsPanel below Chat’s UI
  return (
    <div className="relative mx-auto flex w-full grow flex-col overflow-hidden">
      <RecommendationsPanel recommendations={recommendations} />
    </div>
  );
}
