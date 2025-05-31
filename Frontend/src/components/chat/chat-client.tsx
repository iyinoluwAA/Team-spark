"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";

const Chat = dynamic(() => import("@/components/chat/chat"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  ),
});

interface ChatClientProps {
  accessToken: string;
}

export function ChatClient({ accessToken }: ChatClientProps) {
  if (!accessToken) {
    throw new Error("Access token is required");
  }

  return (
    <div className="relative flex h-screen min-h-fit w-screen flex-col items-center justify-center p-8">
      <Image src="/logo.svg" width={96} height={96} alt="Logo" />
      <div className="mt-5 flex flex-col items-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <Image src="/avatar.svg" width={48} height={48} alt="EmotiChat Avatar" />
        </div>
        <p className="mt-4 font-semibold text-[22px] text-foreground">Hi, I'm EmotiChat</p>
        <p className="mt-2 max-w-[384px] text-center text-muted-foreground leading-[24px]">
          Your AI Companion for Emotional Well-being. Talk or chat with an empathic AI that listens
          and understands you.
        </p>
        <div className="flex grow flex-col">
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            }
          >
            <Chat accessToken={accessToken} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
