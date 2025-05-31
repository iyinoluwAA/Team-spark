"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVoice } from "@humeai/voice-react";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

export default function TextBox() {
  const { status, sendUserInput } = useVoice();
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

  // Always call hooks, render hidden div if not connected
  if (status.value !== "connected") {
    return <div style={{ display: "none" }} />;
  }

  return (
    <form
      className="mx-auto flex w-full max-w-2xl items-center rounded-full border bg-background px-4 py-2 shadow"
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
        autoFocus
      />
      <Button
        type="submit"
        size="icon"
        className="ml-2 rounded-full"
        disabled={!text.trim()}
        aria-label="Send message"
      >
        <ArrowUp className="size-5" />
      </Button>
    </form>
  );
}
