"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type PortfolioImage = {
  url: string;
  title: string;
  assignment?: string;
  size: "small" | "medium" | "large";
};

type Props = {
  images: PortfolioImage[];
};

export function PortfolioScroll({ images }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || images.length === 0) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    let animationFrameId: number;

    const scroll = () => {
      if (!scrollContainer) return;

      scrollPosition += scrollSpeed;

      // Check if we've reached the end
      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0; // Loop back to start
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [images.length]);

  if (!images || images.length === 0) {
    return null;
  }

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <section className="mb-24 md:mb-32">
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Portfolio
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Ett urval av mina senaste projekt
          </p>
        </div>
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 text-base font-semibold text-gray-900 hover:text-gray-600 transition-colors"
        >
          Visa alla
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <div className="relative -mx-4 md:-mx-8">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        >
          <div className="flex gap-6 px-4 md:px-8 pb-6">
            {duplicatedImages.map((image, idx) => {
              const sizeClasses = {
                small: "w-64 h-64",
                medium: "w-80 h-80",
                large: "w-96 h-96",
              };

              return (
                <Link
                  key={`${image.url}-${idx}`}
                  href={
                    image.assignment
                      ? `/assignments/${image.assignment}`
                      : "/portfolio"
                  }
                  className={`flex-shrink-0 ${
                    sizeClasses[image.size || "medium"]
                  } relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <Image
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                    src={image.url}
                    alt={image.title || "Portfolio image"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-bold text-xl mb-1">
                        {image.title}
                      </p>
                      {image.assignment && (
                        <p className="text-white/80 text-sm">
                          Klicka för att se projektet
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
