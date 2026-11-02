import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export const alt = "Cristhian Armas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "#fafafa" }}>
          Cristhian Armas
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#a1a1aa", marginTop: 16 }}>
          {dict.heroRole}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#71717a",
            marginTop: 40,
            maxWidth: 950,
          }}
        >
          {dict.heroTagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
