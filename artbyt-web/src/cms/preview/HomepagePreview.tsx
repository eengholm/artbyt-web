import React from "react";
import { PreviewTemplateComponentProps } from "decap-cms-core";

const HomepagePreview: React.FC<PreviewTemplateComponentProps> = ({
  entry,
}) => {
  const data = entry.getIn(["data"]);
  const intro = data?.get("intro");

  const title = intro?.get("title") || "ArtByT";
  const subtitle = intro?.get("subtitle") || "Din lokala designstudio";
  const description = intro?.get("description") || "";
  const primaryButton = intro?.get("primaryButton");
  const secondaryButton = intro?.get("secondaryButton");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      {/* Main heading */}
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
        {subtitle}
      </h1>

      {/* Subheading */}
      <p className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
        {title}
      </p>

      {/* Description */}
      {description && (
        <p className="mt-8 text-xl leading-relaxed text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      )}

      {/* Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        {primaryButton && (
          <div className="w-full sm:w-auto rounded-md bg-gray-900 px-8 py-3.5 text-base font-semibold text-white shadow-sm">
            {primaryButton.get("text") || "Primary Button"}
          </div>
        )}
        {secondaryButton && (
          <div className="w-full sm:w-auto rounded-md border border-gray-900 px-8 py-3.5 text-base font-semibold text-gray-900">
            {secondaryButton.get("text") || "Secondary Button"}
          </div>
        )}
      </div>

      <div className="mt-12 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> This preview shows the intro section. Featured
          assignments and other sections will appear on the live site.
        </p>
      </div>
    </div>
  );
};

export default HomepagePreview;
