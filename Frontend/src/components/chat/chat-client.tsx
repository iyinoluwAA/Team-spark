"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Chat = dynamic(() => import("@/components/chat/chat"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  ),
});

export function ChatClient({ accessToken }: { accessToken: string }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <Chat accessToken={accessToken} />
    </Suspense>
  );
}
