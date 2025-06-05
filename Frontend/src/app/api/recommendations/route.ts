// app/api/recommendations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// --- Type definitions for what we return ---
type BreathingGuide = {
  id: string;
  title: string;
  emotion_tag: string;
  instructions: string;
  audio_url: string;
  duration_seconds: number;
};

type MusicTherapy = {
  id: string;
  emotion_tag: string;
  title: string;
  audio_url: string;
  duration_seconds: number;
  description: string;
};

type InspirationalQuote = {
  id: string;
  emotion_tag: string;
  quote_text: string;
  author: string | null;
};

type RecommendationsResponse = {
  breathing: BreathingGuide[];
  music: MusicTherapy[];
  quotes: InspirationalQuote[];
};

export async function GET(request: NextRequest) {
  // 1) Extract “emotion” from the query string, e.g. /api/recommendations?emotion=anxiety
  const { searchParams } = new URL(request.url);
  const emotion = searchParams.get("emotion")?.toLowerCase();

  if (!emotion) {
    return NextResponse.json(
      { error: "Query parameter `emotion` is required." },
      { status: 400 }
    );
  }

  // 2) Fetch from breathing_meditation_guides where emotion_tag == emotion
  const { data: breathing, error: breatheErr } = await supabase
    .from<BreathingGuide>("breathing_meditation_guides")
    .select("*")
    .eq("emotion_tag", emotion)
    .order("created_at", { ascending: false })
    .limit(3);

  if (breatheErr) {
    console.error("Supabase error (breathing):", breatheErr.message);
    return NextResponse.json(
      { error: "Failed to fetch breathing guides." },
      { status: 500 }
    );
  }

  // 3) Fetch from emotion_music_therapy where emotion_tag == emotion
  const { data: music, error: musicErr } = await supabase
    .from<MusicTherapy>("emotion_music_therapy")
    .select("*")
    .eq("emotion_tag", emotion)
    .order("created_at", { ascending: false })
    .limit(3);

  if (musicErr) {
    console.error("Supabase error (music):", musicErr.message);
    return NextResponse.json(
      { error: "Failed to fetch music therapy." },
      { status: 500 }
    );
  }

  // 4) Fetch from inspirational_quotes where emotion_tag == emotion
  const { data: quotes, error: quoteErr } = await supabase
    .from<InspirationalQuote>("inspirational_quotes")
    .select("*")
    .eq("emotion_tag", emotion)
    .order("created_at", { ascending: false })
    .limit(3);

  if (quoteErr) {
    console.error("Supabase error (quotes):", quoteErr.message);
    return NextResponse.json(
      { error: "Failed to fetch inspirational quotes." },
      { status: 500 }
    );
  }

  // 5) Bundle them into a single response payload
  const responsePayload: RecommendationsResponse = {
    breathing: breathing ?? [],
    music: music ?? [],
    quotes: quotes ?? [],
  };

  return NextResponse.json(responsePayload);
}
