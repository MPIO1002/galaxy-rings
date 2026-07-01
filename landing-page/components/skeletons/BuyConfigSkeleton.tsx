"use client";

export default function BuyConfigSkeleton() {
  return (
    <div className="w-full flex flex-col justify-center animate-pulse">
      {/* Header Specs Skeleton */}
      <div className="h-4 bg-zinc-200 rounded w-24 mb-3" />
      <div className="h-10 bg-zinc-200 rounded w-64 mb-4" />
      
      {/* Pricing Skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 bg-zinc-200 rounded w-32" />
        <div className="h-6 bg-zinc-200 rounded w-24" />
        <div className="h-5 bg-zinc-200 rounded w-36" />
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-8">
        <div className="h-4 bg-zinc-100 rounded w-full" />
        <div className="h-4 bg-zinc-100 rounded w-5/6" />
      </div>

      <hr className="border-zinc-100 mb-8" />

      {/* Colors Selection Skeleton */}
      <div className="mb-8">
        <div className="h-4 bg-zinc-200 rounded w-32 mb-4" />
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-28 h-24 rounded-2xl bg-zinc-100/50 border border-zinc-200 flex flex-col items-center justify-center gap-2 p-4">
              <div className="w-8 h-8 rounded-full bg-zinc-200/80" />
              <div className="h-3 bg-zinc-200/80 rounded w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Sizing Guide Box Skeleton */}
      <div className="mb-8 p-5 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-zinc-200 rounded w-3/4" />
          <div className="h-3 bg-zinc-200 rounded w-1/2" />
        </div>
        <div className="h-8 bg-zinc-200 rounded w-32" />
      </div>

      {/* Sizes Selection Skeleton */}
      <div className="mb-8">
        <div className="h-4 bg-zinc-200 rounded w-40 mb-4" />
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-12 rounded-xl bg-zinc-100/60 border border-zinc-200" />
          ))}
        </div>
      </div>

      {/* Action Buy Button Skeleton */}
      <div className="w-full h-14 bg-zinc-200 rounded-full" />
    </div>
  );
}
