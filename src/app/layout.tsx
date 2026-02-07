import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: (() => {
    const raw =
      process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    return new URL(withProtocol);
  })(),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Valentine Vibe Check",
    description:
      "Create a Valentine compatibility quiz and see how well your friends know you.",
    type: "website",
    images: ["/valentine-og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine Vibe Check",
    description:
      "Create a Valentine compatibility quiz and see how well your friends know you.",
    images: ["/valentine-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B68HKQD6NP"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B68HKQD6NP');
          `}
        </Script>
      </head>
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
