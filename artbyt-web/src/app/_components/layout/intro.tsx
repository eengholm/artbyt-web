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
  subtitle = "Din lokala designstudio",
  description = "Jag hjälper ditt företag att skapa en stark visuell identitet som sticker ut och engagerar din målgrupp.",
  primaryButton = { text: "Se mina projekt", link: "/assignments" },
  secondaryButton = { text: "Läs mer om mig", link: "/about" },
}: IntroProps) {
  return (
    <div>
      <div className="relative isolate px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            {/* Main heading - larger and more impactful */}
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
              {subtitle}
            </h1>

            {/* Subheading */}
            <p className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
              {title}
            </p>

            {/* Description - improved spacing and size */}
            <p className="mt-8 text-xl leading-relaxed text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>

            {/* Clear call-to-action buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={primaryButton.link}
                className="w-full sm:w-auto rounded-md bg-gray-900 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
              >
                {primaryButton.text}
              </Link>
              <Link
                href={secondaryButton.link}
                className="w-full sm:w-auto rounded-md border border-gray-900 px-8 py-3.5 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {secondaryButton.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
