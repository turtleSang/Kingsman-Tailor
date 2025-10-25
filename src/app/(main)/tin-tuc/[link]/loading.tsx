export default function PostDetailSkeleton() {
  return (
    <div className="bg-neutral-900 rounded-2xl p-6 md:p-10 animate-pulse space-y-5">
      {/* H1 skeleton */}
      <div className="h-7 w-3/4 bg-neutral-800 rounded"></div>

      {/* H2 skeleton */}
      <div className="h-5 w-1/2 bg-neutral-800 rounded"></div>

      {/* Hình ảnh ngang skeleton */}
      <div className="w-full h-64 bg-neutral-800 rounded-xl"></div>

      {/* P skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-neutral-800 rounded"></div>
        <div className="h-4 w-11/12 bg-neutral-800 rounded"></div>
        <div className="h-4 w-5/6 bg-neutral-800 rounded"></div>
      </div>
    </div>
  );
}
