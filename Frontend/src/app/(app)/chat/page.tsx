import { getHumeAccessToken } from "@/ai/humeai";
import dynamic from "next/dynamic";

// Dynamically import, since ChatWithRecommendations is client‐only
const ChatWithRecommendations = dynamic(
  () => import("@/components/chat/chat-with-recommendations"),
  { ssr: false }
);

export default async function ChatPage() {
  const accessToken = await getHumeAccessToken();
  if (!accessToken) throw new Error("Failed to get Hume access token");

  // Pass the real token into your wrapper
  return <ChatWithRecommendations accessToken={accessToken} />;
}
