"use client";

import Controls from "@/components/chat/controls";
import Messages from "@/components/chat/message-bubbles";
import StartConversation from "@/components/chat/start-conversation";
import { VoiceProvider, useVoice } from "@humeai/voice-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";

// Move useTypewriter outside the component
function useTypewriter(text: string, speed = 70) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => (i < text.length ? prev + text[i] : prev));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

// Home screen component to avoid conditional rendering with hooks
function HomeScreen() {
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  }

  const greeting = getGreeting();
  const greetingTyped = useTypewriter(greeting, 70);

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center justify-center px-4 py-8">
        <div className="flex size-24 items-center justify-center rounded-full bg-muted">
          <Image src="/logo.svg" width={96} height={96} alt="EmotiChat Logo" />
        </div>
        <motion.h2
          className="mt-8 text-center font-semibold text-[32px] text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ minHeight: 44 }}
        >
          {greetingTyped}
        </motion.h2>
        <motion.p
          className="mt-2 max-w-[384px] text-center text-muted-foreground leading-[24px]"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7, type: "spring" }}
        >
          How are you feeling today? I'm here to listen and support you!
        </motion.p>
        <div className="mt-8 flex w-full justify-center">
          <StartConversation inline />
        </div>
      </div>
    </div>
  );
}

export default function Chat({ accessToken }: { accessToken: string }) {
  const timeout = useRef<number | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const configId = process.env.NEXT_PUBLIC_HUME_CONFIG_ID;

  return (
    <VoiceProvider
      auth={{ type: "accessToken", value: accessToken }}
      configId={configId}
      onMessage={() => {
        if (timeout.current) {
          window.clearTimeout(timeout.current);
        }
        timeout.current = window.setTimeout(() => {
          if (messagesRef.current) {
            const scrollHeight = messagesRef.current.scrollHeight;
            messagesRef.current.scrollTo({
              top: scrollHeight,
              behavior: "smooth",
            });
          }
        }, 200);
      }}
    >
      <ChatContent messagesRef={messagesRef} />
    </VoiceProvider>
  );
}

// Define a proper type for the component props
type ChatContentProps = {
  messagesRef: React.RefObject<HTMLDivElement>;
};

function ChatContent({ messagesRef }: ChatContentProps) {
  const { status } = useVoice();

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
    <HomeScreen />
  ) : (
    <div
      className={"relative mx-auto flex w-full grow flex-col overflow-hidden"}
    >
      <Messages ref={messagesRef} />
      <Controls />
      <StartConversation />
    </div>
  );
}
