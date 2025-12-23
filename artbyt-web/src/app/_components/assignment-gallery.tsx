"use client";

import Image from "next/image";
import { useState } from "react";

type Image = {
  url: string | null;
  fileName: string | null;
};

type Props = {
  images: Image[];
};

export function AssignmentGallery({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, idx) => (
            <button
              key={`${image.url}-${idx}`}
              onClick={() => setSelectedImage(image)}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer hover:opacity-90 transition-opacity"
            >
              {image.url && (
                <Image
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  src={image.url}
                  alt={image.fileName || `Gallery image ${idx + 1}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && selectedImage.url && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-6xl w-auto bg-gray-900 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
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

            <div className="relative bg-gray-900">
              <img
                className="max-w-full max-h-[80vh] w-auto h-auto"
                src={selectedImage.url}
                alt={selectedImage.fileName || "Gallery image"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
