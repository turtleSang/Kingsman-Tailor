"use client";

export default function ProductCardSkeleton() {
  return (
    <div className="group block relative rounded-sm overflow-hidden">
      {/* Ảnh */}
      <div className="relative aspect-square bg-neutral-300/20 animate-pulse" />

      {/* Nội dung */}
      <div className="bg-secondary/75 lg:absolute lg:w-full lg:bottom-0 lg:left-0 p-2 lg:translate-y-2/3 group-hover:translate-y-0 duration-200">
        <div className="h-4 bg-neutral-300/30 rounded w-3/4 mb-2 animate-pulse" />
        <div className="h-3 bg-neutral-300/30 rounded w-1/2 mb-1 animate-pulse" />
        <div className="h-3 bg-neutral-300/30 rounded w-full animate-pulse" />
      </div>
    </div>
  );
}
