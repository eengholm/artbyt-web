"use client";
import Link from "next/link";

interface IntroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButton?: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
}

export function Intro({
  title = "ArtByT",
  description = "Jag hjälper ditt företag att skapa en stark visuell identitet som sticker ut och engagerar din målgrupp.",
  primaryButton = { text: "Se mina projekt", link: "/assignments" },
}: IntroProps) {
  const year = new Date().getFullYear();

  return (
    <section className="relative pb-16 sm:pb-24">
      <div className="max-w-4xl">
        {/* Hero heading */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-gray-900">
          {title}
          {" – "}
          <span className="font-light italic text-gray-300">Design</span>
        </h1>
        <p className="text-6xl sm:text-7xl lg:text-8xl font-light italic text-gray-300 leading-[1.05] tracking-tight">
          Portfolio
        </p>

        {/* Description + CTA */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <div className="max-w-xs">
            <p className="text-sm leading-relaxed text-gray-500">
              {description}
            </p>
            <Link
              href={primaryButton.link}
              className="mt-6 inline-block text-xs uppercase tracking-widest text-gray-900 border border-gray-900 px-6 py-2.5 hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              {primaryButton.text}
            </Link>
          </div>

          {/* Year annotation */}
          <p className="text-xs uppercase tracking-widest text-gray-400 self-end sm:self-start sm:pt-2">
            Portfolio {year}
          </p>
        </div>
      </div>
    </section>
  );
}
