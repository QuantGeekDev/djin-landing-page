import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
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
  title: "Jinn — An AI Assistant That Lives in Your Home",
  description:
    "Meet the HoloBox: a personal AI agent in a smart display. Plug it in, talk to it, and let it manage your day. Pre-order now for $299 ($150 off retail).",
  openGraph: {
    title: "Jinn — An AI Assistant That Lives in Your Home",
    description:
      "A personal AI agent in a smart display. Plug it in, talk to it, and let it manage your day.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
