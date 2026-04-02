import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { PersonStructuredData } from "@/app/_components/seo/structured-data";
import { getGeneralSettings } from "@/lib/api";

import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = getGeneralSettings();

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://artbyt.se",
    ),
    title: {
      default: settings.title,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.description,
    keywords: [
      "design",
      "portfolio",
      "Tim Bylander",
      "graphic design",
      "branding",
      "creative",
    ],
    authors: [{ name: "Tim Bylander" }],
    creator: "Tim Bylander",
    openGraph: {
      type: "website",
      locale: "sv_SE",
      url: "/",
      siteName: settings.siteName,
      title: settings.title,
      description: settings.description,
      images: [
        {
          url: "/assets/portfolio/og-image.jpg",
          width: 1200,
          height: 630,
          alt: settings.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.title,
      description: settings.description,
      images: ["/assets/portfolio/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        {
          url: "/favicon/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/favicon/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
      ],
      apple: "/favicon/apple-touch-icon.png",
      shortcut: "/favicon/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={ibmPlexMono.variable}>
      <head>
        <PersonStructuredData />
      </head>
      <body className="bg-white">{children}</body>
    </html>
  );
}
