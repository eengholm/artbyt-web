"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PortfolioImage = {
  url: string;
  title?: string;
  assignment?: string;
  assignmentTitle?: string;
  size?: "small" | "medium" | "large";
  imagePosition?: string;
};

type Props = {
  images: PortfolioImage[];
};

export default function PortfolioGallery({ images }: Props) {
  const [selected, setSelected] = useState<PortfolioImage | null>(null);

  const leftImages = images.filter((_, i) => i % 2 === 0);
  const rightImages = images.filter((_, i) => i % 2 === 1);

  return (
    <>
      {/* Desktop: two staggered columns. Mobile: single column list. */}
      <div className="flex flex-col md:flex-row md:items-start md:gap-24 px-0 md:px-16 py-0 md:py-8 gap-4">
        {/* Left column */}
        <div className="flex flex-col gap-4 md:gap-24 flex-1">
          {leftImages.map((image, i) => (
            <ImageCard
              key={image.url + i}
              image={image}
              side="left"
              onSelect={setSelected}
              delay={0}
            />
          ))}
        </div>

        {/* Right column — offset down by half a card to sit between left images */}
        <div className="flex flex-col gap-4 md:gap-24 flex-1 md:mt-[calc(50%*0.75+6rem)]">
          {rightImages.map((image, i) => (
            <ImageCard
              key={image.url + i}
              image={image}
              side="right"
              onSelect={setSelected}
              delay={150}
            />
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected.url}
            alt={selected.title || ""}
            className="max-w-full max-h-[90vh] w-auto h-auto"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function ImageCard({
  image,
  side,
  onSelect,
  delay = 0,
}: {
  image: PortfolioImage;
  side: "left" | "right";
  onSelect: (img: PortfolioImage) => void;
  delay?: number;
}) {
  const isLeft = side === "left";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateX(0)";
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: isLeft ? "translateX(-24px)" : "translateX(24px)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      <div className="relative">
        {/* Shadow layer — desktop only */}
        <div
          className={`hidden md:block absolute inset-0 bg-gray-200 ${
            isLeft
              ? "translate-x-6 translate-y-6"
              : "-translate-x-6 translate-y-6"
          }`}
        />
        <button
          onClick={() => onSelect(image)}
          className="relative z-10 block w-full group shadow-[4px_4px_16px_rgba(0,0,0,0.18)] hover:shadow-[4px_4px_20px_rgba(0,0,0,0.26)] transition-shadow duration-200"
        >
          {/* Mobile: fixed-height cropped banner */}
          <div className="relative h-48 w-full md:hidden overflow-hidden">
            <Image
              src={image.url}
              alt={image.title || ""}
              fill
              className="object-cover group-hover:opacity-90 transition-opacity duration-200"
              style={{ objectPosition: image.imagePosition || "center" }}
              sizes="100vw"
            />
          </div>
          {/* Desktop: natural aspect ratio */}
          <Image
            src={image.url}
            alt={image.title || ""}
            width={1200}
            height={900}
            className="hidden md:block w-full h-auto object-cover group-hover:opacity-90 transition-opacity duration-200"
            sizes="48vw"
          />
        </button>
      </div>
    </div>
  );
}
