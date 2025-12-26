import React from "react";
import { PreviewTemplateComponentProps } from "decap-cms-core";

const AssignmentPreview: React.FC<PreviewTemplateComponentProps> = ({
  entry,
  widgetFor,
}) => {
  const data = entry.getIn(["data"]);
  const title = data?.get("title") || "Untitled";
  const excerpt = data?.get("excerpt") || "";
  const coverImage = data?.get("coverImage") || "";
  const coverImagePosition = data?.get("coverImagePosition") || "center";

  // Map position to object-position CSS
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
          {title}
        </h1>

        {/* Cover Image */}
        {coverImage && (
          <div className="mb-8 relative w-full aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
              style={{ objectPosition: getObjectPosition(coverImagePosition) }}
            />
          </div>
        )}

        {/* Excerpt */}
        {excerpt && (
          <p className="text-xl text-gray-600 italic mb-8">{excerpt}</p>
        )}
      </div>

      {/* Body Content */}
      <div className="prose prose-lg max-w-none">{widgetFor("body")}</div>

      <style>{`
        .prose {
          color: #374151;
        }
        .prose h2 {
          font-size: 1.875rem;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose p {
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        .prose ul, .prose ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default AssignmentPreview;
