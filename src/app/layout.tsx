import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valentine Vibe Check",
  description:
    "Create a Valentine compatibility quiz and see how well your friends know you.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "Valentine Vibe Check",
    description:
      "Create a Valentine compatibility quiz and see how well your friends know you.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine Vibe Check",
    description:
      "Create a Valentine compatibility quiz and see how well your friends know you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
