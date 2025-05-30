import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  return (
    <div className="relative flex h-screen min-h-fit w-screen flex-col items-center justify-center p-8">
      <Image src="/logo.svg" width={96} height={96} alt="Logo" />
      <div className="mt-5 flex flex-col items-center">
        <div className="rounded-full bg-muted flex items-center justify-center size-16">
          <Image
            src="/avatar.svg"
            width={48}
            height={48}
            alt="EmotiChat Avatar"
          />
        </div>
        <p className="mt-4 text-[22px] font-semibold text-foreground">
          Hi, I'm EmotiChat
        </p>
        <p className="mt-2 max-w-[384px] text-center text-muted-foreground leading-[24px]">
          Your AI Companion for Emotional Well-being. Talk or chat with an
          empathic AI that listens and understands you.
        </p>
        <Button className="mt-8 size-40 max-w-[320px]">Start Call</Button>
      </div>
    </div>
  );
}
