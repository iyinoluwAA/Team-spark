"use client";

import Controls from "@/components/chat/controls";
import Messages from "@/components/chat/message-bubbles";
import StartConversation from "@/components/chat/start-conversation";
import { VoiceProvider, useVoice } from "@humeai/voice-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

// Home screen component to avoid conditional rendering with hooks
function HomeScreen({
  configId,
  accessToken,
}: {
  configId?: string;
  accessToken: string;
}) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning!");
    else if (hour < 18) setGreeting("Good afternoon!");
    else setGreeting("Good evening!");
  }, []);

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <div className="flex w-full max-w-lg flex-col items-center justify-center px-4 py-8">
        <div className="flex size-24 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30">
          <Image src="/logo.svg" width={96} height={96} alt="EmotiChat Logo" />
        </div>
        <motion.h2
          className="mt-8 break-words text-center font-semibold text-[32px] text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ minHeight: 44 }}
        >
          {greeting}
        </motion.h2>
        <motion.p
          className="mt-2 max-w-md break-words text-center text-gray-600 leading-[24px] dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          How are you feeling today? I'm here to listen and support you!
        </motion.p>
        <div className="mt-8 flex w-full justify-center">
          <StartConversation
            inline
            configId={configId}
            accessToken={accessToken}
          />
        </div>
      </div>
    </div>
  );
}

export default function Chat({ accessToken }: { accessToken: string }) {
  const timeout = useRef<number | null>(null);
  const configId = process.env.NEXT_PUBLIC_HUME_CONFIG_ID;

  return (
    <VoiceProvider
      onMessage={() => {
        if (timeout.current) {
          window.clearTimeout(timeout.current);
        }
        timeout.current = window.setTimeout(() => {
          // Handle scrolling in the inner component instead
        }, 200);
      }}
    >
      <ChatContent configId={configId} accessToken={accessToken} />
    </VoiceProvider>
  );
}

function ChatContent({
  configId,
  accessToken,
}: {
  configId?: string;
  accessToken: string;
}) {
  const { status, messages } = useVoice();
  // Create the ref here instead of passing it down
  const messagesRef = useRef<HTMLDivElement>(null);

  // Handle scrolling here
  useEffect(() => {
    if (messages.length > 0 && messagesRef.current) {
      const scrollHeight = messagesRef.current.scrollHeight;
      messagesRef.current.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

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

  // Use a separate component to render content based on status
  return status.value !== "connected" ? (
    <HomeScreen configId={configId} accessToken={accessToken} />
  ) : (
    <div
      className={"relative mx-auto flex w-full grow flex-col overflow-hidden"}
    >
      <Messages ref={messagesRef} />
      <Controls />
      <StartConversation configId={configId} accessToken={accessToken} />
    </div>
  );
}
