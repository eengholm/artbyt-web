import { Metadata } from "next";
import { getAboutSettings, getGeneralSettings } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/ui/container";
import Image from "next/image";

// Revalidate every day
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = getAboutSettings();
  const settings = getGeneralSettings();

  return {
    title: aboutData.title || "Om Mig",
    description: aboutData.content?.substring(0, 160) || settings.description,
    openGraph: {
      title: aboutData.title || "Om Mig",
      description: aboutData.content?.substring(0, 160),
      images: aboutData.image ? [aboutData.image] : [],
      type: "profile",
    },
  };
}

export default async function About() {
  const aboutData = getAboutSettings();
  const settings = getGeneralSettings();
  const content = await markdownToHtml(aboutData.content || "");

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/artbyt_official",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 448 512"
          className="h-6 w-6"
        >
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/your_linkedin_username",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 448 512"
          className="h-6 w-6"
        >
          <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-12">
            {aboutData.title || "Om Mig"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              {aboutData.image && (
                <Image
                  src={aboutData.image}
                  alt={aboutData.title || "About"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </div>

            <div className="flex flex-col justify-center">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Social Links */}
              <div className="mt-8 flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
              Kontakta Mig
            </h2>
            <div className="max-w-2xl">
              <p className="text-lg text-gray-600 mb-6">
                Har du ett projekt eller en idé du vill diskutera? Tveka inte
                att höra av dig!
              </p>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-1">
                    E-post
                  </span>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    {settings.contactEmail}
                  </a>
                </div>
                {settings.phoneNumber && (
                  <div>
                    <span className="text-sm font-medium text-gray-500 block mb-1">
                      Telefon
                    </span>
                    <a
                      href={`tel:${settings.phoneNumber.replace(/\s/g, "")}`}
                      className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                    >
                      {settings.phoneNumber}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
