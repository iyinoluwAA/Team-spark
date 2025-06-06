
"use client";

import { VoiceProvider, useVoice } from "@humeai/voice-react";
import Chat from "@/components/chat/chat"; 
import RecommendationsPanel from "@/components/chat/recommendations-panel";
import { useEffect, useRef, useState } from "react";

export default function ChatWithRecommendations({
  accessToken,
}: {
  accessToken: string;
}) {
  // ① Wrap _everything_ below in a single VoiceProvider
  return (
    <VoiceProvider
      auth={{ type: "accessToken", value: accessToken }}
      configId={process.env.NEXT_PUBLIC_HUME_CONFIG_ID}
    >
      <InnerWithRecommendations />
    </VoiceProvider>
  );
}

// ② Move any useVoice() calls into a component that is now inside the above VoiceProvider
function InnerWithRecommendations() {
  const { status, messages, latestUserEmotion } = useVoice();
  const messagesRef = useRef<HTMLDivElement>(null);

  const [recommendations, setRecommendations] = useState<{
    breathing: any[];
    music: any[];
    quotes: any[];
  }>({ breathing: [], music: [], quotes: [] });

  const lastFetchedEmotion = useRef<string | null>(null);

  // ─── Scroll logic (copied from your ChatContent) ──────────────
  useEffect(() => {
    if (messages.length > 0 && messagesRef.current) {
      const scrollHeight = messagesRef.current.scrollHeight;
      messagesRef.current.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  // ─── Hide/show scrollbar classes (copied from ChatContent) ────
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

  // ─── When Hume returns a new dominant emotion, fetch your /api/recommendations ───
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

  // ─── If not yet “connected” to Hume, show <Chat>’s HomeScreen UI ────────────
  if (status.value !== "connected") {
    // (This effectively renders Chat’s own “HomeScreen” since Chat internally
    //  puts its HomeScreen when it’s not connected.)
    return <Chat accessToken={""} />;
  }

  // ─── Otherwise, render the normal chat UI + recommendations panel ──────────
  return (
    <div className="relative mx-auto flex w-full grow flex-col overflow-hidden">
      {/* 1) The actual chat UI (Messages, Controls, StartConversation, etc.) */}
      <Chat accessToken={""} />

      {/* 2) Then, append your recommendations panel below */}
      <RecommendationsPanel recommendations={recommendations} />
    </div>
  );
}
