"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { SiteTitle, SiteNav } from "@/app/_components/layout/site-nav";

type Slide = {
  url: string;
  title?: string;
};

type HomeSlideshowProps = {
  slides: Slide[];
  siteName: string;
};

export function HomeSlideshow({ slides, siteName }: HomeSlideshowProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - left;
      if (clickX < width / 2) {
        prev();
      } else {
        next();
      }
    },
    [prev, next],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(delta) > 40) {
        delta < 0 ? next() : prev();
      }
      touchStartX.current = null;
    },
    [prev, next],
  );

  if (slides.length === 0) return null;

  const current = slides[index];
  const total = slides.length;
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div className="h-screen w-screen flex flex-col bg-white overflow-hidden pt-6">
      <SiteTitle />
      <SiteNav />

      {/* Image band — full width, fixed height, clipped */}
      <div
        className="relative w-full flex-1 min-h-0 my-8 cursor-crosshair select-none overflow-hidden"
        onClick={handleImageClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: "crosshair" }}
      >
        <Image
          key={current.url}
          src={current.url}
          alt={current.title || ""}
          fill
          className="object-contain object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Counter */}
      <div className="shrink-0 pb-4 text-center">
        <span className="text-3xl font-normal tracking-widest text-black">
          {counter}
        </span>
      </div>
    </div>
  );
}
