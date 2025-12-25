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
    <section className="mb-16">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
          Portfolio
        </h2>
        <Link
          href="/portfolio"
          className="text-lg hover:underline text-blue-600"
        >
          Visa Alla →
        </Link>
      </div>

      <div className="relative -mx-4 md:-mx-8">
        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-4 md:px-8 pb-4">
            {duplicatedImages.map((image, idx) => (
              <Link
                key={`${image.url}-${idx}`}
                href={
                  image.assignment
                    ? `/assignments/${image.assignment}`
                    : "/portfolio"
                }
                className="flex-shrink-0 w-80 h-80 relative group overflow-hidden rounded-lg"
              >
                <Image
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="320px"
                  src={image.url}
                  alt={image.title || "Portfolio image"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white font-semibold text-lg">
                      {image.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
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
