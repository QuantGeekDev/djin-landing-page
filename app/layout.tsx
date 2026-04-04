import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { OrganizationSchema, WebSiteSchema } from "./structured-data";
import CookieConsent from "./components/cookie-consent";
import "./globals.css";
import { cn } from "@/app/lib/cn";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
  metadataBase: new URL("https://get.jinn.today"),
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
  authors: [{ name: "Jinn", url: "https://get.jinn.today" }],
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
    url: "https://get.jinn.today",
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
    canonical: "https://get.jinn.today",
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
    <html lang="en" className={cn("h-full", inter.variable, mono.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
        {GTM_ID && (
          <>
            <Script
              id="gtm-consent-defaults"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer=window.dataLayer||[];
                  window.gtag=function(){dataLayer.push(arguments);};
                  gtag('consent','default',{
                    analytics_storage:'denied',
                    ad_storage:'denied',
                    ad_user_data:'denied',
                    ad_personalization:'denied'
                  });`,
              }}
            />
            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        <OrganizationSchema />
        <WebSiteSchema />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
