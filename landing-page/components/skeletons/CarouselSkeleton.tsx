"use client";

import { CAROUSEL_IMAGES } from "@/constants/buyData";

export default function CarouselSkeleton() {
  return (
    <div className="w-full flex flex-col items-center justify-between lg:h-full">
      {/* Main Display Container Skeleton */}
      <div className="relative w-full aspect-square lg:aspect-auto lg:flex-1 max-w-[500px] bg-zinc-100 rounded-2xl overflow-hidden shadow-sm animate-pulse flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-zinc-200/50" />
      </div>
      {/* Dots Indicator Skeleton */}
      <div className="flex gap-2.5 mt-6 animate-pulse">
        {CAROUSEL_IMAGES.map((_, idx) => (
          <div
            key={idx}
            className="w-2 h-2 rounded-full bg-zinc-200"
          />
        ))}
      </div>
    </div>
  );
}
