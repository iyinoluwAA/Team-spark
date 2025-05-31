import { ChatClient } from "@/components/chat/chat-client";
import { getHumeAccessToken } from "@/lib/ai/humeai";

export default async function ChatPage() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error("Failed to get Hume access token");
  }

  return <ChatClient accessToken={accessToken} />;
}
