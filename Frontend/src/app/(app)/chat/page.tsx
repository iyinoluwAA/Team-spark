import { getHumeAccessToken } from "@/ai/humeai";
import ChatWithRecommendations from "@/components/chat/chat-with-recommendations";

export default async function ChatPage() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error("Failed to get Hume access token");
  }

  return <ChatWithRecommendations accessToken={accessToken} />;
}
