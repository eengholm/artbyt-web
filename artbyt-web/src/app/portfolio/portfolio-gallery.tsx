"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Container from "@/app/_components/ui/container";

type PortfolioImage = {
  url: string;
  title: string;
  assignment?: string;
  assignmentTitle?: string;
  size: "small" | "medium" | "large";
  imagePosition?: string;
};

type Props = {
  images: PortfolioImage[];
};

export default function PortfolioGallery({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(
    null
  );
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const observers = imageRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleImages((prev) => new Set(prev).add(index));
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [images]);

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

  const getObjectPosition = (position?: string) => {
    if (!position) return "object-center";
    const positionMap: Record<string, string> = {
      top: "object-top",
      bottom: "object-bottom",
      left: "object-left",
      right: "object-right",
      center: "object-center",
      "top left": "object-left-top",
      "top right": "object-right-top",
      "bottom left": "object-left-bottom",
      "bottom right": "object-right-bottom",
    };
    return positionMap[position] || "object-center";
  };

  return (
    <>
      <Container>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Portfolio
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Utforska mina designprojekt och kreativa arbeten.
            </p>
          </div>

          <div className="mx-auto mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] border-t border-gray-200 pt-16 sm:mt-20 sm:pt-20 max-w-2xl lg:max-w-none">
            {images.map((image, idx) => (
              <button
                key={`${image.url}-${idx}`}
                ref={(el) => {
                  imageRefs.current[idx] = el;
                }}
                onClick={() => setSelectedImage(image)}
                className={`${getSizeClasses(
                  image.size
                )} relative overflow-hidden rounded-lg group cursor-pointer hover:opacity-90 transition-all duration-500 ${
                  visibleImages.has(idx)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${(idx % 8) * 75}ms`,
                }}
              >
                <Image
                  fill
                  className={`object-cover ${getObjectPosition(
                    image.imagePosition
                  )}`}
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
      </Container>

      {/* Modal */}
      {selectedImage && (
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
