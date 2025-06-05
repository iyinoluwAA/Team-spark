// src/components/chat/chat-with-recommendations.tsx
"use client";

import Chat from "@/components/chat/chat"; // your existing Chat (which itself does <VoiceProvider>)
import RecommendationsPanel from "@/components/chat/recommendations-panel";
import { useVoice } from "@humeai/voice-react";
import { useEffect, useRef, useState } from "react";

/**
 * ChatWithRecommendations simply renders <Chat> (which installs VoiceProvider).
 * Once Chat is mounted, its VoiceProvider is in the React tree. Only then do we
 * call `useVoice()` inside the nested <FetchRecommendationsInsideProvider />.
 */
export default function ChatWithRecommendations({ accessToken }: { accessToken: string }) {
  return (
    <>
      {/* First we render Chat, which internally does:
           <VoiceProvider auth={…}>
             <ChatContent/>
           </VoiceProvider>
         That ensures a VoiceProvider is available further down. */}
      <Chat accessToken={accessToken} />

      {/**
        Now that <Chat> has mounted, the VoiceProvider exists. We render a child
        component that can safely call useVoice() and fetch /api/recommendations.
      */}
      <FetchRecommendationsInsideProvider />
    </>
  );
}

/**
 * FetchRecommendationsInsideProvider is mounted _after_ Chat’s VoiceProvider is in place.
 * It can call useVoice() without complaint.
 */
function FetchRecommendationsInsideProvider() {
  // Now it’s safe to use useVoice() because Chat’s <VoiceProvider> is already in the tree.
  const { status, messages } = useVoice();

  // Find the latest user message that contains prosody.scores (if any):
  const rawLatestMessage = [...messages]
    .reverse()
    .find((m) => m.type === "user_message" && Boolean((m as any).models?.prosody?.scores));

  // We cast to the known shape so TypeScript knows “scores” is numeric.
  // If your type definitions differ, adjust this accordingly.
  const latestUserMsg = rawLatestMessage as
    | {
        models: { prosody: { scores: Record<string, number> } };
      }
    | null;

  // Extract “scores” or null if not present
  const scores: Record<string, number> | null = latestUserMsg?.models.prosody.scores ?? null;

  // Compute the dominantEmotion string by picking the key with the highest score
  let dominantEmotion: string | null = null;
  if (scores) {
    dominantEmotion = Object.entries(scores)
      .sort(([_, aVal], [__, bVal]) => bVal - aVal) // descending
      .map(([key]) => key)[0]!;
  }

  // Lowercase to query our API
  const emotionLower = dominantEmotion?.toLowerCase() ?? null;

  // Keep track of which emotion we last fetched recommendations for
  const lastFetched = useRef<string | null>(null);

  // State to hold the fetched recommendations
  const [recommendations, setRecommendations] = useState<{
    breathing: any[];
    music: any[];
    quotes: any[];
  }>({ breathing: [], music: [], quotes: [] });

  // Whenever we get a new “dominantEmotion” and we are connected, fetch /api/recommendations
  useEffect(() => {
    if (status.value === "connected" && emotionLower && emotionLower !== lastFetched.current) {
      lastFetched.current = emotionLower;
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

  // If Chat hasn’t connected to Hume yet, don’t render anything
  if (status.value !== "connected") {
    return null;
  }

  // Once connected, show the recommendations panel below the Chat UI
  return (
    <div className="relative mx-auto flex w-full grow flex-col overflow-hidden">
      <RecommendationsPanel recommendations={recommendations} />
    </div>
  );
}
