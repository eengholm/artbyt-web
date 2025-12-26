import React from "react";
import { PreviewTemplateComponentProps } from "decap-cms-core";

const AboutPreview: React.FC<PreviewTemplateComponentProps> = ({
  entry,
  widgetFor,
}) => {
  const data = entry.getIn(["data"]);
  const title = data?.get("title") || "Om Mig";
  const image = data?.get("image") || "";
  const imagePosition = data?.get("imagePosition") || "center";

  const getObjectPosition = (position: string) => {
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
    return positionMap[position] || "center";
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-12">
        {title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        {image && (
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{ objectPosition: getObjectPosition(imagePosition) }}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col justify-center prose prose-lg max-w-none">
          {widgetFor("body")}
        </div>
      </div>

      <style>{`
        .prose {
          color: #374151;
        }
        .prose p {
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default AboutPreview;
