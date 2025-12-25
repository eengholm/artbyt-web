import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/app/_components/layout/footer";
import { PersonStructuredData } from "@/app/_components/seo/structured-data";
import { getGeneralSettings } from "@/lib/api";
import { Menu } from "./_components/layout/menu";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const settings = getGeneralSettings();

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://artbyt.se"
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
      icon: "/favicon/favicon.ico",
      apple: "/favicon/apple-touch-icon.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getGeneralSettings();

  return (
    <html lang="sv" className={inter.className}>
      <head>
        <PersonStructuredData />
      </head>
      <body>
        <div className="inset-0 -z-10 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <Menu />
          <div className="min-h-screen">
            {children}
            <Footer
              contactEmail={settings.contactEmail}
              phoneNumber={settings.phoneNumber}
            />
          </div>
        </div>
      </body>
    </html>
  );
}
