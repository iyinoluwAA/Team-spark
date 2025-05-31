"use client";
import Expressions from "@/components/chat/emotions";
import { cn } from "@/lib/utils";
import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { ForwardedRef, forwardRef } from "react";

const Messages = forwardRef<HTMLDivElement, Record<string, never>>(
  function Messages(_, ref: ForwardedRef<HTMLDivElement>) {
    const { messages } = useVoice();

    return (
      <motion.div
        layoutScroll
        className={"grow overflow-auto rounded-md p-4"}
        ref={ref}
      >
        <motion.div
          className={"mx-auto flex w-full max-w-2xl flex-col gap-4 pb-24"}
        >
          <AnimatePresence mode={"popLayout"}>
            {messages.map((msg, index) => {
              if (
                msg.type !== "user_message" &&
                msg.type !== "assistant_message"
              ) {
                return null;
              }

              const content = msg.message.content ?? "";
              return (
                <motion.div
                  key={`${msg.type}-${content.slice(0, 10)}-${index}`}
                  className={cn(
                    "w-[80%]",
                    "rounded border",
                    msg.type === "user_message"
                      ? "ml-auto bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/50"
                      : "bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700"
                  )}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 0,
                  }}
                >
                  <div
                    className={cn(
                      "px-3 pt-4 font-medium text-xs capitalize leading-none",
                      msg.type === "user_message"
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-gray-500 dark:text-gray-400"
                    )}
                  >
                    {msg.message.role}
                  </div>
                  <div
                    className={cn(
                      "px-3 pb-3",
                      msg.type === "user_message"
                        ? "text-gray-800 dark:text-gray-200"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {content}
                  </div>
                  <Expressions values={{ ...msg.models.prosody?.scores }} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  }
);

export default Messages;
