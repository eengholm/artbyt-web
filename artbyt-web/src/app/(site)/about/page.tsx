import { Metadata } from "next";
import {
  getAboutSettings,
  getGeneralSettings,
  getFooterSettings,
} from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "@/app/_components/shared/markdown-styles.module.css";
import Image from "next/image";

// Revalidate every day
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = getAboutSettings();
  const settings = getGeneralSettings();

  // Strip markdown syntax so it doesn't appear verbatim in search results
  const plainDescription =
    (aboutData.content || "")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/[*_`~]/g, "")
      .replace(/^[-*+]\s+/gm, "")
      .replace(/\n+/g, " ")
      .trim()
      .substring(0, 160) || settings.description;

  return {
    title: aboutData.title || "Om Mig",
    description: plainDescription,
    openGraph: {
      title: aboutData.title || "Om Mig",
      description: plainDescription,
      images: aboutData.image ? [aboutData.image] : [],
      type: "profile",
    },
  };
}

export default async function About() {
  const aboutData = getAboutSettings();
  const footerData = getFooterSettings();
  const settings = getGeneralSettings();
  const content = await markdownToHtml(aboutData.content || "");

  return (
    <main className="px-4">
      {/* Top rule */}
      <hr className="border-t border-gray-200 mb-3" />

      {/* Full-width image */}
      {aboutData.image && (
        <div className="relative w-full aspect-[3/1] overflow-hidden">
          <Image
            src={aboutData.image}
            alt={aboutData.title || "Om Mig"}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Metadata row */}
      <div className="flex flex-row gap-8 py-4 items-start">
        <div className="md:w-1/2 md:shrink-0">
          <span className="text-sm text-black">
            {aboutData.title || "Om Mig"}
          </span>
        </div>
        <div className="flex-1 min-w-0 text-right flex flex-col gap-1 items-end">
          {footerData.instagramUrl && (
            <a
              href={footerData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black hover:opacity-50 transition-opacity flex items-center gap-1"
            >
              Instagram <span aria-hidden="true">↗</span>
            </a>
          )}
          {footerData.linkedinUrl && (
            <a
              href={footerData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black hover:opacity-50 transition-opacity flex items-center gap-1"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Body text */}
      <hr className="border-t border-gray-200 mb-6" />
      <div className="md:columns-2 md:gap-12">
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-1 text-sm text-black mt-8 items-end text-right">
        {settings.contactEmail && (
          <a
            href={`mailto:${settings.contactEmail}`}
            className="hover:opacity-50 transition-opacity"
          >
            {settings.contactEmail}
          </a>
        )}
        {settings.phoneNumber && (
          <a
            href={`tel:${settings.phoneNumber.replace(/\s/g, "")}`}
            className="hover:opacity-50 transition-opacity"
          >
            {settings.phoneNumber}
          </a>
        )}
      </div>
    </main>
  );
}
