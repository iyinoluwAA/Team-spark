import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className={
        "relative flex h-screen min-h-fit w-screen flex-col items-center justify-center p-8"
      }
    >
      <Image src="/logo.svg" width={96} height={96} alt={"Logo"} />
      <p
        className={
          "mt-5 font-openrunde font-semibold text-[24px] text-foreground leading-[32px] tracking-[-0.48px]"
        }
      >
        Welcome to EmotiChat
      </p>
      <p className={"mt-2 max-w-[384px] text-center text-muted-foreground leading-[24px]"}>
        Your AI Companion for Emotional Well-being. Talk or chat with an empathic AI that listens
        and understands you.
      </p>
      <Button asChild className="mt-[48px] max-w-[320px]">
        <Link href="/chat">Start Chatting</Link>
      </Button>

      <div
        className={
          "absolute bottom-6 flex items-center gap-2 text-[13px] text-muted-foreground leading-[16px]"
        }
      >
        <p>© 2025 EmotiChat</p>
        <p className={"font-bold text-muted-foreground"}>·</p>
        <Link
          href="https://github.com/iyinoluwAA/Team-spark"
          target={"_blank"}
          className={"transition duration-200 ease-out hover:text-muted-foreground"}
        >
          GitHub
        </Link>
      </div>
    </div>
  );
}
