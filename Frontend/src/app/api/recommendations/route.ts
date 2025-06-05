// src/app/api/recommendations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";


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

  const { searchParams } = new URL(request.url);
  const emotion = searchParams.get("emotion")?.toLowerCase();

  if (!emotion) {
    return NextResponse.json(
      { error: "Query parameter `emotion` is required." },
      { status: 400 }
    );
  }

  // 1) Fetch breathing_meditation_guides
  const { data: breathing, error: breatheErr } = await supabase
    .from<BreathingGuide, BreathingGuide>("breathing_meditation_guides")
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

  // 2) Fetch emotion_music_therapy
  const { data: music, error: musicErr } = await supabase
    .from<MusicTherapy, MusicTherapy>("emotion_music_therapy")
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

  // 3) Fetch inspirational_quotes
  const { data: quotes, error: quoteErr } = await supabase
    .from<InspirationalQuote, InspirationalQuote>("inspirational_quotes")
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

  
  const responsePayload: RecommendationsResponse = {
    breathing: breathing ?? [],
    music: music ?? [],
    quotes: quotes ?? [],
  };

  return NextResponse.json(responsePayload);
}
