// components/chat/chat-with-recommendations.tsx
"use client";

import Chat from "@/components/chat/chat"; // ← unchanged
import RecommendationsPanel from "@/components/chat/recommendations-panel"; // must match Step 1
import { useVoice } from "@humeai/voice-react";
import { useEffect, useRef, useState } from "react";

export default function ChatWithRecommendations({
  accessToken,
}: {
  accessToken: string;
}) {
  const { status, messages, latestUserEmotion } = useVoice();
  const messagesRef = useRef<HTMLDivElement>(null);

  // State for fetched recommendations
  const [recommendations, setRecommendations] = useState<{
    breathing: any[];
    music: any[];
    quotes: any[];
  }>({ breathing: [], music: [], quotes: [] });

  // Keep track of which emotion we fetched last
  const lastFetchedEmotion = useRef<string | null>(null);

  // 1) Scroll logic
  useEffect(() => {
    if (messages.length > 0 && messagesRef.current) {
      const scrollHeight = messagesRef.current.scrollHeight;
      messagesRef.current.scrollTo({ top: scrollHeight, behavior: "smooth" });
    }
  }, [messages.length]);

  // 2) Toggling scrollbar classes exactly as ChatContent does
  useEffect(() => {
    const scrollWrapper = document.querySelector(".hide-scrollbar");
    if (scrollWrapper) {
      if (status.value !== "connected") {
        scrollWrapper.classList.add("overflow-hidden", "h-auto");
        scrollWrapper.classList.remove("overflow-y-scroll", "h-full");
      } else {
        scrollWrapper.classList.remove("overflow-hidden", "h-auto");
        scrollWrapper.classList.add("overflow-y-scroll", "h-full");
      }
    }
    return () => {
      if (scrollWrapper) {
        scrollWrapper.classList.remove("overflow-hidden", "h-auto");
        scrollWrapper.classList.add("overflow-y-scroll", "h-full");
      }
    };
  }, [status.value]);

  // 3) Whenever latestUserEmotion changes, fetch /api/recommendations?emotion={…}
  useEffect(() => {
    async function fetchRecommendationsFor(emotion: string) {
      try {
        const res = await fetch(`/api/recommendations?emotion=${emotion}`);
        if (!res.ok) {
          console.error("Recommendation API error:", await res.text());
          return;
        }
        const json = (await res.json()) as {
          breathing: any[];
          music: any[];
          quotes: any[];
        };
        setRecommendations(json);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
      }
    }

    if (
      status.value === "connected" &&
      latestUserEmotion.value &&
      latestUserEmotion.value !== lastFetchedEmotion.current
    ) {
      const em = latestUserEmotion.value.toLowerCase();
      lastFetchedEmotion.current = em;
      fetchRecommendationsFor(em);
    }
  }, [latestUserEmotion.value, status.value]);

  // 4) If Hume voice isn’t “connected” yet, let Chat show its own HomeScreen
  if (status.value !== "connected") {
    return <Chat accessToken={accessToken} />;
  }

  // 5) Otherwise, show the normal Chat window plus our panel underneath
  return (
    <>
      {/* 5a) The existing Chat UI (messages + controls + StartConversation) */}
      <Chat accessToken={accessToken} />

      {/* 5b) Now append our RecommendationsPanel, passing the fetched data */}
      <div className="relative mx-auto flex w-full grow flex-col overflow-hidden">
        <div ref={messagesRef} className="hide-scrollbar w-full overflow-y-scroll">
          {/* Chat’s own <Messages /> etc. are already rendered inside <Chat />. */}
        </div>

        <RecommendationsPanel recommendations={recommendations} />
      </div>
    </>
  );
}
