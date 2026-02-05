import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase";
import { formatPercentage } from "@/lib/quiz";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: { attemptId: string } },
) {
  const { data: attempt } = await supabase
    .from("attempts")
    .select("id, quiz_id, percentage")
    .eq("id", params.attemptId)
    .single();

  const { data: quiz } = await supabase
    .from("quizzes")
    .select("creator_name")
    .eq("id", attempt?.quiz_id ?? "")
    .single();

  const percentage = attempt?.percentage ?? 0;
  const creator = quiz?.creator_name ?? "them";

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
          <div style={{ fontSize: 64, fontWeight: 700, color: "#be123c" }}>
            {formatPercentage(percentage)}%
          </div>
          <div style={{ fontSize: 32 }}>
            Compatibility with {creator}
          </div>
          <div style={{ fontSize: 24, color: "#7f1d1d" }}>
            How well do you know me?
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

