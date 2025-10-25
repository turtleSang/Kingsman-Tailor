export default function PostCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row bg-neutral-900 rounded-2xl overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="md:w-1/2 w-full h-48 md:h-64 bg-neutral-800"></div>

      {/* Text content skeleton */}
      <div className="md:w-1/2 w-full p-6 flex flex-col justify-center space-y-3">
        <div className="h-6 w-3/4 bg-neutral-800 rounded"></div>
        <div className="h-6 w-1/2 bg-neutral-800 rounded"></div>
        <div className="h-4 w-full bg-neutral-800 rounded"></div>
        <div className="h-4 w-5/6 bg-neutral-800 rounded"></div>
      </div>
    </div>
  );
}
