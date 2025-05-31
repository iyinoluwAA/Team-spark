"use client";
import Expressions from "@/components/chat/emotions";
import { cn } from "@/lib/utils";
import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef } from "react";

const Messages = forwardRef<ComponentRef<typeof motion.div>, Record<never, never>>(
  function Messages(_, ref) {
    const { messages } = useVoice();

    return (
      <motion.div layoutScroll className={"grow overflow-auto rounded-md p-4"} ref={ref}>
        <motion.div className={"mx-auto flex w-full max-w-2xl flex-col gap-4 pb-24"}>
          <AnimatePresence mode={"popLayout"}>
            {messages.map((msg, index) => {
              if (msg.type === "user_message" || msg.type === "assistant_message") {
                const content = msg.message.content ?? "";
                return (
                  <motion.div
                    key={`${msg.type}-${content.slice(0, 10)}-${index}`}
                    className={cn(
                      "w-[80%]",
                      "bg-card",
                      "rounded border border-border",
                      msg.type === "user_message" ? "ml-auto" : "",
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
                        "px-3 pt-4 font-medium text-xs capitalize leading-none opacity-50",
                      )}
                    >
                      {msg.message.role}
                    </div>
                    <div className={"px-3 pb-3"}>{content}</div>
                    <Expressions values={{ ...msg.models.prosody?.scores }} />
                  </motion.div>
                );
              }

              return null;
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  },
);

export default Messages;
