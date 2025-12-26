import React from "react";
import { AssignmentHeader } from "@/app/_components/assignments/assignment-header";
import { AssignmentBody } from "@/app/_components/assignments/assignment-body";
import Image from "next/image";

// Override Next.js Image for CMS preview (no optimization)
const PreviewImage = ({ src, alt, className, style }: any) => (
  <img src={src} alt={alt} className={className} style={style} />
);

// Assignment Preview using actual components
export const AssignmentPreview = ({ entry, widgetFor }: any) => {
  const data = entry.get("data");
  const title = data.get("title") || "Untitled";
  const coverImage = data.get("coverImage") || "";
  const coverImagePosition = data.get("coverImagePosition") || "center";

  const positionMap: Record<string, string> = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
    center: "center",
    "top left": "left top",
    "top right": "right top",
    "bottom left": "left bottom",
    "bottom right": "right bottom",
  };
  const objectPosition = positionMap[coverImagePosition] || "center";

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <article>
        {/* Using actual AssignmentHeader styling */}
        <div className="mb-8 md:mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
            {title}
          </h1>
          {coverImage && (
            <div className="mb-8 md:mb-16 relative w-full aspect-[16/9]">
              <img
                src={coverImage}
                alt={title}
                className="rounded-lg object-cover w-full h-full"
                style={{ objectPosition }}
              />
            </div>
          )}
        </div>
        {/* Body content */}
        <div className="prose prose-lg prose-slate max-w-none">
          {widgetFor("body")}
        </div>
      </article>
    </div>
  );
};

// Homepage Preview using actual intro component styles
export const HomepagePreview = ({ entry }: any) => {
  const data = entry.get("data");
  const intro = data.get("intro");
  const title = intro?.get("title") || "ArtByT";
  const subtitle = intro?.get("subtitle") || "Din lokala designstudio";
  const description = intro?.get("description") || "";
  const primaryButton = intro?.get("primaryButton");
  const secondaryButton = intro?.get("secondaryButton");

  return (
    <div className="relative isolate px-6 lg:px-8">
      <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
            {subtitle}
          </h1>
          <p className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
            {title}
          </p>
          {description && (
            <p className="mt-8 text-xl leading-relaxed text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryButton && (
              <div className="w-full sm:w-auto rounded-md bg-gray-900 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors">
                {primaryButton.get("text") || "Primary Button"}
              </div>
            )}
            {secondaryButton && (
              <div className="w-full sm:w-auto rounded-md border border-gray-900 px-8 py-3.5 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                {secondaryButton.get("text") || "Secondary Button"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// About Preview using actual about page styles
export const AboutPreview = ({ entry, widgetFor }: any) => {
  const data = entry.get("data");
  const title = data.get("title") || "Om Mig";
  const image = data.get("image") || "";
  const imagePosition = data.get("imagePosition") || "center";

  const positionMap: Record<string, string> = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
    center: "center",
    "top left": "left top",
    "top right": "right top",
    "bottom left": "left bottom",
    "bottom right": "right bottom",
  };
  const objectPosition = positionMap[imagePosition] || "center";

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-12">
        {title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {image && (
          <div className="relative rounded-lg overflow-hidden aspect-square">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{ objectPosition }}
            />
          </div>
        )}
        <div className="flex flex-col justify-center prose prose-lg prose-slate max-w-none">
          {widgetFor("body")}
        </div>
      </div>
    </div>
  );
};
