import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { OrganizationSchema, WebSiteSchema } from "./structured-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jinn.ai"),
  title: {
    default: "Jinn \u2014 An AI Assistant That Lives in Your Home",
    template: "%s | Jinn",
  },
  description:
    "Meet the HoloBox: a personal AI agent in a smart display. Plug it in, talk to it, and let it manage your day. Pre-order now for $299 ($150 off retail).",
  keywords: [
    "AI smart display",
    "AI assistant device",
    "smart home AI",
    "AI agent hardware",
    "Jinn HoloBox",
    "voice AI assistant",
    "open source AI assistant",
    "smart display 2026",
  ],
  authors: [{ name: "Jinn", url: "https://jinn.ai" }],
  creator: "Jinn",
  publisher: "Jinn",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jinn.ai",
    siteName: "Jinn",
    title: "Jinn \u2014 An AI Assistant That Lives in Your Home",
    description:
      "A personal AI agent in a smart display. Plug it in, talk to it, and let it manage your day. Pre-order $299.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jinn HoloBox AI smart display",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jinn \u2014 An AI Assistant That Lives in Your Home",
    description:
      "A personal AI agent in a smart display. Pre-order $299.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://jinn.ai",
  },
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <OrganizationSchema />
        <WebSiteSchema />
        {children}
      </body>
    </html>
  );
}
