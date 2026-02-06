import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "edge";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ quizId: string }> },
) {
  const { quizId } = await context.params;

  const { data: quiz } = await supabase
    .from("quizzes")
    .select("creator_name, title")
    .eq("id", quizId)
    .single();

  const creator = quiz?.creator_name ?? "Someone";
  const title = quiz?.title ?? "How well do you know me?";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top left, #ffe4e6 0%, #fff7f8 55%, #fff 100%)",
          color: "#3f0d1e",
          padding: "60px",
          fontSize: 40,
          fontWeight: 600,
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: "48px",
            borderRadius: "32px",
            background: "white",
            boxShadow: "0 20px 60px rgba(190, 18, 60, 0.2)",
            width: "100%",
          }}
        >
          <div style={{ fontSize: 28, letterSpacing: 6, color: "#fb7185" }}>
            VALENTINE VIBE CHECK
          </div>
          <div style={{ fontSize: 54, fontWeight: 700 }}>{creator}</div>
          <div style={{ fontSize: 32, color: "#be123c" }}>{title}</div>
          <div style={{ fontSize: 26, color: "#7f1d1d" }}>
            Take the quiz → share your score
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

