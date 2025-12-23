"use client";

import Image from "next/image";
import { useState } from "react";

type PortfolioImage = {
  url: string;
  title: string;
  assignment?: string;
  assignmentTitle?: string;
  size: "small" | "medium" | "large";
};

type Props = {
  images: PortfolioImage[];
};

export default function PortfolioGallery({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(
    null
  );

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2";
      case "medium":
        return "col-span-2 row-span-1";
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-12">
              Portfolio
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
              {images.map((image, idx) => (
                <button
                  key={`${image.url}-${idx}`}
                  onClick={() => setSelectedImage(image)}
                  className={`${getSizeClasses(
                    image.size
                  )} relative overflow-hidden rounded-lg group cursor-pointer hover:opacity-90 transition-opacity`}
                >
                  <Image
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    src={image.url}
                    alt={image.title || "Portfolio image"}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-end p-4">
                    <p className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {image.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative w-full h-[70vh]">
              <Image
                fill
                className="object-contain"
                sizes="90vw"
                src={selectedImage.url}
                alt={selectedImage.title || "Portfolio image"}
              />
            </div>

            <div className="p-6 bg-white">
              <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
              {selectedImage.assignment && (
                <>
                  {selectedImage.assignmentTitle && (
                    <p className="text-gray-600 mb-2">
                      {selectedImage.assignmentTitle}
                    </p>
                  )}
                  <a
                    href={`/assignments/${selectedImage.assignment}`}
                    className="text-blue-600 hover:underline"
                    onClick={() => setSelectedImage(null)}
                  >
                    View full project →
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
