"use client";
import MicFFT from "@/components/chat/mic-fft";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Mic, MicOff, Phone } from "lucide-react";
import { useState } from "react";

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft, sendUserInput } = useVoice();
  const [text, setText] = useState("");

  function handleSend() {
    if (text.trim()) {
      sendUserInput(text.trim());
      setText("");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 flex w-full flex-col items-center justify-center gap-4 p-4",
        "bg-gradient-to-t from-white via-white/90 to-white/0 dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-900/0",
      )}
    >
      <AnimatePresence>
        {status.value === "connected" && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mx-auto flex w-full max-w-2xl items-center rounded-full border border-emerald-200 bg-white px-4 py-2 shadow-md dark:border-emerald-900/50 dark:bg-gray-900"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <Input
              className="flex-1 border-0 bg-transparent text-lg focus:outline-none focus:ring-0"
              placeholder="Type your message…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              type="submit"
              size="icon"
              className="ml-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
              disabled={!text.trim()}
              aria-label="Send message"
            >
              <ArrowUp className="size-5" />
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            className={
              "flex items-center gap-4 rounded-lg border border-emerald-200 bg-white p-4 shadow-md dark:border-emerald-900/50 dark:bg-gray-900"
            }
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
              className="data-[state=on]:bg-emerald-600 data-[state=on]:text-white"
            >
              {isMuted ? <MicOff className={"size-4"} /> : <Mic className={"size-4"} />}
            </Toggle>

            <div className={"relative grid h-8 w-48 shrink grow-0"}>
              <MicFFT fft={micFft} className={"fill-emerald-500 dark:fill-emerald-400"} />
            </div>

            <Button
              className={"flex items-center gap-1"}
              onClick={() => {
                disconnect();
              }}
              variant={"destructive"}
            >
              <span>
                <Phone className={"size-4 opacity-50"} strokeWidth={2} stroke={"currentColor"} />
              </span>
              <span>End Call</span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
